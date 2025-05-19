import React from 'react'

const ItemCard = ({ icon_src, text = "EXEMPLO2WE" }) => {
    return (
        <div onClick={() => {}} >
            <div  className="clickable sombra-neon sm:h-40 h-30 aspect-square rounded-xl bg-off-white flex items-center justify-center shadow">
                {/* Container da imagem, com fundo e espaçamento */}
                <div className="w-4/5 h-4/5 bg-off-white rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                        src={icon_src}
                        className="w-4/5 h-4/5 object-contain"
                        alt="Ícone"
                    />
                </div>
            </div>
            <p className="mt-4 text-center text-off-white font-laqonic sm:text-xl lg:text-2xl">{text.toUpperCase()}</p>
        </div>

    );
};
export default ItemCard;
