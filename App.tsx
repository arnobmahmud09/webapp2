
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Background3D from './components/Background3D';
import CursorTracker from './components/CursorTracker';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTop from './components/BackToTop';
import VoiceIntro from './components/VoiceIntro';
import CommandPalette from './components/CommandPalette';
import ResumeGenerator from './components/ResumeGenerator';
import DigitalID from './components/DigitalID';

import About from './components/About';
import Skills from './components/Skills';
import LearningJournal from './components/LearningJournal';
import Education from './components/Education';
import Contact from './components/Contact';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [progress, setProgress] = useState(0);
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isIDCardOpen, setIsIDCardOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    const interval = setInterval(() => setProgress(p => Math.min(100, p + 5)), 50);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  const scrollToSection = (id: string) => {
    const sectionId = id.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = window.innerWidth < 768 ? 70 : 90;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - navOffset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
      },
      { rootMargin: window.innerWidth < 768 ? '-30% 0px -40% 0px' : '-20% 0px -60% 0px' }
    );
    ['home', 'about', 'skills', 'journal', 'education', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className={`min-h-screen selection:bg-blue-600 selection:text-white transition-colors duration-700 relative w-full overflow-x-hidden ${isRecruiterMode ? 'recruiter-view' : ''}`}>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loader" exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[2000]">
            <div className="text-4xl font-black text-white mb-8 tracking-tighter">ARNOB<span className="text-blue-500">.</span></div>
            <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-blue-500" /></div>
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="hidden lg:block"><CursorTracker /></div>
            <Navbar 
              isDarkMode={isDarkMode} 
              toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
              activeSection={activeSection} 
              isRecruiterMode={isRecruiterMode} 
              toggleRecruiterMode={() => setIsRecruiterMode(!isRecruiterMode)}
              onNavigate={scrollToSection}
            />
            
            <WhatsAppButton />
            <VoiceIntro />
            <BackToTop />
            
            <CommandPalette 
              isOpen={isCommandPaletteOpen}
              onClose={() => setIsCommandPaletteOpen(false)}
              toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
              isDarkMode={isDarkMode}
              isRecruiterMode={isRecruiterMode}
              toggleRecruiterMode={() => setIsRecruiterMode(!isRecruiterMode)}
              openResume={() => setIsResumeModalOpen(true)}
              openIDCard={() => setIsIDCardOpen(true)}
            />
            
            <ResumeGenerator isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
            <DigitalID isOpen={isIDCardOpen} onClose={() => setIsIDCardOpen(false)} />

            <div className="hidden md:block"><Background3D /></div>
            
            <main className="relative z-10 bg-transparent w-full overflow-hidden">
              <Hero isRecruiterMode={isRecruiterMode} onNavigate={scrollToSection} />
              <About isRecruiterMode={isRecruiterMode} onOpenID={() => setIsIDCardOpen(true)} />
              <Skills isRecruiterMode={isRecruiterMode} />
              <LearningJournal isRecruiterMode={isRecruiterMode} />
              <Education isRecruiterMode={isRecruiterMode} />
              <Contact isRecruiterMode={isRecruiterMode} />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
