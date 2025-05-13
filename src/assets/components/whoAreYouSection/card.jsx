import React from 'react'

const Card = ({ bgColor, title, text, img, textColor = "text-black", border = "", bgHover }) => {
    return (
        <div className=" px-2 flex-1  flex flex-col items-center justify-center ">
            <div
                className={`group relative rounded-3xl p-6 pb-0 flex flex-col justify-start hover:text-white items-center shadow-lg transition-all duration-300 transform hover:scale-105 ${bgColor} ${bgHover} ${border} ${textColor} aspect-[9/15] h-[80%]`}
            >
                <div className="text-center font-bold text-xl mb-4 ">{title}</div>
                <p className="group-hover:text-white text-center text-sm mb-4 text-dark-100 ">{text}</p>
                <img src={img} alt={title} className="w-full object-contain mt-auto" />
            </div>
        </div>
    );
};
export default Card
