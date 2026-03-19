import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Product Images
import cat1 from '../assets/cat-1.jpeg';
import cat2 from '../assets/cat-2.png';
import cat3 from '../assets/cat-3.jpeg';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: 'Cryonix Origin',
    subtitle: 'Silver · Ice Edition',
    price: '$2,400',
    desc: 'Precision-cut silver band preserved in arctic resin. Limited to 50 pieces worldwide.',
    image: cat1,
  },
  {
    id: 2,
    name: 'Cryonix Void',
    subtitle: 'Obsidian · Dark Edition',
    price: '$3,100',
    desc: 'Black rhodium finish meets glacial clarity. The ring that holds its temperature.',
    image: cat2,
  },
  {
    id: 3,
    name: 'Cryonix Aurora',
    subtitle: 'Rose Gold · Frost Edition',
    price: '$2,850',
    desc: 'Warm tones suspended in frozen time. A contrast of heat and ice.',
    image: cat3,
  },
];

const ExploreSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    // Heading fade in
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Cards stagger in
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="explore" ref={sectionRef} className="bg-[#050505] min-h-screen px-6 md:px-16 py-24 md:py-32">
      {/* Section Header */}
      <div ref={headingRef} className="mb-20 text-center">
        <p className="text-white/40 font-sans text-xs tracking-[0.35em] uppercase mb-4">The Collection</p>
        <h2 className="font-sans text-4xl md:text-6xl font-semibold text-white tracking-tight leading-tight">
          Frozen in <span className="font-black bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]">Time.</span>
        </h2>
        <p className="mt-4 text-white/40 font-sans text-sm md:text-base font-light max-w-md mx-auto leading-relaxed">
          Each piece exists at the intersection of temperature and precision. Designed to be worn, made to last forever.
        </p>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product, i) => (
          <div
            key={product.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className="group relative bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
          >
            {/* Product Visual */}
            <div className="h-64 md:h-72 overflow-hidden bg-white/2">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
              />
            </div>

            {/* Product Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-sans text-lg font-semibold tracking-tight">{product.name}</h3>
                  <p className="text-white/40 font-sans text-xs tracking-[0.15em] uppercase mt-0.5">{product.subtitle}</p>
                </div>
                <span className="text-white/80 font-sans text-sm font-medium">{product.price}</span>
              </div>
              <p className="text-white/40 font-sans text-sm font-light leading-relaxed">{product.desc}</p>

              <button className="mt-6 w-full py-3 rounded-full border border-white/10 text-white/60 text-xs tracking-[0.2em] uppercase font-medium
                hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-300">
                View Piece
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-20">
        <p className="text-white/25 font-sans text-xs tracking-[0.25em] uppercase">Handcrafted · Limited editions · Worldwide shipping</p>
      </div>
    </section>
  );
};

export default ExploreSection;
