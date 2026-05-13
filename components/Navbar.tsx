
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Briefcase, GraduationCap, Command, Home, User, Code2, Terminal, Send, Layout } from 'lucide-react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  activeSection: string;
  isRecruiterMode: boolean;
  toggleRecruiterMode: () => void;
  onNavigate?: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isDarkMode, 
  toggleDarkMode, 
  activeSection, 
  isRecruiterMode, 
  toggleRecruiterMode,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const mobileNavItems = [
    { id: 'home', icon: <Home size={20} />, label: 'Home' },
    { id: 'about', icon: <User size={20} />, label: 'About' },
    { id: 'skills', icon: <Code2 size={20} />, label: 'Skills' },
    { id: 'contact', icon: <Send size={20} />, label: 'Chat' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isScrolled 
            ? 'py-3 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50' 
            : 'py-4 md:py-8 bg-transparent'
        }`}
      >
        <motion.div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 origin-left" style={{ scaleX }} />

        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center relative z-10">
          <div className="flex items-center space-x-4">
            <motion.a 
              href="#home" 
              onClick={(e) => handleLinkClick(e, '#home')}
              className="text-xl md:text-2xl font-black tracking-tighter group flex items-center"
            >
              ARNOB<span className="text-blue-500 group-hover:animate-ping inline-block">.</span>
            </motion.a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-2xl p-1 border border-slate-200 dark:border-slate-800">
              <button 
                onClick={toggleRecruiterMode}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest ${
                  isRecruiterMode ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'
                }`}
              >
                <Briefcase size={14} />
                <span>Recruiter</span>
              </button>
            </div>
            <div className="flex items-center space-x-6">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-xs font-bold transition-all uppercase tracking-[0.2em] ${
                    activeSection === link.href.slice(1) ? 'text-blue-500' : 'text-slate-500 hover:text-blue-500'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <button onClick={toggleDarkMode} className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 transition-colors">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleDarkMode} className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-xl">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={toggleRecruiterMode} className={`p-2.5 rounded-xl ${isRecruiterMode ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-500'}`}>
              <Briefcase size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[90vw] max-w-sm">
        <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/50 rounded-[2rem] shadow-2xl p-2 flex justify-around items-center">
          {mobileNavItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, `#${item.id}`)}
                className={`relative flex flex-col items-center justify-center p-3 transition-all duration-300 ${
                  isActive ? 'text-blue-500 scale-110' : 'text-slate-400'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCircle"
                    className="absolute inset-0 bg-blue-500/10 rounded-2xl"
                  />
                )}
                <div className="relative z-10">{item.icon}</div>
                <span className="text-[8px] font-black uppercase tracking-[0.1em] mt-1 relative z-10">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
