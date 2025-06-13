'use client'
import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Card from "./card.jsx";

const WhoAreYouMobile = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'center',
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
        dragFree: false
    })
    const [selectedIndex, setSelectedIndex] = useState(0)
    useEffect(() => {
        if (!emblaApi) return;
        
        try {
            const nodes = emblaApi.slideNodes();
            if (nodes) {
                console.log(nodes);
            }
        } catch (error) {
            console.error('Error accessing slide nodes:', error);
        }
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return;
        
        const onSelect = () => {
            try {
                setSelectedIndex(emblaApi.selectedScrollSnap());
            } catch (error) {
                console.error('Error updating selected index:', error);
            }
        };

        emblaApi.on('select', onSelect);
        
        // Cleanup function to remove the event listener
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi])

    
    return (
        <div className={""}>
            <div className="lg:hidden block embla" ref={emblaRef}>

                    <div className="embla__container h-[80vh] md:h-screen py-8" style={{display: 'flex', paddingLeft: '1rem', gap: '1rem'}}>
                            <Card
                                selected={ selectedIndex === 0}
                                activeColor="blue"
                                bgColor="bg-off-white"
                                bgHover={"hover:bg-tier-blue"}
                                title="Sou aluno"
                                text="Quero explorar tecnologia, criar projetos incríveis e transformar ideias em realidade!"
                                img="/aluno.png"
                                textColor="text-tier-blue"
                                border="border-r-[8px] border-tier-blue"
                            />
                            <Card
                                selected={ selectedIndex === 1}
                                activeColor="yellow"
                                bgColor="bg-off-white"
                                bgHover={"hover:bg-tier-yellow"}
                                title="Sou professor"
                                text="Quero levar inovação para minha sala de aula e engajar meus alunos com projetos práticos!"
                                img="/professor.png"
                                textColor="text-tier-yellow"
                                border="border-r-[8px] border-tier-yellow"
                            />
                            <Card
                                selected={ selectedIndex === 2}
                                activeColor="orange"
                                bgColor="bg-off-white"
                                bgHover={"hover:bg-tier-orange"}
                                title="Sou diretor"
                                text="Quero trazer um programa educacional de ponta para minha escola e destacar minha instituição!"
                                img="/diretor.png"
                                textColor="text-tier-orange"
                                border="border-r-[8px] border-tier-orange"
                                slide = "slide2"
                            />
                    </div>
            </div>
        </div>
    )
}
export default WhoAreYouMobile
