"use client"
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react'
// bg-[linear-gradient(to_bottom,var(--color-off-white)_32%,var(--color-tier-yellow)_32%)]
const HeroLg = () => {

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
        dragFree: false
    })

    return (
            <div className=" lg:flex hidden embla" ref={emblaRef} >
                <div className={"embla__container"}>
                    <div
                        className=" embla__slide flex items-center justify-end w-full
             h-screen bg-[url('/full-md-hero.png')] bg-no-repeat bg-cover bg-center relative"
                        style={{
                            height: 'calc(100svh - 88px)',
                        }}
                    >
                        <div className="w-[clamp(600px,60%,1000px)] p-0 pt-4 z-10">
                            <HeroText />
                        </div>
                    </div>
                    <div
                        className="lg:flex embla__slide hidden items-center justify-end w-full
             h-screen bg-[url('/tierWorkshopHero.svg')] bg-no-repeat bg-cover bg-center relative bg-size-[110%] "
                        style={{
                            height: 'calc(100svh - 88px)',
                        }}
                    >

                    </div>
                </div>

            </div>

    );
};

const HeroText = () => {
    return (
        <div className=" p-6 md:p-12 text-white">
            <img
                src="./title.svg"
                alt="img TIER"
                className="block h-44 w-auto"
            />
            <p className="text-sm md:text-xl leading-relaxed pl-3">
                Conectamos alunos, professores e escolas a um novo jeito de aprender: com mão na massa,
                criatividade e projetos reais. Acreditamos que todo estudante pode ser protagonista
                no mundo da inovação, e estamos aqui para mostrar o caminho.
            </p>
        </div>
    )
}
export default HeroLg;