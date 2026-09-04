import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { Instagram, Facebook, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-lighttext pt-24 pb-4 overflow-hidden relative">
      <div className="w-full px-4 md:px-12 max-w-[1400px] mx-auto">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 relative z-10">
          
          {/* Left Column (Brand + Social) */}
          <div className="col-span-1 md:col-span-4 lg:col-span-5 pr-4 md:pr-12">
            <h2 className="text-xl md:text-2xl font-semibold leading-relaxed mb-8 text-lighttext/90">
              Krishna Caterers is the authentic and premium way to cater your special occasions.
            </h2>
            <div className="flex flex-wrap gap-4 mt-6">
              <a href={siteConfig.social?.instagram || '#'} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-lighttext/80 hover:bg-secondary">
                <Instagram size={20} />
              </a>
              <a href={siteConfig.social?.facebook || '#'} target="_blank" rel="noreferrer" aria-label="Facebook" className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-lighttext/80 hover:bg-secondary">
                <Facebook size={20} />
              </a>
              <a href={siteConfig.social?.whatsapp || '#'} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-lighttext/80 hover:bg-secondary">
                <MessageCircle size={20} />
              </a>
              <a href={`mailto:${siteConfig.contact?.email || 'contact@krishnacaterers.com'}`} aria-label="Email" className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-lighttext/80 hover:bg-secondary">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Navigation Columns */}
          <div className="col-span-1 md:col-span-8 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-6">
            
            <div className="border-t border-primary/20 pt-6">
              <h3 className="text-base font-bold mb-6 text-primary tracking-wide">Menu</h3>
              <ul className="space-y-4">
                <li><Link to="/menu" className="text-lighttext/70 hover:text-primary text-sm transition-colors font-medium">Authentic Dishes</Link></li>
                <li><Link to="/menu" className="text-lighttext/70 hover:text-primary text-sm transition-colors font-medium">Custom Menus</Link></li>
                <li><Link to="/menu" className="text-lighttext/70 hover:text-primary text-sm transition-colors font-medium">Special Combos</Link></li>
              </ul>
            </div>
            

            
            <div className="border-t border-primary/20 pt-6">
              <h3 className="text-base font-bold mb-6 text-primary tracking-wide">Company</h3>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-lighttext/70 hover:text-primary text-sm transition-colors font-medium">About Us</Link></li>
                <li>
                  <Link to="/contact" className="text-lighttext/70 hover:text-primary text-sm transition-colors font-medium flex items-center gap-2">
                    Contact 
                    <span className="text-[9px] font-bold bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider border border-primary/30">BOOK NOW</span>
                  </Link>
                </li>
                <li><Link to="/gallery" className="text-lighttext/70 hover:text-primary text-sm transition-colors font-medium">Gallery</Link></li>
              </ul>
            </div>

          </div>
        </div>
        
        {/* Massive Outline Text */}
        <div className="w-full relative mt-12 overflow-hidden flex justify-center border-b border-primary/20 pb-6 pointer-events-none">
          <h1 className="text-[14vw] md:text-[16vw] font-black tracking-widest uppercase select-none leading-none w-full text-center" 
              style={{ 
                color: 'transparent',
                WebkitTextStroke: '1px rgba(212, 175, 55, 0.25)', 
                backgroundImage: 'linear-gradient(180deg, transparent 20%, rgba(212, 175, 55, 0.08) 100%)',
                WebkitBackgroundClip: 'text'
              }}>
            KRISHNA
          </h1>
        </div>
        
        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-lighttext/50 pt-8 pb-4 space-y-4 md:space-y-0 relative z-10">
          <p>© 2026 {siteConfig.businessName} / Authentic Kerala Taste</p>
          <div className="flex flex-wrap justify-center space-x-6">
            <Link to="#" className="hover:text-primary transition-colors">Security</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of service</Link>
            <Link to="#" className="hover:text-primary transition-colors">Privacy policy</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
