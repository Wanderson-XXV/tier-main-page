import React from 'react'
import ItemCard from "./item-card.jsx";

const ProgramSectionLg = () => {
    return (
        <div className={"p-1 pt-8 w-screen bg-tier-orange flex flex-col items-center justify-center"}>
            <h2
                className={"pt-8 text-off-white font-roboto text-center text-xl sm:text-2xl lg:text-3xl"}
            >BENEFÍCIOS DE APRENDER PROGRAMAÇÃO NA INFÂNCIA</h2>
            <div
                className={"h-full p-5 gap-4 w-screen flex-wrap flex items-center justify-evenly"}
            >
                <ItemCard icon_hover_src={"./program/p-1.svg"} icon_src={"./program/icon_1.svg"} text={"raciocínio logico"}/>
                <ItemCard icon_hover_src={"./program/p-2.svg"} icon_src={"./program/icon_2.svg"} text={"pensamento crítico"}/>
                <ItemCard icon_hover_src={"./program/p-3.svg"} icon_src={"./program/icon_3.svg"} text={"criatividade"}/>
                <ItemCard icon_hover_src={"./program/p-4.svg"} icon_src={"./program/icon_4.svg"} text={"comunicação"}/>
                <ItemCard icon_hover_src={"./program/p-5.svg"} icon_src={"./program/icon_6.svg"} text={"inglês técnico"}/>
            </div>

        </div>
    )
}
export default ProgramSectionLg
