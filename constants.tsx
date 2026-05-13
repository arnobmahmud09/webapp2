
import React from 'react';
import { 
  Code2, 
  Smartphone, 
  BrainCircuit, 
  Monitor, 
  Github, 
  Terminal, 
  Coffee,
  Database,
  Layout,
  Cpu,
  Globe,
  MessageCircle,
  Users,
  Zap,
  BookOpen
} from 'lucide-react';
import { EducationEntry, Skill, JournalEntry } from './types';

// Centralized Profile Image Link
export const PROFILE_IMAGE = "https://i.postimg.cc/25YVZNcm/me.jpg";

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Journal', href: '#journal' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export const EDUCATION: EducationEntry[] = [
  {
    period: '2026 - Present',
    title: 'Diploma in CST',
    institution: 'Rajshahi Polytechnic Institute',
    status: 'Running'
  },
  {
    period: '2025',
    title: 'SSC Completed',
    institution: 'Local High School',
    status: 'Graduated'
  }
];

export const SKILLS: Skill[] = [
  { name: 'C++', level: 65, icon: 'terminal', description: 'Deepening my understanding of algorithms and logic.' },
  { name: 'Python', level: 60, icon: 'code', description: 'Focusing on scripting and AI foundations.' },
  { name: 'Web Dev', level: 75, icon: 'globe', description: 'Proficient in modern web technologies including React and Tailwind.' },
  { name: 'AI Integration', level: 70, icon: 'cpu', description: 'Expertise in integrating LLMs like Gemini into web applications.' }
];

export const SOFT_SKILLS = [
  { name: 'Problem Solving', icon: <BrainCircuit size={24} /> },
  { name: 'Self-Motivated', icon: <Zap size={24} /> },
  { name: 'Fast Learner', icon: <BookOpen size={24} /> },
  { name: 'Teamwork', icon: <Users size={24} /> }
];

export const TOOLS = [
  { name: 'VS Code', icon: <Monitor size={24} /> },
  { name: 'Git & GitHub', icon: <Github size={24} /> },
  { name: 'Netlify', icon: <Globe size={24} /> }
];

export const INTEREST_ICONS = [
  { name: 'Web Development', icon: <Layout className="text-blue-400" /> },
  { name: 'App Development', icon: <Smartphone className="text-purple-400" /> },
  { name: 'AI/ML', icon: <BrainCircuit className="text-amber-400" /> }
];

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    week: 'Week 42',
    date: 'Oct 2026',
    title: 'Launching NovaStudyAI',
    category: 'AI',
    takeaways: [
      'Successfully integrated multi-modal AI capabilities.',
      'Optimized token usage for faster study guide generation.',
      'Achieved seamless mobile responsiveness across the platform.'
    ],
    status: 'Mastered'
  },
  {
    week: 'Week 40',
    date: 'Oct 2026',
    title: 'Advanced React Patterns',
    category: 'Design',
    takeaways: [
      'Implemented Higher-Order Components for the project UI.',
      'Explored Framer Motion Layout animations.',
      'Refined user conversion paths in web apps.'
    ],
    status: 'Refining'
  }
];
