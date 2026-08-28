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

    // Dados dos produtos curriculares
    const produtosCurriculares = [
        {
            id: 1,
            img: "/card_explorer_start.svg",
            imgMobile: "/card_explorer_start.svg",
            color: "tier-orange",
            title: "Imagine aprender brincando!",
            description: "Com o Start Tier, crianças do Fundamental 1 exploram robótica, criatividade e resolução de problemas de forma divertida e prática. Desperte o interesse pelo futuro desde cedo.",
            linkText: " Clique e saiba como!",
            linkHref: "./explorer"
        },
        {
            id: 2,
            img: "/card_explorer_next.svg",
            imgMobile: "/card_explorer_next.svg",
            color: "tier-yellow",
            title: "Desperte a criatividade no Fundamental 2!",
            description: "Com o Next Tier, seus alunos aprendem programação, robótica e resolvem desafios reais de forma divertida e prática. Prepare a nova geração de inovadores.",
            linkText: " Clique e saiba como!",
            linkHref: "./explorer"
        },
        {
            id: 3,
            img: "/card_explorer_high.svg",
            imgMobile: "/card_explorer_high.svg",
            color: "tier-blue",
            title: "Descubra o High Tier",
            description: "o programa que transforma o Ensino Médio com robótica, tecnologia e projetos práticos alinhados ao ENEM. Prepare seus alunos para o futuro de forma inovadora e envolvente.",
            linkText: " Clique e saiba como!",
            linkHref: "./explorer"
        }
    ];

    return (
        <>
            <div className={"bg-off-white flex flex-col gap-7 justify-center mt-18 py-6 items-center text-center px-4"}>

                <h1 className={"uppercase text-4xl  font-glacial text-tier-yellow font-bold"}>Ensino Tecnológico Curricular</h1>
                <div className={"py-6 lg:text-2xl/9  lg:max-w-[80vw]"}>
                    <p className={"font-montserrat  text-dark-gray-text  text-xl/8"}>Com o objetivo de preparar os alunos para o futuro e capacitá-los a criar soluções para desafios reais, a TIER Education oferece programas abrangentes para integrar aulas de robótica ao currículo escolar. Nossos programas estão alinhados com as diretrizes da BNCC e visam estimular o desenvolvimento de competências e habilidades essenciais nos alunos.</p>
                </div>
            </div>
            
            {/* Layout para Desktop */}
            <div className={" hidden lg:flex h-screen w-screen bg-off-white flex-col justify-center md:flex-row gap-6 max-h-[100vh] py-4 px-10"}>
                {produtosCurriculares.map((produto) => (
                    <ProdutosCurricularesCard
                        key={produto.id}
                        img={produto.img}
                        color={produto.color}
                        title={produto.title}
                        description={produto.description}
                        linkText={produto.linkText}
                        linkHref={produto.linkHref}
                    />
                ))}
            </div>
            
            {/* Layout para Mobile (Carousel) */}
            <div className={""}>
                <div className="lg:hidden block embla" ref={emblaRef}>
                    <div className="embla__container h-[80vh] md:h-screen py-8" style={{display: 'flex', paddingLeft: '1rem', gap: '1rem'}}>
                        {produtosCurriculares.map((produto) => (
                            <ProdutosCurricularesCard
                                key={`mobile-${produto.id}`}
                                img={produto.imgMobile}
                                color={produto.color}
                                title={produto.title}
                                description={produto.description}
                                linkText={produto.linkText}
                                linkHref={produto.linkHref}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProdutosCurricularesSection