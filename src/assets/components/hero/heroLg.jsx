"use client"
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
// bg-[linear-gradient(to_bottom,var(--color-off-white)_32%,var(--color-tier-yellow)_32%)]
const HeroLg = () => {

 const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
        dragFree: false
    }, [
        Autoplay({ 
            delay: 4000, // 4 segundos entre cada slide
            stopOnInteraction: false, // Continue passando mesmo após interação do usuário
            stopOnMouseEnter: false, // Para quando o mouse estiver sobre o carousel
            playOnInit: true // Inicia automaticamente
        })
    ])

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
                    <WorkshopSlide />
                </div>

            </div>

    );
};

const WorkshopSlide = () => {
    const navigate = useNavigate();
    
    const goToWorkshop = () => {
       
        navigate('/workshop');
    };

    return (
        <div
            className="lg:flex embla__slide hidden items-center justify-center w-full
            h-screen bg-[url('/workshopbg1.png')] bg-no-repeat bg-cover bg-center relative cursor-pointer hover:opacity-90 transition-opacity"
            style={{
                height: 'calc(100svh - 88px)',
            }}
            onClick={goToWorkshop}
        >
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