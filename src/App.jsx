//import { useState } from 'react'
import Navbar from "./assets/components/navbarSimple.jsx";
import './index.css'
import Hero from "./assets/components/hero.jsx";
import WhoAreYouLg from "./assets/components/whoAreYouSection/whoAreYouLg.jsx";
import ProgramSectionLg from "./assets/components/programSection/programSectionLg.jsx";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <main>
        <Navbar />
        <Hero   />
        <WhoAreYouLg />
        <ProgramSectionLg />
    </main>
  )
}

export default App
