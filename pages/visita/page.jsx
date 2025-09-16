import React from 'react';
import Navbar from "../../src/assets/components/navbarSimple.jsx";
import { HeroWorkshop } from '../../src/assets/components/hero/HeroWorkshop.jsx';
import Footer from '../../src/assets/components/footer.jsx';
import { Button } from '@headlessui/react';

// Página de Visita - cópia baseada na Workshop
const Visita = () => {
    return (
        <div>
           <Navbar />
           <HeroWorkshop />
           <Section2 />
           <Section3 />  
           <Footer />
        </div>
    );
};

const Section2 = () => {
    return (
        <div className=' flex flex-col items-center justify-center h-[95vh] px-12 py-24 w-screen bg-tier-yellow my-25 section-shadow'>
            {/* Conteúdo adaptável para a página Visita */}
            <h1 className='text-white text-center font-agrandir md:text-xl md:px-12'>
                O programa de <span className='font-bold'>Visita</span> leva tecnologia e inovação para sua escola com
                experiências práticas, acessíveis e envolventes.
            </h1>
            <div className={"mt-12 bg-off-white w-[90vw] md:max-w-[50vw]  aspect-video  rounded-lg"}></div>
        </div>
    );
};

const Section3 = () => {
    return (
        <div className='flex flex-col p-6 lg:px-36 font-montserrat '>
            <h1 className='text-tier-yellow text-center font-bold uppercase text-xl mb-12 md:text-2xl'>
                Como Funciona a Visita
            </h1>
            <p className='text-lg'>
                Durante a visita, os alunos têm contato com programação em <span className="font-bold">Python</span>,
                projetos criativos com <span className="font-bold">Scratch</span>,
                além de uma introdução à <span className="font-bold">Modelagem</span> e <span className="font-bold">Impressão</span> 3D.
                <br /><br />
                A visita é realizada presencialmente na sua unidade de ensino, com acompanhamento de professores especializados da TIER.
                É recomendado que cada aluno (ou a própria instituição) tenha acesso a um computador durante as atividades para maximizar
                o aprendizado prático.
            </p>
            <h1 className='text-tier-yellow text-center font-bold uppercase text-xl md:text-2xl my-12'>
                Quer agendar uma visita na sua escola?
            </h1>

            <div className="flex items-center justify-center">
                <Button className={"px-12 py-5 text-white font-glacial font-bold text-2xl bg-tier-orange rounded-4xl w-fit  cursor-pointer transition-opacity hover:opacity-90"}>
                   ENTRE EM CONTATO
                </Button>
            </div>
        </div>
        </div>
    );
};

export default Visita;
