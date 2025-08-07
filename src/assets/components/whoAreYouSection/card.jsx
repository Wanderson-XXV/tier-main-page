'use client'
import React from 'react'

const Card = ({ slide = "slide" , bgColor, activeColor, selected = false, title, text, img, textColor = "text-black", border = "", bgHover }) => {
   
    const getActiveClass = () => {
        // Considera tanto largura quanto altura para detectar dispositivos móveis
        const isDesktop = window.matchMedia('(min-width: 600px) and (min-height: 500px)').matches;
        
        // Se for desktop (largura E altura suficientes), não aplica a classe active
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
        // Mesma lógica para cor do texto
        const isDesktop = window.matchMedia('(min-width: 600px) and (min-height: 500px)').matches;
        
        if (isDesktop) return "text-dark-100";
        if (!selected) return "text-dark-100";
        
        return "text-white";
    };
   
    return (
        <div className={`h-[60vh] md:h-[95vh] px-2 flex-1 flex flex-col items-center justify-center ${slide}`}>
            <div
                className={`group overflow-hidden relative rounded-3xl p-6 pb-0 flex flex-col justify-start hover:text-white items-center shadow-lg transition-all duration-300 transform hover:scale-105 ${bgColor} ${bgHover} ${border} ${textColor} ${getActiveClass()} aspect-[9/12] h-[90%] md:aspect-[9/15] md:h-[80%] min-h-[400px]`}
            >
                {/* Título com altura fixa */}
                <div className="text-center font-bold text-xl mb-4 h-8 flex items-center">
                    {title}
                </div>
                
                {/* Container do texto com altura limitada */}
                <div className="flex-1 max-h-[35%] overflow-hidden mb-4">
                    <p className={`${getTextColor()} transition-all duration-300 group-hover:text-white text-center text-sm leading-relaxed line-clamp-4 md:line-clamp-6`}>
                        {text}
                    </p>
                </div>
                
                {/* Container da imagem que ocupa o espaço restante */}
                <div className="flex-1 w-full flex items-end min-h-[50%]">
                    <img src={img} alt={title} className="w-full object-contain" />
                </div>
            </div>
        </div>
    );
};

export default Card