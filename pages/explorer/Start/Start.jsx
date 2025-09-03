import ComoFunfaPratica from "./ComoFunfaPratica";
import OqueEstart from "./OqueEstart";
export const Start = () => {
  return (
    <>
    <StartTierHero />
    <StartTierSec2 />
    <StartTierSec3 />
    <StartTierSec4 />
    </>
  )
}

const StartTierSec4 = () => {
        return (
        <section className="h-[80vh] bg-off-white font-glacial text-3xl flex flex-col items-center relative px-4 pt-12">
            <ComoFunfaPratica />
        </section>
    );

}

const StartTierSec3 = () => {
    return (
        <section className="h-[105vh] bg-tier-orange text-off-white font-glacial text-3xl flex flex-col items-center relative px-4 pt-12">
            <h1 className="text-of">PORQUE ESCOLHER O <span className="font-bold">START TIER</span> PRA SUA ESCOLA?</h1>
        </section>
    );
}

const StartTierSec2 = () => {
    return (
        <section className="h-[90vh] flex flex-col relative px-4 pt-12">
             <img src="/quadriculado.svg" alt="Start Logo" className="absolute top-0 left-0 h-16"/>
            <div className="content w-full flex text-center justify-center mt-3">
                <OqueEstart />
            </div>
            <text className=" text-2xl font-montserrat md:p-12 text-justify">
                O Start Tier é o programa da TIER Education criado
                especialmente para alunos do Ensino Fundamental I. Ele 
                desperta a curiosidade, o raciocínio lógico e o gosto por 
                aprender, conectando as crianças ao universo da tecnologia,
                robótica e cultura maker de forma divertida, prática e
                significativa.
            </text>
            
        </section>
    );
}

const StartTierHero = () => {
    return (
        <section className="h-[105vh] flex relative">
            <div className="right bg-off-white h-full w-[55vw] flex items-center justify-center">
                <div className="">
                    <img src="/Start-logo.svg" alt="" className="logo block h-auto max-w-full w-[clamp(160px,42vw,470px)]" />
                            <button
                            className='bg-tier-yellow w-[100%] lg:my-0 my-8 transition-opacity hover:opacity-90 cursor-pointer text-off-white h-18  text-2xl sm:text-4xl font-bold rounded-4xl font-glacial'
                            
                        >
                            CONTATE AGORA
                        </button>
                </div>
                
            </div>
            <div
                className="left h-full w-[45vw] bg-no-repeat bg-center bg-cover bg-[url('/Start-boy.webp')]">
            </div>
        
        </section>
    );
}

export default Start;