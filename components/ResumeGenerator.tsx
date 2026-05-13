
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, Loader2, Sparkles, X, CheckCircle2, FileText, Download, User, Mail, Smartphone, MapPin } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { SKILLS, EDUCATION } from '../constants';

interface ResumeGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeGenerator: React.FC<ResumeGeneratorProps> = ({ isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  const generateResume = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `
        You are an expert tech recruiter and professional resume writer.
        Translate the following portfolio data of Arnob Mahmud (18 years old, CST student) into a high-impact, modern resume structure.
        Data:
        - Skills: ${SKILLS.map(s => `${s.name} (${s.level}%)`).join(', ')}
        - Education: ${EDUCATION.map(e => `${e.title} at ${e.institution} (${e.period})`).join(', ')}
        - Bio: Aspiring Developer, specialized in C++, Python, Web Dev.
        
        Return a JSON object with:
        - professionalSummary: (2-3 sentences)
        - experience: (Create 3-4 professional-sounding bullet points based on his "System Alpha-9" project and student role)
        - keyMilestones: (3 points)
        - softSkills: (4 points)
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              professionalSummary: { type: Type.STRING },
              experience: { type: Type.ARRAY, items: { type: Type.STRING } },
              keyMilestones: { type: Type.ARRAY, items: { type: Type.STRING } },
              softSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["professionalSummary", "experience", "keyMilestones", "softSkills"]
          }
        }
      });

      const data = JSON.parse(response.text);
      setResumeData(data);
    } catch (error) {
      console.error("AI Resume Generation Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    
    const canvas = await html2canvas(resumeRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Arnob_Mahmud_AI_Resume.pdf');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" 
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">AI Resume Engine</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Transforming data into impact</p>
                </div>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 scrollbar-hide">
              {!resumeData && !isGenerating ? (
                <div className="flex flex-col items-center justify-center text-center space-y-8 py-20">
                  <div className="w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-500">
                    <FileText size={48} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black mb-2">Ready to compile?</h4>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      Our AI will analyze your 2026 portfolio state, optimize your accomplishments, and generate a professional PDF.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generateResume}
                    className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 flex items-center space-x-3 cursor-pointer"
                  >
                    <Sparkles size={20} />
                    <span>GENERATE NOW</span>
                  </motion.button>
                </div>
              ) : isGenerating ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-8">
                  <div className="relative">
                    <Loader2 size={64} className="text-blue-500 animate-spin" />
                    <motion.div 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 flex items-center justify-center text-blue-500"
                    >
                      <Sparkles size={24} />
                    </motion.div>
                  </div>
                  <div className="space-y-2 text-center">
                    <p className="text-lg font-black uppercase tracking-widest">Neural Link Synchronizing...</p>
                    <p className="text-xs text-slate-500 font-mono">Parsing skill vectors & education matrices</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-12">
                  {/* Left Column: Preview */}
                  <div className="flex-1">
                    <div 
                      ref={resumeRef}
                      className="bg-white text-slate-900 p-10 shadow-2xl rounded-sm border border-slate-100 font-serif max-w-[210mm] mx-auto"
                      style={{ width: '100%', minHeight: '297mm', color: '#1a1a1a', background: 'white' }}
                    >
                      {/* PDF Header */}
                      <header className="border-b-4 border-slate-900 pb-8 mb-8">
                        <h1 className="text-4xl font-bold uppercase tracking-tighter mb-4">Arnob Mahmud</h1>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-slate-600 uppercase tracking-widest">
                          <span className="flex items-center gap-1"><Mail size={12} /> arnobmahmud03@gmail.com</span>
                          <span className="flex items-center gap-1"><Smartphone size={12} /> +8801319156975</span>
                          <span className="flex items-center gap-1"><MapPin size={12} /> Rajshahi, Bangladesh</span>
                        </div>
                      </header>

                      {/* PDF Body */}
                      <div className="space-y-8">
                        <section>
                          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-3">Professional Summary</h2>
                          <p className="text-sm leading-relaxed text-slate-800">{resumeData.professionalSummary}</p>
                        </section>

                        <section>
                          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-4">Core Technical Skills</h2>
                          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                            {SKILLS.map((s, i) => (
                              <div key={i} className="flex justify-between items-center text-xs border-b border-slate-100 pb-1">
                                <span className="font-bold">{s.name}</span>
                                <span className="text-slate-400">{s.level}% Mastery</span>
                              </div>
                            ))}
                          </div>
                        </section>

                        <section>
                          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-4">Experience & Major Projects</h2>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-sm font-bold uppercase">Software Architect & Founder</h3>
                                <span className="text-[10px] font-bold text-slate-400">2026 - PRESENT</span>
                              </div>
                              <p className="text-[11px] font-bold text-slate-500 mb-2 italic">Future Lab / Personal Portfolio Project</p>
                              <ul className="list-disc list-inside space-y-1.5">
                                {resumeData.experience.map((exp: string, i: number) => (
                                  <li key={i} className="text-xs text-slate-700 leading-snug pl-1">{exp}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </section>

                        <section>
                          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-4">Education</h2>
                          <div className="space-y-3">
                            {EDUCATION.map((edu, i) => (
                              <div key={i}>
                                <div className="flex justify-between items-baseline">
                                  <h3 className="text-xs font-bold uppercase">{edu.title}</h3>
                                  <span className="text-[10px] font-bold text-slate-400">{edu.period}</span>
                                </div>
                                <p className="text-[11px] text-slate-500 font-bold">{edu.institution}</p>
                              </div>
                            ))}
                          </div>
                        </section>

                        <div className="grid grid-cols-2 gap-10 pt-4">
                          <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-3">Key Milestones</h2>
                            <ul className="space-y-1">
                              {resumeData.keyMilestones.map((m: string, i: number) => (
                                <li key={i} className="text-[11px] text-slate-700 flex items-center gap-2">
                                  <CheckCircle2 size={10} className="text-emerald-500" /> {m}
                                </li>
                              ))}
                            </ul>
                          </section>
                          <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-3">Professional Assets</h2>
                            <div className="flex flex-wrap gap-2">
                              {resumeData.softSkills.map((s: string, i: number) => (
                                <span key={i} className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">{s}</span>
                              ))}
                            </div>
                          </section>
                        </div>
                      </div>

                      <footer className="mt-12 pt-6 border-t border-slate-100 text-[9px] text-center text-slate-400 font-sans tracking-widest uppercase">
                        AI Generated via Arnob Mahmud Portfolio Engine • 2026
                      </footer>
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="w-full md:w-64 space-y-6">
                    <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <h4 className="font-black text-sm uppercase mb-4 tracking-tight">Compilation Complete</h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-6">
                        Your professional profile has been optimized for ATS systems and executive review.
                      </p>
                      <div className="space-y-3">
                        <button 
                          onClick={downloadPDF}
                          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20 cursor-pointer"
                        >
                          <Download size={16} />
                          <span>EXPORT PDF</span>
                        </button>
                        <button 
                          onClick={generateResume}
                          className="w-full py-4 glass border border-slate-200 dark:border-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          <Sparkles size={16} />
                          <span>RE-GENERATE</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-6 rounded-3xl border border-dashed border-emerald-500/30 bg-emerald-500/5">
                      <div className="flex items-center space-x-2 text-emerald-500 mb-2">
                        <CheckCircle2 size={16} />
                        <span className="text-[10px] font-black uppercase">Recruiter Recommended</span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 italic leading-relaxed">
                        "Clean, ATS-ready layout ensures 100% readability by hiring systems."
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResumeGenerator;
