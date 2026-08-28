'use client'
import React, { useState, useRef, useEffect } from 'react';

// Hook personalizado para detectar hover, focus e active
const useInteractionState = () =>  {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Handlers para hover
        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        // Handlers para focus
        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);

        // Handlers para active
        const handleMouseDown = () => setIsActive(true);
        const handleMouseUp = () => setIsActive(false);

        // Adicionar event listeners
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('focus', handleFocus);
        element.addEventListener('blur', handleBlur);
        element.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        // Cleanup
        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.removeEventListener('focus', handleFocus);
            element.removeEventListener('blur', handleBlur);
            element.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // Retorna true se qualquer um dos estados estiver ativo
    const isInteracting = isHovered || isFocused || isActive;

    return [ref, isInteracting];
};

const ItemCard = ({ icon_src, icon_hover_src = icon_src, text }) => {
    const [interactionRef, isInteracting] = useInteractionState();

    // Escolhe qual ícone mostrar com base no estado de interação
    const currentIcon = isInteracting ? icon_hover_src : icon_src;

    return (
        <div
            ref={interactionRef}
            onClick={() => {}}
            tabIndex={0} // Importante para permitir focus via teclado
            className="outline-none" // Remove outline padrão, você pode estilizar seu próprio focus
        >
            <div className="clickable sombra-neon sm:h-40 h-30 aspect-square rounded-xl bg-off-white flex items-center justify-center shadow">
                <div className="w-4/5 h-4/5 bg-off-white rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                        src={currentIcon}
                        className="w-4/5 h-4/5 object-contain transition-all duration-200" // Adicionei transição suave
                        alt="Ícone"
                    />
                </div>
            </div>
            <p className="mt-4 text-center text-off-white font-laqonic sm:text-xl lg:text-2xl">{text.toUpperCase()}</p>
        </div>
    );
};

export default ItemCard;