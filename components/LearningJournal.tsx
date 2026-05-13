
import React from 'react';
import SectionWrapper from './SectionWrapper';
import { JOURNAL_ENTRIES } from '../constants';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Timer, Flame, Code2, Brain, Layout, Cpu } from 'lucide-react';

interface LearningJournalProps {
  isRecruiterMode?: boolean;
}

const LearningJournal: React.FC<LearningJournalProps> = ({ isRecruiterMode = false }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Logic': return <Code2 size={18} />;
      case 'AI': return <Brain size={18} />;
      case 'Design': return <Layout size={18} />;
      default: return <Cpu size={18} />;
    }
  };

  return (
    <SectionWrapper id="journal" className="relative">
      <div className="text-center mb-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8"
        >
          <BookOpen size={12} />
          <span>Continuous Integration / Continuous Learning</span>
        </motion.div>
        
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
          Learning <span className="gradient-text">Journal.</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">
          {isRecruiterMode 
            ? "A professional log of recent technical milestones and conceptual mastery." 
            : "My personal record of weekly growth, technical breakthroughs, and discipline."}
        </p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {[
          { label: "Learning Streak", value: "48 Days", icon: <Flame className="text-orange-500" /> },
          { label: "Hours This Week", value: "32 Hours", icon: <Timer className="text-blue-500" /> },
          { label: "Concepts Logged", value: "120+", icon: <BookOpen className="text-purple-500" /> },
          { label: "Mastery Level", value: "Intermediate", icon: <CheckCircle2 className="text-emerald-500" /> }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 glass rounded-3xl border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center"
          >
            <div className="mb-3 p-3 bg-slate-100 dark:bg-slate-900 rounded-xl">{stat.icon}</div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
            <p className="text-xl font-black">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto relative px-4">
        {/* Glowing Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-indigo-500 to-transparent opacity-30 md:-translate-x-1/2" />

        <div className="space-y-16">
          {JOURNAL_ENTRIES.map((entry, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative flex items-center gap-8 md:gap-0 ${
                idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Point on Timeline */}
              <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-500 shadow-lg shadow-indigo-500/40 z-10 -translate-x-1/2 hidden md:block" />
              
              <div className={`w-full md:w-[45%] ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <div className={`glass p-8 rounded-[2rem] border transition-all hover:border-indigo-500/50 group ${
                  isRecruiterMode ? 'py-6' : ''
                }`}>
                  <div className={`flex items-center gap-3 mb-4 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <span className="text-[10px] font-black px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-lg uppercase tracking-widest">
                      {entry.week}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {entry.date}
                    </span>
                  </div>

                  <div className={`flex items-center gap-3 mb-4 ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {idx % 2 === 0 && <span className="text-sm font-black tracking-tight">{entry.category}</span>}
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-indigo-500">
                      {getCategoryIcon(entry.category)}
                    </div>
                    {idx % 2 !== 0 && <span className="text-sm font-black tracking-tight">{entry.category}</span>}
                  </div>

                  <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-indigo-500 transition-colors">
                    {entry.title}
                  </h3>

                  <ul className={`space-y-3 mb-6 ${idx % 2 === 0 ? 'md:flex md:flex-col md:items-end' : ''}`}>
                    {entry.takeaways.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                        {idx % 2 !== 0 && <CheckCircle2 size={14} className="mt-1 text-indigo-500 shrink-0" />}
                        <span className={idx % 2 === 0 ? 'md:text-right' : 'text-left'}>{point}</span>
                        {idx % 2 === 0 && <CheckCircle2 size={14} className="mt-1 text-indigo-500 shrink-0" />}
                      </li>
                    ))}
                  </ul>

                  <div className={`flex ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border transition-all ${
                      entry.status === 'Mastered' 
                        ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-500' 
                        : entry.status === 'Refining' 
                          ? 'border-amber-500/30 bg-amber-500/5 text-amber-500' 
                          : 'border-blue-500/30 bg-blue-500/5 text-blue-500'
                    }`}>
                      {entry.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:block md:w-[10%]" />
              <div className="hidden md:block md:w-[45%]" />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Footer message */}
      {!isRecruiterMode && (
        <div className="mt-20 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">
            Log Updated: Today at 08:30 AM
          </p>
        </div>
      )}
    </SectionWrapper>
  );
};

export default LearningJournal;
