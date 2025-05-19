import React from 'react'

const Competition = () => {
  return (
    <>

    {/*  DESKTOP */}
      <div 
        className="hidden md:flex w-full h-screen justify-center items-center bg-off-white p-4"
      > 
        <img
            src="./tier-competition-section.png" alt="Competition Image" className="object-contain rounded-2xl h-[95%]"
        />
      </div>
    {/*  MOBILE */}
      <div 
        className="md:hidden w-full h-screen flex justify-center items-center bg-off-white p-4"
      > 
        <img
            src="./tier-competition-section-mobile.png" alt="Competition Image" className="object-contain h-[95%] rounded-2xl"
        />
      </div>
    </>
   
  
  )
}

export default Competition