import OqueEstart from "./OqueEstart";
export const Start = () => {
  return (
    <>
    <StartTierHero />
    <StartTierSec2 />
    </>
  )
}

const StartTierSec2 = () => {
    return (
        <section className="h-[90vh] flex relative px-4 pt-12">
             <img src="/quadriculado.svg" alt="Start Logo" className="absolute top-0 left-0 h-16"/>
            <div className="content mt-3">
                <OqueEstart />
            </div>
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