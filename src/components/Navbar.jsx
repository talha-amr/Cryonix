import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-4 left-1/2 z-100 w-[90vw] md:w-[85vw] transition-all duration-700 ease-in-out ${
        isScrolled 
          ? 'opacity-0 pointer-events-none -translate-x-1/2 -translate-y-4' 
          : 'opacity-100 -translate-x-1/2 translate-y-0'
      }`}
    >
      <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] rounded-full px-6 md:px-10 py-3 
                      flex items-center justify-between transition-all duration-500 hover:bg-white/10 hover:border-white/20">
        
        {/* Left: Brand Name */}
        <div className="flex-1">
          <a href="#" className="text-white/90 text-sm md:text-base font-medium tracking-[0.2em] uppercase hover:text-white drop-shadow-[0_0_10px_rgba(147,197,253,0.2)]">
            Cryonix
          </a>
        </div>

        {/* Center: Main Links */}
        <div className="flex items-center justify-center gap-8 md:gap-16">
          <a href="#about" className="text-white/60 hover:text-white transition-colors duration-300 text-[10px] md:text-xs font-light tracking-[0.15em] uppercase">
            About
          </a>
          <a href="#contact" className="text-white/60 hover:text-white transition-colors duration-300 text-[10px] md:text-xs font-light tracking-[0.15em] uppercase">
            Contact
          </a>
        </div>

        {/* Right: CTA Link */}
        <div className="flex-1 flex justify-end">
          <a href="#shop" className="text-white/70 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] transition-all duration-300 text-[10px] md:text-xs font-light tracking-[0.15em] uppercase">
            Shop Now
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
