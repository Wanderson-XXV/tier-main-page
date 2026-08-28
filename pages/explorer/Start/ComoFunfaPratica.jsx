import React, { useEffect, useRef, useState } from 'react'

const ComoFunfaPratica = () => {
  const groupRef = useRef(null)
  const textLineRef = useRef(null)
  const comoRef = useRef(null)
  const aRef = useRef(null) // referência para a letra "A" de PRATICA

  const [box, setBox] = useState(null)
  const [layout, setLayout] = useState(null) // posição e tamanho do ícone
  const [restX, setRestX] = useState(0)      // posição X do restante do texto
  const [highlight, setHighlight] = useState(null) // caixa de destaque atrás de "COMO"
  const [accent, setAccent] = useState(null) // pseudo-acento acima do "A" de PRATICA

  // Ajuste conforme necessário
  const FONT_SIZE = 60
  const STROKE_WIDTH = 0 // sem contorno nas letras neste componente
  const EXTRA_PADDING = 4 // margem extra para evitar corte
  const GAP = Math.ceil((STROKE_WIDTH + 8) / 2) // espaço entre texto e ícone
  // Afinamento/engrossamento sutil para simular um "peso" entre 500 e 600
  // Ajuste este valor (ex.: 0.4, 0.6, 0.8) até ficar no ponto ideal
  const REST_STROKE_WIDTH = 0.6

  // Parâmetros do pseudo-acento (pixelizado)
  const ACCENT_THICKNESS = 2 // ~2px como solicitado
  const ACCENT_ROTATE = -18  // inclinação do acento agudo

  // 1) Mede a palavra "COMO" e define: highlight + posição X do resto do texto
  const measureComoAndRest = () => {
    if (!comoRef.current) return
    const cb = comoRef.current.getBBox()

    // Espaço visual entre "COMO" e o restante do texto
    const spaceGap = Math.ceil(FONT_SIZE * 0.2)
    setRestX(Math.ceil(cb.x + cb.width + spaceGap))

    // Caixa de marca-texto (um pouco maior que o texto)
    const padX = Math.round(FONT_SIZE * 0.12)
    const padY = Math.round(FONT_SIZE * 0.22)
    setHighlight({
      x: cb.x - padX,
      y: cb.y - padY,
      width: cb.width + 2 * padX,
      height: cb.height + 1 * padY,
      //rx: Math.round(FONT_SIZE * 0.15), // cantos levemente arredondados
    })
  }

  // 2) Mede a linha completa do texto (COMO + resto) para posicionar o ícone e o pseudo-acento
  const measureTextLineAndLayout = () => {
    if (!textLineRef.current) return
    const tb = textLineRef.current.getBBox()

    // Ícone com mesma altura visual do texto (sem stroke aqui)
    const iconSize = Math.ceil(tb.height) * 0.9
    const iconY = Math.floor(tb.y) + -4
    const iconX = Math.ceil(tb.x + tb.width + GAP)

    setLayout({ iconSize, iconX, iconY })

    // Calcula o pseudo-acento acima do "A" (apenas quando disponível)
    if (aRef.current) {
      const ab = aRef.current.getBBox()

      // Espessura fixa de ~2px
      const thickness = ACCENT_THICKNESS
      // Largura proporcional para dar aparência do acento agudo
      const accWidth = Math.max(thickness * 3, Math.round(FONT_SIZE / 6))
      // Pequeno afastamento acima do topo da letra
      const offset = Math.max(1, Math.round(FONT_SIZE * 0.03))

      // Centro levemente deslocado para a direita do "A" (agudo cai do lado direito)
      const cx = Math.round(ab.x + ab.width * 0.68)
      const cy = Math.round(ab.y - offset - thickness / 2)

      const x = Math.round(cx - accWidth / 2)
      const y = Math.round(cy - thickness / 2)

      setAccent({ x, y, width: accWidth, height: thickness, cx, cy, rotate: ACCENT_ROTATE })
    }
  }

  // 3) Mede o grupo (texto + ícone) e atualiza viewBox + width/height do SVG
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

  // Aguarda fontes e mede "COMO" primeiro
  useEffect(() => {
    let raf
    const ready = typeof document !== 'undefined' && document.fonts?.ready ? document.fonts.ready : Promise.resolve()
    ready.then(() => {
      raf = requestAnimationFrame(measureComoAndRest)
    })
    return () => { if (raf) cancelAnimationFrame(raf) }
  }, [FONT_SIZE])

  // Depois que restX for definido (e o DOM reposicionado), mede linha completa p/ ícone e acento
  useEffect(() => {
    if (!restX) return
    let raf
    raf = requestAnimationFrame(measureTextLineAndLayout)
    return () => { if (raf) cancelAnimationFrame(raf) }
  }, [restX])

  // Depois que layout (ícone) estiver definido, mede o grupo completo
  useEffect(() => {
    if (!layout) return
    let raf
    raf = requestAnimationFrame(measureGroupBox)
    return () => { if (raf) cancelAnimationFrame(raf) }
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
        {/* Destaque atrás da palavra "COMO" */}
        {highlight && (
          <rect
            x={highlight.x}
            y={highlight.y}
            width={highlight.width}
            height={highlight.height}
            rx={highlight.rx}
            fill="#ff4203"
            opacity={0.9}
          />
        )}

        {/* Linha de texto (duas partes) */}
        <g ref={textLineRef}>
          <text
            ref={comoRef}
            x={0}
            y={0}
            fontFamily="Retropix"
            fontSize={FONT_SIZE}
            fontWeight="bold"
            fill="white"
          >
            COMO
          </text>
          <text
            x={restX}
            y={0}
            fontFamily="Retropix"
            fontSize={FONT_SIZE}
            fontWeight="500"
            fill="black"
            // Desenha o traço antes do preenchimento para engrossar só "para fora"
            style={{ paintOrder: 'stroke fill' }}
            strokeWidth={REST_STROKE_WIDTH}
          >
            <tspan stroke="black">FUNCIONA NA </tspan>
            <tspan stroke="#ff4203" fill="#ff4203">PR</tspan>
            <tspan ref={aRef} stroke="#ff4203" fill="#ff4203">A</tspan>
            <tspan stroke="#ff4203" fill="#ff4203">TICA</tspan>
          </text>
        </g>

        {/* Pseudo-acento "´" em forma de pequeno retângulo inclinado */}
        {accent && (
          <rect
            x={accent.x}
            y={accent.y}
            width={accent.width}
            height={accent.height}
            fill="#ff4203"
            shapeRendering="crispEdges"
            transform={`rotate(${accent.rotate} ${accent.cx} ${accent.cy})`}
          />
        )}

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
