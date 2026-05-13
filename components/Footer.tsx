
import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <motion.a 
          href="#home" 
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-black group cursor-pointer"
        >
          ARNOB<span className="text-blue-500 group-hover:animate-ping inline-block">.</span>
        </motion.a>
        
        <div className="flex flex-col items-center">
          <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center text-center">
            Designed & Built with <Heart size={16} className="mx-2 text-red-500 fill-red-500 animate-pulse" /> by Arnob Mahmud
          </p>
          <p className="text-sm text-slate-400 mt-1">
            © 2026 Arnob Mahmud | All Rights Reserved
          </p>
        </div>

        <div className="flex space-x-6 text-sm font-bold text-slate-500 dark:text-slate-400">
          <a href="#home" className="hover:text-blue-500 transition-colors cursor-pointer">Home</a>
          <a href="#about" className="hover:text-blue-500 transition-colors cursor-pointer">About</a>
          <a href="#projects" className="hover:text-blue-500 transition-colors cursor-pointer">Projects</a>
          <a href="#contact" className="hover:text-blue-500 transition-colors cursor-pointer">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
