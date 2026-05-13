
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Command, Moon, Sun, Briefcase, GraduationCap, 
  Code2, User, Sparkles, Send, FileText, Smartphone,
  ArrowRight, MessageSquare, BookOpen,
  Terminal, Contact2, Layout
} from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  category: 'Navigation' | 'System' | 'Tools';
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
  isRecruiterMode: boolean;
  toggleRecruiterMode: () => void;
  openResume: () => void;
  openIDCard?: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ 
  isOpen, 
  onClose, 
  toggleDarkMode, 
  isDarkMode,
  isRecruiterMode,
  toggleRecruiterMode,
  openResume,
  openIDCard
}) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = useMemo(() => [
    { id: 'go-home', label: 'Go to Home', category: 'Navigation', icon: <User size={18} />, action: () => { window.scrollTo({ top: 0, behavior: 'smooth' }); onClose(); } },
    { id: 'go-about', label: 'Go to About', category: 'Navigation', icon: <FileText size={18} />, action: () => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
    { id: 'go-skills', label: 'Go to Skills', category: 'Navigation', icon: <Code2 size={18} />, action: () => { document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
    { id: 'go-journal', label: 'Go to Journal', category: 'Navigation', icon: <BookOpen size={18} />, action: () => { document.getElementById('journal')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
    { id: 'go-education', label: 'Go to Education', category: 'Navigation', icon: <GraduationCap size={18} />, action: () => { document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
    { id: 'go-contact', label: 'Go to Contact', category: 'Navigation', icon: <Send size={18} />, action: () => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
    
    { id: 'toggle-theme', label: `Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`, category: 'System', icon: isDarkMode ? <Sun size={18} /> : <Moon size={18} />, action: () => { toggleDarkMode(); onClose(); }, shortcut: 'T' },
    { id: 'toggle-mode', label: `Switch to ${isRecruiterMode ? 'Student' : 'Recruiter'} Mode`, category: 'System', icon: isRecruiterMode ? <GraduationCap size={18} /> : <Briefcase size={18} />, action: () => { toggleRecruiterMode(); onClose(); }, shortcut: 'M' },
    
    { id: 'generate-resume', label: 'Generate AI Resume', category: 'Tools', icon: <Sparkles size={18} className="text-blue-500" />, action: () => { openResume(); onClose(); }, shortcut: 'R' },
    { id: 'open-id', label: 'View Digital Web ID', category: 'Tools', icon: <Contact2 size={18} className="text-purple-500" />, action: () => { openIDCard?.(); onClose(); }, shortcut: 'I' },
    { id: 'whatsapp', label: 'Chat on WhatsApp', category: 'Tools', icon: <MessageSquare size={18} className="text-emerald-500" />, action: () => { window.open('https://wa.me/8801319156975', '_blank'); onClose(); } },
  ], [isDarkMode, isRecruiterMode, toggleDarkMode, toggleRecruiterMode, openResume, openIDCard, onClose]);

  const filteredCommands = useMemo(() => {
    if (!query) return commands;
    const lowerQuery = query.toLowerCase();
    return commands.filter(c => 
      c.label.toLowerCase().includes(lowerQuery) || 
      c.category.toLowerCase().includes(lowerQuery)
    );
  }, [query, commands]);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
      setQuery('');
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[activeIndex]) {
          filteredCommands[activeIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, activeIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-start justify-center pt-[15vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            <div className="relative p-6 border-b border-slate-100 dark:border-slate-800">
              <div className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={20} />
              </div>
              <input
                ref={inputRef}
                type="text"
                autoFocus
                placeholder="Type to search or navigate..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl py-4 pl-14 pr-12 text-lg outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-slate-900 dark:text-white"
              />
              <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                <kbd className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-[10px] font-black text-slate-500">ESC</kbd>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[400px] p-4 scrollbar-hide">
              {filteredCommands.length > 0 ? (
                <div className="space-y-6">
                  {['Navigation', 'System', 'Tools'].map(category => {
                    const categoryItems = filteredCommands.filter(c => c.category === category);
                    if (categoryItems.length === 0) return null;
                    
                    return (
                      <div key={category}>
                        <h4 className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">{category}</h4>
                        <div className="space-y-1">
                          {categoryItems.map((item) => {
                            const globalIndex = filteredCommands.findIndex(c => c.id === item.id);
                            const isSelected = activeIndex === globalIndex;
                            
                            return (
                              <button
                                key={item.id}
                                onClick={item.action}
                                onMouseEnter={() => setActiveIndex(globalIndex)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all cursor-pointer group text-left ${
                                  isSelected 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 translate-x-1' 
                                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                                }`}
                              >
                                <div className="flex items-center space-x-4">
                                  <div className={`p-2 rounded-xl transition-colors ${
                                    isSelected ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-white/10'
                                  }`}>
                                    {item.icon}
                                  </div>
                                  <span className="font-bold text-sm tracking-tight">{item.label}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  {item.shortcut && (
                                    <kbd className={`px-2 py-1 rounded text-[10px] font-black transition-colors ${
                                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                                    }`}>
                                      {item.shortcut}
                                    </kbd>
                                  )}
                                  {isSelected && <ArrowRight size={14} className="animate-pulse" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800/50 text-slate-300 dark:text-slate-700">
                    <Search size={32} />
                  </div>
                  <p className="text-slate-500 font-medium">No results found for "{query}"</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">↑↓</kbd>
                  <span>to navigate</span>
                </span>
                <span className="flex items-center space-x-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">Enter</kbd>
                  <span>to select</span>
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Command size={10} />
                <span>Quick Actions</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
