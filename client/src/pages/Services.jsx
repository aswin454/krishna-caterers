import React, { useEffect, useRef } from 'react';
import { servicesData } from '../data/servicesData';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Star, Utensils, Users, Award, Calendar, CheckCircle } from 'lucide-react';
import GridMotionBackground from '../components/GridMotionBackground';
import LightRays from '../components/LightRays';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.services-hero > *', {
        y: 35, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out'
      });

      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%',
        },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out'
      });

      gsap.from('.how-it-works-step', {
        scrollTrigger: {
          trigger: '.how-it-works-section',
          start: 'top 80%',
        },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative bg-darkbg min-h-screen font-sans overflow-hidden selection:bg-primary selection:text-darkbg" ref={containerRef}>
      {/* Custom Stitch Styles */}
      <style>{`
        @keyframes stitchPulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.08); }
        }
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

      {/* Motion Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <GridMotionBackground
          particleColor="#ffe066"
          lineColor="rgba(255, 224, 102, 0.35)"
          particleCount={70}
          speed={0.5}
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
        <div className="text-center max-w-3xl mx-auto mb-16 services-hero">
          <div className="inline-flex items-center gap-2 bg-secondary/80 border border-primary/30 px-4 py-1.5 rounded-full mb-6 text-xs font-medium text-primary shadow-lg">
            <Sparkles className="w-4 h-4" /> Comprehensive Banquet Solutions
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-lighttext mb-6 leading-tight">
            Tailored Catering Services for <br />
            <span className="text-primary italic">Every Unforgettable Occasion</span>
          </h1>
          <p className="text-sm sm:text-lg text-lighttext/75 font-light leading-relaxed">
            From traditional banana leaf wedding feasts to intimate housewarming banquets, we blend Kerala’s culinary heritage with immaculate presentation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-24">
          {servicesData.map((service, idx) => (
            <div key={service.id || idx} className="service-card stitch-card p-8 rounded-3xl flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <Utensils className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-3 group-hover:text-lighttext transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-lighttext/75 leading-relaxed font-light mb-6">
                  {service.description}
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> 100% Pure Veg Sadya
                </span>
                <Link to="/contact" className="text-primary hover:text-white transition-colors p-2 rounded-full hover:bg-primary/20">
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="how-it-works-section stitch-card p-8 sm:p-12 rounded-3xl mb-20 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-2">Seamless Process</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-lighttext">How We Bring Your Banquet to Life</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { num: "01", title: "Share Your Vision", desc: "Select your event date, location, and guest numbers.", icon: Calendar },
              { num: "02", title: "Custom Menu Curation", desc: "Customize starter chips, Sadya curries, and payasams.", icon: Utensils },
              { num: "03", title: "Transparent Pricing", desc: "Get an instant breakdown with no hidden fees.", icon: Star },
              { num: "04", title: "Flawless Execution", desc: "Relax as our master chefs and team serve your guests.", icon: Award }
            ].map((step, i) => {
              const IconComp = step.icon;
              return (
                <div key={i} className="how-it-works-step text-center p-4 relative">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/80 border border-primary/30 flex items-center justify-center mx-auto mb-4 text-primary">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-serif font-bold text-primary mb-2 opacity-80">{step.num}</div>
                  <h3 className="text-lg font-bold text-lighttext mb-2">{step.title}</h3>
                  <p className="text-xs text-lighttext/70 font-light leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-darkbg font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-primary/90 transition-all shadow-xl">
              <span>Book Your Event Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
