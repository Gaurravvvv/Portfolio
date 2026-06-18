/* ── Site-wide content data ────────────────────────────────────────── */

export const SITE = {
  name: 'Gaurav Vibhandik',
  title: 'Gaurav Vibhandik — Software & DevOps Engineer Portfolio',
  description:
    'Final-year AI & Data Science student building high-performance, real-time web applications with sub-16ms rendering and 20+ concurrent user support.',
  email: 'gaurrravvjob@gmail.com',
  phone: '+91 9309580062',
  location: 'Nashik, Maharashtra, India',
  github: 'https://github.com/gaurravvvv',
  linkedin: 'https://linkedin.com/in/gaurravvvv',
  resumePath: '/resume.pdf',
} as const;

export const ROLES = [
  'Software Engineer',
  'DevOps Engineer',
  'Full-Stack Developer',
] as const;

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Skills', path: '/skills' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Contact', path: '/contact' },
] as const;

/* ── Skills data ──────────────────────────────────────────────────── */
export interface SkillCategory {
  title: string;
  icon: string; // Lucide icon name
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages',
    icon: 'Code2',
    skills: ['C++', 'Python', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Frontend',
    icon: 'Layout',
    skills: ['React.js', 'Vite', 'Zustand', 'Tailwind CSS', 'Jinja2'],
  },
  {
    title: 'Backend',
    icon: 'Server',
    skills: ['Node.js', 'Express.js', 'Flask', 'Socket.IO', 'REST APIs', 'LangChain'],
  },
  {
    title: 'DevOps & Cloud',
    icon: 'Cloud',
    skills: ['Docker', 'Kubernetes', 'Jenkins CI/CD', 'AWS', 'Linux'],
  },
  {
    title: 'Databases',
    icon: 'Database',
    skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'Redis (TTL, Pub/Sub)'],
  },
  {
    title: 'Tools',
    icon: 'Wrench',
    skills: ['Git', 'GitHub', 'Postman', 'VS Code'],
  },
];

/* ── Projects data ────────────────────────────────────────────────── */
export interface Project {
  title: string;
  tagline: string;
  image: string;
  stack: string[];
  highlights: string[];
  liveUrl?: string;
  sourceUrl: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Drawwww',
    tagline: 'Real-Time Collaborative Whiteboard & AI Party Game Platform',
    image: '/projects/drawwww.png',
    stack: [
      'React',
      'TypeScript',
      'Node.js',
      'Socket.io',
      'HTML5 Canvas API',
      'Gemini 2.0 Flash',
      'Groq (Llama 3.3 70B)',
      'Docker',
    ],
    highlights: [
      'Custom 3-layer HTML5 Canvas raster engine — sub-16ms (~60FPS) rendering with pressure-simulated brushes, flood fill, pixel erasers, and 7 drawing tools. No Fabric.js.',
      'Real-time multiplayer for 20+ concurrent users via Socket.io with live cursors and conflict-free server-managed undo/redo.',
      'Two AI game modes: Gemini 2.0 Flash Vision scores drawings 0–100; Groq Llama 3.3 70B generates words dynamically. Empty-canvas detection cuts Gemini API calls by ~40%.',
    ],
    liveUrl: 'https://aettheriia.vercel.app/',
    sourceUrl: 'https://github.com/Gaurravvvv/Draw',
  },
  {
    title: 'CodeShare',
    tagline: 'Real-Time Collaborative IDE & Secure File Workspace',
    image: '/projects/codeshare.png',
    stack: [
      'React',
      'Node.js',
      'Socket.IO',
      'Redis',
      'AWS S3 (Filebase)',
      'Groq AI',
      'LibreOffice',
      'Vite',
    ],
    highlights: [
      'VS Code-inspired multi-file collaborative IDE with 1000ms debounce latency compensation for instant-feeling keystrokes.',
      'Groq AI (llama-3.3-70b) code analysis for vulnerabilities/bugs with Redis caching — 1h TTL, 100% redundant call elimination.',
      'AWS S3 pre-signed URLs for direct-to-cloud uploads (0 bytes through server). Rooms auto-expire via 2h Redis TTL with cron-reconciled S3 orphan cleanup.',
    ],
    liveUrl: 'https://codesharre.vercel.app',
    sourceUrl: 'https://github.com/Gaurravvvv/CodeShare',
  },
  {
    title: 'Doctorra',
    tagline: 'AI-Powered Clinic Queue & Intake System',
    image: '/projects/doctorra.png',
    stack: [
      'Python',
      'Flask',
      'Docker',
      'Ubuntu',
      'LangChain',
      'Gemini 2.5 Flash-Lite',
      'MySQL',
      'Google OAuth2',
      'SQLAlchemy',
    ],
    highlights: [
      'QR-code patient check-in with real-time Kanban dashboard. Gemini 2.5 Flash-Lite triage via LangChain generating personalized MCQs per patient complaint with 100% uptime smart fallback.',
      'Google OAuth2 + local auth, modular Flask Blueprint architecture, SQLAlchemy ORM on MySQL, containerized with Docker Compose on Ubuntu.',
      'Internship capstone at AI Leela / OM Intelligence — recognized by CEO & CTO for product-first mindset.',
    ],
    sourceUrl: 'https://github.com/Gaurravvvv/Doctorra',
  },
];

/* ── Experience data ──────────────────────────────────────────────── */
export interface ExperienceItem {
  type: 'work' | 'community' | 'education' | 'achievement';
  title: string;
  organization: string;
  period: string;
  description: string[];
  link?: string;
  linkLabel?: string;
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    type: 'work',
    title: 'Deep Learning & Full Stack Intern',
    organization: 'AI Leela (OM Intelligence)',
    period: 'Dec 2025 – Feb 2026',
    description: [
      'Built Doctorra — an AI-powered clinic queue & intake system with real-time Kanban dashboard and LangChain-powered triage.',
      'Implemented Google OAuth2 + local authentication with modular Flask Blueprint architecture and SQLAlchemy ORM on MySQL.',
      'Recognized by CEO & CTO for product-first mindset and ability to ship production-ready code independently.',
    ],
    link: '/projects',
    linkLabel: 'View Doctorra Project →',
  },
  {
    type: 'community',
    title: 'Open Source Lead',
    organization:
      'Google Developer Group on Campus, MET Institute of Engineering Nashik',
    period: 'Sept 2025 – July 2026',
    description: [
      'Organized 5+ workshops and agile sessions for a 300+ member developer community.',
      'Mentored 40+ students on Git workflows, cloud tools, and full-stack development best practices.',
    ],
  },
  {
    type: 'education',
    title: 'B.E., Artificial Intelligence & Data Science',
    organization: 'MET Institute of Engineering, Nashik',
    period: '2023 – Present',
    description: ['CGPA: 8.8'],
  },
  {
    type: 'achievement',
    title: 'Achievements & Certifications',
    organization: '',
    period: '',
    description: [
      '1st Place — GDG Nashik Hackathon 2025',
      'Cloud Practitioner (GFG)',
      'Generative AI Certificate',
      'C++ Spoken Tutorial (IIT Bombay)',
      'Python (IIT Bombay)',
    ],
  },
];
