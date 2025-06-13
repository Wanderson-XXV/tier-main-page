'use client'
import React from 'react'

const Card = ({ slide = "slide" , bgColor, activeColor, selected = false, title, text, img, textColor = "text-black", border = "", bgHover }) => {
   
    const getActiveClass = () => {

        const isDesktop = window.matchMedia('(min-width: 600px)').matches;
        //const hasTouch = window.matchMedia('(hover: none)').matches;

        // Se for desktop, não aplica a classe active
        if (isDesktop) return "";

        if (!selected) return "";
        switch (activeColor) {
            case "blue":
                return "slide-active-blue";
            case "yellow":
                return "slide-active-yellow";
            case "orange":
                return "slide-active-orange";
            default:
                return "nada";
        }
    };

    const getTextColor = () => {
        const isDesktop = window.matchMedia('(min-width: 600px)').matches;
        //const hasTouch = window.matchMedia('(hover: none)').matches;

        // Se for desktop, não aplica a classe active
        if (isDesktop) return "text-dark-100";

        if (!selected) return "text-dark-100";
        
        return "text-white";
        
    };
   
    return (
        <div className= {`h-[60vh] md:h-[95vh] px-2 flex-1 flex flex-col items-center justify-center ${slide}`}>
            <div
                className={`group overflow-hidden relative rounded-3xl p-6 pb-0 flex flex-col justify-start hover:text-white items-center shadow-lg transition-all duration-300 transform hover:scale-105 ${bgColor} ${bgHover} ${border} ${textColor}  ${getActiveClass()} aspect-[9/12] h-[90%]  md:aspect-[9/15] md:h-[80%]`}
            >
                <div className="text-center font-bold text-xl mb-4 ">{title}</div>
                <p className={` ${getTextColor()} transition-all duration-300 group-hover:text-white text-center text-sm mb-4  `}>{text}</p>
                <img src={img} alt={title} className="w-full object-contain mt-auto" />
            </div>
        </div>
    );
};
export default Card
