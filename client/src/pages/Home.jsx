import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { menuData } from '../data/menuData';
import { servicesData } from '../data/servicesData';
import TasteCarousel from '../components/TasteCarousel';
import { UtensilsCrossed, Leaf, Star, Sparkles, ChefHat, BookOpen, PartyPopper } from 'lucide-react';
import StrokeText from '../components/StrokeText';

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative min-h-screen md:h-screen flex items-center bg-darkbg overflow-hidden pt-28 pb-16 md:pt-0 md:pb-0">
        <div className="absolute inset-0">
          <img
            src="/images/hero.png"
            alt="Kerala Food"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-darkbg/90 via-darkbg/50 to-transparent"></div>
          {/* Smooth bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-darkbg to-transparent"></div>
        </div>
        <div className="w-full px-4 md:px-8 relative z-10 text-left text-lighttext">
          <div className="mb-6 max-w-3xl flex flex-col gap-2">
            {siteConfig.tagline.split('. ').map((part, index, array) => (
              <StrokeText
                key={index}
                text={part + (index < array.length - 1 && !part.endsWith('.') ? '.' : '')}
                strokeColor="#f2c32aff"
                fillColor="#f2c32aff"
                strokeWidth={1.5}
                drawDuration={1.5}
                fillDelay={0.5}
                stagger={0.04}
                ease="power2.out"
                trigger="mount"
                fillMode="fade"
                fontSize={isMobile ? 32 : 72}
                fontWeight={800}
                letterSpacing={-1}
              />
            ))}
          </div>
          <p className="text-sm sm:text-base md:text-xl mb-6 md:mb-10 max-w-2xl text-lighttext/90">
            {siteConfig.shortDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-12">
            <Link to="/contact" className="btn-primary text-center">Book Catering</Link>
            <Link to="/menu" className="btn-secondary border-lighttext text-lighttext hover:bg-lighttext hover:text-primary text-center">Explore Our Menu</Link>
          </div>
 
          {/* Hero Stats */}
          <div className="flex items-center gap-8 md:gap-16 pt-6 md:pt-8 border-t border-white/10 max-w-md">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1">250+</h3>
              <p className="text-lighttext/85 text-xs md:text-sm uppercase tracking-wider font-semibold">Events Catered</p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1">{new Date().getFullYear() - 2000}+</h3>
              <p className="text-lighttext/85 text-xs md:text-sm uppercase tracking-wider font-semibold">Years Experience</p>
            </div>
          </div>
        </div>
      </section>



      {/* Our Story Section */}
      <section className="py-24 relative overflow-hidden bg-darkbg">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/story.jpeg"
            alt="Our Story Background"
            className="w-full h-full object-cover opacity-30"
          />
          {/* Faded overlay to ensure text visibility */}
          <div className="absolute inset-0 bg-[#081c12]/60"></div>
          {/* Smooth top and bottom gradient fades to blend with other sections */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-darkbg to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-darkbg to-transparent"></div>
        </div>

        <div className="w-full px-4 md:px-8 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center justify-center space-x-2 text-primary font-bold tracking-wider text-sm mb-4">
            <Sparkles size={16} />
            <span className="uppercase">Our Story</span>
            <Sparkles size={16} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-lighttext mb-8">
            A legacy of flavor, <br />
            <span className="text-lighttext/80">passion, and tradition</span>
          </h2>
          <div className="max-w-3xl space-y-6">
            <p className="text-lg text-lighttext/70 leading-relaxed">
              Founded in 2000 with a deep-rooted love for Kerala's culinary heritage, Krishna Caterers has been bringing authentic vegetarian delicacies to your celebrations. What started as a humble family kitchen has now blossomed into a premier catering service, renowned for its unwavering commitment to quality and taste.
            </p>
            <p className="text-lg text-lighttext/70 leading-relaxed">
              Every recipe we serve is a testament to our tradition, carefully passed down through generations. We believe that food is not just about sustenance, but about creating memories that last a lifetime.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Interactive Hub Layout */}
      <section className="py-24 bg-darkbg overflow-hidden">
        <div className="w-full px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* Left Content */}
            <div className="text-left space-y-6 z-10">
              <div className="flex items-center space-x-2 text-primary font-bold tracking-wider text-sm">
                <Sparkles size={16} />
                <span className="uppercase">Why Choose Us</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-lighttext">
                Every detail, <br />
                <span className="text-lighttext/80">crafted to perfection</span>
              </h2>

              <p className="text-lg text-lighttext/70 leading-relaxed max-w-md">
                Authentic recipes, fresh ingredients, and professional service meet in one seamless experience. We bring the true essence of Kerala's culinary heritage to your special occasions.
              </p>

              <div className="pt-6">
                <div className="inline-flex flex-col sm:flex-row sm:items-center justify-between bg-darkbg md:bg-[#081c12] border border-white/10 rounded-3xl md:rounded-full p-2 md:pr-6 shadow-xl gap-4 md:gap-0">
                  <Link to="/contact" className="bg-lighttext text-darkbg px-6 py-2 rounded-full font-bold hover:bg-primary transition-colors text-center w-full sm:w-auto">
                    Book Catering
                  </Link>
                  <div className="flex items-center justify-center space-x-2 mx-4 text-sm text-lighttext/70 pb-2 md:pb-0">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
                    <span>Available now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Circular Diagram */}
            <div className="relative flex items-center justify-center w-full lg:w-auto h-[400px] md:h-[480px] lg:h-[550px] mt-12 lg:mt-0 overflow-visible lg:pr-8">
              {/* Rotating Wrapper */}
              <div
                className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[460px] md:h-[460px] flex justify-center items-center animate-spin"
                style={{ animation: 'spin 120s linear infinite' }}
              >
                {/* Outer solid circle (formerly dashed) */}
                <div className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[420px] md:h-[420px] rounded-full border border-primary/40 pointer-events-none shadow-[0_0_40px_rgba(212,175,55,0.05)]"></div>
                {/* Inner solid circle */}
                <div className="absolute w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[260px] md:h-[260px] rounded-full border border-primary/30 pointer-events-none shadow-[0_0_50px_rgba(212,175,55,0.05)]"></div>

                {/* Center Hub (Counter rotates so logo stays upright) */}
                <div
                  className="relative z-10 w-20 h-20 md:w-28 md:h-28 rounded-2xl md:rounded-[2rem] border border-primary/50 bg-secondary flex flex-col items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)] animate-spin"
                  style={{ animation: 'spin 120s linear infinite reverse' }}
                >
                  <img src="/images/logo.png" alt="Logo" className="h-8 md:h-12 w-auto opacity-90 mb-1" />
                  <span className="text-[8px] md:text-[10px] font-bold text-primary tracking-widest uppercase">Krishna</span>
                </div>

                {/* Orbiting Nodes */}
                {[
                  { icon: <UtensilsCrossed size={20} />, title: "Authentic Taste", desc: "Traditional Kerala recipes inspired by rich culinary heritage.", angle: 0 },
                  { icon: <BookOpen size={20} />, title: "Custom Menus", desc: "Tailor-made menus designed to perfectly suit your special event.", angle: 60 },
                  { icon: <Star size={20} />, title: "Quality Items", desc: "Fresh, locally sourced ingredients selected for every event.", angle: 120 },
                  { icon: <PartyPopper size={20} />, title: "Every Occasion", desc: "Perfect catering for weddings, birthdays, and corporate events.", angle: 180 },
                  { icon: <Leaf size={20} />, title: "100% Vegetarian", desc: "Pure vegetarian food prepared with utmost care and hygiene.", angle: 240 },
                  { icon: <ChefHat size={20} />, title: "Professional", desc: "Experienced team delivering flawless catering service.", angle: 300 }
                ].map((node, index) => {
                  return (
                    <div key={index} className="absolute inset-0 pointer-events-none z-20 flex justify-center" style={{ transform: `rotate(${node.angle}deg)` }}>
                      {/* Position exactly on the outer circle edge */}
                      <div className="absolute -top-1 md:-top-2 pointer-events-auto group">

                        {/* Counter Spin to keep node upright during orbit */}
                        <div className="animate-spin" style={{ animation: 'spin 120s linear infinite reverse' }}>

                          {/* Cancel the placement rotation so the node is completely upright */}
                          <div className="flex flex-col items-center" style={{ transform: `rotate(${-node.angle}deg)` }}>
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-darkbg border-2 border-primary/40 flex items-center justify-center text-lighttext/80 hover:text-primary hover:border-primary hover:bg-[#143625] transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.15)] relative">
                              {node.icon}

                              {/* Tooltip Popup */}
                              <div className={`absolute w-48 md:w-60 p-4 rounded-xl bg-secondary border border-primary/40 shadow-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out pointer-events-none z-30
                                ${node.angle === 0 ? 'top-full left-1/2 -translate-x-1/2 mt-3' : ''}
                                ${node.angle === 180 ? 'bottom-full left-1/2 -translate-x-1/2 mb-3' : ''}
                                ${(node.angle === 60 || node.angle === 120) ? 'right-full top-1/2 -translate-y-1/2 mr-3' : ''}
                                ${(node.angle === 240 || node.angle === 300) ? 'left-full top-1/2 -translate-y-1/2 ml-3' : ''}
                              `}>
                                <h4 className="font-bold text-primary text-sm md:text-base mb-1">{node.title}</h4>
                                <p className="text-xs text-lighttext/80 leading-relaxed">{node.desc}</p>
                              </div>
                            </div>

                            {/* Static label below icon */}
                            <span className="hidden sm:block absolute -bottom-6 text-[10px] md:text-xs text-lighttext/70 font-medium whitespace-nowrap">
                              {node.title}
                            </span>
                          </div>

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-20 bg-darkbg">
        <div className="w-full px-4 md:px-8">
          <div className="text-left mb-16">
            <StrokeText
              text="A Taste of Kerala"
              strokeColor="#d4af37"
              fillColor="#e7d12bff"
              strokeWidth={1.5}
              drawDuration={1.8}
              fillDelay={0.3}
              stagger={0.08}
              ease="power2.out"
              trigger="scroll"
              fillMode="fade"
              fontSize={isMobile ? 38 : 56}
              fontWeight={800}
              letterSpacing={-1}
              className="mb-4"
            />
            <p className="text-lighttext/70 max-w-2xl">Experience the rich, authentic flavors of our featured dishes.</p>
          </div>
          <div className="w-full relative mb-8 -mx-4 md:mx-0 w-[calc(100%+2rem)] md:w-full">
            <TasteCarousel items={menuData.slice(0, 6)} />
          </div>
          <div className="text-left mt-12">
            <Link to="/menu" className="btn-secondary">View Full Menu</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
