import React, { useEffect, useRef } from 'react';
import { testimonialsData } from '../data/testimonialsData';
import { Link } from 'react-router-dom';
import { Sparkles, Star, Quote, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import GridMotionBackground from '../components/GridMotionBackground';
import LightRays from '../components/LightRays';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.testimonial-hero > *', {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out'
      });

      gsap.from('.testimonial-card', {
        scrollTrigger: {
          trigger: '.testimonial-grid',
          start: 'top 80%',
        },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out'
      });

      gsap.from('.testimonial-cta', {
        scrollTrigger: {
          trigger: '.testimonial-cta',
          start: 'top 85%',
        },
        scale: 0.96, y: 30, opacity: 0, duration: 0.9, ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative bg-darkbg min-h-screen font-sans overflow-hidden selection:bg-primary selection:text-darkbg" ref={containerRef}>
      {/* Stitch Styles */}
      <style>{`
        .stitch-card {
          background: rgba(20, 54, 37, 0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(212, 175, 55, 0.2);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .stitch-card:hover {
          border-color: rgba(255, 224, 102, 0.5);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 25px -5px rgba(212, 175, 55, 0.18);
        }
      `}</style>

      {/* React Bits Bright Motion Canvas */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <GridMotionBackground
          particleColor="#ffe066"
          lineColor="rgba(255, 224, 102, 0.35)"
          particleCount={75}
          speed={0.55}
          interactive={true}
        />
        <div className="absolute inset-0 opacity-40">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffd700"
            raysSpeed={0.8}
            lightSpread={1.4}
            rayLength={1.8}
            followMouse={true}
            mouseInfluence={0.15}
          />
        </div>
      </div>

      <div className="relative z-10 pt-28 md:pt-36 pb-24 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 testimonial-hero">
          <div className="inline-flex items-center gap-2 bg-secondary/80 border border-primary/30 px-4 py-1.5 rounded-full mb-6 text-xs font-medium text-primary shadow-lg">
            <HeartHandshake className="w-4 h-4" /> Verified Client Reviews
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-lighttext mb-6 leading-tight">
            Heartfelt Stories from <br />
            <span className="text-primary italic">Our Cherished Guests</span>
          </h1>
          <p className="text-sm sm:text-lg text-lighttext/75 font-light leading-relaxed">
            Discover real experiences and testimonials from hosts who trusted Krishna Caterers to make their celebrations memorable.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonial-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-24">
          {testimonialsData.map((t, idx) => (
            <div key={t.id || idx} className="testimonial-card stitch-card p-8 rounded-3xl flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex text-primary">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary/30 group-hover:text-primary/60 transition-colors" />
                </div>
                <p className="text-xs sm:text-sm text-lighttext/85 italic mb-8 leading-relaxed font-light">
                  "{t.review}"
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-primary text-lg">{t.name}</h4>
                  <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{t.eventType}</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="testimonial-cta stitch-card p-10 sm:p-14 rounded-3xl text-center max-w-4xl mx-auto shadow-2xl">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4" /> Book Your Celebration
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-lighttext mb-4">
            Ready to Experience Our Signature Hospitality?
          </h2>
          <p className="text-xs sm:text-base text-lighttext/70 font-light max-w-lg mx-auto mb-8 leading-relaxed">
            Let's plan your upcoming event menu with authentic Kerala dishes and gold-standard service.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/contact" 
              className="px-8 py-3.5 bg-primary text-darkbg font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-primary/95 transition-all shadow-xl flex items-center gap-2"
            >
              <span>Get Event Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
