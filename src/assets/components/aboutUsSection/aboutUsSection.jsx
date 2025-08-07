import React from 'react';

const AboutUsSection = () => {
    return (
 <div className={"px-12 py-24 lg:flex-row flex-col bg-tier-blue gap-8 w-screen flex items-center justify-center"}>
            <div className={"rounded-lg lg:min-h-[34rem] lg:justify-start w-full md:flex md:flex-col items-center justify-center overflow-hidden "}>
                <h1 className={"uppercase font-glacial mb-6 lg:mb-14 lg:text-7xl text-white font-bold text-4xl w-full text-center"}>SOBRE nós</h1>
                <p className={"font-glacial text-white lg:px-8  md:text-xl sm:text-lg text-base w-full text-left"}>
                    A TIER Education capacita escolas a implementarem
                    aulas de robótica de forma eficaz e alinhada com a
                    Base Nacional Comum Curricular (BNCC). Nossos
                    programas abrangentes visam desenvolver em crianças as habilidades e competências
                    essenciais para o futuro, incentivando-as a se tornarem
                    criadoras de soluções inovadoras para os desafios do
                    mundo real. Buscamos tornar a educação
                    tecnológica acessível a todos, acreditando que a
                    robótica é uma ferramenta poderosa para estimular o
                    pensamento crítico, a criatividade e a colaboração,
                    preparando os alunos para um futuro cada vez mais
                    tecnológico.
                </p>
            </div>
            <div className={"bg-off-white lg:basis-[60%] lg:flex-shrink-0 w-full  aspect-video rounded-lg"}></div>
        </div>
    );
};

export default AboutUsSection;