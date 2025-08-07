import React from 'react';
import Navbar from "../../src/assets/components/navbarSimple.jsx";
import { HeroWorkshop } from '../../src/assets/components/hero/HeroWorkshop.jsx';
const Workshop = () => {
    return (
        <div>
           <Navbar />
           <HeroWorkshop />
           <Section2 />
        </div>
    );
};

const Section2 = () => {
    return (
        <div className='h-[80vh]  md:aspect-[16/9] w-screen p-4 bg-tier-yellow my-25 section-shadow'>
            {/* Add content for Section2 here */}
            <h1 className='text-white text-center font-agrandir md:text-3xl pt-12'>
                O <span className='font-bold'>TIER Workshop</span> é um programa gratuito que tem como objetivo
                levar a educação tecnológica para todos os estudantes, de forma prática, acessível e envolvente.
            </h1>
            <div className={"mt-12 bg-off-white lg:basis-[60%] lg:flex-shrink-0 w-full  aspect-video rounded-lg"}></div>
        </div>
    );
};



export default Workshop;



