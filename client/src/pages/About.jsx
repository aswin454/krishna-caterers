import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Gem, Leaf, Palette, ArrowRight, ShieldCheck, Star, 
  Award, Heart, Users, Utensils, CheckCircle2, Sparkles, ChefHat 
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import LightRays from '../components/LightRays';
import ScrollExpand from '../components/ScrollExpand';
import GridMotionBackground from '../components/GridMotionBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2000",
    title: "Humble Beginnings",
    desc: "Inspired by generations of traditional Kerala recipes, we began our journey serving authentic vegetarian feasts prepared with pure coconut oil, hand-ground spices, and absolute dedication to tradition.",
    image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2010",
    title: "1000+ Celebrations Milestone",
    desc: "Crossed 1,000 successful catering functions across Ernakulam and central Kerala, gaining a reputation for uncompromised Sadya quality and gracious hospitality.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2015",
    title: "Expanding Horizons",
    desc: "Expanded our infrastructure with state-of-the-art kitchen facilities and dedicated banqueting staff while preserving our 100% pure vegetarian promise.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2018",
    title: "A Shift to Luxury Weddings",
    desc: "Elevated our presentation with custom dining setups, artisanal payasam stalls, and premium banana leaf service for grand luxury weddings.",
    image: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2022",
    title: "Award-Winning Excellence",
    desc: "Honored with Regional Culinary Excellence recognition for preserving Kerala's traditional vegetarian Sadya heritage and innovative buffet designs.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "Today",
    title: "Artisanal Mastery",
    desc: "Over 25+ years of tradition and thousands of joyous celebrations. We continue to innovate our menu offerings while serving every guest like family.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const stats = [
  { label: "Years of Culinary Heritage", value: "25+", icon: Award },
  { label: "Events & Sadyas Catered", value: "1,200+", icon: Users },
  { label: "Pure Vegetarian Recipes", value: "100%", icon: Leaf },
  { label: "Client Satisfaction Rating", value: "4.9 ★", icon: Star }
];

const bgPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd' fill-opacity='0.05'%3E%3Cg fill='%23d4af37'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const About = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const pathRef = useRef(null);
  const mobilePathRef = useRef(null);

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

      // Path Animations (Desktop & Mobile)
      [pathRef, mobilePathRef].forEach(ref => {
        if (ref.current) {
          const path = ref.current;
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
      });

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
    <div className="relative bg-darkbg min-h-screen font-sans text-center overflow-hidden selection:bg-primary selection:text-darkbg" ref={containerRef}>
      {/* Google Stitch Custom Keyframe Styles */}
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
          transform: translateY(-3px);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 25px -5px rgba(212, 175, 55, 0.18);
        }
        .animate-stitch-pulse {
          animation: stitchPulse 7.5s ease-in-out infinite;
        }
      `}</style>

      {/* React Bits Bright Motion Canvas & Lighting Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* React Bits Canvas Particles */}
        <GridMotionBackground
          particleColor="#ffe066"
          lineColor="rgba(255, 224, 102, 0.35)"
          particleCount={75}
          speed={0.55}
          interactive={true}
        />

        {/* WebGL Light Rays */}
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

        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: bgPattern, backgroundSize: '60px 60px' }}></div>
        
        {/* Glowing Ambient Light Orbs */}
        <div className="absolute top-10 left-10 w-[600px] h-[600px] bg-primary/20 rounded-full filter blur-[150px] animate-stitch-pulse"></div>
        <div className="absolute bottom-10 right-10 w-[650px] h-[650px] bg-secondary/60 rounded-full filter blur-[160px] animate-stitch-pulse" style={{ animationDelay: '-3.5s' }}></div>
      </div>

      <div className="relative z-10 pt-28 md:pt-36 pb-24 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section 1: Hero Intro */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          
          {/* Status Badge Pills */}
          <div className="hero-intro inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-secondary/70 backdrop-blur-md border border-primary/30 px-4 py-1.5 rounded-full mb-6 text-xs font-medium shadow-lg">
            <span className="flex items-center gap-1.5 text-primary font-bold">
              <Star className="w-4 h-4 fill-primary text-primary" /> 4.9 Rating
            </span>
            <span className="text-lighttext/30">•</span>
            <span className="text-lighttext/80 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Pure Veg Sadya
            </span>
            <span className="text-lighttext/30">•</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              25+ Years Legacy
            </span>
          </div>

          <h1 className="hero-intro text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-lighttext leading-[1.15] mb-6">
            Our Journey to <br />
            <span className="text-primary italic font-serif">Artisanal Excellence</span>
          </h1>

          <p className="hero-intro text-base sm:text-lg text-lighttext/80 leading-relaxed font-light max-w-2xl mx-auto">
            We are <strong className="text-primary">{siteConfig.businessName}</strong>, a premier traditional catering house dedicated to elevating Kerala's authentic vegetarian cuisine into an extraordinary celebration of taste.
          </p>
        </div>

        {/* Hero Image with ScrollExpand */}
        <div className="hero-intro w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden mb-24 relative shadow-2xl border border-primary/20">
          <ScrollExpand
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Chef preparing fine dining"
            title="Artisanal Mastery"
            scrollHint="Scroll to expand view"
            useWindowScroll={true}
            startWidth={75}
            startHeight={78}
            startRadius={24}
            endRadius={0}
            mediaZoom={1.25}
            scrollDistance={0.8}
            holdDistance={0.2}
            overlayScrim={0.85}
          >
            <div className="max-w-3xl text-center px-4">
              <div className="inline-flex items-center gap-2 bg-primary text-darkbg px-3.5 py-1 rounded-full font-bold text-xs uppercase tracking-wider mb-4 shadow-lg">
                <ChefHat className="w-4 h-4" /> Traditional Master Chefs
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-primary mb-4 font-bold tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                Crafted with Tradition. Served with Elegance.
              </h2>
              <p className="text-sm sm:text-lg text-lighttext/90 max-w-xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Every event we cater is a symphony of authentic Kerala flavours, handpicked spices, pure coconut oil, and immaculate banana leaf presentation.
              </p>
            </div>
          </ScrollExpand>
        </div>

        {/* Stats & Achievements Highlights Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-28">
          {stats.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className="stitch-card p-6 rounded-3xl text-center relative group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-3 text-primary group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-1">{item.value}</h3>
                <p className="text-xs text-lighttext/70 font-light">{item.label}</p>
              </div>
            );
          })}
        </div>

        {/* Section 2: Scrolly Curved Timeline */}
        <div className="relative max-w-5xl mx-auto py-10 mb-28" ref={timelineRef}>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4" /> Our Legacy
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-lighttext mb-4">
              The Path We Traveled
            </h2>
            <p className="text-sm sm:text-base text-lighttext/70 font-light max-w-xl mx-auto">
              How decades of passion, family recipes, and commitment shaped Krishna Caterers into a household name.
            </p>
          </div>

          <div className="relative">
            {/* Desktop SVG Curve */}
            <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[150px] pointer-events-none">
              <svg viewBox="0 0 100 1200" preserveAspectRatio="none" className="w-full h-full">
                <path d="M 50 0 C 50 40, 100 60, 100 100 C 100 180, 0 220, 0 300 C 0 380, 100 420, 100 500 C 100 580, 0 620, 0 700 C 0 780, 100 820, 100 900 C 100 980, 0 1020, 0 1100 C 0 1140, 50 1160, 50 1200" fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="4 4" className="opacity-25" />
                <path ref={pathRef} d="M 50 0 C 50 40, 100 60, 100 100 C 100 180, 0 220, 0 300 C 0 380, 100 420, 100 500 C 100 580, 0 620, 0 700 C 0 780, 100 820, 100 900 C 100 980, 0 1020, 0 1100 C 0 1140, 50 1160, 50 1200" fill="none" stroke="#ffd700" strokeWidth="4" />
              </svg>
            </div>

            {/* Mobile Vertical Line */}
            <div className="sm:hidden absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] pointer-events-none z-10">
              <svg viewBox="0 0 2 1200" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                <line x1="1" y1="0" x2="1" y2="1200" stroke="#d4af37" strokeWidth="2" strokeDasharray="4 4" className="opacity-25" />
                <path ref={mobilePathRef} d="M 1 0 L 1 1200" fill="none" stroke="#ffd700" strokeWidth="3" />
              </svg>
            </div>

            {/* The Items */}
            <div className="space-y-16 sm:space-y-0 relative z-10 flex flex-col">
              {milestones.map((m, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className="relative sm:h-[320px] flex items-center w-full justify-center">

                    {/* Mobile Layout (Stack) */}
                    <div className="sm:hidden flex flex-col items-center w-full relative z-10 pt-6">
                      <div className="milestone-dot absolute top-0 left-1/2 transform -translate-x-1/2 w-7 h-7 rounded-full bg-darkbg border-[4px] border-primary shadow-[0_0_20px_rgba(255,215,0,0.9)] z-20"></div>
                      <div className="milestone-content flex flex-col items-center text-center p-4 w-full mt-4">
                        <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 border border-primary/20 shadow-xl">
                          <img src={m.image} alt={m.title} className="w-full h-full object-cover filter brightness-90" />
                        </div>
                        <span className="text-3xl font-serif font-bold text-primary mb-1 block">{m.year}</span>
                        <h3 className="text-lg font-bold text-lighttext mb-2">{m.title}</h3>
                        <p className="text-xs text-lighttext/80 leading-relaxed font-light">{m.desc}</p>
                      </div>
                    </div>

                    {/* Desktop Layout (Alternating sides) */}
                    <div className="hidden sm:flex w-full items-center justify-between relative h-full">

                      {/* Left Side Container */}
                      <div className={`w-[42%] milestone-content ${isEven ? 'text-right' : 'text-left'}`}>
                        {isEven ? (
                          <div className="p-4 text-right">
                            <span className="text-4xl lg:text-6xl font-serif font-bold text-primary mb-2 block">{m.year}</span>
                            <h3 className="text-xl lg:text-2xl font-bold text-lighttext mb-3">{m.title}</h3>
                            <p className="text-xs sm:text-sm text-lighttext/85 leading-relaxed font-light">{m.desc}</p>
                          </div>
                        ) : (
                          <div className="w-full h-[230px] rounded-3xl overflow-hidden border border-primary/20 shadow-2xl group">
                            <img src={m.image} alt={m.title} className="w-full h-full object-cover filter brightness-90 group-hover:scale-108 transition-transform duration-700" />
                          </div>
                        )}
                      </div>

                      {/* Center Node (Dot) */}
                      <div
                        className="milestone-dot absolute top-1/2 z-10 w-6 h-6 rounded-full bg-darkbg border-[4px] border-primary shadow-[0_0_25px_rgba(255,215,0,0.9)]"
                        style={{
                          left: `calc(50% ${isEven ? '+' : '-'} 75px)`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      ></div>

                      {/* Right Side Container */}
                      <div className={`w-[42%] milestone-content ${!isEven ? 'text-left' : 'text-right'}`}>
                        {!isEven ? (
                          <div className="p-4 text-left">
                            <span className="text-4xl lg:text-6xl font-serif font-bold text-primary mb-2 block">{m.year}</span>
                            <h3 className="text-xl lg:text-2xl font-bold text-lighttext mb-3">{m.title}</h3>
                            <p className="text-xs sm:text-sm text-lighttext/85 leading-relaxed font-light">{m.desc}</p>
                          </div>
                        ) : (
                          <div className="w-full h-[230px] rounded-3xl overflow-hidden border border-primary/20 shadow-2xl group">
                            <img src={m.image} alt={m.title} className="w-full h-full object-cover filter brightness-90 group-hover:scale-108 transition-transform duration-700" />
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
        <div className="pillar-section mb-24 border-t border-white/10 pt-20">
          <div className="pillar-header mb-12 text-center">
            <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Our Core Values
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-lighttext mb-3">Our Culinary Pillars</h2>
            <p className="text-xs sm:text-sm text-lighttext/60 font-light max-w-xl mx-auto">The unshakeable principles that guide every dish we cook and every event we serve.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Pillar 1 */}
            <div className="pillar-card stitch-card p-8 text-left rounded-3xl group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <Gem className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-lighttext mb-3 group-hover:text-primary transition-colors">Authenticity</h3>
              <p className="text-xs sm:text-sm text-lighttext/70 font-light leading-relaxed">
                Uncompromising dedication to original Kerala recipes, preserving the rich heritage of traditional Sadya curries, payasams, and starters.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="pillar-card stitch-card p-8 text-left rounded-3xl group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-lighttext mb-3 group-hover:text-emerald-400 transition-colors">Purity Guarantee</h3>
              <p className="text-xs sm:text-sm text-lighttext/70 font-light leading-relaxed">
                100% strictly pure vegetarian kitchen using fresh coconut oil, hand-ground spices, and ethically sourced organic ingredients.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="pillar-card stitch-card p-8 text-left rounded-3xl group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-lighttext mb-3 group-hover:text-primary transition-colors">Craft & Presentation</h3>
              <p className="text-xs sm:text-sm text-lighttext/70 font-light leading-relaxed">
                Meticulous attention to detail from traditional banana leaf dining table arrangements to modern, elegant buffet counters.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: CTA */}
        <div className="cta-section stitch-card p-10 rounded-3xl text-center max-w-4xl mx-auto shadow-2xl">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4" /> Start Planning
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-lighttext mb-4">
            Ready to Curate Your Unforgettable Feast?
          </h2>
          <p className="text-xs sm:text-base text-lighttext/70 font-light max-w-lg mx-auto mb-8 leading-relaxed">
            Let our master chefs craft a custom vegetarian menu tailored to your family tradition, guest count, and event vision.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/contact" 
              className="px-8 py-3.5 bg-primary text-darkbg font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-primary/95 transition-all shadow-xl flex items-center gap-2"
            >
              <span>Request Catering Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href={`tel:${siteConfig.contact.phone}`}
              className="px-8 py-3.5 border border-white/15 hover:border-primary text-lighttext hover:text-primary font-bold rounded-xl text-xs uppercase tracking-wider transition-all bg-white/5 flex items-center gap-2"
            >
              <span>Call Our Team</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;

