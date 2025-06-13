//import { useState } from 'react'
import Navbar from "../assets/components/navbarSimple.jsx";
import './globals.css'
import Hero from "../assets/components/hero/Hero.jsx";
import WhoAreYouLg from "../assets/components/whoAreYouSection/whoAreYouLg.jsx";
import ProgramSectionLg from "../assets/components/programSection/programSectionLg.jsx";
import EmblaCarousel from "../assets/components/test/emblaCarrousel.jsx";
import WhoAreYou_mobile from "../assets/components/whoAreYouSection/whoAreYou_mobile.jsx";
import Competition from "../assets/components/competition/competition.jsx";
import Footer from "../assets/components/footer.jsx";
import ProdutosCurricularesSection from "../assets/components/whoAreYouSection/produtosCurricularesSection.jsx";

function Home() {
    //const [count, setCount] = useState(0)

    return (
        <main>
            <Navbar />
            <Hero  />
            <ProdutosCurricularesSection/>
            <ProgramSectionLg />
            <Competition/>
            <Footer />
        </main>
    )
}

export default Home
