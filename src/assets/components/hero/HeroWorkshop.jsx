import React from 'react'

export const HeroWorkshop = () => {
  return (
    <>
    <WorkshopSlide />
    </>
  )
}




const WorkshopSlide = () => {


  return (
    <div>
        {/*Mobile*/}
        <img 
            src="/bg_workshop_mobile.png" 
            alt="Workshop Background Mobile" 
            className="w-full h-auto object-contain hover:opacity-90 transition-opacity sm:hidden"
        />
        {/*Desktop*/}
        <img 
            src="/workshopbg1.png" 
            alt="Workshop Background Desktop" 
            className="w-full h-auto object-contain hover:opacity-90 transition-opacity hidden sm:block"
        />
    </div>
    );
};