'use client'
import React, {useEffect, useState} from 'react'
import Card from "./card.jsx";
import ProdutosCurricularesCard from "./produtosCurricularesCard.jsx";
import useEmblaCarousel from 'embla-carousel-react'

const ProdutosCurricularesSection = () => {

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
        <>
            <div className={" hidden lg:flex  h-screen w-screen bg-off-white flex-col justify-center md:flex-row gap-6 max-h-[100vh] py-4 px-10"}>
                {/* Card 1 */}
                <ProdutosCurricularesCard
                    img={"/card_explorer_start.svg"}
                    color={"tier-orange"}
                    title={"Imagine aprender brincando!"}
                    description={"Com o Start Tier, crianças do Fundamental 1 exploram robótica, criatividade e resolução de problemas de forma divertida e prática. Desperte o interesse pelo futuro desde cedo."}
                    linkText={" Clique e saiba como!"}
                    linkHref={"./explorer"}
                />

                {/* Card 2 */}
                <ProdutosCurricularesCard
                    img={"/card_explorer_next.svg"}
                    color={"tier-yellow"}
                    title={"Desperte a criatividade no Fundamental 2!"}
                    description={"Com o Next Tier, seus alunos aprendem programação, robótica e resolvem desafios reais de forma divertida e prática. Prepare a nova geração de inovadores. "}
                    linkText={" Clique e saiba como!"}
                    linkHref={"./explorer"}
                />

                {/* Card 3 */}
                <ProdutosCurricularesCard
                    img={"/card_explorer_high.svg"}
                    color={"tier-blue"}
                    title={"Descubra o High Tier"}
                    description={"o programa que transforma o Ensino Médio com robótica, tecnologia e projetos práticos alinhados ao ENEM. Prepare seus alunos para o futuro de forma inovadora e envolvente."}
                    linkText={" Clique e saiba como!"}
                    linkHref={"./explorer"}
                />

            </div>
            <div className={""}>
                <div className="lg:hidden block embla" ref={emblaRef}>

                    <div className="embla__container h-[80vh] md:h-screen py-8" style={{display: 'flex', paddingLeft: '1rem', gap: '1rem'}}>
                        {/* Card 1 */}
                        <ProdutosCurricularesCard
                            img={"/card_explorer_start.svg"}
                        />

                        {/* Card 2 */}
                        <ProdutosCurricularesCard
                            img={"/card_explorer_next.svg"}
                        />

                        {/* Card 3 */}
                        <ProdutosCurricularesCard
                            img={"/card_explorer_high.svg"}
                        />
                    </div>
                </div>
            </div>
        </>



    )
}
export default ProdutosCurricularesSection
