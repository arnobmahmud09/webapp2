
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, id, className = "" }) => {
  return (
    <motion.section
      id={id}
      initial={{ 
        opacity: 0, 
        y: 40, 
        scale: 0.98,
        filter: "blur(4px)" 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        filter: "blur(0px)" 
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ 
        duration: 1.2, 
        ease: [0.19, 1, 0.22, 1]
      }}
      className={`py-16 md:py-24 px-6 max-w-7xl mx-auto relative ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
