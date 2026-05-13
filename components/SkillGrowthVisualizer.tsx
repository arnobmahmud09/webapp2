
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Calendar } from 'lucide-react';

const SKILL_GROWTH_DATA = [
  { name: 'C++', current: 65, projected: 92, color: 'var(--accent-primary)' },
  { name: 'Python', current: 60, projected: 95, color: '#10b981' }, // Emerald
  { name: 'Web Dev', current: 45, projected: 88, color: '#f59e0b' }, // Amber
  { name: 'AI/ML', current: 30, projected: 85, color: '#d946ef' }, // Fuchsia
];

const SkillGrowthVisualizer: React.FC = () => {
  return (
    <div className="mt-20 p-8 md:p-12 glass rounded-[3rem] border border-slate-200 dark:border-slate-800 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(var(--accent-primary) 1px, transparent 1px), linear-gradient(90deg, var(--accent-primary) 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] font-black uppercase tracking-widest mb-4">
              <TrendingUp size={12} />
              <span>Future Projection</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight">AI Skill <span className="text-accent-primary">Growth</span> Map</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md font-medium">
              A data-driven visualization of my learning trajectory and mastery goals for the next 12 months.
            </p>
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Status</p>
              <p className="text-xl font-black text-accent-primary">ACTIVE</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Timeline</p>
              <p className="text-xl font-black">12 MONTHS</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Animated SVG Graph */}
          <div className="relative aspect-video bg-slate-900/50 rounded-3xl border border-white/5 p-6 overflow-hidden shadow-2xl">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              {/* Grid Lines */}
              {[0, 50, 100, 150, 200].map((y) => (
                <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="white" strokeOpacity="0.05" strokeWidth="1" />
              ))}
              
              {/* Skill Paths */}
              {SKILL_GROWTH_DATA.map((skill, idx) => {
                const startY = 200 - (skill.current * 1.5);
                const endY = 200 - (skill.projected * 1.5);
                const pathData = `M 0 ${startY} C 100 ${startY}, 300 ${endY}, 400 ${endY}`;
                
                return (
                  <g key={idx}>
                    <motion.path
                      d={pathData}
                      fill="none"
                      stroke={skill.color}
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 2, delay: idx * 0.3, ease: "easeInOut" }}
                    />
                    {/* Pulsing end point */}
                    <motion.circle
                      cx="400"
                      cy={endY}
                      r="4"
                      fill={skill.color}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 2 + idx * 0.3 }}
                    >
                      <title>{skill.name}: {skill.projected}%</title>
                    </motion.circle>
                  </g>
                );
              })}
            </svg>
            
            {/* Legend Overlay */}
            <div className="absolute bottom-4 left-6 flex space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Today</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-accent-primary" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">2027 Target</span>
              </div>
            </div>
          </div>

          {/* Details List */}
          <div className="space-y-4">
            {SKILL_GROWTH_DATA.map((skill, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm" style={{ backgroundColor: `${skill.color}20`, color: skill.color }}>
                    {skill.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-tight">{skill.name}</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Growth Potential</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Current</span>
                    <span className="font-black">{skill.current}%</span>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-right">
                    <span className="block text-[10px] font-black text-accent-primary uppercase tracking-widest">Target</span>
                    <span className="font-black text-accent-primary">+{skill.projected - skill.current}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-accent-primary/10 border border-dashed border-accent-primary/30 rounded-2xl mt-6 flex items-start space-x-3"
            >
              <Target size={20} className="text-accent-primary mt-1 shrink-0" />
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                "Learning is not a sprint, it's a series of optimized sprints. My focus is on achieving senior-level proficiency in AI integration by next year."
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGrowthVisualizer;
