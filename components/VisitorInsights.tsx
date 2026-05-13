
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Activity, Globe } from 'lucide-react';

const BD_CITIES = [
  'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 
  'Barisal', 'Rangpur', 'Comilla', 'Gazipur', 'Narayanganj',
  'Bogra', 'Mymensingh', 'Jessore'
];

const GLOBAL_CITIES = [
  'London', 'New York', 'Singapore', 'Berlin', 'Tokyo', 'Toronto'
];

const VisitorInsights: React.FC = () => {
  const [currentInsight, setCurrentInsight] = useState<{
    text: string;
    icon: React.ReactNode;
  } | null>(null);
  const [userCity, setUserCity] = useState<string | null>(null);

  // Attempt to get user's city for personalization
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.city) setUserCity(data.city);
      })
      .catch(() => console.log('Geolocation fallback to simulation only.'));
  }, []);

  useEffect(() => {
    const triggerInsight = () => {
      const isInitial = !currentInsight;
      const delay = isInitial ? 3000 : Math.random() * 20000 + 15000; // 15-35s interval

      const timeout = setTimeout(() => {
        const type = Math.random();
        let text = "";
        let icon = <Users size={14} />;

        if (type > 0.8 && userCity) {
          text = `Greetings to someone in ${userCity}!`;
          icon = <MapPin size={14} className="text-blue-500" />;
        } else if (type > 0.5) {
          const city = BD_CITIES[Math.floor(Math.random() * BD_CITIES.length)];
          text = `Someone from ${city} is viewing your portfolio`;
          icon = <Activity size={14} className="text-emerald-500" />;
        } else if (type > 0.2) {
          const city = GLOBAL_CITIES[Math.floor(Math.random() * GLOBAL_CITIES.length)];
          text = `Global visit: Developer from ${city} explored the Lab`;
          icon = <Globe size={14} className="text-indigo-500" />;
        } else {
          const count = Math.floor(Math.random() * 5) + 2;
          text = `Live: ${count} developers currently exploring the Lab`;
          icon = <Users size={14} className="text-blue-500" />;
        }

        setCurrentInsight({ text, icon });

        // Hide after 6 seconds
        setTimeout(() => setCurrentInsight(null), 6000);
        
        triggerInsight();
      }, delay);

      return timeout;
    };

    const timer = triggerInsight();
    return () => clearTimeout(timer);
  }, [userCity]);

  return (
    <div className="fixed bottom-8 left-28 md:left-32 z-[55] pointer-events-none">
      <AnimatePresence>
        {currentInsight && (
          <motion.div
            initial={{ opacity: 0, x: -20, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className="flex items-center space-x-3 px-4 py-3 glass rounded-2xl border border-blue-500/20 shadow-2xl backdrop-blur-xl min-w-[280px]"
          >
            <div className="relative">
              <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
                {currentInsight.icon}
              </div>
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-0.5">Live Insights</p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{currentInsight.text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VisitorInsights;
