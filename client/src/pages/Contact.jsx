import React, { useState } from 'react';
import { Phone, Mail, MapPin, ArrowRight, X, Check, HelpCircle, User, Users, Calendar, ChefHat, Sparkles, Send } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Contact = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', eventType: '', eventDate: '', guestCount: '', location: '', preferredMeal: '', requirements: ''
  });
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const sendWhatsAppMessage = () => {
      const message = `*New Catering Enquiry*
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
        setFormData({
          name: '', phone: '', email: '', eventType: '', eventDate: '', guestCount: '', location: '', preferredMeal: '', requirements: ''
        });
      } else {
        throw new Error('Server returned an error');
      }
    } catch (error) {
      console.warn("Backend API request failed, falling back to mock response for client simulation:", error);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        sendWhatsAppMessage();
        setStatus('success');
        setFormData({
          name: '', phone: '', email: '', eventType: '', eventDate: '', guestCount: '', location: '', preferredMeal: '', requirements: ''
        });
      } catch (fallbackErr) {
        setStatus('error');
      }
    }
  };

  return (
    <div className="pt-32 pb-24 bg-darkbg min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Custom Styles for Keyframes & Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleFadeIn {
          from {
            opacity: 0;
            transform: scale(1.06);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.05);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-scale-fade-in {
          animation: scaleFadeIn 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full filter blur-[100px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-20 w-[450px] h-[450px] bg-[#143625]/20 rounded-full filter blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '-4s' }}></div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">

        {/* Left Column - Info Content */}
        <div className="lg:col-span-7 flex flex-col justify-center py-2 text-left">
          <div>
            {/* Tagline label */}
            <div className="animate-fade-in-up flex items-center space-x-2 text-primary font-bold tracking-[0.25em] text-xs mb-4" style={{ animationDelay: '0ms' }}>
              <span className="w-6 h-[1.5px] bg-primary"></span>
              <span className="uppercase">Catering & Events</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold text-lighttext leading-[1.1] mb-4 sm:mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Reach out to <br className="hidden sm:block" />our team.
            </h1>

            {/* Sub-headline Description */}
            <p className="text-base sm:text-lg text-lighttext/60 max-w-lg mb-12 sm:mb-16 leading-relaxed font-sans font-light animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Have questions about our traditional catering services or want to plan your custom event menu? We would love to hear from you.
            </p>

            {/* Grid of Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 mb-12 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.25em] text-primary/80 font-bold mb-3 font-sans">
                  Office & Kitchen
                </h3>
                <p className="text-lighttext/90 text-sm sm:text-base leading-relaxed font-sans font-light">
                  123 Temple Road,<br />
                  Cochin, Kerala 682011<br />
                  India
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.25em] text-primary/80 font-bold mb-2 font-sans">
                    Mail
                  </h3>
                  <p className="text-lighttext/90 text-sm sm:text-base font-sans font-light">
                    <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary transition-colors duration-300">
                      {siteConfig.contact.email}
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.25em] text-primary/80 font-bold mb-2 font-sans">
                    Phone / WhatsApp
                  </h3>
                  <p className="text-lighttext/90 text-sm sm:text-base font-sans font-light">
                    <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-primary transition-colors duration-300">
                      {siteConfig.contact.phone}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            {/* Quote Form Trigger Card */}
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center justify-between bg-lighttext text-darkbg p-6 rounded-2xl w-full sm:w-64 shadow-xl hover:-translate-y-1 hover:bg-primary transition-all duration-300 group text-left border border-white/5"
            >
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-darkbg/50 font-bold mb-1 font-sans">Interested?</span>
                <span className="block text-lg font-bold font-sans">Request a Quote</span>
              </div>
              <div className="w-10 h-10 rounded-full border border-darkbg/10 flex items-center justify-center group-hover:border-darkbg/30 transition-all shrink-0 bg-darkbg/5 group-hover:translate-x-1.5 duration-300">
                <ArrowRight className="w-4 h-4 text-darkbg" />
              </div>
            </button>

            {/* WhatsApp Link Card */}
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-secondary/20 backdrop-blur-sm border border-white/10 text-lighttext p-6 rounded-2xl w-full sm:w-64 hover:border-primary/50 hover:bg-secondary/40 hover:-translate-y-1 transition-all duration-300 group text-left"
            >
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-lighttext/40 font-bold mb-1 font-sans">Have questions?</span>
                <span className="block text-lg font-bold font-sans">Chat on WhatsApp</span>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-all shrink-0 bg-white/5 group-hover:translate-x-1.5 duration-300">
                <ArrowRight className="w-4 h-4 text-lighttext group-hover:text-primary transition-colors" />
              </div>
            </a>
          </div>
        </div>

        {/* Right Column - Premium Vertical Image */}
        <div className="lg:col-span-5 h-[280px] sm:h-[500px] lg:h-[85vh] lg:max-h-[600px] w-full relative rounded-3xl overflow-hidden shadow-2xl group border border-white/10 animate-scale-fade-in">
          <img
            src="/images/contact.jpeg"
            alt="Traditional Kerala Sadya Banquet"
            className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-darkbg/60 via-darkbg/10 to-transparent"></div>
          {/* Decorative small gold badge in image corner */}
          <div className="absolute bottom-6 left-6 bg-secondary/80 backdrop-blur-md border border-primary/30 px-3.5 py-1.5 rounded-full flex items-center space-x-2 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-lighttext">100% Pure Veg</span>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          {/* Blur backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
            onClick={() => setIsFormOpen(false)}
          ></div>

          {/* Modal Container */}
          <div className="relative bg-secondary/95 backdrop-blur-xl border border-primary/20 rounded-3xl w-full max-w-2xl p-5 sm:p-10 shadow-2xl z-10 my-4 sm:my-8 overflow-y-auto max-h-[92vh] sm:max-h-[85vh] text-left animate-fade-in-up">
            {/* Close Button */}
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-lighttext/60 hover:text-primary transition-all p-2 rounded-full hover:bg-darkbg/50 hover:rotate-90 duration-300"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full border border-primary flex items-center justify-center mb-6 animate-scale-fade-in">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-primary mb-3">Enquiry Submitted!</h3>
                <p className="text-lighttext/70 text-sm max-w-sm leading-relaxed mb-8">
                  Thank you for choosing {siteConfig.businessName}. We have received your event details and our team will get back to you with a custom quote shortly.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs justify-center">
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="px-6 py-2.5 bg-primary text-darkbg rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary/90 transition-all text-center shadow-lg"
                  >
                    Close Window
                  </button>
                  <button
                    onClick={() => setStatus(null)}
                    className="px-6 py-2.5 border border-white/10 hover:border-primary/50 text-lighttext rounded-xl font-bold text-xs uppercase tracking-wider transition-all text-center bg-white/5"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex items-center space-x-2 text-primary font-bold text-[10px] tracking-widest uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Get a Quote</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-2">Catering Enquiry Form</h2>
                  <p className="text-xs sm:text-sm text-lighttext/60 leading-relaxed font-sans font-light">
                    Tell us about your upcoming event, and we will craft a perfect traditional menu aligned with your vision.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

                    {/* Name Field */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-lighttext/55 mb-1.5 font-sans">Name *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-lighttext/35">
                          <User className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-primary/20 bg-darkbg/60 backdrop-blur-sm text-lighttext rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm font-sans placeholder-lighttext/30"
                        />
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-lighttext/55 mb-1.5 font-sans">Phone *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-lighttext/35">
                          <Phone className="w-4 h-4" />
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="Contact number"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-primary/20 bg-darkbg/60 backdrop-blur-sm text-lighttext rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm font-sans placeholder-lighttext/30"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-lighttext/55 mb-1.5 font-sans">Email</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-lighttext/35">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          name="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-primary/20 bg-darkbg/60 backdrop-blur-sm text-lighttext rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm font-sans placeholder-lighttext/30"
                        />
                      </div>
                    </div>

                    {/* Event Type Field */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-lighttext/55 mb-1.5 font-sans">Event Type *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-lighttext/35">
                          <Sparkles className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          name="eventType"
                          required
                          placeholder="e.g. Wedding, Birthday, Corporate"
                          value={formData.eventType}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-primary/20 bg-darkbg/60 backdrop-blur-sm text-lighttext rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm font-sans placeholder-lighttext/30"
                        />
                      </div>
                    </div>

                    {/* Event Date Field */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-lighttext/55 mb-1.5 font-sans">Event Date *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-lighttext/35">
                          <Calendar className="w-4 h-4" />
                        </span>
                        <input
                          type="date"
                          name="eventDate"
                          required
                          value={formData.eventDate}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-primary/20 bg-darkbg/60 backdrop-blur-sm text-lighttext rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm font-sans"
                        />
                      </div>
                    </div>

                    {/* Guest Count Field */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-lighttext/55 mb-1.5 font-sans">Number of Guests *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-lighttext/35">
                          <Users className="w-4 h-4" />
                        </span>
                        <input
                          type="number"
                          name="guestCount"
                          required
                          placeholder="Minimum 50 guests"
                          value={formData.guestCount}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-primary/20 bg-darkbg/60 backdrop-blur-sm text-lighttext rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm font-sans placeholder-lighttext/30"
                        />
                      </div>
                    </div>

                    {/* Location Field */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-lighttext/55 mb-1.5 font-sans">Location / Venue</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-lighttext/35">
                          <MapPin className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          name="location"
                          placeholder="e.g. Hall Name, City"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-primary/20 bg-darkbg/60 backdrop-blur-sm text-lighttext rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm font-sans placeholder-lighttext/30"
                        />
                      </div>
                    </div>

                    {/* Preferred Meal Field */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-lighttext/55 mb-1.5 font-sans">Preferred Meal Type</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-lighttext/35">
                          <ChefHat className="w-4 h-4" />
                        </span>
                        <select
                          name="preferredMeal"
                          value={formData.preferredMeal}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-primary/20 bg-darkbg/60 backdrop-blur-sm text-lighttext rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm font-sans appearance-none"
                        >
                          <option value="">Select Meal Type</option>
                          <option value="Sadya">Kerala Sadya</option>
                          <option value="Breakfast">Breakfast</option>
                          <option value="Lunch">Lunch (Buffet)</option>
                          <option value="Dinner">Dinner (Buffet)</option>
                          <option value="Snacks">Snacks & High Tea</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-lighttext/40">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Requirements Textarea */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-lighttext/55 mb-1.5 font-sans">Special Requirements / Custom requests</label>
                    <textarea
                      name="requirements"
                      rows="3"
                      placeholder="Share any special instructions, dish requests, or dietary details..."
                      value={formData.requirements}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-primary/20 bg-darkbg/60 backdrop-blur-sm text-lighttext rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm font-sans resize-none placeholder-lighttext/30"
                    ></textarea>
                  </div>

                  {/* Footer Elements */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <span className="text-[10px] text-lighttext/40 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-primary" /> Fields marked with * are required
                    </span>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full sm:w-auto px-8 py-3 bg-primary text-darkbg font-bold rounded-xl hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/10 -translate-y-[1px] hover:-translate-y-[2px] active:translate-y-0 transition-all duration-300 text-xs uppercase tracking-wider disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {status === 'loading' ? 'Submitting...' : 'Request Catering Quote'}
                    </button>
                  </div>
                  {status === 'error' && (
                    <p className="text-red-400 text-xs mt-2 font-medium">
                      There was an error sending your request. Please check your network and try again.
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
