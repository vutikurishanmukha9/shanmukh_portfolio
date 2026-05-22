import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowUpRight,
  Brain,
  CheckCircle2,
  Cloud,
  Database,
  Eye,
  Github,
  Globe,
  Layers3,
  ScanFace,
  Sparkles,
  Terminal,
  X,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { cn } from '@/lib/utils';
import { useSkillFilter } from '@/context/SkillFilterContext';

type ProjectCategory = 'AI/ML' | 'Cloud' | 'Web App' | 'Computer Vision' | 'Data Analysis' | 'Other';
type PreviewType = 'report' | 'signals' | 'community' | 'molecule' | 'prompt' | 'rag' | 'health' | 'gesture' | 'attendance' | 'analytics';

type Project = {
  title: string;
  description: string;
  impact: string;
  ownership: string;
  metrics: string[];
  tech: string[];
  category: ProjectCategory;
  focus: string;
  github: string;
  demo?: string;
  featured?: boolean;
  previewType: PreviewType;
};

const categoryConfig: Record<ProjectCategory, { icon: LucideIcon; color: string; label: string }> = {
  'AI/ML': { icon: Brain, color: 'text-violet-500', label: 'Artificial Intelligence' },
  Cloud: { icon: Cloud, color: 'text-sky-500', label: 'Cloud Architecture' },
  'Web App': { icon: Globe, color: 'text-primary', label: 'Web Development' },
  'Computer Vision': { icon: Eye, color: 'text-emerald-500', label: 'Computer Vision' },
  'Data Analysis': { icon: Brain, color: 'text-amber-500', label: 'Data Science' },
  Other: { icon: Sparkles, color: 'text-muted-foreground', label: 'Various Engineering' },
};

