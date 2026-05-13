
import React from 'react';
import SectionWrapper from './SectionWrapper';
import { SKILLS, SOFT_SKILLS, TOOLS } from '../constants';
import { motion } from 'framer-motion';
import SkillGrowthVisualizer from './SkillGrowthVisualizer';

interface SkillsProps {
  isRecruiterMode?: boolean;
}

const Skills: React.FC<SkillsProps> = ({ isRecruiterMode = false }) => {
  return (
    <SectionWrapper id="skills">
      <div className="text-center mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-black mb-6 uppercase tracking-tighter"
        >
          {isRecruiterMode ? (
            <>Technical <span className="text-accent-primary">Skills</span></>
          ) : (
            <>My <span className="text-accent-primary">Skills</span></>
          )}
        </motion.h2>
        <div className="h-2 w-24 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto rounded-full mb-8" />
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
          {isRecruiterMode 
            ? "A comprehensive overview of my technical toolkit and professional proficiency."
            : "I combine technical proficiency with creative problem-solving to build software that stands out."}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-20">
        {/* Technical Skills */}
        <div className="space-y-12">
          <h3 className="text-2xl font-black mb-10 flex items-center tracking-tight">
            <span className="w-10 h-10 bg-accent-primary text-white rounded-xl flex items-center justify-center mr-4 text-sm font-bold shadow-lg shadow-accent-glow">01</span>
            Core Development
          </h3>
          <div className="space-y-6">
            {SKILLS.map((skill, idx) => (
              <motion.div 
                key={idx} 
                className={`group p-6 glass rounded-3xl border border-transparent hover:border-accent-primary/20 transition-all duration-500 ${isRecruiterMode ? 'py-4' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 * idx, duration: 0.8 }}
              >
                <div className="flex justify-between mb-3">
                  <span className="font-black text-sm tracking-widest uppercase text-slate-700 dark:text-slate-200">{skill.name}</span>
                  <span className="text-accent-primary font-black text-sm">{skill.level}%</span>
                </div>
                <div className="h-3 w-full bg-slate-200 dark:bg-slate-800/50 rounded-full overflow-hidden p-[1px] shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 + (idx * 0.1) }}
                    viewport={{ once: true }}
                    className="h-full bg-gradient-to-r from-accent-primary via-accent-secondary to-purple-600 rounded-full relative overflow-hidden shadow-accent-glow"
                  >
                    <motion.div 
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                      className="absolute inset-0 bg-white/20 skew-x-12 blur-sm"
                    />
                  </motion.div>
                </div>
                {!isRecruiterMode && (
                  <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{skill.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Soft Skills & Tools */}
        <div className="space-y-16">
          <div className="p-8 glass rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-black mb-10 flex items-center tracking-tight">
              <span className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center mr-4 text-sm font-bold shadow-lg shadow-purple-500/20">02</span>
              {isRecruiterMode ? 'Professional Assets' : 'Human Skills'}
            </h3>
            <div className={`grid gap-4 ${isRecruiterMode ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
              {SOFT_SKILLS.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx, duration: 0.5 }}
                  className={`bg-slate-100 dark:bg-slate-900/50 p-5 rounded-2xl flex items-center border border-transparent hover:border-accent-primary/20 transition-all cursor-default ${isRecruiterMode ? 'flex-col text-center space-x-0 space-y-3' : 'space-x-4'}`}
                >
                  <div className="text-accent-primary bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm">{item.icon}</div>
                  <span className="font-bold text-sm tracking-tight">{item.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-8 glass rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-black mb-10 flex items-center tracking-tight">
              <span className="w-10 h-10 bg-amber-600 text-white rounded-xl flex items-center justify-center mr-4 text-sm font-bold shadow-lg shadow-amber-500/20">03</span>
              Tools & Ecosystem
            </h3>
            <div className="flex flex-wrap gap-4">
              {TOOLS.map((tool, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * idx }}
                  className="bg-white dark:bg-slate-900 px-6 py-4 rounded-2xl flex items-center space-x-3 border border-slate-200 dark:border-slate-800 hover:border-accent-primary transition-all shadow-sm"
                >
                  <div className="text-accent-primary">{tool.icon}</div>
                  <span className="font-black text-xs uppercase tracking-widest">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Growth Visualizer integrated here - only show in Student Mode or as a secondary element */}
      {!isRecruiterMode && <SkillGrowthVisualizer />}
    </SectionWrapper>
  );
};

export default Skills;
