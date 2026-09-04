import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Gem, Leaf, Palette, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2000",
    title: "Humble Beginnings",
    desc: "Inspired by generations of family recipes, we bring authentic flavours to your table with fresh ingredients, refined presentation, and a passion for exceptional food. Crafted with tradition. Served with elegance.",
    image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2010",
    title: "Milestone Reached",
    desc: "Completed 1000+ events.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2015",
    title: "Expanding Horizons",
    desc: "Our reputation for uncompromising quality grew, allowing us to cater larger gatherings and refine our culinary techniques.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2018",
    title: "A Shift to Luxury",
    desc: "Elevated our presentation and service to curate high-end culinary experiences, becoming a preferred choice for premium weddings.",
    image: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2022",
    title: "Award Winning",
    desc: "Emerging Catering Award.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "Today",
    title: "Artisanal Excellence",
    desc: "Over 250+ vegetarian luxury events catered. We continue to innovate while maintaining our 100% pure vegetarian promise and award-winning craft.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const bgPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd' fill-opacity='0.04'%3E%3Cg fill='%23d4af37'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const About = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Intro
      gsap.from('.hero-intro', {
        y: 40, opacity: 0, duration: 1.2, ease: 'power3.out', stagger: 0.2
      });

      // Hero Image
      gsap.from('.hero-image', {
        scale: 1.05, opacity: 0, duration: 1.5, ease: 'power2.out', delay: 0.2
      });

      // Curved Path Animation
      if (pathRef.current) {
        const path = pathRef.current;
        const length = path.getTotalLength();

        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: 1.5,
          }
        });
      }

      // Milestone Items fade in
      gsap.utils.toArray('.milestone-content').forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });

      gsap.utils.toArray('.milestone-dot').forEach((dot) => {
        gsap.from(dot, {
          scrollTrigger: {
            trigger: dot,
            start: 'top 80%',
          },
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.5)'
        });
      });

      // Pillars
      gsap.from('.pillar-header > *', {
        scrollTrigger: { trigger: '.pillar-section', start: 'top 85%' },
        y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1
      });

      gsap.from('.pillar-card', {
        scrollTrigger: { trigger: '.pillar-section', start: 'top 75%' },
        y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.2
      });

      // CTA
      gsap.from('.cta-section > *', {
        scrollTrigger: { trigger: '.cta-section', start: 'top 85%' },
        y: 30, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.15
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative bg-darkbg min-h-screen font-sans text-center overflow-hidden" ref={containerRef}>
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ backgroundImage: bgPattern, backgroundSize: '60px 60px' }}></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 pt-32 pb-24 w-full max-w-7xl mx-auto px-4 md:px-8">

        {/* Section 1: Hero Intro */}
        <div className="max-w-3xl mx-auto mb-16">
          <h1 className="hero-intro text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-6">
            Our Journey to Artisanal Excellence
          </h1>
          <p className="hero-intro text-sm md:text-base text-lighttext/80 leading-relaxed font-light">
            We are {siteConfig.businessName}, a high-end culinary studio dedicated to redefining luxury vegetarian catering. Born from a desire to elevate plant-based cuisine to an art form.
          </p>
        </div>

        {/* Hero Image */}
        <div className="hero-intro w-full h-[300px] md:h-[500px] rounded-sm overflow-hidden mb-32 opacity-90 border border-white/5">
          <img
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Chef preparing fine dining"
            className="w-full h-full object-cover object-center filter brightness-75 transition-transform duration-[3s] hover:scale-105"
          />
        </div>

        {/* Section 2: Scrolly Curved Timeline */}
        <div className="relative max-w-5xl mx-auto py-10 mb-32" ref={timelineRef}>
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">The Path We Traveled</h2>
            <p className="text-sm md:text-base text-lighttext/70 font-light">The evolution of our passion for flavor.</p>
          </div>

          <div className="relative">
            {/* The SVG Curve */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[100px] sm:w-[150px] pointer-events-none">
              <svg viewBox="0 0 100 1200" preserveAspectRatio="none" className="w-full h-full">
                {/* Faint Background Path */}
                <path d="M 50 0 C 50 40, 100 60, 100 100 C 100 180, 0 220, 0 300 C 0 380, 100 420, 100 500 C 100 580, 0 620, 0 700 C 0 780, 100 820, 100 900 C 100 980, 0 1020, 0 1100 C 0 1140, 50 1160, 50 1200" fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="4 4" className="opacity-20" />
                {/* Animated Foreground Path */}
                <path ref={pathRef} d="M 50 0 C 50 40, 100 60, 100 100 C 100 180, 0 220, 0 300 C 0 380, 100 420, 100 500 C 100 580, 0 620, 0 700 C 0 780, 100 820, 100 900 C 100 980, 0 1020, 0 1100 C 0 1140, 50 1160, 50 1200" fill="none" stroke="#d4af37" strokeWidth="4" />
              </svg>
            </div>

            {/* The Items */}
            <div className="space-y-16 sm:space-y-0 relative z-10 flex flex-col">
              {milestones.map((m, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className="relative sm:h-[300px] flex items-center w-full justify-center">

                    {/* Mobile Layout (Stack) */}
                    <div className="sm:hidden flex flex-col items-center w-full relative z-10 pt-6">
                      <div className="milestone-dot absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-darkbg border-[4px] border-primary shadow-[0_0_15px_rgba(212,175,55,0.8)] z-20"></div>
                      <div className="milestone-content flex flex-col items-center text-center bg-secondary/40 backdrop-blur-sm p-6 border border-white/5 rounded-2xl w-full mt-4">
                        <div className="w-full h-48 rounded-lg overflow-hidden mb-6">
                          <img src={m.image} alt={m.title} className="w-full h-full object-cover filter brightness-75" />
                        </div>
                        <span className="text-3xl font-serif text-primary mb-2 block">{m.year}</span>
                        <h3 className="text-lg font-bold text-lighttext mb-4">{m.title}</h3>
                        <p className="text-sm text-lighttext/70">{m.desc}</p>
                      </div>
                    </div>

                    {/* Desktop Layout (Alternating sides) */}
                    <div className="hidden sm:flex w-full items-center justify-between relative h-full">

                      {/* Left Side Container */}
                      <div className={`w-[42%] milestone-content ${isEven ? 'text-right' : 'text-left'}`}>
                        {isEven ? (
                          <>
                            <span className="text-4xl lg:text-5xl font-serif text-primary mb-4 block">{m.year}</span>
                            <h3 className="text-xl font-bold text-lighttext mb-4">{m.title}</h3>
                            <p className="text-sm text-lighttext/70 leading-relaxed">{m.desc}</p>
                          </>
                        ) : (
                          <div className="w-full h-[220px] rounded-lg overflow-hidden border border-white/5 shadow-2xl">
                            <img src={m.image} alt={m.title} className="w-full h-full object-cover filter brightness-75 hover:brightness-100 transition-all duration-500 hover:scale-105" />
                          </div>
                        )}
                      </div>

                      {/* Center Node (Dot) */}
                      <div
                        className="milestone-dot absolute top-1/2 z-10 w-5 h-5 rounded-full bg-darkbg border-[3px] border-primary shadow-[0_0_20px_rgba(212,175,55,0.6)]"
                        style={{
                          left: `calc(50% ${isEven ? '+' : '-'} 75px)`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      ></div>

                      {/* Right Side Container */}
                      <div className={`w-[42%] milestone-content ${!isEven ? 'text-left' : 'text-right'}`}>
                        {!isEven ? (
                          <>
                            <span className="text-4xl lg:text-5xl font-serif text-primary mb-4 block">{m.year}</span>
                            <h3 className="text-xl font-bold text-lighttext mb-4">{m.title}</h3>
                            <p className="text-sm text-lighttext/70 leading-relaxed">{m.desc}</p>
                          </>
                        ) : (
                          <div className="w-full h-[220px] rounded-lg overflow-hidden border border-white/5 shadow-2xl">
                            <img src={m.image} alt={m.title} className="w-full h-full object-cover filter brightness-75 hover:brightness-100 transition-all duration-500 hover:scale-105" />
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 3: Our Pillars */}
        <div className="pillar-section mb-32 border-t border-white/5 pt-20">
          <div className="pillar-header mb-12">
            <h2 className="text-2xl md:text-3xl font-serif text-primary mb-3">Our Pillars</h2>
            <p className="text-xs md:text-sm text-lighttext/60 font-light">The principles that guide our culinary craft.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="pillar-card bg-secondary/40 border border-white/5 p-8 text-left group hover:bg-secondary/60 transition-colors duration-300 rounded-sm">
              <Gem className="w-5 h-5 text-primary mb-6 transform group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-serif text-lighttext mb-4">Authenticity</h3>
              <p className="text-[11px] md:text-xs text-lighttext/60 font-light leading-relaxed">
                Uncompromising dedication to original recipes, preserving the soul of traditional flavors while presenting them with contemporary elegance.
              </p>
            </div>
            {/* Pillar 2 */}
            <div className="pillar-card bg-secondary/40 border border-white/5 p-8 text-left group hover:bg-secondary/60 transition-colors duration-300 rounded-sm">
              <Leaf className="w-5 h-5 text-primary mb-6 transform group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-serif text-lighttext mb-4">Purity</h3>
              <p className="text-[11px] md:text-xs text-lighttext/60 font-light leading-relaxed">
                Sourcing only the finest, organic, and ethically grown ingredients. Our commitment to pristine quality is the foundation of every dish.
              </p>
            </div>
            {/* Pillar 3 */}
            <div className="pillar-card bg-secondary/40 border border-white/5 p-8 text-left group hover:bg-secondary/60 transition-colors duration-300 rounded-sm">
              <Palette className="w-5 h-5 text-primary mb-6 transform group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-serif text-lighttext mb-4">Craft</h3>
              <p className="text-[11px] md:text-xs text-lighttext/60 font-light leading-relaxed">
                Meticulous attention to detail in preparation and presentation. Every plate is considered a masterpiece of culinary architecture.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: CTA */}
        <div className="cta-section pb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-primary mb-8">Ready to curate your next experience?</h2>
          <Link to="/contact" className="inline-block px-8 py-3.5 bg-primary text-darkbg font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-lighttext transition-colors duration-300 hover:-translate-y-1 transform">
            Start Your Flavor Journey
          </Link>
        </div>

      </div>
    </div>
  );
};

export default About;
