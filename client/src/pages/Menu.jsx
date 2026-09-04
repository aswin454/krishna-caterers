import React, { useState, useEffect } from 'react';
import { menuData } from '../data/menuData';
import StrokeText from '../components/StrokeText';

const Menu = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-darkbg min-h-screen pb-20">
      {/* Half Size Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full flex items-center justify-center px-4 md:px-8 pt-20">
        <div className="absolute inset-0 z-0">
          <img src="/images/menu.jpeg" alt="Our Menu" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-center w-full max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-primary">Our Menu</h1>
          <p className="text-base sm:text-lg text-lighttext/90 max-w-2xl mx-auto px-4">Explore our wide variety of authentic vegetarian delicacies.</p>
        </div>
      </div>

      {/* Catering Menus Intro Section */}
      <section className="w-full px-4 md:px-8 py-16 md:py-24 relative overflow-hidden bg-darkbg border-b border-white/5">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/menu2.jpeg"
            alt="Catering Background"
            className="w-full h-full object-cover opacity-30"
          />
          {/* Faded overlay to ensure text visibility (shady) */}
          <div className="absolute inset-0 bg-[#081c12]/50"></div>
          {/* Smooth top and bottom gradient fades to blend */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-darkbg to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-darkbg to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-24 items-center relative z-10">
          <div className="w-full md:w-5/12 text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight text-lighttext">
              Catering Menus with a <br />
              <span className="font-semibold text-primary">Personal Touch</span>
            </h2>
          </div>
          <div className="w-full md:w-7/12 text-left">
            <p className="text-base md:text-lg text-lighttext/70 leading-relaxed">
              Our experienced event specialists will help you plan a customized catering menu that incorporates your special event details, including party themes, special tastes, or special diets. The Krishna Caterers team looks forward to designing a menu uniquely suited to you – or select your menu from our extensive selections. Our event planners would love to meet with you and help you design a menu that is uniquely suited to your event.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Grid - Displaying all items directly */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-darkbg border-t border-white/5">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/menu2.jpeg"
            alt="Catering Background"
            className="w-full h-full object-cover opacity-15"
          />
          {/* Faded overlay to ensure text/card visibility */}
          <div className="absolute inset-0 bg-[#081c12]/70"></div>
          {/* Smooth top and bottom gradient fades to blend */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-darkbg to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-darkbg to-transparent"></div>
        </div>

        <div className="w-full px-4 md:px-8 max-w-7xl mx-auto relative z-10">
          <div className="mb-10 md:mb-16 text-left">
            <StrokeText
              text="Our Delicious Offerings"
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
              className="mb-4"
            />
            <p className="text-lighttext/70 text-sm sm:text-base max-w-2xl">Experience the rich, authentic flavors of our featured dishes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {menuData.map(item => (
              <div
                key={item.id}
                className="bg-secondary/70 backdrop-blur-sm border border-primary/20 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 sm:h-60 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-80"></div>
                    <span className="absolute top-4 right-4 bg-darkbg/80 backdrop-blur-md text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/30">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5 md:p-6 text-left">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-lighttext group-hover:text-primary transition-colors">{item.name}</h3>
                    <p className="text-lighttext/70 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center md:text-left mt-12 md:mt-16 pt-8 border-t border-white/5">
            <button className="btn-secondary text-primary border-primary/40 hover:bg-primary hover:text-darkbg w-full sm:w-auto">
              Download Full Menu (PDF)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
