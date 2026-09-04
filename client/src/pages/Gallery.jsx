import React, { useState, useEffect } from 'react';
import { galleryData } from '../data/galleryData';
import { Instagram, RefreshCw, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDriveConnected, setIsDriveConnected] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const fetchConnectionAndImages = async () => {
    setLoading(true);
    setSyncError(null);
    try {
      // 1. Check if connected
      const statusRes = await fetch(`${API_BASE}/api/auth/google/status`);
      let statusData = { connected: false };
      if (statusRes.ok) {
        statusData = await statusRes.json();
        setIsDriveConnected(statusData.connected);
      }
      
      // 2. Fetch images
      const galleryRes = await fetch(`${API_BASE}/api/gallery`);
      if (galleryRes.ok) {
        const galleryDataJson = await galleryRes.json();
        if (galleryDataJson.images && galleryDataJson.images.length > 0) {
          setImages(galleryDataJson.images);
        } else {
          // Connected, but folder is empty or couldn't parse
          setImages(galleryData);
          if (statusData.connected) {
            setSyncError("Connected, but no images found in the Google Drive folder. Please upload images to your folder.");
          }
        }
      } else {
        // Fallback to local mock data
        setImages(galleryData);
        if (statusData.connected) {
          setSyncError("Connected, but failed to fetch images from Drive. Please check your folder's access permissions.");
        }
      }
    } catch (err) {
      console.warn("Could not connect to backend server. Using offline mock gallery.", err);
      setImages(galleryData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check for success URL query parameter
    const params = new URLSearchParams(window.location.search);
    if (params.get('connected') === 'true') {
      setShowSuccessToast(true);
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      setTimeout(() => setShowSuccessToast(false), 6000);
    }

    fetchConnectionAndImages();
  }, []);

  // Dynamically extract categories from current images list
  const categories = ['All', ...new Set(images.map(img => img.category))];

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="pt-32 pb-24 bg-darkbg min-h-screen">
      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Success Alert */}
        {showSuccessToast && (
          <div className="mb-6 p-4 bg-green-950/80 border border-green-500/40 text-green-400 rounded-xl flex items-center gap-3 animate-fade-in shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
            <div>
              <p className="font-bold text-sm">Successfully Connected to Google Drive!</p>
              <p className="text-xs text-green-400/80">Your event photos are now actively syncing with your gallery.</p>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div className="text-left">
            <h1 className="text-3xl md:text-5xl font-serif text-lighttext tracking-wide uppercase leading-tight">
              <span className="font-light block text-lighttext/70 text-2xl md:text-3xl mb-1">YOUR INSIDE LOOK:</span>
              <span className="font-bold block text-primary">KRISHNA EVENT GALLERY</span>
            </h1>
          </div>
          <div className="flex flex-col items-start md:items-end w-full md:w-auto">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-lighttext/85 uppercase font-sans">
                FOOD. ATMOSPHERE. JOY.
              </span>
              <a 
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-primary/50 text-lighttext/70 hover:text-primary transition-all duration-300 bg-secondary/10"
                title="View more on Instagram"
              >
                <Instagram className="w-4 h-4" />
                <span className="text-[10px] font-semibold tracking-wider uppercase">More Images</span>
              </a>
            </div>
            <div className="w-full md:w-64 h-[1.5px] bg-primary/50"></div>
          </div>
        </div>

        {/* Google Drive Connection Dashboard */}
        {showConfig && (
          <div className="mb-10 p-6 bg-secondary/20 border border-primary/20 rounded-2xl backdrop-blur-md shadow-xl animate-slide-down">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/5">
              <div>
                <h3 className="text-base font-bold font-serif text-primary flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isDriveConnected ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></span>
                  Google Drive Connection Control
                </h3>
                <p className="text-xs text-lighttext/60 mt-0.5">
                  Synchronize your gallery to dynamically display images from a Google Drive folder.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={fetchConnectionAndImages}
                  className="p-1.5 text-xs text-lighttext/60 hover:text-primary border border-white/10 rounded-lg flex items-center gap-1 bg-darkbg/50"
                  disabled={loading}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  Refresh Sync
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div className="text-xs text-lighttext/70 space-y-3">
                <h4 className="font-bold text-lighttext text-sm">How to link your Drive folder:</h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Create a folder on Google Drive for your event photos.</li>
                  <li>Set general folder sharing to <strong className="text-primary font-medium">"Anyone with the link can view"</strong> so the web app can access the images.</li>
                  <li>Copy the folder ID from the browser URL address bar (e.g. the alphanumeric string after <code className="bg-darkbg px-1.5 py-0.5 rounded font-mono">/folders/...</code>).</li>
                  <li>Paste the ID into your server folder’s <code className="bg-darkbg px-1.5 py-0.5 rounded font-mono">.env</code> as <code className="text-primary font-mono font-medium">GOOGLE_DRIVE_FOLDER_ID</code>.</li>
                  <li>Click <strong>Connect Google Account</strong> to grant read-only permissions and sync.</li>
                </ol>
                <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 mt-4">
                  <p className="font-semibold text-primary mb-1">💡 Professional Naming Tip:</p>
                  Name files on Google Drive using the format: <code className="bg-darkbg/50 px-1 py-0.5 rounded text-lighttext font-mono">Category - Title.jpg</code> (e.g., <code className="text-primary font-mono">Sadya - Feast Spread.jpg</code>). The website will automatically parse this to organize your gallery tabs!
                </div>
              </div>

              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-3 bg-darkbg/40 p-4 rounded-xl border border-white/5 text-xs">
                  <h4 className="font-bold text-lighttext text-sm border-b border-white/5 pb-2">Sync Information</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-lighttext/55">Status:</span>
                    <span className="col-span-2 font-semibold">
                      {isDriveConnected ? (
                        <span className="text-green-400 flex items-center gap-1">Connected</span>
                      ) : (
                        <span className="text-yellow-400 flex items-center gap-1">Offline (Fallback Mode)</span>
                      )}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-lighttext/55">Folder ID:</span>
                    <span className="col-span-2 font-mono text-[10px] break-all text-lighttext/80">
                      {isDriveConnected ? 'Configured' : 'Not Configured (Using Mock Data)'}
                    </span>
                  </div>
                  {syncError && (
                    <div className="mt-3 p-3 bg-red-950/40 border border-red-500/20 text-red-400 rounded-lg flex gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <p className="leading-normal">{syncError}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`${API_BASE}/api/auth/google`}
                    className="flex-grow text-center px-5 py-3 bg-primary text-darkbg hover:bg-primary/90 font-bold text-xs rounded-xl shadow-lg hover:shadow-primary/10 transition-all uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    Connect Google Account
                  </a>
                  {isDriveConnected && (
                    <a 
                      href={images[0]?.driveUrl || 'https://drive.google.com'} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-4 py-3 border border-white/10 hover:border-primary/50 text-lighttext/80 hover:text-primary rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      Open Drive <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Category Filtering */}
        {categories.length > 2 && (
          <div className="flex flex-wrap gap-2 mb-8 justify-start">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-primary text-darkbg border-primary'
                    : 'bg-secondary/20 hover:bg-secondary/40 text-lighttext/70 hover:text-lighttext border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <RefreshCw className="w-10 h-10 text-primary animate-spin" />
            <p className="text-lighttext/50 text-xs tracking-widest uppercase">Loading Gallery Photos...</p>
          </div>
        ) : (
          <>
            {/* 4-Column Grid with Square Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
              {filteredImages.map(item => (
                <div 
                  key={item.id} 
                  className="relative overflow-hidden cursor-pointer group aspect-square border border-white/5 shadow-lg bg-secondary/20 rounded-lg"
                  onClick={() => setSelectedImage(item.fullImage || item.image)}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  {/* Elegant overlay on hover */}
                  <div className="absolute inset-0 bg-darkbg/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-primary text-[10px] uppercase tracking-[0.2em] mb-2 font-sans font-semibold">
                      {item.category}
                    </span>
                    <h3 className="text-lighttext text-base font-bold font-serif px-2 leading-snug">
                      {item.title}
                    </h3>
                    <span className="text-[9px] text-lighttext/50 mt-4 tracking-widest uppercase border-b border-primary/45 pb-0.5">
                      View Frame
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredImages.length === 0 && (
              <div className="text-center py-20 border border-white/5 rounded-2xl bg-secondary/5">
                <p className="text-lighttext/40 text-sm">No images found for category "{activeCategory}".</p>
              </div>
            )}
          </>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300" 
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl max-h-[90vh] overflow-hidden">
              <img src={selectedImage} alt="Fullscreen View" className="max-w-full max-h-[85vh] object-contain shadow-2xl border border-white/10 rounded-lg" />
            </div>
            <button className="absolute top-6 right-6 text-lighttext hover:text-primary text-4xl font-light transition-colors duration-200">&times;</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