const projects: Project[] = [
  {
    title: 'GetReport',
    description: 'Full-stack reporting platform that turns raw datasets into PDF reports with fast Polars processing and AI-assisted semantic querying.',
    impact: 'Built a complete data-to-report workflow for uploading files, exploring data, and generating polished reports.',
    ownership: 'Solo Build',
    metrics: ['PDF reports', 'RAG querying', 'Polars pipeline'],
    tech: ['FastAPI', 'React', 'Polars', 'Redis', 'OpenAI', 'Docker'],
    category: 'Web App',
    focus: 'Data Platform',
    github: 'https://github.com/vutikurishanmukha9/GetReport',
    demo: 'https://get-report.vercel.app',
    featured: true,
    previewType: 'report',
  },
  {
    title: 'Candle-Light',
    description: 'AI-powered market pattern analysis experience with multi-model fallback and low-latency recognition flows.',
    impact: 'Created a visual AI workflow for reading market patterns and presenting signals in a cleaner product experience.',
    ownership: 'Solo Build',
    metrics: ['Pattern analysis', 'Model fallback', 'Live UI'],
    tech: ['React', 'TailwindCSS', 'Machine Learning', 'OAuth'],
    category: 'AI/ML',
    focus: 'AI Pipelines',
    github: 'https://github.com/vutikurishanmukha9/Candle-Light',
    demo: 'https://candle-light-kappa.vercel.app',
    featured: true,
    previewType: 'signals',
  },
  {
    title: 'HeartOut',
    description: 'Anonymous storytelling platform with role-based access control, JWT authentication, and a scalable MongoDB content model.',
    impact: 'Shipped a secure community-style product foundation with authentication, content flows, and backend structure.',
    ownership: 'Solo Build',
    metrics: ['JWT auth', 'RBAC', 'MongoDB schema'],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    category: 'Web App',
    focus: 'Backend Systems',
    github: 'https://github.com/vutikurishanmukha9/HeartOut',
    demo: 'https://heart-out.vercel.app/',
    featured: true,
    previewType: 'community',
  },
  {
    title: 'Ele-Visualize',
    description: 'Interactive 3D molecule visualization engine using WebGL and MediaPipe hand tracking for gesture-led exploration.',
    impact: 'Designed a touchless 3D learning prototype that turns hand movement into molecule interaction.',
    ownership: 'Solo Build',
    metrics: ['3D WebGL', 'Hand tracking', 'STEM UX'],
    tech: ['React', 'Three.js', 'MediaPipe', 'WebGL'],
    category: 'Computer Vision',
    focus: '3D Interaction',
    github: 'https://github.com/vutikurishanmukha9/Ele-Visualize',
    demo: 'https://ele-visualize.vercel.app/',
    previewType: 'molecule',
  },
  {
    title: 'PromptBuddy',
    description: 'Prompt optimization workspace with reusable templates and intelligent slot filling for faster AI workflows.',
    impact: 'Created a productivity tool that makes prompt reuse, structure, and iteration easier for everyday AI work.',
    ownership: 'Solo Build',
    metrics: ['Templates', 'Prompt slots', 'Fast workflow'],
    tech: ['React', 'TypeScript', 'Vite', 'TailwindCSS'],
    category: 'Web App',
    focus: 'SaaS Product',
    github: 'https://github.com/vutikurishanmukha9/PromptBuddy',
    demo: 'https://prompt-buddy-64y2.vercel.app/',
    previewType: 'prompt',
  },
  {
    title: 'Jarvis PDF Chatbot',
    description: 'Document intelligence app with vector retrieval pipelines and provider fallback for reliable PDF question answering.',
    impact: 'Built a RAG pipeline that turns static PDFs into searchable knowledge with conversational retrieval.',
    ownership: 'Solo Build',
    metrics: ['FAISS retrieval', 'PDF Q&A', 'Provider fallback'],
    tech: ['Python', 'LangChain', 'Streamlit', 'OpenAI', 'FAISS'],
    category: 'AI/ML',
    focus: 'RAG Systems',
    github: 'https://github.com/vutikurishanmukha9/Jarvis',
    previewType: 'rag',
  },
  {
    title: 'AI Health ChatBot',
    description: 'Diagnostic assistant prototype using NLP models for symptom intake and guided medical consultation flows.',
    impact: 'Created a healthcare conversation prototype that organizes symptom input into a guided assistant experience.',
    ownership: 'Solo Build',
    metrics: ['NLP flow', 'Symptom intake', 'Assistant UI'],
    tech: ['Python', 'NLP', 'TensorFlow', 'Flask', 'React'],
    category: 'AI/ML',
    focus: 'Healthcare AI',
    github: 'https://github.com/vutikurishanmukha9/OUR-D-at-YOUR-D',
    demo: 'https://odatyd.netlify.app/',
    previewType: 'health',
  },
  {
    title: 'Touchless Keyboard',
    description: 'Gesture-based text input system using OpenCV and MediaPipe for low-latency keystroke detection.',
    impact: 'Built a hands-free input prototype focused on gesture detection, responsiveness, and accessibility-minded control.',
    ownership: 'Solo Build',
    metrics: ['OpenCV', 'MediaPipe', 'Gesture input'],
    tech: ['Python', 'OpenCV', 'MediaPipe', 'Machine Learning'],
    category: 'Computer Vision',
    focus: 'CV Systems',
    github: 'https://github.com/vutikurishanmukha9/Touchless-Keyboard',
    previewType: 'gesture',
  },
  {
    title: 'Automated Attendance',
    description: 'Facial recognition attendance pipeline with real-time matching and cloud database synchronization.',
    impact: 'Engineered a recognition workflow for identifying users, recording attendance, and syncing data.',
    ownership: 'Solo Build',
    metrics: ['Face matching', 'AWS sync', 'MySQL storage'],
    tech: ['Python', 'OpenCV', 'AWS', 'MySQL', 'React'],
    category: 'Computer Vision',
    focus: 'CV Pipeline',
    github: 'https://github.com/vutikurishanmukha9/Automated-Attendance-System',
    previewType: 'attendance',
  },
  {
    title: 'Employee Data Analysis',
    description: 'EDA workflow for cleaning, visualizing, and interpreting HR datasets to reveal retention and workforce trends.',
    impact: 'Converted messy HR data into clear analysis views that expose workforce patterns and business insights.',
    ownership: 'Solo Build',
    metrics: ['EDA', 'Retention trends', 'Visual reports'],
    tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
    category: 'Data Analysis',
    focus: 'Data Insights',
    github: 'https://github.com/vutikurishanmukha9/Employee_Data_Analysis',
    previewType: 'analytics',
  },
];

