import React, { useEffect, useRef } from 'react';
import { testimonialsData } from '../data/testimonialsData';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.from('.testimonial-header > *', {
        y: 40, 
        opacity: 0, 
        duration: 1, 
        stagger: 0.2, 
        ease: 'power3.out'
      });

      // Testimonial Cards Animation
      gsap.from('.testimonial-card', {
        scrollTrigger: {
          trigger: '.testimonial-grid',
          start: 'top 80%',
        },
        y: 50, 
        opacity: 0, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: 'back.out(1.2)'
      });

      // CTA Block Animation
      gsap.from('.testimonial-cta', {
        scrollTrigger: {
          trigger: '.testimonial-cta',
          start: 'top 85%',
        },
        scale: 0.95,
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-darkbg min-h-screen pt-32 pb-24 overflow-hidden" ref={containerRef}>
      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-left mb-20 testimonial-header">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary font-serif">What Our Clients Say</h1>
          <p className="text-lighttext/70 max-w-2xl text-lg">Real stories and experiences from the events we've proudly catered.</p>
          <div className="w-24 h-1 bg-primary mt-8 opacity-50"></div>
        </div>

        {/* Grid */}
        <div className="testimonial-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {testimonialsData.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card bg-secondary/60 backdrop-blur-sm border border-primary/20 p-8 md:p-10 rounded-3xl shadow-lg hover:border-primary/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="flex text-primary mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lighttext/85 italic mb-8 leading-relaxed text-lg">"{testimonial.review}"</p>
              </div>
              <div className="border-t border-primary/20 pt-6 mt-auto">
                <h4 className="font-bold text-primary text-xl mb-1">{testimonial.name}</h4>
                <p className="text-xs text-lighttext/60 font-bold uppercase tracking-widest">{testimonial.eventType}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Block */}
        <div className="testimonial-cta bg-primary text-darkbg rounded-[2rem] p-10 md:p-16 text-center md:text-left w-full shadow-[0_0_40px_rgba(212,175,55,0.2)] flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
          {/* Decorative Pattern in CTA */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd' fill-opacity='1'%3E%3Cg fill='%23081c12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif text-darkbg leading-tight">Planning Your Event?</h2>
            <p className="text-lg md:text-xl text-darkbg/80 font-medium">Let us make your special occasion delicious and unforgettable.</p>
          </div>
          
          <div className="relative z-10 whitespace-nowrap">
            <Link to="/contact" className="inline-block px-10 py-5 bg-darkbg text-primary font-bold uppercase tracking-widest text-sm rounded-full hover:bg-dark hover:scale-105 transition-all duration-300 shadow-xl border border-primary/20">
              Book Catering
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
