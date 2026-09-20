import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, ArrowRight, X, Check, HelpCircle, 
  User, Users, Calendar, ChefHat, Sparkles, Send, Copy, 
  Clock, Star, MessageSquare, ExternalLink, ChevronDown, 
  ShieldCheck, Navigation, HeartHandshake, CheckCircle2 
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const Contact = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding Sadya',
    eventDate: '',
    guestCount: '250',
    location: '',
    preferredMeal: 'Kerala Sadya',
    requirements: ''
  });

  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'error'

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setMealType = (meal) => {
    setFormData(prev => ({ ...prev, preferredMeal: meal }));
  };

  const setGuestsPreset = (count) => {
    setFormData(prev => ({ ...prev, guestCount: String(count) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const sendWhatsAppMessage = () => {
      const message = `*New Catering Enquiry - Krishna Caterers*
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email || 'N/A'}
*Event Type:* ${formData.eventType}
*Event Date:* ${formData.eventDate}
*Guests:* ${formData.guestCount}
*Location:* ${formData.location || 'N/A'}
*Meal Type:* ${formData.preferredMeal || 'N/A'}
*Requirements:* ${formData.requirements || 'N/A'}`;

      const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    };

    try {
      const response = await fetch(`${API_BASE}/api/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        sendWhatsAppMessage();
        setStatus('success');
      } else {
        throw new Error('Server returned an error');
      }
    } catch (error) {
      console.warn("Backend API request failed, falling back to instant WhatsApp dispatch:", error);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        sendWhatsAppMessage();
        setStatus('success');
      } catch (fallbackErr) {
        setStatus('error');
      }
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('enquiry-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsFormOpen(true);
    }
  };

  const mealOptions = [
    { label: 'Kerala Sadya', icon: ChefHat, description: 'Traditional Feast on Banana Leaf' },
    { label: 'Lunch Buffet', icon: Sparkles, description: 'Rich Vegetarian Spread' },
    { label: 'Dinner Buffet', icon: Sparkles, description: 'Delightful Evening Feast' },
    { label: 'Breakfast', icon: Clock, description: 'Fresh & Authentic Tiffin' },
    { label: 'High Tea & Snacks', icon: Star, description: 'Crisp Snacks & Beverages' },
  ];

  const guestPresets = [50, 100, 250, 500, 1000];

  const faqs = [
    {
      q: "How early should we book Krishna Caterers for our event?",
      a: "For major wedding celebrations and peak muhurtham dates, we recommend booking 1 to 3 months in advance. For smaller functions or family gatherings, 1 to 2 weeks notice is usually sufficient."
    },
    {
      q: "What is the minimum guest count required for booking?",
      a: "Our standard catering services begin at 50 guests for custom banquets and Sadya setups. For smaller private gatherings, please contact our team directly for tailored options."
    },
    {
      q: "Do you provide traditional banana leaves, servers, and dining setup?",
      a: "Yes! We specialize in authentic Kerala Sadya served traditionally on fresh banana leaves. Our experienced uniformed staff handle complete serving, dining counter setup, and post-meal cleanliness."
    },
    {
      q: "Can we customize the menu items according to our preferences?",
      a: "Absolutely. We pride ourselves on custom menu planning. You can choose specific payasams, curries, starters, or regional delicacies to suit your family customs and guest tastes."
    },
    {
      q: "Are all ingredients 100% pure vegetarian?",
      a: "Yes. Krishna Caterers operates a strictly 100% pure vegetarian kitchen with high standards of hygiene, fresh coconut oil, hand-ground spices, and premium local produce."
    }
  ];

  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-32 bg-darkbg min-h-screen relative overflow-hidden font-sans text-lighttext selection:bg-primary selection:text-darkbg">
      {/* Toast Notification for Copy to Clipboard */}
      {copiedField && (
        <div className="fixed top-24 right-4 z-50 bg-primary text-darkbg px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{copiedField} copied to clipboard!</span>
        </div>
      )}

      {/* Embedded Custom Styles for Google Stitch Micro-Animations */}
      <style>{`
        @keyframes stitchFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes stitchPulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.08); }
        }
        .stitch-card {
          background: rgba(20, 54, 37, 0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(212, 175, 55, 0.18);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .stitch-card:hover {
          border-color: rgba(212, 175, 55, 0.45);
          transform: translateY(-2px);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 25px -5px rgba(212, 175, 55, 0.12);
        }
        .stitch-chip {
          transition: all 0.25s ease;
        }
        .stitch-chip-active {
          background: #d4af37 !important;
          color: #081c12 !important;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(212, 175, 55, 0.35);
        }
        .animate-stitch-up {
          animation: stitchFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-stitch-pulse {
          animation: stitchPulse 7s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient Radial Background Lighting */}
      <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-[140px] pointer-events-none animate-stitch-pulse"></div>
      <div className="absolute bottom-1/3 right-10 w-[600px] h-[600px] bg-secondary/30 rounded-full filter blur-[160px] pointer-events-none animate-stitch-pulse" style={{ animationDelay: '-3.5s' }}></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= HERO HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 animate-stitch-up">
          {/* Rating & Pure Veg Status Pills */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-secondary/60 backdrop-blur-md border border-primary/30 px-4 py-1.5 rounded-full mb-6 text-xs sm:text-sm font-medium shadow-lg">
            <span className="flex items-center gap-1.5 text-primary font-bold">
              <Star className="w-4 h-4 fill-primary text-primary" /> 4.9 Rating
            </span>
            <span className="text-lighttext/30">•</span>
            <span className="text-lighttext/80 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Pure Veg Traditional Sadya
            </span>
            <span className="text-lighttext/30">•</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Accepting 2026 Bookings
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-lighttext leading-[1.15] mb-4 sm:mb-6">
            Get in Touch with <br className="hidden sm:inline" />
            <span className="text-primary italic font-serif">Krishna Caterers</span>
          </h1>

          <p className="text-base sm:text-lg text-lighttext/70 font-light leading-relaxed max-w-2xl mx-auto">
            Planning a grand wedding feast, traditional Sadya, or private celebration? Let us craft an authentic culinary experience tailored perfectly for your guests.
          </p>
        </div>

        {/* ================= QUICK CONTACT & COPY CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 md:mb-16">
          
          {/* Card 1: Phone */}
          <div className="stitch-card p-6 rounded-2xl relative group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80 block mb-1">Direct Line</span>
              <h3 className="text-lg font-bold text-lighttext mb-1">{siteConfig.contact.phone.trim()}</h3>
              <p className="text-xs text-lighttext/50 font-light mb-4">Instant assistance & booking enquiries</p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <a 
                href={`tel:${siteConfig.contact.phone}`}
                className="flex-1 bg-primary text-darkbg py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-center hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <Phone className="w-3.5 h-3.5" /> Call Now
              </a>
              <button
                onClick={() => copyToClipboard(siteConfig.contact.phone.trim(), 'Phone number')}
                className="p-2 border border-white/15 rounded-lg text-lighttext/70 hover:text-primary hover:border-primary/50 transition-all"
                title="Copy Phone Number"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="stitch-card p-6 rounded-2xl relative group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block mb-1">WhatsApp Chat</span>
              <h3 className="text-lg font-bold text-lighttext mb-1">{siteConfig.contact.whatsapp.trim()}</h3>
              <p className="text-xs text-lighttext/50 font-light mb-4">Fastest response for menu & pricing</p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <a 
                href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Chat
              </a>
              <button
                onClick={() => copyToClipboard(siteConfig.contact.whatsapp.trim(), 'WhatsApp number')}
                className="p-2 border border-white/15 rounded-lg text-lighttext/70 hover:text-emerald-400 hover:border-emerald-400/50 transition-all"
                title="Copy WhatsApp Number"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Email */}
          <div className="stitch-card p-6 rounded-2xl relative group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80 block mb-1">Email Us</span>
              <h3 className="text-sm font-bold text-lighttext truncate mb-1" title={siteConfig.contact.email}>{siteConfig.contact.email}</h3>
              <p className="text-xs text-lighttext/50 font-light mb-4">Official quotes & formal contracts</p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <a 
                href={`mailto:${siteConfig.contact.email}`}
                className="flex-1 border border-primary/40 hover:border-primary text-lighttext hover:text-primary py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 bg-white/5"
              >
                <Mail className="w-3.5 h-3.5" /> Mail Us
              </a>
              <button
                onClick={() => copyToClipboard(siteConfig.contact.email, 'Email address')}
                className="p-2 border border-white/15 rounded-lg text-lighttext/70 hover:text-primary hover:border-primary/50 transition-all"
                title="Copy Email Address"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 4: Working Hours & Location */}
          <div className="stitch-card p-6 rounded-2xl relative group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">Working Hours</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Open Daily
                </span>
              </div>
              <h3 className="text-base font-bold text-lighttext mb-1">8:00 AM – 9:00 PM IST</h3>
              <p className="text-xs text-lighttext/50 font-light mb-4">Chemmanadu, Thiruvaniyoor, Kerala</p>
            </div>
            <div className="pt-2 border-t border-white/5">
              <a 
                href={siteConfig.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-white/15 hover:border-primary/50 text-lighttext hover:text-primary py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 bg-white/5"
              >
                <Navigation className="w-3.5 h-3.5" /> Map Location
              </a>
            </div>
          </div>

        </div>

        {/* ================= MAIN CONTENT SPLIT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16" id="enquiry-form-section">
          
          {/* LEFT COLUMN: EMBEDDED STITCH ENQUIRY FORM (7 COLS ON DESKTOP) */}
          <div className="lg:col-span-7 stitch-card p-6 sm:p-8 md:p-10 rounded-3xl relative overflow-hidden">
            {/* Top Header Badge */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-1">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Instant Catering Enquiry</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-lighttext">
                  Request a Customized Quote
                </h2>
              </div>
              <div className="hidden sm:flex items-center gap-1 bg-primary/10 border border-primary/20 text-primary text-xs font-medium px-3 py-1.5 rounded-full">
                <HeartHandshake className="w-3.5 h-3.5" /> Direct Catering Rates
              </div>
            </div>

            {status === 'success' ? (
              <div className="py-12 px-4 text-center flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mb-6 animate-bounce">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-3">Enquiry Received Successfully!</h3>
                <p className="text-lighttext/70 text-sm max-w-md mx-auto leading-relaxed mb-8">
                  Thank you for contacting <strong className="text-lighttext">{siteConfig.businessName}</strong>. Our team has opened your request on WhatsApp and will reach out with menu details shortly.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => {
                      setStatus(null);
                      setFormData({
                        name: '', phone: '', email: '', eventType: 'Wedding Sadya', eventDate: '', guestCount: '250', location: '', preferredMeal: 'Kerala Sadya', requirements: ''
                      });
                    }}
                    className="bg-primary text-darkbg px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg"
                  >
                    Submit Another Enquiry
                  </button>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/20 hover:border-emerald-400 text-lighttext hover:text-emerald-400 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all bg-white/5 flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" /> Continue on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Meal Type Quick Selector Chips */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-lighttext/70 mb-2.5 font-sans">
                    1. Select Preferred Meal Type *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {mealOptions.map((item) => {
                      const IconComp = item.icon;
                      const isSelected = formData.preferredMeal === item.label;
                      return (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => setMealType(item.label)}
                          className={`stitch-chip p-3 rounded-xl text-left border flex flex-col justify-between ${
                            isSelected 
                              ? 'stitch-chip-active border-primary' 
                              : 'bg-darkbg/50 border-white/10 text-lighttext/80 hover:border-primary/40 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <IconComp className={`w-4 h-4 ${isSelected ? 'text-darkbg' : 'text-primary'}`} />
                            {isSelected && <Check className="w-3.5 h-3.5 text-darkbg stroke-[3]" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold leading-tight">{item.label}</div>
                            <div className={`text-[10px] mt-0.5 font-light ${isSelected ? 'text-darkbg/70' : 'text-lighttext/40'}`}>
                              {item.description}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Phone Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-lighttext/70 mb-2 font-sans">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-lighttext/40">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Anish Kumar"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-primary/25 bg-darkbg/70 text-lighttext rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all text-sm placeholder:text-lighttext/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-lighttext/70 mb-2 font-sans">
                      Phone / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-lighttext/40">
                        <Phone className="w-4 h-4" />
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-primary/25 bg-darkbg/70 text-lighttext rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all text-sm placeholder:text-lighttext/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Event Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-lighttext/70 mb-2 font-sans">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-lighttext/40">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input
                        type="email"
                        name="email"
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-primary/25 bg-darkbg/70 text-lighttext rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all text-sm placeholder:text-lighttext/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-lighttext/70 mb-2 font-sans">
                      Event Type *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-lighttext/40">
                        <Sparkles className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        name="eventType"
                        required
                        placeholder="e.g. Wedding, Birthday, Engagement"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-primary/25 bg-darkbg/70 text-lighttext rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all text-sm placeholder:text-lighttext/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Event Date & Guest Count Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-lighttext/70 mb-2 font-sans">
                      Event Date *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-lighttext/40">
                        <Calendar className="w-4 h-4" />
                      </span>
                      <input
                        type="date"
                        name="eventDate"
                        required
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-primary/25 bg-darkbg/70 text-lighttext rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-lighttext/70 mb-2 font-sans">
                      Expected Guests Count *
                    </label>
                    <div className="relative mb-2">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-lighttext/40">
                        <Users className="w-4 h-4" />
                      </span>
                      <input
                        type="number"
                        name="guestCount"
                        required
                        min="20"
                        placeholder="e.g. 250"
                        value={formData.guestCount}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-primary/25 bg-darkbg/70 text-lighttext rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all text-sm placeholder:text-lighttext/30"
                      />
                    </div>
                    {/* Guest Count Presets */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-lighttext/40">Presets:</span>
                      {guestPresets.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setGuestsPreset(preset)}
                          className={`text-[10px] px-2.5 py-0.5 rounded-full border transition-all ${
                            formData.guestCount === String(preset)
                              ? 'bg-primary text-darkbg font-bold border-primary'
                              : 'bg-white/5 border-white/10 text-lighttext/60 hover:border-primary/40'
                          }`}
                        >
                          {preset} Guests
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Event Location */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-lighttext/70 mb-2 font-sans">
                    Venue Location / City
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-lighttext/40">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. Ernakulam Auditorium, Tripunithura, Kochi"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-primary/25 bg-darkbg/70 text-lighttext rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all text-sm placeholder:text-lighttext/30"
                    />
                  </div>
                </div>

                {/* Requirements Textarea */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-lighttext/70 mb-2 font-sans">
                    Special Dishes or Custom Requirements
                  </label>
                  <textarea
                    name="requirements"
                    rows="3"
                    placeholder="Tell us about specific payasam preferences, welcome drinks, or custom food stalls..."
                    value={formData.requirements}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-primary/25 bg-darkbg/70 text-lighttext rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all text-sm resize-none placeholder:text-lighttext/30"
                  ></textarea>
                </div>

                {/* Form Footer Actions */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-lighttext/50">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>Instant quote dispatch via WhatsApp & Server</span>
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto px-8 py-3.5 bg-primary text-darkbg font-bold rounded-xl hover:bg-primary/95 hover:shadow-xl hover:shadow-primary/15 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {status === 'loading' ? 'Sending Request...' : 'Send Catering Enquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN: INTERACTIVE MAP & VENUE HIGHLIGHTS (5 COLS ON DESKTOP) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Embedded Google Map Card */}
            <div className="stitch-card p-4 rounded-3xl overflow-hidden relative group">
              <div className="flex items-center justify-between p-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-lighttext">Kitchen & Main Office</h3>
                    <p className="text-[10px] text-lighttext/50">Chemmanadu, Thiruvaniyoor</p>
                  </div>
                </div>
                <a 
                  href={siteConfig.contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold uppercase tracking-wider text-primary hover:underline flex items-center gap-1"
                >
                  Directions <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Responsive Google Maps Embed Frame */}
              <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 relative bg-darkbg">
                <iframe
                  title="Krishna Caterers Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.563814894879!2d76.40250007584145!3d9.970222273541527!2m3!1f0!f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08750000000001%3A0x0!2zOcKwNTgnMTIuOCJOIDc2wrAyNCcxOC4zIkU!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Address Quick Detail Box */}
              <div className="p-4 mt-3 bg-darkbg/60 rounded-xl border border-white/5 flex items-start justify-between gap-3">
                <div className="text-xs text-lighttext/80 font-light leading-relaxed">
                  <strong className="text-primary font-bold block mb-0.5">Address:</strong>
                  {siteConfig.contact.address}
                </div>
                <button
                  onClick={() => copyToClipboard(siteConfig.contact.address, 'Address')}
                  className="p-2 border border-white/10 rounded-lg text-lighttext/60 hover:text-primary hover:border-primary/40 shrink-0"
                  title="Copy Full Address"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Why Choose Us Highlight Box */}
            <div className="stitch-card p-6 rounded-3xl space-y-4">
              <h3 className="text-lg font-serif font-bold text-primary flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-primary" />
                The Krishna Caterers Promise
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-lighttext">100% Traditional Vegetarian Recipes</h4>
                    <p className="text-[11px] text-lighttext/50">Cooked with authentic spices, fresh coconut oil, and zero artificial colors.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-lighttext">Experienced Sadya Master Cooks</h4>
                    <p className="text-[11px] text-lighttext/50">Decades of expertise in serving authentic Kerala feast payasams, pradhamans, and curries.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-lighttext">Prompt & Elegant Table Service</h4>
                    <p className="text-[11px] text-lighttext/50">Uniformed, courteous staff trained to treat every guest like family.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ================= FREQUENTLY ASKED QUESTIONS (FAQ) ================= */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-2">
              <HelpCircle className="w-4 h-4" /> Got Questions?
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-lighttext">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`stitch-card rounded-2xl overflow-hidden border transition-all ${
                    isOpen ? 'border-primary/50 bg-secondary/60' : 'border-white/10'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left font-bold text-sm sm:text-base text-lighttext flex items-center justify-between gap-4"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-lighttext/70 font-light leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ================= STICKY MOBILE ACTION BAR (PC HIDDEN) ================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-darkbg/90 backdrop-blur-xl border-t border-primary/20 p-3 shadow-2xl">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex-1 bg-primary text-darkbg py-3 px-3 rounded-xl font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4" /> Call
          </a>

          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-600 text-white py-3 px-3 rounded-xl font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
          >
            <MessageSquare className="w-4 h-4" /> WhatsApp
          </a>

          <button
            onClick={scrollToForm}
            className="flex-1 border border-primary/50 text-primary py-3 px-3 rounded-xl font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 bg-primary/10 active:scale-95 transition-transform"
          >
            <Send className="w-3.5 h-3.5" /> Quote
          </button>
        </div>
      </div>

    </div>
  );
};

export default Contact;

