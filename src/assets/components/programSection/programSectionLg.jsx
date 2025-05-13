import React from 'react'
import ItemCard from "./item-card.jsx";

const ProgramSectionLg = () => {
    return (
        <div className={"h-[80vh] p-1 pt-4 w-screen bg-tier-orange flex flex-col items-center justify-center"}>
            <h2
                className={"pt-4 text-off-white"}
            >BENEFÍCIOS DE APRENDER PROGRAMAÇÃO NA INFÂNCIA</h2>
            <div
                className={"h-full p-5 w-screen flex-wrap flex items-center justify-evenly"}
            >
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
            </div>

        </div>
    )
}
export default ProgramSectionLg
