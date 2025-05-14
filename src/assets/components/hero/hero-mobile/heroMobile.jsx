import React from 'react'

const HeroMobile = () => {
    return (
        <div
            className="flex lg:hidden items-center flex-col  w-full
             h-screen bg-[#f9a51b]"
        >
            {/* Imagem */}
            <div className="w-full flex justify-center relative">
                <img
                    src="./hero_mobile_image.png"
                    alt="Hero"
                    className="w-full"
                />
            </div>
            {/* Faixa branca */}
            <div className="w-full sombra-faixa bg-white shadow-lg -mt-8 z-10 flex flex-col items-center py-4 px-2">
                {/* Você pode colocar um logo, um título, ou só deixar como faixa decorativa */}
                <span className="font-glacial text-2xl text-center text-[#f9a51b] font-bold">A TIER NASCEU PARA TRANSFORMAR A EDUCAÇÃO ATRAVÉS DA TECNOLOGIA</span>
            </div>

            {/* Texto/chamada */}
            <div className="w-full mt-6 px-3 pt-5">
                <p className="text-center text-off-white font-agrandir font-bold text-xl md:text-2xl">
                    Conectamos alunos, professores e escolas a um novo jeito de aprender:
                    com mão na massa, criatividade e projetos reais. Acreditamos
                    que todo estudante pode ser protagonista no mundo da inovação,
                    e estamos aqui para mostrar o caminho.
                </p>
            </div>
        </div>
    )
}
export default HeroMobile
