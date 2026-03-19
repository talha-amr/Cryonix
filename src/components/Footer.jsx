import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 px-6 md:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-white font-sans text-xl md:text-2xl font-bold tracking-[0.2em] uppercase mb-6">
              Cryonix
            </h2>
            <p className="text-white/40 font-sans text-sm md:text-base font-light max-w-sm leading-relaxed">
              Pioneering the future of wearable art. Each piece is a masterpiece of precision engineering and arctic-inspired design.
            </p>
          </div>

          {/* Site Links */}
          <div>
            <h3 className="text-white/60 font-sans text-xs tracking-[0.2em] uppercase mb-6 font-semibold">Discovery</h3>
            <ul className="space-y-4">
              {['Collection', 'Technology', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/30 hover:text-white font-sans text-sm transition-colors duration-300">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white/60 font-sans text-xs tracking-[0.2em] uppercase mb-6 font-semibold">Social</h3>
            <ul className="space-y-4">
              {['Instagram', 'Twitter', 'Pinterest', 'LinkedIn'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/30 hover:text-white font-sans text-sm transition-colors duration-300">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 font-sans text-xs tracking-wider">
            &copy; {new Date().getFullYear()} CRYONIX. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/20 hover:text-white/40 font-sans text-[10px] tracking-[0.2em] uppercase transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-white/20 hover:text-white/40 font-sans text-[10px] tracking-[0.2em] uppercase transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
