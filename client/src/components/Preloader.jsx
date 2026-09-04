import React, { useEffect, useState } from 'react';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Welcome');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Dynamic progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + increment, 100);
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Elegant, classic phrase updates
    if (progress < 30) {
      setLoadingText('Blending Spices');
    } else if (progress < 60) {
      setLoadingText('Preparing the Feast');
    } else if (progress < 90) {
      setLoadingText('Plating Delicacies');
    } else {
      setLoadingText('Ready to Serve');
    }

    if (progress === 100) {
      const fadeTimeout = setTimeout(() => {
        setIsFading(true);
        const completeTimeout = setTimeout(() => {
          if (onComplete) onComplete();
        }, 800);
        return () => clearTimeout(completeTimeout);
      }, 600);

      return () => clearTimeout(fadeTimeout);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#040d08] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out select-none ${isFading ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      style={{
        // Soft vignette background
        backgroundImage: 'radial-gradient(circle, #081a10 0%, #030a06 100%)'
      }}
    >
      {/* Delicate outer border/frame for a classic feel */}
      <div className="absolute inset-4 sm:inset-6 border border-primary/10 pointer-events-none transition-all duration-1000"></div>
      <div className="absolute inset-5 sm:inset-7 border border-primary/5 pointer-events-none transition-all duration-1000"></div>

      <div className="flex flex-col items-center relative z-10 max-w-sm px-8 text-center">
        {/* Elegant Logo Frame */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Subtle glowing halo */}
          <div className="absolute w-35 h-35 rounded-full bg-primary/10 blur-xl pointer-events-none"></div>

          {/* Logo container */}
          <div className="relative w-32 h-32 flex items-center justify-center p-2">
            <img
              src="/images/logo.png"
              alt="Krishna Caterers"
              className="w-full h-auto object-contain drop-shadow-[0_2px_10px_rgba(242,195,42,0.15)] animate-pulse"
              style={{ animationDuration: '5s' }}
            />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl sm:text-4xl font-serif text-primary tracking-[0.15em] mb-1 font-bold">
          KRISHNA
        </h1>
        <p className="text-[10px] sm:text-xs text-lighttext/40 tracking-[0.4em] uppercase font-light mb-4">
          C A T E R E R S
        </p>

        {/* Vintage Divider */}
        <div className="flex items-center justify-center gap-3 w-full my-3">
          <div className="h-[0.5px] w-10 bg-primary/30"></div>
          <span className="text-primary/70 text-[10px] tracking-widest font-serif">✦</span>
          <div className="h-[0.5px] w-10 bg-primary/30"></div>
        </div>

        {/* Classic Tagline */}
        <p className="text-[11px] sm:text-xs text-lighttext/60 italic font-serif tracking-wider mb-12">
          A Legacy of Vegetarian Gastronomy
        </p>

        {/* Center-out Growing Progress Line & Loading Status */}
        <div className="w-48 space-y-4 mx-auto">
          {/* Elegant luxury loading line */}
          <div className="h-[1px] w-full bg-white/5 rounded-full overflow-hidden relative">
            <div
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 bg-primary transition-all duration-300 ease-out shadow-[0_0_8px_#f2c32a]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex flex-col items-center gap-1.5 text-[10px] sm:text-xs">
            <span className="text-primary/80 font-serif italic tracking-wide transition-all duration-300">
              {loadingText}
            </span>
            <span className="text-lighttext/30 font-mono tracking-widest text-[9px]">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Tag */}
      <div className="absolute bottom-10 text-[8px] sm:text-[9px] text-lighttext/20 uppercase tracking-[0.4em] font-light z-10">
        Est. 2011 • Pure & Vegetarian
      </div>
    </div>
  );
};

export default Preloader;
