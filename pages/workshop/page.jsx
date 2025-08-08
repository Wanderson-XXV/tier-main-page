import React from 'react';
import Navbar from "../../src/assets/components/navbarSimple.jsx";
import { HeroWorkshop } from '../../src/assets/components/hero/HeroWorkshop.jsx';
const Workshop = () => {
    return (
        <div>
           <Navbar />
           <HeroWorkshop />
           <Section2 />
           <Section3 />  
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
        <div className='flex flex-col p-6  '>
            <h1 className='text-tier-yellow text-center uppercase font-agrandir text-2xl md:text-4xl'>
                Como Funciona o Workshop
            </h1>
        </div>
    );
};




export default Workshop;



