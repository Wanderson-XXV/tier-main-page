import React, { useEffect, useRef, useState } from 'react'

const ComoFunfaPratica = () => {
  const textRef = useRef(null)
  const groupRef = useRef(null)
  const [box, setBox] = useState(null)
  const [layout, setLayout] = useState(null) // posição e tamanho do ícone

  // Ajuste conforme necessário
  const FONT_SIZE = 60
  const STROKE_WIDTH = 12 // largura do contorno do texto
  const EXTRA_PADDING = 2 // margem extra para evitar corte
  const GAP = Math.ceil(STROKE_WIDTH / 2) // espaço entre texto e ícone

  // Mede o texto para definir layout do ícone (posição e tamanho)
  const measureTextAndLayout = () => {
    if (!textRef.current) return
    const tb = textRef.current.getBBox() // mede em unidades do SVG (sem stroke)

    // Queremos que o ícone tenha a MESMA altura visível do texto (incluindo stroke)
    const iconSize = Math.ceil(tb.height + STROKE_WIDTH) * 0.9
    // Alinhar topo do ícone ao topo visível do texto = (ajustando metade do stroke)
    const iconY = Math.floor(tb.y - STROKE_WIDTH / 2) + 5
    // Posicionar ícone à direita do texto com um pequeno GAP
    const iconX = Math.ceil(tb.x + tb.width + GAP)

    setLayout({ iconSize, iconX, iconY })
  }

  // Mede o grupo (texto + ícone) e atualiza viewBox + width/height do SVG
  const measureGroupBox = () => {
    if (!groupRef.current) return
    const bbox = groupRef.current.getBBox() // mede grupo completo
    const pad = Math.ceil(STROKE_WIDTH / 2) + EXTRA_PADDING

    setBox({
      x: bbox.x - pad,
      y: bbox.y - pad,
      width: Math.ceil(bbox.width + 2 * pad),
      height: Math.ceil(bbox.height + 2 * pad),
    })
  }

  // 1) Aguarda fontes e mede texto para calcular layout do ícone
  useEffect(() => {
    let raf
    const ready = typeof document !== 'undefined' && document.fonts?.ready ? document.fonts.ready : Promise.resolve()
    ready.then(() => {
      raf = requestAnimationFrame(measureTextAndLayout)
    })
    return () => {
      if (raf) cancelAnimationFrame(raf)
    }
    // Se mudar texto, fonte, tamanho ou stroke, re-mede
  }, [FONT_SIZE, STROKE_WIDTH])

  // 2) Depois que layout estiver definido, mede o grupo (texto + ícone)
  useEffect(() => {
    if (!layout) return
    let raf
    raf = requestAnimationFrame(measureGroupBox)
    return () => {
      if (raf) cancelAnimationFrame(raf)
    }
  }, [layout])

  return (
    <svg
      // width/height iguais ao conteúdo medido (+padding)
      width={box?.width} 
      height={box?.height}
      // viewBox recortado exatamente no conteúdo
      viewBox={box ? `${box.x} ${box.y} ${box.width} ${box.height}` : undefined}
      preserveAspectRatio="xMidYMid meet"
      // Centraliza o SVG no layout; fica invisível até medir para evitar flicker
      style={{ display: 'block', margin: '0 auto', visibility: box ? 'visible' : 'hidden' }}
    >
      <g ref={groupRef}>
        <text
          ref={textRef}
          x={0}
          y={0}
          fontFamily="Glacial Indifference"
          fontSize={FONT_SIZE}
          fontWeight="bold"
          fill="white"
          stroke="#ff4500"
          strokeWidth={STROKE_WIDTH}
          paintOrder="stroke"
        >
          COMO FUNCIONA NA PRÁTICA
        </text>

        {layout && (
          // Use elemento <image> dentro de <svg>; o caminho /ask.svg vem da pasta public
          <image
            href="/ask.svg"
            x={layout.iconX}
            y={layout.iconY}
            width={layout.iconSize}
            height={layout.iconSize}
            preserveAspectRatio="xMidYMid meet"
            aria-label="Ícone de interrogação"
          />
        )}
      </g>
    </svg>
  )
}

export default ComoFunfaPratica
