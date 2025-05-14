import React from 'react'

const Competition = () => {
  return (
    <>

    {/*  DESKTOP */}
      <div 
        className="hidden md:flex w-full max-h-screen justify-center items-center bg-off-white p-4"
      > 
        <img
            src="./tier-competition-section.png" alt="Competition Image" className="object-contain rounded-2xl"
        />
      </div>
    {/*  MOBILE */}
      <div 
        className="md:hidden w-full max-h-screen flex justify-center items-center bg-off-white p-4"
      > 
        <img
            src="./tier-competition-section-mobile.png" alt="Competition Image" className="object-contain rounded-2xl"
        />
      </div>
    </>
   
  
  )
}

export default Competition