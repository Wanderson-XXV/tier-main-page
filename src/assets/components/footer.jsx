import React from 'react';

function Footer() {
    return (
        <footer
        className="w-full h-64 bg-tier-blue"
        >
            <FooterLg/>
        </footer>

    );
}

const FooterLg = () => {
    return (
        
            <div className="font-montserrat flex justify-between w-full h-full pb-2">
                {/* Coluna 1 */}
                <div className="pl-4 flex-1 pt-12 flex flex-col justify-between text-white h-full">
                    <h3 className='text-sm md:text-xl'>Entre em contato conosco:</h3>
                    <p>contato@tiereducation.com.br</p>
                    <p>+55 (21)99171-6690</p>
                    <p>@tier_education</p>
                    <div className="flex items-center mt-2  ">
                        <a href="https://www.instagram.com/tier_education" target="_blank" rel="noopener noreferrer">
                            <img src="/instagram-icon.svg" alt="Instagram" className="w-5 h-5 md:w-8 md:h-8 mr-4" />
                        </a>
                        {/* <a href="https://www.instagram.com/tier_education" target="_blank" rel="noopener noreferrer">
                            <img src="/youtube-icon.svg" alt="Youtube" className="w-5 h-5 md:w-8 md:h-8 mr-4" />
                        </a> */}
                        {/* <a href="https://www.instagram.com/tier_education" target="_blank" rel="noopener noreferrer">
                            <img src="/linkedin-icon.svg" alt="Linkedin" className="w-5 h-5 md:w-8 md:h-8 mr-4" />
                        </a> */}
                        <a href="https://wa.me/5521991716690" target="_blank" rel="noopener noreferrer">
                            <img src="/whatsapp-icon.svg" alt="whatsapp" className="w-5 h-5 md:w-8 md:h-8 mr-4" />
                        </a>                                                
                    </div>
                    <div className='h-full flex flex-col  justify-end'>
                        <p className='text-sm'>Copyright © 2025 - TIER Education.</p>

                    </div>
                </div>
                {/* Coluna 2 */}
                <div className="flex-1 flex flex-col justify-center py-12">
                    <div className="h-full bg-[url('/justFooterLogo.svg')] bg-no-repeat bg-right bg-contain">
                    </div>
                </div>
            </div>
    );
}

export default Footer;