const categories: Array<ProjectCategory | 'All'> = ['All', 'Web App', 'AI/ML', 'Computer Vision', 'Data Analysis', 'Cloud'];

const PreviewPanel = ({ project, compact = false }: { project: Project; compact?: boolean }) => {
  const previewContent: Record<PreviewType, React.ReactNode> = {
    report: (
      <div className="flex flex-col justify-between h-full font-mono text-[9px] text-muted-foreground">
        <div className="flex items-center justify-between border-b-[0.5px] border-border/60 pb-2">
          <span className="font-semibold text-foreground">POLARS_DATAFRAME</span>
          <span className="opacity-60">shape: (1024, 8)</span>
        </div>
        <div className="space-y-1 my-2">
          <div className="grid grid-cols-3 opacity-95 border-b-[0.5px] border-border/20 pb-1 font-semibold">
            <span>index_id</span>
            <span>metric_val</span>
            <span className="text-right">status</span>
          </div>
          <div className="grid grid-cols-3 opacity-70">
            <span>#0001</span>
            <span>0.842</span>
            <span className="text-right text-emerald-500 font-semibold">VALID</span>
          </div>
          <div className="grid grid-cols-3 opacity-70">
            <span>#0002</span>
            <span>0.912</span>
            <span className="text-right text-emerald-500 font-semibold">VALID</span>
          </div>
          <div className="grid grid-cols-3 opacity-70">
            <span>#0003</span>
            <span>0.048</span>
            <span className="text-right text-red-500 font-semibold">WARN</span>
          </div>
        </div>
        <div className="border-t-[0.5px] border-border/60 pt-2 flex justify-between items-center text-[8px] opacity-60">
          <span>PARSING COMPLETE</span>
          <span>94.8 ms</span>
        </div>
      </div>
    ),
    signals: (
      <div className="flex flex-col justify-between h-full font-mono text-[9px] text-muted-foreground">
        <div className="flex items-center justify-between border-b-[0.5px] border-border/60 pb-2">
          <span className="font-semibold text-foreground">CANDLESTICK_METRIC</span>
          <span className="text-emerald-500 font-semibold">BREAKOUT BUY</span>
        </div>
        <div className="flex items-end justify-between h-16 px-2 my-2 relative">
          <div className="absolute inset-x-0 top-1/2 border-t-[0.5px] border-border/20 pointer-events-none" />
          <div className="flex flex-col items-center justify-end h-full">
            <div className="w-[1px] h-3 bg-muted-foreground/40" />
            <div className="w-2.5 h-4 bg-red-500/20 border border-red-500/40 rounded-sm" />
            <div className="w-[1px] h-2 bg-muted-foreground/40" />
          </div>
          <div className="flex flex-col items-center justify-end h-full">
            <div className="w-[1px] h-2 bg-muted-foreground/40" />
            <div className="w-2.5 h-3 bg-red-500/20 border border-red-500/40 rounded-sm" />
            <div className="w-[1px] h-3 bg-muted-foreground/40" />
          </div>
          <div className="flex flex-col items-center justify-end h-full">
            <div className="w-[1px] h-4 bg-muted-foreground/40" />
            <div className="w-2.5 h-6 bg-emerald-500/20 border border-emerald-500/40 rounded-sm" />
            <div className="w-[1px] h-3 bg-muted-foreground/40" />
          </div>
          <div className="flex flex-col items-center justify-end h-full">
            <div className="w-[1px] h-3 bg-muted-foreground/40" />
            <div className="w-2.5 h-9 bg-emerald-500/20 border border-emerald-500/40 rounded-sm" />
            <div className="w-[1px] h-4 bg-muted-foreground/40" />
          </div>
        </div>
        <div className="border-t-[0.5px] border-border/60 pt-2 text-[8px] opacity-60 text-right">
          CONFIDENCE: 98.42%
        </div>
      </div>
    ),
    community: (
      <div className="flex flex-col justify-between h-full font-mono text-[9px] text-muted-foreground">
        <div className="flex items-center justify-between border-b-[0.5px] border-border/60 pb-2">
          <span className="font-semibold text-foreground">JWT_AUTH_RECORDS</span>
          <span className="opacity-60 text-[8px]">MODEL: USER_MEMBERS</span>
        </div>
        <div className="space-y-1.5 my-2">
          <div className="flex items-center justify-between bg-background/60 border-[0.5px] border-border/40 p-1 rounded">
            <span>usr_a89c</span>
            <span className="text-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 border border-emerald-500/25 rounded-sm">JWT_VERIFIED</span>
          </div>
          <div className="flex items-center justify-between bg-background/60 border-[0.5px] border-border/40 p-1 rounded">
            <span>usr_224b</span>
            <span className="text-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 border border-emerald-500/25 rounded-sm">JWT_VERIFIED</span>
          </div>
        </div>
        <div className="border-t-[0.5px] border-border/60 pt-2 text-[8px] opacity-60 flex justify-between">
          <span>ROLE: ADMIN_LEVEL</span>
          <span>EXP: 3600S</span>
        </div>
      </div>
    ),
    molecule: (
      <div className="flex flex-col justify-between h-full font-mono text-[9px] text-muted-foreground">
        <div className="flex items-center justify-between border-b-[0.5px] border-border/60 pb-2">
          <span className="font-semibold text-foreground">3D_GL_MATRICES</span>
          <span className="opacity-60">Fingertip tracked</span>
        </div>
        <div className="relative h-16 my-2 flex items-center justify-center">
          <svg className="w-12 h-12 text-primary/80" viewBox="0 0 40 40">
            <line x1="20" y1="8" x2="32" y2="16" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="32" y1="16" x2="28" y2="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="28" y1="30" x2="12" y2="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="12" y1="30" x2="8" y2="16" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="8" y1="16" x2="20" y2="8" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
            
            <circle cx="20" cy="8" r="1.5" fill="currentColor" />
            <circle cx="32" cy="16" r="1.5" fill="currentColor" />
            <circle cx="28" cy="30" r="1.5" fill="currentColor" />
            <circle cx="12" cy="30" r="1.5" fill="currentColor" />
            <circle cx="8" cy="16" r="1.5" fill="currentColor" />
          </svg>
          <div className="absolute top-0 right-0 text-[7px] opacity-40 text-right leading-tight">
            pitch: 12.4°<br />yaw: -48.2°
          </div>
        </div>
        <div className="border-t-[0.5px] border-border/60 pt-2 text-[8px] opacity-60 flex justify-between">
          <span>INTERACTION_SYS: MEDIAPIPE</span>
          <span>fps: 60</span>
        </div>
      </div>
    ),
    prompt: (
      <div className="flex flex-col justify-between h-full font-mono text-[9px] text-muted-foreground">
        <div className="flex items-center justify-between border-b-[0.5px] border-border/60 pb-2">
          <span className="font-semibold text-foreground">PROMPT_SLOTS_COMPILER</span>
          <span className="opacity-60">Slots Staged</span>
        </div>
        <div className="bg-background/60 border-[0.5px] border-border/40 p-2 rounded my-2 text-[8px] leading-relaxed">
          <span className="text-primary font-semibold">const</span> system = <span className="text-foreground">"Draft an email to <span className="text-primary">{'{client_name}'}</span> about <span className="text-primary">{'{topic}'}</span>."</span>
        </div>
        <div className="border-t-[0.5px] border-border/60 pt-2 text-[8px] opacity-60 flex justify-between">
          <span>PARSING_SUCCESS</span>
          <span>slots: 2</span>
        </div>
      </div>
    ),
    rag: (
      <div className="flex flex-col justify-between h-full font-mono text-[9px] text-muted-foreground">
        <div className="flex items-center justify-between border-b-[0.5px] border-border/60 pb-2">
          <span className="font-semibold text-foreground">RETRIEVAL_CHUNKING_PIPELINE</span>
          <span className="opacity-60">FAISS store</span>
        </div>
        <div className="my-2.5 flex justify-between items-center text-[7.5px] gap-1.5">
          <div className="flex-1 bg-background/50 border-[0.5px] border-border/40 rounded py-1 px-0.5 text-center truncate">
            <span>Doc.pdf</span>
          </div>
          <span className="opacity-40">→</span>
          <div className="flex-1 bg-background/50 border-[0.5px] border-border/40 rounded py-1 px-0.5 text-center truncate">
            <span>Chunks [512]</span>
          </div>
          <span className="opacity-40">→</span>
          <div className="flex-1 bg-background/50 border-[0.5px] border-border/40 rounded py-1 px-0.5 text-center truncate">
            <span className="text-primary font-bold">faiss_idx</span>
          </div>
        </div>
        <div className="border-t-[0.5px] border-border/60 pt-2 text-[8px] opacity-60 flex justify-between">
          <span>TOP_K: 4</span>
          <span>COSINE_SIM: 0.8924</span>
        </div>
      </div>
    ),
    health: (
      <div className="flex flex-col justify-between h-full font-mono text-[9px] text-muted-foreground">
        <div className="flex items-center justify-between border-b-[0.5px] border-border/60 pb-2">
          <span className="font-semibold text-foreground">DIAGNOSTIC_FLOW_INTELLIGENCE</span>
          <span className="opacity-60 text-[8px]">NLP_INGESTION</span>
        </div>
        <div className="space-y-1.5 my-2 text-[8px]">
          <div className="text-right">
            <span className="inline-block bg-primary/10 border border-primary/20 rounded px-2 py-0.5 text-primary">"Frequent migraines and dizziness"</span>
          </div>
          <div className="text-left">
            <span className="inline-block bg-background/60 border border-border/40 rounded px-2 py-0.5 text-muted-foreground">Match: Migraine (88.4%)</span>
          </div>
        </div>
        <div className="border-t-[0.5px] border-border/60 pt-2 text-[8px] opacity-60 flex justify-between">
          <span>CONV_TURNS: 4</span>
          <span>PROBABILITY_STAGED</span>
        </div>
      </div>
    ),
    gesture: (
      <div className="flex flex-col justify-between h-full font-mono text-[9px] text-muted-foreground">
        <div className="flex items-center justify-between border-b-[0.5px] border-border/60 pb-2">
          <span className="font-semibold text-foreground">TOUCHLESS_GESTURE_INPUT</span>
          <span className="opacity-60">OpenCV stream</span>
        </div>
        <div className="relative h-14 my-2 border-[0.5px] border-border/30 rounded bg-background/40 overflow-hidden flex items-center justify-center">
          <div className="absolute top-1.5 left-1.5 border-l border-t border-primary/40 w-2 h-2" />
          <div className="absolute top-1.5 right-1.5 border-r border-t border-primary/40 w-2 h-2" />
          <div className="absolute bottom-1.5 left-1.5 border-l border-b border-primary/40 w-2 h-2" />
          <div className="absolute bottom-1.5 right-1.5 border-r border-b border-primary/40 w-2 h-2" />
          <span className="text-[7.5px] text-primary/80 animate-pulse font-semibold">PINCH_GESTURE // ENTER_KEY</span>
        </div>
        <div className="border-t-[0.5px] border-border/60 pt-2 text-[8px] opacity-60 flex justify-between">
          <span>latency: 14.2ms</span>
          <span>FPS: 30</span>
        </div>
      </div>
    ),
    attendance: (
      <div className="flex flex-col justify-between h-full font-mono text-[9px] text-muted-foreground">
        <div className="flex items-center justify-between border-b-[0.5px] border-border/60 pb-2">
          <span className="font-semibold text-foreground">FACIAL_RECOG_PIPELINE</span>
          <span className="opacity-60">AWS Sync</span>
        </div>
        <div className="my-2.5 flex items-center justify-center gap-3">
          <div className="relative w-10 h-10 border border-border rounded flex items-center justify-center bg-background/50">
            <div className="absolute inset-0.5 border border-primary/30 rounded-sm" />
            <ScanFace className="w-5 h-5 text-primary/75" />
          </div>
          <div className="text-[7.5px] space-y-0.5 text-muted-foreground leading-tight">
            <div>CONF: <span className="text-foreground font-semibold">99.82%</span></div>
            <div>STATUS: <span className="text-emerald-500 font-semibold">SYNCHRONIZED</span></div>
          </div>
        </div>
        <div className="border-t-[0.5px] border-border/60 pt-2 text-[8px] opacity-60 flex justify-between">
          <span>INDEXED: 104</span>
          <span>LATENCY: 0.18s</span>
        </div>
      </div>
    ),
    analytics: (
      <div className="flex flex-col justify-between h-full font-mono text-[9px] text-muted-foreground">
        <div className="flex items-center justify-between border-b-[0.5px] border-border/60 pb-2">
          <span className="font-semibold text-foreground">EDA_HR_ANALYTICS</span>
          <span className="opacity-60">Jupyter Workspace</span>
        </div>
        <div className="my-3 flex items-end justify-between h-10 relative px-2">
          <div className="absolute inset-0 grid grid-rows-2 pointer-events-none opacity-5">
            <div className="border-b border-foreground" />
            <div className="border-b border-foreground" />
          </div>
          <div className="h-[20%] w-3 bg-muted-foreground/30 border-[0.5px] border-border/40 rounded-t-sm" />
          <div className="h-[45%] w-3 bg-muted-foreground/30 border-[0.5px] border-border/40 rounded-t-sm" />
          <div className="h-[75%] w-3 bg-primary/70 border-[0.5px] border-primary/40 rounded-t-sm" />
          <div className="h-[90%] w-3 bg-primary border-[0.5px] border-primary/40 rounded-t-sm" />
          <div className="h-[60%] w-3 bg-muted-foreground/30 border-[0.5px] border-border/40 rounded-t-sm" />
        </div>
        <div className="border-t-[0.5px] border-border/60 pt-2 text-[8px] opacity-60 flex justify-between">
          <span>METRIC: ATTRITION</span>
          <span>CORR: -0.68</span>
        </div>
      </div>
    ),
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded border-[0.5px] border-border/60 bg-card p-4 text-foreground shadow-none select-none',
        compact ? 'min-h-48' : 'min-h-52',
      )}
    >
      <div className="relative h-full">{previewContent[project.previewType]}</div>
    </div>
  );
};

