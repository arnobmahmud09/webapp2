
import React from 'react';
import SectionWrapper from './SectionWrapper';
import { INTEREST_ICONS, PROFILE_IMAGE } from '../constants';
import { FileText, CheckCircle, Contact2, Building2, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface AboutProps {
  isRecruiterMode?: boolean;
  onOpenID?: () => void;
}

const About: React.FC<AboutProps> = ({ isRecruiterMode = false, onOpenID }) => {
  const handleDownloadCV = () => {
    const content = `
ARNOB MAHMUD
Aspiring Developer | CST Student at Rajshahi Polytechnic Institute

PERSONAL INFO:
Age: 18 (Born: 19 Nov 2007)
Present Address: Rajshahi, Bangladesh
Permanent Address: Shibpur hat, Puthia, Rajshahi

CONTACT:
Email: arnobmahmud03@gmail.com
WhatsApp: +8801319156975

SKILLS:
- C++, Python, Web Development (HTML/CSS/JS), AI/ML Foundations
- Problem Solving, Fast Learner, Team Player
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Arnob_Mahmud_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <SectionWrapper id="about">
      <div className="grid lg:grid-cols-12 gap-8 md:gap-16 items-start">
        {/* Profile Image Column */}
        <div className="lg:col-span-5 relative group w-full max-w-md mx-auto lg:max-w-none">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative glass p-3 md:p-4 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative">
                <img 
                  src={PROFILE_IMAGE} 
                  alt="Arnob Mahmud" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent" />
                
                {/* Identity Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-4 md:p-6 glass rounded-2xl border border-white/20 backdrop-blur-2xl shadow-2xl overflow-hidden group/badge">
                   <div className="flex items-center space-x-4 md:space-x-5 relative z-10">
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
                          <ShieldCheck size={20} className="md:size-7 animate-pulse" />
                        </div>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center space-x-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                           <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-blue-400">Verified Identity</p>
                        </div>
                        <p className="text-sm md:text-lg font-black text-white uppercase tracking-tighter mt-0.5 truncate">ARNOB MAHMUD</p>
                        <div className="flex items-center space-x-2 mt-1 opacity-60">
                          <Building2 size={10} className="md:size-3 text-slate-300" />
                          <span className="text-[8px] md:text-[9px] font-bold text-slate-300 uppercase tracking-widest">BATCH 2026</span>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-7 w-full">
          <div className="relative glass p-6 sm:p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-white/5">
            <h3 className="text-3xl md:text-4xl font-black mb-6 md:mb-8 tracking-tighter">
              {isRecruiterMode ? 'Professional Profile' : "Hello! I'm Arnob."}
            </h3>
            
            <div className="space-y-6 mb-8 text-sm md:text-base lg:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {isRecruiterMode ? (
                <>
                  <p>
                    CST diploma student at <span className="text-blue-500 font-bold">Rajshahi Polytechnic Institute</span> focusing on robust architectures and technical excellence.
                  </p>
                  <ul className="space-y-4">
                    {['Advanced C++ & Python logic', 'Rapid prototyping of web solutions', 'Highly adaptable and fast learner'].map((item, i) => (
                      <li key={i} className="flex items-start space-x-3 text-sm font-medium">
                        <CheckCircle className="text-blue-500 shrink-0 mt-0.5" size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <p>
                    I’m Arnob Mahmud, an <span className="text-blue-500 font-bold">18-year-old</span> Computer Science student at <span className="text-blue-500 font-bold">Rajshahi Polytechnic Institute</span>. 
                  </p>
                  <p>
                    I enjoy crafting digital solutions and pushing the boundaries of what's possible with code. My journey is built on continuous learning and curiosity.
                  </p>
                </>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="p-4 glass rounded-2xl border-l-4 border-blue-500 flex flex-col justify-center">
                <span className="font-bold text-xs uppercase tracking-widest text-slate-500 mb-1">Status</span>
                <span className="font-black text-sm">{isRecruiterMode ? 'Available for Hire' : 'Active Learner'}</span>
              </div>
              <div className="p-4 glass rounded-2xl border-l-4 border-emerald-500 flex flex-col justify-center">
                <span className="font-bold text-xs uppercase tracking-widest text-slate-500 mb-1">Timeline</span>
                <span className="font-black text-sm">18y • Born Nov 19, 2007</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 relative z-20">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenID}
                className="w-full sm:flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-purple-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-purple-500/20 cursor-pointer"
              >
                <Contact2 size={18} />
                <span>Web Identity</span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownloadCV}
                className="w-full sm:flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 cursor-pointer"
              >
                <FileText size={18} />
                <span>Download CV</span>
              </motion.button>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-xl md:text-2xl font-black mb-6 tracking-tight uppercase">
              Field of <span className="text-blue-500">Interest</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {INTEREST_ICONS.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center justify-center p-6 glass rounded-3xl border border-transparent hover:border-blue-500/30 transition-all group"
                >
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                    {React.cloneElement(item.icon as any, { size: 24 })}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
