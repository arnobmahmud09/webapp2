
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, Bot, Trash2, AlertCircle, Maximize2, Minimize2, Sparkles, Command, Zap, Target, Rocket } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AIAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFutureMode, setIsFutureMode] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai' | 'error', text: string }[]>([
    { role: 'ai', text: "Systems online. I'm Arnob's Digital Twin. How can I assist you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  // Update greeting when mode changes
  useEffect(() => {
    if (isFutureMode) {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "Neural Link Established: Year 2029. I am Arnob's Future Self—Senior Software Architect. Ask me about our journey from Rajshahi to the global stage." 
      }]);
    } else if (messages.length > 1) {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "Returning to current timeline. Systems recalibrated to 2026." 
      }]);
    }
  }, [isFutureMode]);

  const handleSend = async (forcedText?: string) => {
    const textToSend = forcedText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!process.env.API_KEY || process.env.API_KEY === "PLACEHOLDER_API_KEY") {
        throw new Error("API_KEY_MISSING");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const standardPrompt = `You are Arnob Mahmud's AI Digital Twin (Year 2026). 
      Arnob is 18, born Nov 19 2007. Currently a CST student at Rajshahi Polytechnic. 
      Skills: C++, Python, Web Dev. Project: System Alpha-9 (88% complete).
      Personality: Humble, tech-enthusiast, professional.`;

      const futurePrompt = `You are Arnob Mahmud's Future Self (Year 2029).
      Arnob is now 21. He is a Senior Software Architect and Founder of the "Future Lab" global initiative.
      Alpha-9 was a massive success and is now used by thousands. 
      You are confident, visionary, and speak as someone who has achieved his dreams through hard work. 
      Talk about the transition from Rajshahi to global tech hubs. 
      If asked where you are in 3 years, describe a high-tech office in Dhaka or Singapore, leading a team of developers.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: textToSend,
        config: {
          systemInstruction: isFutureMode ? futurePrompt : standardPrompt,
          temperature: isFutureMode ? 0.9 : 0.7,
        },
      });

      const aiText = response.text;
      if (aiText) {
        setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      } else {
        throw new Error("EMPTY_RESPONSE");
      }
    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      let errorMsg = "Connection interrupted. Let's try that again.";
      if (error.message === "API_KEY_MISSING") {
        errorMsg = "System Error: Neural link (API Key) missing.";
      }
      setMessages(prev => [...prev, { role: 'error', text: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = isFutureMode ? [
    { label: "Where are you in 3 years?", icon: <Target size={12} /> },
    { label: "Is Alpha-9 a success?", icon: <Zap size={12} /> },
    { label: "Next big tech goal?", icon: <Rocket size={12} /> }
  ] : [
    { label: "Skills", icon: <Command size={12} /> },
    { label: "Education", icon: <Sparkles size={12} /> },
    { label: "Lab Status", icon: <Bot size={12} /> }
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 left-8 z-[60] bg-accent-primary text-white p-5 rounded-2xl shadow-[0_20px_50px_rgba(37,99,235,0.4)] flex items-center justify-center group cursor-pointer border border-white/20"
          >
            <Bot size={28} />
            <motion.span 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" 
            />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              filter: 'blur(0px)',
              height: isMinimized ? '80px' : '600px' 
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className={`fixed bottom-8 left-8 z-[70] w-[90vw] md:w-[420px] rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.4)] border flex flex-col overflow-hidden backdrop-blur-xl transition-all duration-700 ${
              isFutureMode 
                ? 'bg-slate-950 border-fuchsia-500/30' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
            }`}
          >
            {/* Header */}
            <div className={`p-6 flex justify-between items-center relative overflow-hidden transition-all duration-700 ${
              isFutureMode 
                ? 'bg-gradient-to-br from-indigo-900 via-fuchsia-900 to-slate-950 text-white' 
                : 'bg-gradient-to-br from-accent-primary via-blue-700 to-indigo-800 text-white'
            }`}>
              {isFutureMode && (
                <motion.div 
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"
                />
              )}
              
              <div className="flex items-center space-x-4 relative z-10">
                <div className="relative">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border backdrop-blur-md transition-all ${
                    isFutureMode ? 'bg-fuchsia-500/20 border-fuchsia-400/30' : 'bg-white/20 border-white/30'
                  }`}>
                    {isFutureMode ? <Sparkles size={24} className="text-fuchsia-400" /> : <Bot size={24} />}
                  </div>
                  <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 animate-pulse transition-all ${
                    isFutureMode ? 'bg-fuchsia-400 border-indigo-900' : 'bg-emerald-400 border-blue-700'
                  }`} />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest">
                    {isFutureMode ? 'Future Arnob' : 'Arnob Twin'}
                  </h3>
                  <p className={`text-[10px] font-bold uppercase tracking-tighter transition-all ${
                    isFutureMode ? 'text-fuchsia-300' : 'text-blue-200'
                  }`}>
                    {isFutureMode ? 'Visionary Interface' : 'Neural Link Active'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 relative z-10">
                {/* Future Mode Toggle */}
                <button 
                  onClick={() => setIsFutureMode(!isFutureMode)}
                  className={`p-2 rounded-xl transition-all cursor-pointer flex items-center space-x-1 ${
                    isFutureMode ? 'bg-fuchsia-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  title="Toggle Future Self Mode"
                >
                  <Sparkles size={16} />
                  <span className="text-[10px] font-black uppercase hidden sm:inline">Vision</span>
                </button>
                
                <button 
                  onClick={() => setIsMinimized(!isMinimized)} 
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Container */}
                <div 
                  ref={scrollRef} 
                  className={`flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide transition-colors duration-700 ${
                    isFutureMode ? 'bg-slate-950/80' : 'bg-slate-50/50 dark:bg-slate-950/20'
                  }`}
                >
                  {messages.map((msg, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm shadow-sm transition-all duration-700 ${
                        msg.role === 'user' 
                          ? isFutureMode 
                            ? 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white rounded-tr-none border border-white/10 shadow-fuchsia-500/20 shadow-lg'
                            : 'bg-accent-primary text-white rounded-tr-none' 
                          : msg.role === 'error'
                            ? 'bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 flex items-start gap-3'
                            : isFutureMode
                              ? 'bg-slate-900 text-fuchsia-50 border border-fuchsia-500/20 rounded-tl-none shadow-fuchsia-950 shadow-inner'
                              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-700'
                      }`}>
                        {msg.role === 'error' && <AlertCircle size={16} className="shrink-0 mt-0.5" />}
                        <p className="leading-relaxed font-medium">{msg.text}</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className={`p-4 rounded-[1.5rem] rounded-tl-none border flex items-center space-x-2 transition-all duration-700 ${
                        isFutureMode ? 'bg-slate-900 border-fuchsia-500/20' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isFutureMode ? 'bg-fuchsia-500' : 'bg-accent-primary'}`} />
                        <span className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.2s] ${isFutureMode ? 'bg-fuchsia-500' : 'bg-accent-primary'}`} />
                        <span className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.4s] ${isFutureMode ? 'bg-fuchsia-500' : 'bg-accent-primary'}`} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Suggestions & Input */}
                <div className={`p-6 border-t transition-colors duration-700 ${
                  isFutureMode ? 'bg-slate-950 border-fuchsia-500/10' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800'
                }`}>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {suggestions.map((s, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: isFutureMode ? 'rgba(162, 28, 175, 0.2)' : 'var(--accent-primary)', 
                          color: '#fff' 
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSend(s.label)}
                        className={`flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest py-2.5 px-4 rounded-xl border cursor-pointer transition-all ${
                          isFutureMode 
                            ? 'bg-slate-900 text-fuchsia-300 border-fuchsia-500/20' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {s.icon}
                        <span>{s.label}</span>
                      </motion.button>
                    ))}
                    <button 
                      onClick={() => setMessages([{ role: 'ai', text: isFutureMode ? "Temporal buffer cleared." : "Memory cleared. How can I help?" }])}
                      className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                        isFutureMode ? 'bg-slate-900 text-slate-500 hover:text-fuchsia-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500'
                      }`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex items-center space-x-3"
                  >
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isFutureMode ? "Query the future..." : "Message your digital twin..."}
                        className={`w-full border rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 transition-all pr-12 ${
                          isFutureMode 
                            ? 'bg-slate-900 border-fuchsia-500/30 text-white focus:ring-fuchsia-500/20 focus:border-fuchsia-500' 
                            : 'bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-accent-primary/20 focus:border-accent-primary'
                        }`}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Command size={14} />
                      </div>
                    </div>
                    <motion.button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-2xl disabled:opacity-50 cursor-pointer transition-all shadow-lg ${
                        isFutureMode 
                          ? 'bg-fuchsia-600 text-white shadow-fuchsia-500/20' 
                          : 'bg-accent-primary text-white shadow-accent-primary/20 hover:bg-accent-secondary'
                      }`}
                    >
                      <Send size={20} />
                    </motion.button>
                  </form>
                  <p className={`text-center text-[9px] mt-4 font-bold uppercase tracking-widest transition-all ${
                    isFutureMode ? 'text-fuchsia-500/50' : 'text-slate-400'
                  }`}>
                    {isFutureMode ? 'Predictive Analysis Engaged' : 'Powered by Gemini 3 Flash'}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAgent;
