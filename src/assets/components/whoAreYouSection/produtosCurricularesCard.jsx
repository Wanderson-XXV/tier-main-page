import React from 'react'

const ProdutosCurricularesCard = ({title, description, linkText, linkHref, slide = "slide", img, color}) => {
    const getColorClassName = (color) => {
        if (color === 'tier-blue') return 'tier-blue-bg-hover';
        if (color === 'tier-orange') return 'tier-orange-bg-hover';
        if (color === 'tier-yellow') return 'tier-yellow-bg-hover';
    };

    const getScreenType = () => {
        if (typeof window !== 'undefined') {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Mobile
            if (width < 768) return 'mobile';
            // Notebook
            if (width >= 768 && height <= 800) return 'notebook';
            // Desktop
            return 'desktop';
        }
        return 'desktop';
    };

    const getTextContainerStyles = () => {
        const screenType = getScreenType();
        switch(screenType) {
            case 'mobile':
                return {
                    position: 'top-[25%]',
                    height: 'h-[75%]',
                    padding: 'px-4'
                }
            case 'notebook':
                return {
                    position: 'top-[23%]',
                    height: 'h-[80%]',
                    padding: 'px-4'
                };
            case 'desktop':
                default: // desktop
                    return {
                        position: 'top-[20%]',
                        height: 'h-[80%]',
                        padding: 'px-8 md:px-14'
                    };
        }
    };

    const getTextSize = () => {
        const screenType = getScreenType();
        switch(screenType) {
            case 'mobile':
                return 'text-sm';
            case 'notebook':
                return 'text-lg';
            default: // desktop
                return 'text-base md:text-2xl';
        }
    };

        // Função para determinar as classes de visibilidade do texto
    const getTextVisibilityClasses = () => {
        const screenType = getScreenType();
        
        if (screenType === 'mobile') {
            // No mobile, mostra o texto sempre no hover/touch
            return 'group-hover:block group-active:block hidden';
        } else {
            // No desktop/notebook, usa inline como antes
            return 'group-hover:inline hidden';
        }
    };


    const textStyles = getTextContainerStyles();
    return (
        <div className={`relative h-[60vh] md:h-[95vh] px-2 flex-1 flex flex-col items-center justify-center ${slide}`}>
            
            <div
                style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat'
                }}
                className={`group overflow-hidden relative rounded-3xl flex flex-col justify-start items-center shadow-lg transition-all duration-300 transform hover:scale-105 aspect-[9/12] h-[90%] md:aspect-[9/15] md:h-[80%] min-h-[400px]`}
            >
                {/* Overlay de fundo - começa agora de acordo com o tipo de tela */}
                <div className={`absolute ${textStyles.position} ${textStyles.height} w-full transition-all duration-300 z-10`}>
                    {/* Overlay do texto - começa agora de acordo com o tipo de tela */}
                    <div className={`absolute ${textStyles.padding} ${textStyles.position} ${textStyles.height} w-full transition-all duration-500 flex items-center justify-center text-left ${getColorClassName(color)} z-10`}>
                        <div className="max-h-full overflow-hidden">
                            <p className={`transition-all duration-500 group-hover:inline hidden text-white ${getTextSize()} py-0 mb-0 md:mb-4 opacity-100 leading-tight`}>
                                <span className="font-bold">{title}</span>
                                {description && (
                                    <>
                                        <span className="block mt-1 font-normal line-clamp-3">
                                            {description}
                                        </span>
                                    </>
                                )}
                                {linkText && linkHref && (
                                    <span className="block mt-2">
                                        <a
                                            href={linkHref}
                                            className="font-bold underline hover:text-blue-300 transition-colors text-sm md:text-base"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {linkText}
                                        </a>
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProdutosCurricularesCard