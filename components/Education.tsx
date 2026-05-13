
import React from 'react';
import SectionWrapper from './SectionWrapper';
import { EDUCATION } from '../constants';
import { motion } from 'framer-motion';

// Add EducationProps interface to support isRecruiterMode
interface EducationProps {
  isRecruiterMode?: boolean;
}

// Update Education component to accept isRecruiterMode prop
const Education: React.FC<EducationProps> = ({ isRecruiterMode = false }) => {
  return (
    <SectionWrapper id="education">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 uppercase">
            {isRecruiterMode ? 'Educational' : 'Academic'} <span className="text-blue-500">{isRecruiterMode ? 'Background' : 'Path'}</span>
          </h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full mb-6" />
        </div>

        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-0 md:left-1/2">
          {EDUCATION.map((entry, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`relative mb-12 md:w-1/2 ${
                idx % 2 === 0 ? 'md:pr-12 md:text-right md:-left-[50%]' : 'md:pl-12 md:left-0'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute top-0 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-slate-900 -left-[13px] md:left-auto md:right-[-12px] z-10 hidden md:block" />
              <div className="absolute top-0 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-slate-900 -left-[13px] z-10 md:hidden" />

              <div className="glass p-8 rounded-3xl hover:border-blue-500/50 transition-colors shadow-xl">
                <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                  {entry.period}
                </span>
                <h3 className="text-2xl font-black mb-2">{entry.title}</h3>
                <p className="text-slate-500 dark:text-slate-300 font-bold mb-3">{entry.institution}</p>
                {entry.status && (
                  <span className="text-sm px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg font-bold">
                    {entry.status}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Education;
