import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Card from "./card.jsx";

const WhoAreYouMobile = () => {
    const [emblaRef] = useEmblaCarousel()

    return (
        <div className={""}>
            <div className="lg:hidden block embla" ref={emblaRef}>
                <div className="embla__container h-[60vh] md:h-screen py-8  ">
                        <Card
                            bgColor="bg-off-white"
                            bgHover={"hover:bg-tier-blue"}
                            title="Sou aluno"
                            text="Quero explorar tecnologia, criar projetos incríveis e transformar ideias em realidade!"
                            img="/aluno.png"
                            textColor="text-tier-blue"
                            border="border-r-[8px] border-tier-blue"
                        />
                        <Card
                            bgColor="bg-off-white"
                            bgHover={"hover:bg-tier-yellow"}
                            title="Sou professor"
                            text="Quero levar inovação para minha sala de aula e engajar meus alunos com projetos práticos!"
                            img="/professor.png"
                            textColor="text-tier-yellow"
                            border="border-r-[8px] border-tier-yellow"
                        />
                        <Card
                            bgColor="bg-off-white"
                            bgHover={"hover:bg-tier-orange"}
                            title="Sou diretor"
                            text="Quero trazer um programa educacional de ponta para minha escola e destacar minha instituição!"
                            img="/diretor.png"
                            textColor="text-tier-orange"
                            border="border-r-[8px] border-tier-orange"
                        />
                </div>
            </div>
        </div>
    )
}
export default WhoAreYouMobile
