
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const whatsappNumber = "8801319156975";
  const message = encodeURIComponent("Hi Arnob, I visited your portfolio and would like to connect!");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[60] bg-emerald-500 text-white p-4 rounded-full shadow-2xl shadow-emerald-500/40 flex items-center justify-center group cursor-pointer"
      title="Chat on WhatsApp"
    >
      <div className="absolute right-full mr-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl border border-slate-200 dark:border-slate-800 pointer-events-none">
        Chat with me!
      </div>
      <MessageSquare size={28} fill="currentColor" />
      <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20 -z-10"></span>
    </motion.a>
  );
};

export default WhatsAppButton;
