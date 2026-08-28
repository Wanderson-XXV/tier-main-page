const whatsappUrl =
  "https://wa.me/5521991716690?text=Oi%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20TIER%20Competition%20e%20como%20minha%20escola%20ou%20equipe%20pode%20participar%20das%20competi%C3%A7%C3%B5es%20de%20rob%C3%B3tica%21";

function handleWhatsAppClick() {
  window.open(whatsappUrl, "_blank");
}

const Competition = () => {
    return (
        <div className={"min-h-screen px-12 py-24 md:py-10 lg:flex-row flex-col bg-off-white gap-8 w-screen flex items-center justify-center"}>
            <div className={"bg-[url('/ilustracao_competition.svg')] bg-no-repeat bg-cover bg-center lg:basis-[50%] lg:flex-shrink-0 w-full aspect-[11/16] max-h-svh rounded-lg lg:block hidden"}>
            </div>
  
            <div className={"rounded-lg lg:min-h-[57rem] lg:justify-center w-full flex flex-col items-center justify-center overflow-hidden "}>
  
                <div className={"h-20 sm:h-34 aspect-[1757/1020] bg-[url('/tier_competition_only_logo.svg')] bg-no-repeat bg-cover bg-center "}></div>
                <p className={"font-glacial text-dark-gray-text lg:px-16 lg:my-16 my-4 md:text-xl sm:text-lg text-base w-full text-leftt "}>
                    A TIER Competition é um programa da TIER
                    Education que oferece mentoria e suporte para
                    escolas e equipes que desejam participar de
                    competições de robótica. Nosso objetivo é capacitar
                    escolas e equipes, tanto iniciantes quanto
                    experientes, a alcançarem seu potencial máximo nas
                    competições, desenvolvendo habilidades essenciais e
                    promovendo a paixão pela robótica e pela tecnologia.
                </p>
                <button
                    className='bg-tier-yellow w-[60%] lg:my-0 my-8 transition-opacity hover:opacity-90 cursor-pointer text-off-white h-18  text-2xl sm:text-4xl font-bold rounded-4xl font-glacial'
                    onClick={handleWhatsAppClick} 
                >
                    SAIBA MAIS
                </button>
            </div>
  
            <div className={"bg-[url('/ilustracao_competition.svg')] bg-no-repeat bg-cover bg-center lg:basis-[50%] lg:flex-shrink-0 w-full  aspect-[16/11] max-h-svh rounded-lg block lg:hidden"}>
            </div>
  
        </div>
    
    )
}

export default Competition