const ProjectCard = ({ project, index, variant = 'card' }: { project: Project; index: number; variant?: 'hero' | 'card' }) => {
  const visual = categoryConfig[project.category];
  const IconComponent = visual.icon;
  const primaryTech = project.tech.slice(0, 4);
  const isHero = variant === 'hero';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative overflow-hidden rounded-lg border border-border/80 bg-card/40 p-3.5 shadow-none backdrop-blur-md hover-lift-minimal flex flex-col justify-between h-full',
        isHero ? 'grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-5' : 'flex h-full flex-col gap-4'
      )}
    >
      <div className="flex flex-col gap-4 h-full justify-between">
        <div>
          <PreviewPanel project={project} compact={!isHero} />
        </div>

        <div className="flex flex-col flex-1 justify-between mt-2">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded border-[0.5px] border-border bg-background text-[9px] font-mono uppercase tracking-wider text-muted-foreground shadow-none">
                <IconComponent className="h-3 w-3 text-primary/70" />
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded border-[0.5px] border-emerald-500/20 bg-emerald-500/5 text-[9px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold shadow-none">
                <CheckCircle2 className="h-3 w-3" />
                {project.ownership}
              </span>
            </div>

            <div className="mb-3">
              <p className="mb-1 text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground/80">{project.focus}</p>
              <h3 className={cn('font-serif-display font-medium tracking-tight text-foreground', isHero ? 'text-2xl md:text-3.5xl' : 'text-xl')}>
                {project.title}
              </h3>
            </div>

            <p className="text-muted-foreground text-xs leading-relaxed mb-4">
              {project.description}
            </p>
          </div>

          <div>
            <div className="mb-4 rounded bg-muted/10 border-[0.5px] border-border/60 p-3.5 shadow-none">
              <div className="mb-1.5 flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider text-foreground font-semibold">
                <Sparkles className="h-3 w-3 text-primary" />
                Impact summary
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{project.impact}</p>
            </div>

            <div className="mb-4 grid gap-1.5 grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={metric} className="rounded border-[0.5px] border-border/80 bg-background/50 px-2 py-2 text-center text-[10px] font-mono font-medium text-foreground">
                  {metric}
                </div>
              ))}
            </div>

            <div className="border-t-[0.5px] border-border/60 pt-4 flex flex-col gap-3">
              <div>
                <h4 className="mb-2 flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest text-muted-foreground/80">
                  <Terminal className="h-2.5 w-2.5" />
                  Primary Stack
                </h4>
                <div className="flex flex-wrap gap-1">
                  {primaryTech.map((tech) => (
                    <span key={tech} className="rounded px-2 py-0.5 border-[0.5px] border-border/80 bg-background text-[10px] font-mono text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > primaryTech.length && (
                    <span className="rounded px-2 py-0.5 border-[0.5px] border-border/80 bg-muted text-[10px] font-mono text-muted-foreground/75">
                      +{project.tech.length - primaryTech.length}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {project.demo && (
                  <Button size="sm" className="rounded-full h-8 px-4 text-[10px] font-mono uppercase tracking-wider" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      Live Demo
                      <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                    </a>
                  </Button>
                )}
                <Button variant="outline" size="sm" className="rounded-full h-8 px-4 text-[10px] font-mono uppercase tracking-wider bg-background" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-3.5 w-3.5 mr-1" />
                    Code
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All');
  const { selectedSkill, setSelectedSkill } = useSkillFilter();

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSkill = !selectedSkill || project.tech.some((tech) => tech.toLowerCase().includes(selectedSkill.toLowerCase()));
      return matchesCategory && matchesSkill;
    });
  }, [selectedCategory, selectedSkill]);

  const heroProject = filteredProjects.find((project) => project.featured) ?? filteredProjects[0];
  const standardProjects = filteredProjects.filter((project) => project !== heroProject);

  return (
    <SectionWrapper id="projects" className="relative overflow-hidden bg-background py-24 border-b-[0.5px] border-border/40">
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border-[0.5px] border-border/80 bg-card px-3 py-1 shadow-none"
            >
              <Layers3 className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">Work</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-serif-display text-4xl font-normal tracking-tight text-foreground md:text-5xl select-none"
            >
              Engineering Output
            </motion.h2>
            <p className="mt-4 max-w-xl text-muted-foreground text-sm leading-relaxed">
              A curated catalog of fully realized, deployed engineering products demonstrating full-stack integration and operational performance.
            </p>
          </div>

          <div className="border-[0.5px] border-border/85 bg-card/60 backdrop-blur-md p-4 rounded-lg shadow-none">
            <div className="grid grid-cols-3 gap-6 text-center divide-x divide-border/60">
              <div className="px-3">
                <div className="text-xl font-serif-display text-foreground font-normal">{projects.length}+</div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">Builds</div>
              </div>
              <div className="px-3">
                <div className="text-xl font-serif-display text-foreground font-normal">6</div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">Live</div>
              </div>
              <div className="px-3">
                <div className="text-xl font-serif-display text-foreground font-normal">4</div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">Domains</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sliding Pill-in-Pill Category Filters */}
        <div className="mb-8 flex flex-col gap-4 border-[0.5px] border-border/60 bg-muted/40 p-1.5 rounded-full md:flex-row md:items-center md:justify-between select-none">
          <div className="flex flex-wrap gap-1 justify-center md:justify-start">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'relative px-3.5 py-1.5 text-[9px] font-mono tracking-widest uppercase transition-colors duration-200 z-10',
                    isSelected ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="projects-category-pill"
                      className="absolute inset-0 rounded-full bg-card border-[0.5px] border-border/60 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                      transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.2 }}
                    />
                  )}
                  <span className="relative z-20">{category}</span>
                </button>
              );
            })}
          </div>

          {selectedSkill && (
            <button
              onClick={() => setSelectedSkill(null)}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[9px] font-mono tracking-widest uppercase text-primary transition-colors hover:bg-primary/10 self-center md:self-auto"
            >
              Skill: {selectedSkill}
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="space-y-6">
            {/* Filtered project list */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="border-[0.5px] border-border/80 bg-card p-10 text-center rounded-lg shadow-none">
            <p className="text-sm font-semibold text-foreground font-mono">NO OUTCOMES MATCH QUERY</p>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">Clear active skills filter or adjust catalog categories.</p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

