import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, RefreshCw, CheckCircle2, AlertTriangle, ExternalLink, 
  Search, X, ChevronLeft, ChevronRight, Maximize2, Sparkles, 
  ShieldCheck, Camera, ArrowRight, Heart, Grid, LayoutGrid, Flame 
} from 'lucide-react';
import { galleryData } from '../data/galleryData';
import { siteConfig } from '../data/siteConfig';
import GridMotionBackground from '../components/GridMotionBackground';

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' | 'large' | 'compact'
  
  // Spotlight Slider state
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  // Interactive likes state
  const [likes, setLikes] = useState({});
  const [likedAnim, setLikedAnim] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const galleryRes = await fetch(`${API_BASE}/api/gallery`);
      if (galleryRes.ok) {
        const galleryDataJson = await galleryRes.json();
        if (galleryDataJson.images && galleryDataJson.images.length > 0) {
          setImages(galleryDataJson.images);
        } else {
          setImages(galleryData);
        }
      } else {
        setImages(galleryData);
      }
    } catch (err) {
      console.warn("Could not connect to backend server. Using offline mock gallery.", err);
      setImages(galleryData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Spotlight Auto Slider
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % Math.min(images.length, 5));
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Handle Like Increment
  const handleLike = (e, id) => {
    e.stopPropagation();
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setLikedAnim(id);
    setTimeout(() => setLikedAnim(null), 1200);
  };

  // Dynamically extract categories
  const categories = ['All', ...new Set(images.map(img => img.category || 'Catering'))];

  // Filter images
  const filteredImages = images.filter(img => {
    const matchesCategory = activeCategory === 'All' || img.category === activeCategory;
    const titleMatch = (img.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const catMatch = (img.category || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && (titleMatch || catMatch);
  });

  // Featured Spotlight Items (Top 5)
  const spotlightItems = images.slice(0, 5);
  const currentSpotlight = spotlightItems[spotlightIndex] || images[0];

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredImages.length]);

  const handleNextImage = () => {
    if (selectedIndex === null || filteredImages.length === 0) return;
    setSelectedIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const handlePrevImage = () => {
    if (selectedIndex === null || filteredImages.length === 0) return;
    setSelectedIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  // 3D Tilt Card Interaction Handler
  const handleMouseMoveTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${(-y / rect.height) * 12}deg) rotateY(${(x / rect.width) * 12}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeaveTilt = (e) => {
    e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const selectedItem = selectedIndex !== null ? filteredImages[selectedIndex] : null;

  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-32 bg-darkbg min-h-screen relative overflow-hidden font-sans text-lighttext selection:bg-primary selection:text-darkbg">
      {/* Stitch Micro-Animation Styles */}
      <style>{`
        @keyframes stitchFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes stitchPulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.38; transform: scale(1.07); }
        }
        @keyframes floatUpHeart {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-35px) scale(1.4); }
        }
        .stitch-card {
          background: rgba(20, 54, 37, 0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(212, 175, 55, 0.22);
          transition: transform 0.2s ease-out, border-color 0.35s ease, box-shadow 0.35s ease;
          transform-style: preserve-3d;
        }
        .stitch-card:hover {
          border-color: rgba(255, 224, 102, 0.6);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px -5px rgba(212, 175, 55, 0.25);
        }
        .stitch-chip-active {
          background: #d4af37 !important;
          color: #081c12 !important;
          font-weight: 700;
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.4);
        }
        .animate-stitch-up {
          animation: stitchFadeUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-stitch-pulse {
          animation: stitchPulse 7.5s ease-in-out infinite;
        }
        .anim-float-heart {
          animation: floatUpHeart 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* React Bits Interactive Motion Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <GridMotionBackground
          particleColor="#ffe066"
          lineColor="rgba(255, 224, 102, 0.28)"
          particleCount={70}
          speed={0.55}
          interactive={true}
        />
        <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full filter blur-[150px] animate-stitch-pulse"></div>
        <div className="absolute bottom-1/3 right-10 w-[700px] h-[700px] bg-secondary/60 rounded-full filter blur-[170px] animate-stitch-pulse" style={{ animationDelay: '-3.5s' }}></div>
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-darkbg to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-darkbg to-transparent"></div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        
        {/* ================= HERO HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-8 animate-stitch-up">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-secondary/70 backdrop-blur-md border border-primary/30 px-4 py-1.5 rounded-full mb-4 text-xs font-medium shadow-lg">
            <span className="flex items-center gap-1.5 text-primary font-bold">
              <Camera className="w-4 h-4 text-primary" /> Interactive Portfolio
            </span>
            <span className="text-lighttext/30">•</span>
            <span className="text-lighttext/80 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Authentic Kerala Celebrations
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-lighttext leading-[1.15] mb-3">
            Krishna Catering <br className="hidden sm:inline" />
            <span className="text-primary italic font-serif">Visual Gallery</span>
          </h1>

          <p className="text-base sm:text-lg text-lighttext/70 font-light leading-relaxed max-w-2xl mx-auto">
            Experience our traditional Kerala Sadyas, wedding banquets, and culinary art with interactive 3D cards and spotlight showcases.
          </p>
        </div>

        {/* ================= FEATURED SPOTLIGHT CAROUSEL ================= */}
        {currentSpotlight && (
          <div className="mb-12 stitch-card rounded-3xl overflow-hidden relative shadow-2xl border border-primary/30 animate-stitch-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[360px]">
              
              {/* Image Side */}
              <div className="lg:col-span-7 h-64 sm:h-80 lg:h-[380px] relative overflow-hidden bg-darkbg">
                <img
                  src={currentSpotlight.proxyFullImage || currentSpotlight.fullImage || currentSpotlight.image}
                  alt={currentSpotlight.title || 'Featured Event'}
                  className="w-full h-full object-cover transition-transform duration-1000 scale-105"
                  onError={(e) => { e.target.src = "/images/sadya.jpeg"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-darkbg/40 to-darkbg/95 hidden lg:block"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-darkbg via-transparent to-transparent lg:hidden"></div>

                <div className="absolute top-4 left-4 bg-primary text-darkbg px-3.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <Flame className="w-3.5 h-3.5" /> Featured Spotlight
                </div>
              </div>

              {/* Text Side */}
              <div className="lg:col-span-5 p-6 sm:p-8 text-left flex flex-col justify-between h-full space-y-4">
                <div>
                  <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-2 font-mono">
                    Category: {currentSpotlight.category || 'Kerala Sadya'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-lighttext leading-tight mb-3">
                    {currentSpotlight.title || 'Traditional Kerala Sadya Feast'}
                  </h2>
                  <p className="text-xs sm:text-sm text-lighttext/70 font-light leading-relaxed">
                    Prepared with authentic spices, fresh coconut oil, and served on traditional banana leaves for your most cherished celebrations.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    {spotlightItems.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSpotlightIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          spotlightIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'
                        }`}
                        title={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="px-6 py-2.5 bg-primary text-darkbg font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-primary/95 transition-all flex items-center gap-2 shadow-lg"
                  >
                    <span>Book This Style</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= FILTER & LAYOUT CONTROL BAR ================= */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-white/10 gap-4">
          
          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 justify-start items-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedIndex(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'stitch-chip-active border-primary scale-105'
                    : 'bg-secondary/40 hover:bg-secondary/70 text-lighttext/80 hover:text-lighttext border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar & Grid View Toggles */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0 md:w-64">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-lighttext/40">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2 bg-secondary/60 border border-primary/25 text-lighttext rounded-full focus:outline-none focus:ring-2 focus:ring-primary/60 text-xs transition-all placeholder:text-lighttext/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-lighttext/50 hover:text-primary"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Layout Mode Selector Buttons */}
            <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-full border border-white/10 shrink-0">
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded-full transition-all ${layoutMode === 'grid' ? 'bg-primary text-darkbg' : 'text-lighttext/60 hover:text-primary'}`}
                title="4-Column Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('large')}
                className={`p-1.5 rounded-full transition-all ${layoutMode === 'large' ? 'bg-primary text-darkbg' : 'text-lighttext/60 hover:text-primary'}`}
                title="3-Column Large View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* ================= GALLERY IMAGES GRID WITH 3D TILT & LIKES ================= */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <RefreshCw className="w-10 h-10 text-primary animate-spin" />
            <p className="text-lighttext/50 text-xs tracking-widest uppercase">Loading Interactive Gallery...</p>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-24 stitch-card rounded-3xl">
            <Sparkles className="w-12 h-12 text-primary/40 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-lighttext mb-1">No images found</h3>
            <p className="text-xs text-lighttext/50">Try clearing search or picking another category filter.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-5 py-2.5 bg-primary text-darkbg rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary/90 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div 
            className={`grid gap-5 ${
              layoutMode === 'large' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}
          >
            {filteredImages.map((item, index) => {
              const itemId = item.id || index;
              const likeCount = likes[itemId] || 0;
              const isAnimating = likedAnim === itemId;

              return (
                <div 
                  key={itemId}
                  className="stitch-card rounded-2xl overflow-hidden relative group aspect-square cursor-pointer border border-white/10"
                  onMouseMove={handleMouseMoveTilt}
                  onMouseLeave={handleMouseLeaveTilt}
                  onClick={() => setSelectedIndex(index)}
                >
                  {/* Floating Heart +1 Animation */}
                  {isAnimating && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none font-bold text-red-400 text-lg flex items-center gap-1 anim-float-heart">
                      <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                      <span>+1</span>
                    </div>
                  )}

                  <img 
                    src={item.proxyImage || item.image} 
                    alt={item.title || 'Krishna Caterers Event'} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      if (item.image && e.target.src !== item.image && !e.target.dataset.triedOriginal) {
                        e.target.dataset.triedOriginal = "true";
                        e.target.src = item.image;
                      } else if (!e.target.dataset.triedFallback) {
                        e.target.dataset.triedFallback = "true";
                        e.target.src = "/images/sadya.jpeg";
                      }
                    }}
                  />
                  
                  {/* Category Pill Top Left */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-darkbg/80 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-primary/30 shadow-md">
                      {item.category || 'Sadya'}
                    </span>
                  </div>

                  {/* Heart Like Button Top Right */}
                  <button
                    onClick={(e) => handleLike(e, itemId)}
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-darkbg/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-lighttext/80 hover:text-red-400 hover:scale-110 transition-all shadow-md group/heart"
                    title="Like this photo"
                  >
                    <Heart className={`w-4 h-4 ${likeCount > 0 ? 'fill-red-500 text-red-500' : 'group-hover/heart:text-red-400'}`} />
                    {likeCount > 0 && (
                      <span className="absolute -bottom-1 -right-1 text-[9px] font-bold bg-primary text-darkbg rounded-full w-4 h-4 flex items-center justify-center">
                        {likeCount}
                      </span>
                    )}
                  </button>

                  {/* Stitch Hover Card Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-darkbg/95 via-darkbg/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-5 text-left">
                    <div className="flex justify-between items-start pt-8">
                      <span className="text-[10px] text-lighttext/60 uppercase font-mono">
                        Tap to expand
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-lighttext hover:text-primary transition-colors">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lighttext font-serif font-bold text-base sm:text-lg leading-snug mb-1">
                        {item.title}
                      </h3>
                      <p className="text-primary text-[10px] uppercase font-bold tracking-widest flex items-center gap-1">
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= INSTAGRAM & BOOKING FOOTER BANNER ================= */}
        <div className="mt-16 stitch-card p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-xs text-primary font-bold uppercase tracking-widest block mb-1">
              Want to see more live event stories?
            </span>
            <h3 className="text-2xl font-serif font-bold text-lighttext mb-1">
              Follow Us on Instagram & Facebook
            </h3>
            <p className="text-xs text-lighttext/60 font-light">
              Catch behind-the-scenes videos of our traditional Sadya kitchens, live buffet counters, and client testimonials.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a 
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl border border-white/15 hover:border-primary text-lighttext hover:text-primary bg-white/5 transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" /> Instagram
            </a>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-primary text-darkbg font-bold text-xs uppercase tracking-wider hover:bg-primary/95 shadow-lg transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Book Your Event
            </Link>
          </div>
        </div>

      </div>

      {/* ================= STITCH LIGHTBOX MODAL WITH NEXT/PREV CONTROLS ================= */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 transition-all animate-stitch-up"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Top Control Bar */}
          <div 
            className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-secondary/80 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-lighttext/80 flex items-center gap-2">
              <span className="text-primary font-serif font-bold">{selectedItem.category || 'Gallery'}</span>
              <span className="text-lighttext/30">•</span>
              <span>Photo {selectedIndex + 1} of {filteredImages.length}</span>
            </div>

            <button
              onClick={() => setSelectedIndex(null)}
              className="p-2.5 rounded-full bg-secondary/80 border border-white/15 text-lighttext hover:text-primary hover:bg-darkbg transition-all"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            className="absolute left-3 sm:left-6 z-20 p-3 rounded-full bg-secondary/70 border border-white/15 text-lighttext hover:text-primary hover:bg-darkbg hover:scale-110 transition-all shadow-2xl"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image & Title Frame */}
          <div 
            className="relative max-w-5xl max-h-[82vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedItem.proxyFullImage || selectedItem.fullImage || selectedItem.proxyImage || selectedItem.image} 
              alt={selectedItem.title || 'Krishna Caterers Event Photo'} 
              className="max-w-full max-h-[72vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
              onError={(e) => {
                e.target.src = "/images/sadya.jpeg";
              }}
            />

            {/* Bottom Caption & CTA */}
            <div className="mt-4 text-center max-w-xl bg-secondary/70 backdrop-blur-md border border-primary/20 p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-primary tracking-widest block">
                  {selectedItem.category || 'Kerala Sadya'}
                </span>
                <h3 className="text-lg font-serif font-bold text-lighttext">
                  {selectedItem.title}
                </h3>
              </div>
              <Link
                to="/contact"
                onClick={() => setSelectedIndex(null)}
                className="px-5 py-2.5 bg-primary text-darkbg font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-primary/95 transition-all shrink-0 flex items-center gap-1.5 shadow-md"
              >
                <span>Book This Style</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            className="absolute right-3 sm:right-6 z-20 p-3 rounded-full bg-secondary/70 border border-white/15 text-lighttext hover:text-primary hover:bg-darkbg hover:scale-110 transition-all shadow-2xl"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

        </div>
      )}
    </div>
  );
};

export default Gallery;


