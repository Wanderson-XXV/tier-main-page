import React from 'react'

const ProdutosCurricularesCard = ({title, description, linkText, linkHref,  slide = "slide", img, color}) => {
    const getColorClassName = (color) => {
        if (color === 'tier-blue') return 'tier-blue-bg-hover';
        if (color === 'tier-orange') return 'tier-orange-bg-hover';
        if (color === 'tier-yellow') return 'tier-yellow-bg-hover';
    };
    return (
        <div className= {` relative h-[60vh] md:h-[95vh] px-2 flex-1 flex flex-col items-center justify-center ${slide}`}>

            <div
                style={{ backgroundImage: `url(${img})`,  backgroundSize: 'cover', backgroundPosition: 'top', backgroundRepeat: 'no-repeat' }}
                className={`group overflow-hidden relative rounded-3xl flex flex-col justify-start items-center shadow-lg transition-all duration-300 transform hover:scale-105 aspect-[9/12] h-[90%]  md:aspect-[9/15] md:h-[80%]`}
            >
                <div className={`absolute h-[40%] bottom-0  w-full transition-all duration-300} opacity-65 z-2 group-hover:backdrop-blur-xs  `}>
                </div>

                <div className={`absolute h-full w-full transition-all duration-300} z-10   `}>

                    <div className={`absolute px-14 h-[59%] bottom-0 w-full transition-all duration-500 flex items-center justify-center text-left ${getColorClassName(color)} z-10`} >
                        <div>
                            <p className={`  transition-all duration-500 group-hover:inline hidden  text-white text-base md:text-2xl py-0 mb-0 md:mb-4 opacity-100`}>
                                <span className="font-bold">{title}</span>
                                {description && `: ${description}`}
                                {linkText && linkHref && (
                                    <>
                                        {""}
                                        <br />
                                        <br />
                                        <a
                                            href={linkHref}
                                            className="font-bold underline hover:text-blue-300 transition-colors"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {linkText}
                                        </a>
                                    </>
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
