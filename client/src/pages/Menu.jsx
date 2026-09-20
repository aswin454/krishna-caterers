import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChefHat, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { menuData, menuCategories } from '../data/menuData';
import StrokeText from '../components/StrokeText';

const Menu = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = ['All', ...new Set(menuData.map(item => item.category))];

  const filteredItems = menuData.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-darkbg min-h-screen pb-20 font-sans text-lighttext selection:bg-primary selection:text-darkbg">
      {/* Half Size Hero Section */}
      <div className="relative h-[48vh] md:h-[54vh] w-full flex items-center justify-center px-4 md:px-8 pt-28 md:pt-36 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/menu.jpeg" 
            alt="Krishna Caterers Authentic Menu" 
            className="w-full h-full object-cover scale-105 filter brightness-75"
            onError={(e) => {
              e.target.style.display = 'none';
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-darkbg/80 via-black/60 to-darkbg"></div>
        </div>
        
        <div className="relative z-10 text-center w-full max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-md border border-primary/30 px-4 py-1.5 rounded-full mb-4 text-xs font-bold text-primary shadow-lg">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Traditional Pure Vegetarian Menu</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 text-primary tracking-wide">
            Our Traditional Menu
          </h1>

          <p className="text-base sm:text-lg text-lighttext/90 max-w-2xl mx-auto px-4 leading-relaxed font-light">
            Explore our curated selection of authentic Kerala vegetarian delicacies, prepared with traditional recipes, handpicked ingredients, and pure coconut oil.
          </p>
        </div>
      </div>

      {/* Catering Menus Intro Section */}
      <section className="w-full px-4 md:px-8 py-16 md:py-24 relative overflow-hidden bg-darkbg border-b border-white/5">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/menu2.jpeg"
            alt="Catering Background"
            className="w-full h-full object-cover opacity-20"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-[#081c12]/60"></div>
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-darkbg to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-darkbg to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-24 items-center relative z-10">
          <div className="w-full md:w-5/12 text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light leading-tight text-lighttext">
              Catering Menus with a <br />
              <span className="font-serif font-semibold text-primary">Personal Touch</span>
            </h2>
          </div>
          <div className="w-full md:w-7/12 text-left space-y-4">
            <p className="text-base md:text-lg text-lighttext/70 leading-relaxed font-light">
              Our experienced event specialists will help you plan a customized catering menu that incorporates your special event details, including wedding Sadya traditions, party themes, or custom family taste preferences.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-primary font-bold bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" /> 20+ Sadya Dishes Available
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                <HeartHandshake className="w-3.5 h-3.5" /> Custom Menu Planning
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Grid - Displaying items with interactive Category Tabs & Search */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-darkbg border-t border-white/5">
        <div className="w-full px-4 md:px-8 max-w-7xl mx-auto relative z-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 md:mb-12 gap-6">
            <div className="text-left">
              <StrokeText
                text="Our Culinary Offerings"
                strokeColor="#d4af37"
                fillColor="#e7d12bff"
                strokeWidth={1.5}
                drawDuration={1.8}
                fillDelay={0.3}
                stagger={0.08}
                ease="power2.out"
                trigger="scroll"
                fillMode="fade"
                fontSize={isMobile ? 32 : 56}
                fontWeight={800}
                letterSpacing={-1}
                className="mb-3"
              />
              <p className="text-lighttext/70 text-sm sm:text-base max-w-2xl font-light">
                Discover our signature dishes cooked fresh for every celebration.
              </p>
            </div>

            {/* Search Input Bar */}
            <div className="w-full md:w-72 relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-lighttext/40">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-secondary/60 border border-primary/25 text-lighttext rounded-full focus:outline-none focus:ring-2 focus:ring-primary/60 text-xs transition-all placeholder:text-lighttext/40"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-lighttext/50 hover:text-primary"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex flex-wrap gap-2.5 mb-10 justify-start relative z-20">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-primary text-darkbg border-primary shadow-[0_0_15px_rgba(212,175,55,0.35)] scale-105'
                    : 'bg-secondary/40 hover:bg-secondary/70 text-lighttext/80 hover:text-lighttext border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-secondary/30 rounded-3xl border border-white/10">
              <ChefHat className="w-12 h-12 text-primary/50 mx-auto mb-3 animate-pulse" />
              <h3 className="text-lg font-bold text-lighttext mb-1">No items found</h3>
              <p className="text-xs text-lighttext/50">Try selecting a different category or clearing your search phrase.</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 bg-primary text-darkbg rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-primary/90 transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className="bg-secondary/50 backdrop-blur-md border border-primary/20 rounded-3xl overflow-hidden group hover:border-primary/50 transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    <div className="h-52 sm:h-64 overflow-hidden relative bg-darkbg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-darkbg via-transparent to-transparent opacity-90"></div>
                      <span className="absolute top-4 right-4 bg-darkbg/85 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-primary/30">
                        {item.category}
                      </span>
                      <span className="absolute bottom-3 left-4 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Pure Veg
                      </span>
                    </div>

                    <div className="p-6 text-left">
                      <h3 className="text-xl font-serif font-bold mb-2 text-lighttext group-hover:text-primary transition-colors capitalize">
                        {item.name}
                      </h3>
                      <p className="text-lighttext/70 text-xs sm:text-sm leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 text-left">
                    <Link
                      to="/contact"
                      className="w-full py-2.5 px-4 bg-white/5 hover:bg-primary text-lighttext hover:text-darkbg border border-white/10 hover:border-primary rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md"
                    >
                      <span>Inquire For Event</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Call to Action */}
          <div className="text-center md:text-left mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-secondary/30 p-8 rounded-3xl border border-primary/15">
            <div>
              <h3 className="text-xl font-serif font-bold text-primary mb-1">Looking for a custom menu combo?</h3>
              <p className="text-xs sm:text-sm text-lighttext/60 font-light">We offer complete custom Sadya and buffet packages for weddings, engagements, and grand functions.</p>
            </div>
            <Link 
              to="/contact" 
              className="px-8 py-3.5 bg-primary text-darkbg font-bold rounded-xl hover:bg-primary/95 transition-all text-xs uppercase tracking-wider shrink-0 shadow-lg flex items-center gap-2"
            >
              <span>Request Custom Menu Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Menu;

