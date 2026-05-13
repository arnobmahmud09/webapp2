
import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Database, Network, Loader2, Sparkles, Binary, ShieldCheck, Milestone, Compass } from 'lucide-react';

interface FutureLabProps {
  isRecruiterMode?: boolean;
}

const FutureLab: React.FC<FutureLabProps> = ({ isRecruiterMode = false }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const allLogs = [
    "Initializing neural pathways...",
    "Optimizing reactive state machines...",
    "Securing handshake protocols...",
    "Compiling future-ready components...",
    "Deploying edge-computing modules...",
    "Synchronizing database clusters...",
    "Verifying SSL integrity...",
    "Architecting user experiences..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const next = [...prev, allLogs[Math.floor(Math.random() * allLogs.length)]];
        if (next.length > 8) return next.slice(1);
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionWrapper id="future-lab" className="relative">
      {/* Visual background grid - Neural vibe */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="text-center mb-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8"
        >
          <motion.span 
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-blue-500" 
          />
          <span>{isRecruiterMode ? 'Strategic Vision' : 'Project Lab: Level 7 Active'}</span>
        </motion.div>
        
        <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-4 uppercase leading-[0.8] relative group">
          <span className="relative z-10">{isRecruiterMode ? 'THE STRATEGIC' : 'THE FUTURE'}</span> <br />
          <span className="gradient-text relative z-10">{isRecruiterMode ? 'ROADMAP' : 'LAB'}<span className="text-blue-500">.</span></span>
          <span className="absolute inset-0 -z-10 text-slate-200 dark:text-slate-800 translate-x-1 translate-y-1 opacity-0 group-hover:opacity-50 transition-opacity">
            {isRecruiterMode ? 'STRATEGIC ROADMAP' : 'THE FUTURE LAB'}
          </span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg mt-12 font-medium">
          {isRecruiterMode 
            ? "A technical development plan focusing on full-stack mastery and cloud-native solutions over the next 3 years."
            : "Behind these digital curtains, I'm architecting a new standard for web and software experiences. Innovation is a journey."}
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Main Control Panel */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="h-full glass rounded-[3rem] border border-slate-200 dark:border-slate-800 p-8 md:p-12 relative overflow-hidden flex flex-col justify-center"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Binary size={120} strokeWidth={1} />
            </div>

            <div className="space-y-12 relative z-10">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-black uppercase tracking-widest text-blue-500">
                      {isRecruiterMode ? 'Technical Maturity' : 'Build Progress'}
                    </h4>
                    <p className="text-2xl font-black">System Alpha-9</p>
                  </div>
                  <span className="text-4xl font-black text-slate-200 dark:text-slate-800">88%</span>
                </div>
                <div className="h-4 w-full bg-slate-100 dark:bg-slate-900 rounded-full p-1 shadow-inner">
                  <motion.div 
                    initial={{ width: "0%" }}
                    whileInView={{ width: "88%" }}
                    transition={{ duration: 3, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 via-indigo-400 to-purple-600 rounded-full relative"
                  >
                    <motion.div 
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-white/20 skew-x-12 blur-sm"
                    />
                  </motion.div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <Cpu size={20}/>, label: "Efficiency", status: "Optimal" },
                  { icon: <ShieldCheck size={20}/>, label: "Security", status: "Verified" },
                  { icon: <Network size={20}/>, label: "Scalability", status: "High" },
                  { icon: <Compass size={20}/>, label: "UI/UX", status: "Clean" }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
                    <div className="text-blue-500 mb-2">{item.icon}</div>
                    <span className="text-[10px] font-black uppercase tracking-widest block mb-1">{item.label}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Terminal / Strategy Overview */}
        <div className="lg:col-span-5">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`h-full rounded-[3rem] border shadow-2xl p-8 flex flex-col min-h-[400px] transition-all duration-700 ${
              isRecruiterMode ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800' : 'bg-[#0a0a0f] border-white/5'
            }`}
          >
            <div className="flex items-center space-x-2 mb-8 border-b border-white/5 pb-4">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <div className="ml-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {isRecruiterMode ? 'Execution Milestones' : 'Compiler Terminal'}
              </div>
            </div>

            <div className={`font-mono text-sm space-y-4 flex-grow ${isRecruiterMode ? 'text-slate-600 dark:text-slate-300' : ''}`}>
              {isRecruiterMode ? (
                <>
                  <div className="flex items-start space-x-3 group">
                    <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
                    <div>
                      <span className="font-black text-blue-500 block mb-1">Q4 2026</span>
                      <p className="text-xs leading-relaxed">Full-Stack Certification & System Alpha-9 Public Release.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 group">
                    <div className="mt-1 w-2 h-2 rounded-full bg-slate-400" />
                    <div>
                      <span className="font-black text-slate-400 block mb-1">2027-28</span>
                      <p className="text-xs leading-relaxed">Cloud-Native Architectures & Real-time AI Integration projects.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 group">
                    <div className="mt-1 w-2 h-2 rounded-full bg-slate-400 opacity-50" />
                    <div>
                      <span className="font-black text-slate-400/50 block mb-1">Beyond 2028</span>
                      <p className="text-xs leading-relaxed">Lead Developer / Architect roles in top-tier tech firms.</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-blue-400">arnob@lab:~$ ./start_innovation_cycle.sh</div>
                  <div className="text-slate-500 italic">Initializing build sequences...</div>
                  <AnimatePresence>
                    {logs.map((log, idx) => (
                      <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-start space-x-3">
                        <span className="text-emerald-500/50 pr-2 border-r border-white/5">{idx + 1}</span>
                        <span className="text-white/80">{log}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
               <motion.a 
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-500/20 cursor-pointer"
               >
                 {isRecruiterMode ? 'GET PROFESSIONAL CV' : 'Request Notification'}
               </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FutureLab;
