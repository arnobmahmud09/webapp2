
import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { Mail, Facebook, Instagram, Send, MapPin, MessageSquare, ExternalLink, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Add ContactProps interface to support isRecruiterMode
interface ContactProps {
  isRecruiterMode?: boolean;
}

// Update Contact component to accept isRecruiterMode prop
const Contact: React.FC<ContactProps> = ({ isRecruiterMode = false }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  
  const whatsappNumber = "8801319156975";
  const emailAddress = "arnobmahmud03@gmail.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `--- Sent via Portfolio Website ---`
    );

    setTimeout(() => {
      window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
      setStatus('success');
      
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setStatus('idle');
      }, 3000);
    }, 1000);
  };

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent(`Hi Arnob, I'm ${formData.name || 'someone'} and I'd like to talk about: ${formData.message || 'a project'}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <SectionWrapper id="contact" className="bg-slate-900 text-white rounded-[3rem] my-20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] -z-10 rounded-full" />
      
      <div className="grid lg:grid-cols-2 gap-20 items-start relative z-10">
        <div>
          <h2 className="text-5xl font-black mb-6 tracking-tight leading-[1.1]">
            {isRecruiterMode ? 'Professional' : "Let's build"} <br/>
            <span className="gradient-text">{isRecruiterMode ? 'Inquiry' : 'something great.'}</span>
          </h2>
          <p className="text-slate-400 text-lg mb-12 max-w-md leading-relaxed">
            {isRecruiterMode 
              ? "Are you looking for a dedicated developer for your team? I am open to discussing career opportunities and collaborations."
              : "Interested in working together or just want to say hi? My inbox and WhatsApp are always open."}
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-center space-x-6 group">
              <div className="p-4 bg-slate-800 rounded-2xl group-hover:bg-blue-600 transition-all duration-300 group-hover:scale-110">
                <Mail className="text-blue-400 group-hover:text-white" size={24} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black mb-1">Email Me</p>
                <a href={`mailto:${emailAddress}`} className="text-lg font-bold hover:text-blue-400 transition-colors cursor-pointer">{emailAddress}</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 group">
              <div className="p-4 bg-slate-800 rounded-2xl group-hover:bg-emerald-600 transition-all duration-300 group-hover:scale-110">
                <MessageSquare className="text-emerald-400 group-hover:text-white" size={24} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black mb-1">WhatsApp DM</p>
                <a 
                  href={`https://wa.me/${whatsappNumber}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-lg font-bold hover:text-emerald-400 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  +{whatsappNumber.slice(0,3)} {whatsappNumber.slice(3,7)}-{whatsappNumber.slice(7)}
                  <ExternalLink size={14} className="opacity-50" />
                </a>
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-6 group">
                <div className="p-4 bg-slate-800 rounded-2xl group-hover:bg-purple-600 transition-all duration-300 group-hover:scale-110">
                  <MapPin className="text-purple-400 group-hover:text-white" size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black mb-1">Present Address</p>
                  <p className="text-lg font-bold text-slate-200">Rajshahi, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="p-4 bg-slate-800 rounded-2xl group-hover:bg-indigo-600 transition-all duration-300 group-hover:scale-110">
                  <MapPin className="text-indigo-400 group-hover:text-white" size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black mb-1">Permanent Address</p>
                  <p className="text-lg font-bold text-slate-200">Shibpur hat, Puthia, Rajshahi</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            {[
              { icon: <Facebook size={20} />, link: 'https://www.facebook.com/arnobmahmudegypt' },
              { icon: <Instagram size={20} />, link: 'https://www.instagram.com/arnob_mahmud01/' },
              { icon: <Mail size={20} />, link: `mailto:${emailAddress}` }
            ].map((social, idx) => (
              <motion.a 
                key={idx} 
                href={social.link} 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, backgroundColor: '#2563eb' }}
                className="p-4 bg-slate-800 rounded-full transition-all border border-slate-700 cursor-pointer pointer-events-auto"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 p-10 rounded-[2.5rem] border border-slate-700 backdrop-blur-sm relative group">
          <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl rotate-12">
            Quick Response
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Your Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700 text-white pointer-events-auto" 
                  placeholder="John Doe" 
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700 text-white pointer-events-auto" 
                  placeholder="john@example.com" 
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Message</label>
              <textarea 
                rows={4} 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none placeholder:text-slate-700 text-white pointer-events-auto" 
                placeholder="What are you thinking?"
                required
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                type="submit" 
                disabled={status !== 'idle'}
                className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black flex items-center justify-center space-x-2 shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] uppercase tracking-widest text-xs cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed min-h-[60px] pointer-events-auto"
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center space-x-2">
                      <Send size={16} />
                      <span>Send Email</span>
                    </motion.div>
                  )}
                  {status === 'sending' && (
                    <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center space-x-2">
                      <Loader2 size={16} className="animate-spin" />
                      <span>Preparing...</span>
                    </motion.div>
                  )}
                  {status === 'success' && (
                    <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center space-x-2">
                      <CheckCircle2 size={16} />
                      <span>App Opened!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              
              <button 
                type="button"
                onClick={handleWhatsAppChat}
                className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black flex items-center justify-center space-x-2 shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.98] uppercase tracking-widest text-xs cursor-pointer min-h-[60px] pointer-events-auto"
              >
                <MessageSquare size={16} />
                <span>Direct WhatsApp</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
