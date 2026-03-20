import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Shop Now', href: '#shop' },
  ];

  return (
    <>
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

          {/* Center: Main Links - Desktop Only */}
          <div className="hidden md:flex items-center justify-center gap-16">
            <a href="#about" className="text-white/60 hover:text-white transition-colors duration-300 text-xs font-light tracking-[0.15em] uppercase">
              About
            </a>
            <a href="#contact" className="text-white/60 hover:text-white transition-colors duration-300 text-xs font-light tracking-[0.15em] uppercase">
              Contact
            </a>
          </div>

          {/* Right: CTA Link - Desktop Only */}
          <div className="hidden md:flex flex-1 justify-end">
            <a href="#shop" className="text-white/70 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] transition-all duration-300 text-xs font-light tracking-[0.15em] uppercase">
              Shop Now
            </a>
          </div>

          {/* Right: Hamburger - Mobile Only */}
          <div className="md:hidden flex-1 flex justify-end">
            <button 
              onClick={() => setIsOpen(true)}
              className="text-white/70 hover:text-white p-1 transition-colors"
              aria-label="Open Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-200 bg-black/40 backdrop-blur-xl transition-all duration-500 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col items-center justify-center p-8">
          {/* Close Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 text-white/50 hover:text-white p-2 transition-colors"
            aria-label="Close Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Links */}
          <div className="flex flex-col items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white text-2xl font-light tracking-[0.25em] uppercase transition-all duration-300 hover:tracking-[0.4em]"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="absolute bottom-12 text-white/20 text-[10px] tracking-[0.3em] uppercase">
            Cryonix Frozen Edition
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
