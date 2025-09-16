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
  );
};

const StartTierSec4 = () => {
  return (
    <section className="h-full bg-off-white font-glacial text-3xl flex flex-col items-center relative px-4 pt-12">
      <ComoFunfaPratica />
      <p className=" text-3xl font-montserrat md:p-16 text-justify">
        O <span className="font-bold" style={{ color: "#ff4203" }}>Start Tier</span> é dividido em módulos <span className="font-bold" style={{ color: "#ff4203" }}>temáticos</span>, cada um com uma narrativa que inspira as atividades práticas. Os alunos montam <span className="font-bold" style={{ color: "#ff4203" }}>protótipos</span>, participam de <span className="font-bold" style={{ color: "#ff4203" }}>desafios em grupo</span> e desenvolvem <span className="font-bold" style={{ color: "#ff4203" }}>projetos</span> que fazem sentido para o seu dia a dia.
      </p>
    </section>
  );
};

const StartTierSec3 = () => {
  return (
    <section className="h-[105vh] bg-tier-orange text-off-white font-glacial text-center text-4xl lg:text-5xl flex flex-col items-center relative px-4 pt-12">
      <h1 className="text-of">PORQUE ESCOLHER O <span className="font-bold">START TIER</span> PRA SUA ESCOLA?</h1>
    </section>
  );
};

const StartTierSec2 = () => {
  return (
    <section className="h-[90vh] flex flex-col relative px-4 pt-12">
      <img src="/quadriculado.svg" alt="Start Logo" className="absolute top-0 left-0 h-16" />
      <div className="content w-full flex text-center justify-center mt-3">
        <OqueEstart />
      </div>
      <p className=" text-2xl font-montserrat md:p-12 text-justify">
        O <span className="font-bold" style={{ color: "#ff4203" }}>Start Tier</span> é dividido em módulos <span className="font-bold" style={{ color: "#ff4203" }}>temáticos</span>, cada um com uma narrativa que inspira as atividades práticas. Os alunos montam <span className="font-bold" style={{ color: "#ff4203" }}>protótipos</span>, participam de <span className="font-bold" style={{ color: "#ff4203" }}>desafios em grupo</span> e desenvolvem <span className="font-bold" style={{ color: "#ff4203" }}>projetos</span> que fazem sentido para o seu dia a dia.
      </p>
    </section>
  );
};

const StartTierHero = () => {
  return (
    <>
      <section className=" hidden h-[105vh] md:flex relative">
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
      <section className=" flex h-[105vh] md:hidden bg-center bg-cover relative bg-[url('/Start-boy.webp')]">
        <div className="right h-full w-[100vw] flex items-center justify-center bg-black/50">
          <div className="flex items-center justify-center flex-col">
            <img src="/Start-logo.svg" alt="" className="logo block h-auto max-w-full w-[clamp(160px,42vw,470px)]" />
            <button
              className='bg-tier-yellow w-[110%] lg:my-0 my-8 transition-opacity hover:opacity-90 cursor-pointer text-off-white h-18  text-2xl sm:text-4xl font-bold rounded-4xl font-glacial'
            >
              CONTATE AGORA
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Start;
