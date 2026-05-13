
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ShieldCheck, Smartphone, MapPin, BadgeCheck, Zap, Loader2, User } from 'lucide-react';
import html2canvas from 'html2canvas';
import { PROFILE_IMAGE } from '../constants';

interface DigitalIDProps {
  isOpen: boolean;
  onClose: () => void;
}

const DigitalID: React.FC<DigitalIDProps> = ({ isOpen, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        const newScale = Math.min((width - 32) / 600, 1);
        setScale(newScale);
      } else {
        setScale(1);
      }
    };

    if (isOpen) {
      handleResize();
      window.addEventListener('resize', handleResize);
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const downloadID = async () => {
    if (!cardRef.current || isExporting) return;
    
    setIsExporting(true);
    
    try {
      // Helper to convert images to data URLs for bullet-proof export
      const toDataURL = async (url: string): Promise<string> => {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        } catch (e) {
          return url; // Fallback to original URL
        }
      };

      const originalImages = Array.from(cardRef.current.querySelectorAll('img'));
      const imageDataUrls = await Promise.all(originalImages.map(img => toDataURL(img.src)));

      // Small delay to ensure any UI state is settled
      await new Promise(resolve => setTimeout(resolve, 300));

      const canvas = await html2canvas(cardRef.current, {
        scale: 4, // High quality scale
        backgroundColor: null,
        useCORS: true,
        logging: false,
        onclone: (clonedDoc) => {
          const clonedCard = clonedDoc.querySelector('[data-id-card="true"]') as HTMLElement;
          if (clonedCard) {
            // CRITICAL: Reset all transforms and force exact dimensions
            clonedCard.style.transform = "none";
            clonedCard.style.position = "relative";
            clonedCard.style.left = "0";
            clonedCard.style.top = "0";
            clonedCard.style.width = "600px";
            clonedCard.style.height = "375px";
            clonedCard.style.margin = "0";
            clonedCard.style.display = "flex";
            clonedCard.style.flexDirection = "column";
            clonedCard.style.justifyContent = "space-between";
            clonedCard.style.borderRadius = "2.5rem";
            clonedCard.style.border = "1px solid rgba(255, 255, 255, 0.2)";
            clonedCard.style.backgroundColor = "#0f172a";
            clonedCard.style.padding = "40px";
            clonedCard.style.boxSizing = "border-box";
            
            // Fix children layout
            const children = Array.from(clonedCard.children) as HTMLElement[];
            children.forEach(child => {
              if (child.style) {
                child.style.position = "relative";
                child.style.zIndex = "10";
              }
            });

            // Update images to use Data URLs in the clone
            const clonedImages = Array.from(clonedCard.querySelectorAll('img'));
            clonedImages.forEach((img, index) => {
              if (imageDataUrls[index]) {
                img.src = imageDataUrls[index];
              }
              img.style.objectFit = "cover";
              img.style.display = "block";
            });
            
            // Background circles setup
            const bgDecor = clonedCard.querySelectorAll('div[class*="blur-"]');
            bgDecor.forEach((el: any) => {
              el.style.position = "absolute";
              el.style.borderRadius = "50%";
              el.style.zIndex = "1";
              el.style.display = "block";
              el.style.filter = "blur(80px)";
              el.style.opacity = "0.4";
            });
            
            // Fix backdrop-filter (not supported by html2canvas)
            const glassElements = clonedCard.querySelectorAll('.glass');
            glassElements.forEach((el: any) => {
              el.style.background = "rgba(15, 23, 42, 0.98)";
              el.style.backdropFilter = "none";
              el.style.webkitBackdropFilter = "none";
              el.style.border = "1px solid rgba(255, 255, 255, 0.1)";
            });
            
            // Fix text rendering
            const texts = clonedCard.querySelectorAll('p, span, h1, h2');
            texts.forEach((el: any) => {
              el.style.color = "#ffffff";
              el.style.fontSmoothing = "antialiased";
              el.style.whiteSpace = "nowrap";
              
              if (el.className.includes('leading-none')) el.style.lineHeight = "1";
              else if (el.className.includes('leading-tight')) el.style.lineHeight = "1.1";
              else el.style.lineHeight = "1.2";
              
              // Handle tailwind space-y
              if (el.parentElement.className.includes('space-y')) {
                const spaceMatch = el.parentElement.className.match(/space-y-([0-9.]+)/);
                if (spaceMatch && el !== el.parentElement.firstElementChild) {
                  const spaceVal = parseFloat(spaceMatch[1]) * 4;
                  el.style.marginTop = `${spaceVal}px`;
                }
              }
            });
          }
        }
      });

      const imageUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `Arnob_Web_ID_600px.png`;
      link.href = imageUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to export ID Card:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" 
          />
          
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative w-full max-w-2xl flex flex-col items-center"
          >
            <div className="flex justify-between w-full mb-6 items-center px-4 max-w-[600px]">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 flex items-center gap-2">
                <ShieldCheck size={16} /> Verified Identity
              </span>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-white/10 rounded-full text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* The ID Card Display */}
            <div 
              style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
              className="w-full flex justify-center"
            >
              <div 
                ref={cardRef} 
                data-id-card="true"
                className="relative w-[600px] h-[375px] bg-[#0f172a] rounded-[2.5rem] border border-white/20 shadow-2xl overflow-hidden p-10 flex flex-col justify-between shrink-0"
              >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 blur-[100px] -mr-40 -mt-40 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 blur-[100px] -ml-40 -mb-40 pointer-events-none" />
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex flex-col">
                    <h1 className="text-4xl font-black text-white tracking-tighter leading-none mb-2">
                      ARNOB<span className="text-blue-500">.</span>
                    </h1>
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">REF: RPI-ARCH-2026-X</span>
                  </div>
                  <div className="shrink-0 bg-white p-3 rounded-2xl shadow-2xl border border-white/20">
                    <img 
                      crossOrigin="anonymous"
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://arnob-mahmud.netlify.app" 
                      className="w-20 h-20" 
                      alt="Identity QR" 
                    />
                  </div>
                </div>

                <div className="flex gap-8 relative z-10 items-center">
                  <div className="relative shrink-0">
                    <div className="w-32 h-32 rounded-3xl overflow-hidden border-2 border-blue-500/30 shadow-2xl bg-slate-800 flex items-center justify-center">
                      {!imageError ? (
                        <img 
                          crossOrigin="anonymous"
                          src={PROFILE_IMAGE} 
                          alt="Profile" 
                          onError={() => setImageError(true)}
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <User size={48} className="text-slate-600" />
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 p-2.5 bg-blue-600 rounded-xl text-white shadow-lg border border-white/20">
                      <Zap size={18} fill="currentColor" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <h2 
                      className="text-4xl font-black text-white tracking-tight leading-tight whitespace-nowrap"
                    >
                      Arnob Mahmud
                    </h2>
                    <div className="space-y-2 text-slate-300 text-[13px]">
                      <p className="flex items-center gap-3 font-black tracking-widest uppercase opacity-80 whitespace-nowrap">
                        <Smartphone size={14} className="text-blue-500 shrink-0" /> +880 1319 156 975
                      </p>
                      <p className="flex items-center gap-3 font-black tracking-widest uppercase opacity-80 whitespace-nowrap">
                        <MapPin size={14} className="text-blue-500 shrink-0" /> Rajshahi, Bangladesh
                      </p>
                    </div>
                  </div>

                </div>

                {/* Security watermark footer */}
                <div className="relative z-10 flex justify-center opacity-30">
                  <span className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-400">OFFICIAL WEB PASSPORT • 2026 EDITION</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full max-w-sm px-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isExporting}
                onClick={downloadID} 
                className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl transition-all ${
                  isExporting ? 'bg-blue-800 opacity-80' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/40'
                }`}
              >
                {isExporting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    <span>Save Image</span>
                  </>
                )}
              </motion.button>
              <button 
                onClick={onClose}
                className="px-8 py-4 glass border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest cursor-pointer hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DigitalID;
