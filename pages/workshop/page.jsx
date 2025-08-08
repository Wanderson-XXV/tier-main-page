import React from 'react';
import Navbar from "../../src/assets/components/navbarSimple.jsx";
import { HeroWorkshop } from '../../src/assets/components/hero/HeroWorkshop.jsx';
import Footer from '../../src/assets/components/footer.jsx';
import { Button } from '@headlessui/react';
const Workshop = () => {
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
            {/* Add content for Section2 here */}
            <h1 className='text-white text-center font-agrandir md:text-xl md:px-12'>
                O <span className='font-bold'>TIER Workshop</span> é um programa gratuito que tem como objetivo
                levar a educação tecnológica para todos os estudantes, de forma prática, acessível e envolvente.
            </h1>
            <div className={"mt-12 bg-off-white w-[90vw] md:max-w-[50vw]  aspect-video  rounded-lg"}></div>
        </div>
    );
};


const Section3 = () => {
    return (
        <div className='flex flex-col p-6 lg:px-36 font-montserrat '>
            <h1 className='text-tier-yellow text-center font-bold uppercase text-xl mb-12 md:text-2xl'>
                Como Funciona o Workshop
            </h1>
            <p className='text-lg'>
                Durante o workshop, os alunos exploram três universos diferentes: aprendem a programar em <span className="font-bold">Python</span>,
                desenvolvem projetos criativos com <span className="font-bold"> Scratch </span>
                e mergulham no fascinante mundo da <span className="font-bold">Modelagem</span> e <span className="font-bold">Impressão</span> 3D.
                < br></br>< br></br>
                O Workshop é realizado presencialmente, em parceria com escolas que desejam levar a experiência até sua unidade. 
                As atividades acontecem dentro da própria escola, com acompanhamento de professores especializados.
                 Para garantir o melhor aproveitamento das aulas práticas, cada aluno (ou a própria instituição de ensino) deve 
                 disponibilizar um computador para uso durante as atividades, permitindo que todos pratiquem e desenvolvam suas habilidades em tempo real,
                 junto ao professor.
                
            </p>
            <h1 className='text-tier-yellow text-center font-bold uppercase text-xl md:text-2xl my-12'>
                Quer Levar Essa Experiência Inovadora Para a sua escola de forma TOTALMENTE gratuita?
            </h1>
            
            <div className="flex items-center justify-center">
                <Button className={"px-12 py-5 text-white font-glacial font-bold text-2xl bg-tier-orange rounded-4xl w-fit  cursor-pointer transition-opacity hover:opacity-90"}>
                    SAIBA MAIS
                </Button>       
            </div>
        </div>
    );
};




export default Workshop;



