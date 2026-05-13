
import React, { useRef } from 'react';
import { motion, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { PROFILE_IMAGE } from '../constants';

interface HeroProps {
  isRecruiterMode: boolean;
  onNavigate?: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ isRecruiterMode, onNavigate }) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    } else {
      const element = document.getElementById(href.replace('#', ''));
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  };
  
  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-12 bg-transparent">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[15rem] md:w-[40rem] h-[15rem] md:h-[40rem] bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-[60px] md:blur-[100px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 md:gap-16 items-center relative z-10 w-full">
        {/* Profile Image - Responsive sizing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex justify-center order-1 lg:order-2"
        >
          <div className="relative w-44 h-44 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[26rem] lg:h-[26rem]">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 md:-inset-8 border-[1px] border-dashed border-blue-500/30 rounded-full" 
            />
            <div className="w-full h-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border-4 md:border-8 border-white dark:border-slate-900 shadow-2xl relative z-10 bg-slate-100 dark:bg-slate-800">
              <img 
                src={PROFILE_IMAGE} 
                alt="Arnob Mahmud" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Text Content - Fluid typography */}
        <div className="text-center lg:text-left order-2 lg:order-1 flex flex-col items-center lg:items-start">
          <div className="inline-flex items-center space-x-2 py-1.5 px-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>{isRecruiterMode ? 'Professional View' : 'Available for Collaboration'}</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.1] tracking-tighter">
            {isRecruiterMode ? (
              <>Full-Stack <br className="hidden sm:block" /><span className="gradient-text">Developer</span></>
            ) : (
              <>I'm <span className="gradient-text">Arnob</span> <br className="hidden sm:block" /> Mahmud</>
            )}
          </h1>
          
          <p className="text-sm sm:text-base md:text-xl font-medium text-slate-500 dark:text-slate-400 mb-8 max-w-lg leading-relaxed px-4 lg:px-0">
            {isRecruiterMode 
              ? "Engineering robust software solutions with C++, Python, and modern Web Stacks. Focused on scalable architecture."
              : "Crafting digital experiences as an Aspiring Developer specialized in Web, App, and AI/ML."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 lg:px-0">
            <motion.a 
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl flex items-center justify-center group text-sm min-h-[56px] cursor-pointer"
            >
              CONNECT WITH ME <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={16} />
            </motion.a>
            <motion.a 
              whileTap={{ scale: 0.95 }}
              href="#about" 
              onClick={(e) => handleLinkClick(e, '#about')}
              className="w-full sm:w-auto px-8 py-4 glass border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-black text-sm text-center flex items-center justify-center min-h-[56px] cursor-pointer"
            >
              EXPLORE MORE
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
