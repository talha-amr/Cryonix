import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader = ({ loaded }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    // Entrance: animate the brand text in
    gsap.fromTo(
      textRef.current,
      { opacity: 0, letterSpacing: '0.5em', y: 8 },
      { opacity: 1, letterSpacing: '0.2em', y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    );

    // Thin loading line grows from left to right
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 1.6, ease: 'power2.inOut', delay: 0.3 }
    );
  }, []);

  useEffect(() => {
    if (!loaded) return;

    // Exit: fade out the entire loader once images are ready
    gsap.to(loaderRef.current, {
      opacity: 0,
      duration: 0.9,
      ease: 'power2.inOut',
      delay: 0.3,
      onComplete: () => {
        if (loaderRef.current) loaderRef.current.style.display = 'none';
      },
    });
  }, [loaded]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center"
    >
      {/* Brand Name */}
      <p
        ref={textRef}
        className="text-white font-sans text-sm md:text-2xl font-medium tracking-[0.2em] uppercase opacity-0"
      >
        Cryonix
      </p>

      {/* Loading line under the text */}
      <div className="mt-6 w-32 h-px bg-white/20 overflow-hidden rounded-full">
        <div ref={lineRef} className="h-full w-full bg-white/60 rounded-full" />
      </div>
    </div>
  );
};

export default Loader;
