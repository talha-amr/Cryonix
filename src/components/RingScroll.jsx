import React, { useEffect, useRef, useState } from 'react';
import Loader from './Loader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const imageModules = import.meta.glob('../assets/sequence-image/*.webp', { eager: true });
const imageUrls = Object.keys(imageModules)
  .sort()
  .map(key => imageModules[key].default);

const FRAME_COUNT = imageUrls.length;

const isMobile = () => window.innerWidth <= 768;

const RingScroll = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const textRef0 = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);

  const imagesRef = useRef([]);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const LOAD_THRESHOLD = 25;

    imageUrls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = async () => {
        loadedCount++;
        const prog = Math.round((loadedCount / FRAME_COUNT) * 100);
        setLoadProgress(prog);

        if (i === 0) {
          try {
            await img.decode();
          } catch (e) {
            console.warn("Image decode failed", e);
          }
        }

        if (loadedCount === LOAD_THRESHOLD) {
          setLoaded(true);
        }

        if (loadedCount === FRAME_COUNT) {
          setLoaded(true);
          ScrollTrigger.refresh();
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) setLoaded(true);
      };
      imagesRef.current[i] = img;
    });
  }, []);

  useGSAP(() => {
    if (!loaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const currentFrame = { frame: 0 };

    const renderFrame = (index) => {
      if (!ctx) return;
      const img = imagesRef.current[index];
      if (img && img.complete && img.naturalWidth !== 0) {
        if (canvas.width !== img.width || canvas.height !== img.height) {
          canvas.width = img.width;
          canvas.height = img.height;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0);
      }
    };

    const resizeCanvas = () => {
      ScrollTrigger.refresh();
      renderFrame(currentFrame.frame);
    };

    window.addEventListener('resize', resizeCanvas);

    const initRender = () => {
      renderFrame(0);
      requestAnimationFrame(() => renderFrame(0));
    };

    initRender();
    setTimeout(initRender, 100);

    // On mobile, start slightly early to avoid black flash on unpin
    const scrollStart = isMobile() ? 'top 10%' : 'top top';

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: scrollStart,
        end: 'bottom bottom',
        scrub: 1.5,
        onRefresh: () => renderFrame(currentFrame.frame),
      }
    });

    tl.to(currentFrame, {
      frame: FRAME_COUNT - 1,
      snap: 'frame',
      ease: 'none',
      duration: 100,
      onUpdate: () => renderFrame(currentFrame.frame)
    }, 0);

    if (textRef0.current) {
      tl.to(textRef0.current, { opacity: 0, y: -50, duration: 15, ease: 'power1.inOut' }, 0);
    }

    if (textRef1.current) {
      tl.to(textRef1.current, { opacity: 1, y: 0, duration: 10, ease: 'power1.out' }, 15);
      tl.to(textRef1.current, { opacity: 0, y: -50, duration: 10, ease: 'power1.in' }, 35);
    }

    if (textRef2.current) {
      tl.to(textRef2.current, { opacity: 1, y: 0, duration: 10, ease: 'power1.out' }, 45);
      tl.to(textRef2.current, { opacity: 0, y: -50, duration: 10, ease: 'power1.in' }, 65);
    }

    if (textRef3.current) {
      tl.to(textRef3.current, { opacity: 1, y: 0, scale: 1, duration: 10, ease: 'power1.out' }, 75);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, { dependencies: [loaded], scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-[400vh]" style={{ backgroundColor: '#050505' }}>
      <Loader loaded={loaded} progress={loadProgress} />

      {/* 
        KEY FIX: On mobile, the black gap appears at the bottom when sticky unpins.
        We cover the entire container with a black pseudo-bg div so there's
        never a transparent gap — and the sticky wrapper stays flush.
      */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{
          height: '100svh',
          backgroundColor: '#050505',
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Cinematic darkening overlay */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        {/* Text Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 0% Scroll - Hero */}
          <div ref={textRef0} className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="font-sans tracking-tight mb-2 md:mb-6">
              <span className="block text-[5rem] leading-none md:text-[9rem] font-black text-white drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
                Cryonix.
              </span>
            </h1>
            <p className="font-sans tracking-[0.3em] text-sm md:text-2xl font-light text-white uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
              Frozen <span className="font-bold bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.8)]">Perfection.</span>
            </p>
          </div>

          {/* 30% Scroll - Ice Cracking */}
          <div ref={textRef1} style={{ opacity: 0, transform: 'translateY(50px)' }} className="absolute inset-0 flex items-center justify-start px-12 md:px-32">
            <h2 className="text-white/90 font-sans tracking-tight text-3xl md:text-5xl max-w-lg font-semibold leading-tight">
              Precision <br />Within <span className="font-bold bg-gradient-to-r from-cyan-200 via-blue-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(147,197,253,0.4)]">Ice.</span>
            </h2>
          </div>

          {/* 60% Scroll - Reveal Stage */}
          <div ref={textRef2} style={{ opacity: 0, transform: 'translateY(50px)' }} className="absolute inset-0 flex items-center justify-end px-12 md:px-32">
            <h2 className="text-white/90 font-sans tracking-tight text-3xl md:text-5xl max-w-lg text-right font-semibold leading-tight">
              Pure <span className="font-bold bg-gradient-to-r from-slate-100 via-gray-300 to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(226,232,240,0.5)]">Silver</span> <br />Core.
            </h2>
          </div>

          {/* 90% Scroll - Final CTA */}
          <div ref={textRef3} style={{ opacity: 0, transform: 'translateY(50px) scale(0.95)' }} className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-white/90 font-sans tracking-tight text-4xl md:text-6xl font-semibold mb-6">
              Reveal the <span className="font-extrabold bg-gradient-to-r from-cyan-200 via-blue-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(147,197,253,0.4)]">Core.</span>
            </h2>
            <button
              onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}
              className="pointer-events-auto px-8 py-3 rounded-full border border-white/40 text-white hover:bg-white hover:text-black transition-all duration-300 tracking-widest text-sm font-bold uppercase backdrop-blur-md">
              Explore Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RingScroll;