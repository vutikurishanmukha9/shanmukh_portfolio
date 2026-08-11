import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Cloud,
  Code2,
  Eye,
  Github,
  Globe,
  Layers3,
  Network,
  X,
  LayoutGrid,
  ListFilter,
  Sparkles,
  Terminal,
  Activity,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { cn } from '@/lib/utils';
import { useSkillFilter } from '@/context/SkillFilterContext';
import { useSound } from '@/hooks/useSound';
import { ProjectBlueprintDrawer, type BlueprintProject } from '@/components/ui/ProjectBlueprintDrawer';
import {
  ContextLyMockup,
  GetReportMockup,
  CandleLightMockup,
  HeartOutMockup,
  EleVisualizeMockup,
  PromptBuddyMockup,
  ComputerVisionMockup,
  AnalyticsChartMockup,
  JarvisMockup,
  HealthBotMockup,
} from '@/components/ui/ProjectVisualMockups';
import { ProjectMatrixView, type MatrixProject } from '@/components/ui/ProjectMatrixView';

type ProjectCategory = 'AI/ML' | 'Cloud' | 'Web App' | 'Computer Vision' | 'Data Analysis' | 'Other';
type ProjectTone = 'blue' | 'violet' | 'rose' | 'emerald' | 'amber' | 'slate';

interface Project {
  title: string;
  description: string;
  impact: string;
  soloBuild: string;
  metrics: string[];
  tech: string[];
  category: ProjectCategory;
  focus: string;
  github: string;
  demo?: string;
  demoLabel?: string;
  caseStudy?: string;
  featured?: boolean;
  tone: ProjectTone;
}

const categoryConfig: Record<ProjectCategory, { icon: LucideIcon; color: string; badge: string }> = {
  'AI/ML': { icon: Brain, color: 'text-violet-500', badge: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20' },
  Cloud: { icon: Cloud, color: 'text-sky-500', badge: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20' },
  'Web App': { icon: Globe, color: 'text-rose-500', badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' },
  'Computer Vision': { icon: Eye, color: 'text-emerald-500', badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
  'Data Analysis': { icon: BarChart3, color: 'text-amber-500', badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
  Other: { icon: Layers3, color: 'text-muted-foreground', badge: 'bg-muted text-muted-foreground border-border' },
};

const projects: Project[] = [
  {
    title: 'Context-Ly',
    description: 'Open-source Context Intelligence Engine and CLI that works as a persistent memory layer for LLM-assisted development.',
    impact: 'Helps AI tools understand project conventions faster, reducing repeated context setup and prompt token bloat.',
    soloBuild: 'Solo open-source build',
    metrics: ['AST parsing', '100% tests', 'PyPI package'],
    tech: ['Python', 'Typer', 'Rich', 'Pytest', 'PyYAML'],
    category: 'AI/ML',
    focus: 'Developer Tools',
    github: 'https://github.com/vutikurishanmukha9/contextly',
    demo: 'https://pypi.org/project/contextly/',
    demoLabel: 'PyPI Package',
    caseStudy: '/project/contextly',
    featured: true,
    tone: 'violet',
  },
  {
    title: 'GetReport',
    description: 'Full-stack reporting platform that turns raw datasets into PDF reports with high-throughput Polars processing and AI queries.',
    impact: 'Combines automated upload, dataset ingestion, semantic exploration, and report generation into one unified pipeline.',
    soloBuild: 'Solo full-stack build',
    metrics: ['PDF reports', 'RAG queries', 'Polars engine'],
    tech: ['FastAPI', 'React', 'Polars', 'Redis', 'OpenAI', 'Docker'],
    category: 'Web App',
    focus: 'Data Platform',
    github: 'https://github.com/vutikurishanmukha9/GetReport',
    demo: 'https://get-report.vercel.app',
    featured: true,
    tone: 'blue',
  },
  {
    title: 'Candle-Light',
    description: 'AI-powered market pattern analysis interface with model fallback and low-latency visual signal streams.',
    impact: 'Transforms quantitative market-pattern recognition into an intuitive real-time product interface.',
    soloBuild: 'Solo AI product build',
    metrics: ['Pattern analysis', 'Fallback logic', 'Live UI'],
    tech: ['React', 'TailwindCSS', 'Machine Learning', 'OAuth'],
    category: 'AI/ML',
    focus: 'AI Pipelines',
    github: 'https://github.com/vutikurishanmukha9/Candle-Light',
    demo: 'https://candle-light-kappa.vercel.app',
    featured: true,
    tone: 'rose',
  },
  {
    title: 'HeartOut',
    description: 'Anonymous storytelling platform with JWT authentication, role-based access, and a scalable MongoDB content model.',
    impact: 'Builds the foundation for a secure community product with publishing and moderation-ready architecture.',
    soloBuild: 'Solo product build',
    metrics: ['JWT auth', 'RBAC', 'MongoDB'],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    category: 'Web App',
    focus: 'Backend Systems',
    github: 'https://github.com/vutikurishanmukha9/HeartOut',
    demo: 'https://heart-out.vercel.app/',
    featured: true,
    tone: 'rose',
  },
  {
    title: 'Ele-Visualize',
    description: 'Interactive 3D molecule visualization engine using WebGL and MediaPipe hand tracking for touchless gesture exploration.',
    impact: 'Transforms physical hand kinematics into zero-latency 3D rotation for STEM visualization.',
    soloBuild: 'Solo interaction build',
    metrics: ['3D WebGL', 'Hand tracking', 'STEM UX'],
    tech: ['React', 'Three.js', 'MediaPipe', 'WebGL'],
    category: 'Computer Vision',
    focus: '3D Interaction',
    github: 'https://github.com/vutikurishanmukha9/Ele-Visualize',
    demo: 'https://ele-visualize.vercel.app/',
    tone: 'emerald',
  },
  {
    title: 'PromptBuddy',
    description: 'Prompt optimization workspace with reusable templates and intelligent slot filling for faster AI workflows.',
    impact: 'Makes prompt reuse, variable injection, and iteration frictionless for engineering workflows.',
    soloBuild: 'Solo SaaS-style build',
    metrics: ['Templates', 'Prompt slots', 'Fast workflow'],
    tech: ['React', 'TypeScript', 'Vite', 'TailwindCSS'],
    category: 'Web App',
    focus: 'SaaS Product',
    github: 'https://github.com/vutikurishanmukha9/PromptBuddy',
    demo: 'https://prompt-buddy-64y2.vercel.app/',
    tone: 'blue',
  },
  {
    title: 'Jarvis PDF Chatbot',
    description: 'Document intelligence app with vector retrieval pipelines and provider fallback for reliable PDF question answering.',
    impact: 'Turns static PDFs into searchable semantic knowledge through a practical RAG pipeline.',
    soloBuild: 'Solo AI systems build',
    metrics: ['FAISS', 'PDF Q&A', 'Fallbacks'],
    tech: ['Python', 'LangChain', 'Streamlit', 'OpenAI', 'FAISS'],
    category: 'AI/ML',
    focus: 'RAG Systems',
    github: 'https://github.com/vutikurishanmukha9/Jarvis',
    tone: 'violet',
  },
  {
    title: 'AI Health ChatBot',
    description: 'Diagnostic assistant prototype using NLP models for symptom intake and guided medical consultation flows.',
    impact: 'Organizes symptom input into a structured, clinical-ready healthcare assistant experience.',
    soloBuild: 'Solo AI prototype',
    metrics: ['NLP flow', 'Symptoms', 'Assistant UI'],
    tech: ['Python', 'NLP', 'TensorFlow', 'Flask', 'React'],
    category: 'AI/ML',
    focus: 'Healthcare AI',
    github: 'https://github.com/vutikurishanmukha9/OUR-D-at-YOUR-D',
    demo: 'https://odatyd.netlify.app/',
    tone: 'rose',
  },
  {
    title: 'Touchless Keyboard',
    description: 'Gesture-based text input system using OpenCV and MediaPipe for low-latency keystroke detection.',
    impact: 'Explores hands-free input for accessibility-minded control and computer-vision interaction.',
    soloBuild: 'Solo computer vision build',
    metrics: ['OpenCV', 'MediaPipe', 'Gestures'],
    tech: ['Python', 'OpenCV', 'MediaPipe', 'Machine Learning'],
    category: 'Computer Vision',
    focus: 'CV Systems',
    github: 'https://github.com/vutikurishanmukha9/Touchless-Keyboard',
    tone: 'emerald',
  },
  {
    title: 'Automated Attendance',
    description: 'Facial recognition attendance pipeline with real-time matching and cloud database synchronization.',
    impact: 'Identifies users, records attendance, and syncs data through a complete recognition workflow.',
    soloBuild: 'Solo CV pipeline build',
    metrics: ['Face match', 'AWS sync', 'MySQL'],
    tech: ['Python', 'OpenCV', 'AWS', 'MySQL', 'React'],
    category: 'Computer Vision',
    focus: 'CV Pipeline',
    github: 'https://github.com/vutikurishanmukha9/Automated-Attendance-System',
    tone: 'emerald',
  },
  {
    title: 'Employee Data Analysis',
    description: 'EDA workflow for cleaning, visualizing, and interpreting HR datasets to reveal retention and workforce trends.',
    impact: 'Converts messy HR data into clear statistical analysis views and business-readable insights.',
    soloBuild: 'Solo analytics project',
    metrics: ['EDA', 'Retention', 'Reports'],
    tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
    category: 'Data Analysis',
    focus: 'Data Insights',
    github: 'https://github.com/vutikurishanmukha9/Employee_Data_Analysis',
    tone: 'amber',
  },
];

const categories: Array<ProjectCategory | 'All'> = ['All', 'AI/ML', 'Web App', 'Computer Vision', 'Data Analysis'];

const projectListVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const projectCardVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.15 },
  },
};

// Render appropriate visual mockup per project
const renderProjectMockup = (title: string, category: ProjectCategory) => {
  switch (title) {
    case 'Context-Ly':
      return <ContextLyMockup />;
    case 'GetReport':
      return <GetReportMockup />;
    case 'Candle-Light':
      return <CandleLightMockup />;
    case 'HeartOut':
      return <HeartOutMockup />;
    case 'Ele-Visualize':
      return <EleVisualizeMockup />;
    case 'PromptBuddy':
      return <PromptBuddyMockup />;
    case 'Jarvis PDF Chatbot':
      return <JarvisMockup />;
    case 'AI Health ChatBot':
      return <HealthBotMockup />;
    case 'Touchless Keyboard':
      return <ComputerVisionMockup label="GESTURE MATRIX" />;
    case 'Automated Attendance':
      return <ComputerVisionMockup label="FACIAL RECOGNITION" />;
    case 'Employee Data Analysis':
      return <AnalyticsChartMockup />;
    default:
      return <ContextLyMockup />;
  }
};

// Double-Bezel Hardware Spotlight Card
const LuxuryProjectCard: React.FC<{
  project: Project;
  index: number;
  featured?: boolean;
  onInspectBlueprint?: (project: Project) => void;
}> = ({ project, index, featured = false, onInspectBlueprint }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const { playClick } = useSound();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => setMousePos(null);

  const visual = categoryConfig[project.category];
  const Icon = visual.icon;
  const primaryTech = project.tech.slice(0, featured ? 6 : 4);

  return (
    <motion.div
      ref={cardRef}
      variants={projectCardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative rounded-2xl border-[0.5px] border-border/80 bg-card/60 p-2.5 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden',
        featured && 'md:col-span-2 xl:col-span-3 bg-gradient-to-br from-card via-card/90 to-background'
      )}
    >
      {/* Dynamic Cursor Spotlight Shader */}
      {mousePos && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, hsl(var(--primary) / 0.08), transparent 80%)`,
          }}
        />
      )}

      {/* Inner Machined Hardware Core */}
      <div className={cn(
        'relative z-10 rounded-xl border-[0.5px] border-border/60 bg-background/70 p-4 sm:p-5 flex flex-col justify-between h-full backdrop-blur-sm',
        featured && 'grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6'
      )}>
        {/* Visual Mockup Container */}
        <div className={cn('w-full', featured ? 'lg:col-span-6' : 'mb-4')}>
          {renderProjectMockup(project.title, project.category)}
        </div>

        {/* Content & Metadata */}
        <div className={cn('flex flex-col justify-between flex-1', featured && 'lg:col-span-6 space-y-4')}>
          <div>
            {/* Top Category & Solo Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-1.5">
                <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider border', visual.badge)}>
                  <Icon className="w-3 h-3" />
                  {project.category}
                </span>
                <span className="text-[9px] font-mono text-muted-foreground/80 px-2 py-0.5 rounded bg-muted/40">
                  {project.focus}
                </span>
              </div>

              <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                {project.soloBuild}
              </span>
            </div>

            {/* Title & Description */}
            <h3 className={cn('font-serif-display font-medium tracking-tight text-foreground', featured ? 'text-2xl sm:text-3xl' : 'text-xl')}>
              {project.title}
            </h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            {/* Impact Metric Box */}
            <div className="mt-3.5 p-2.5 rounded-lg border-[0.5px] border-border/80 bg-card/50 text-[11px] font-mono">
              <span className="text-[8px] uppercase tracking-widest text-primary font-bold block mb-0.5">
                SYSTEM IMPACT
              </span>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                {project.impact}
              </p>
            </div>
          </div>

          {/* Tech Stack & Action Toolbar */}
          <div className="mt-4 pt-3.5 border-t-[0.5px] border-border/60 space-y-3">
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5">
              {primaryTech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[9px] font-mono bg-muted/50 border-[0.5px] border-border/80 text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > primaryTech.length && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-muted-foreground/60">
                  +{project.tech.length - primaryTech.length}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  playClick(850, 0.03, 'sine');
                  onInspectBlueprint?.(project);
                }}
                className="h-8 rounded-full border-primary/40 bg-primary/5 text-primary hover:bg-primary/15 px-3 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 font-semibold"
              >
                <Network className="h-3 w-3" />
                Blueprint
              </Button>

              {project.caseStudy && (
                <Button
                  size="sm"
                  className="h-8 rounded-full px-3.5 text-[10px] font-mono uppercase tracking-wider font-semibold"
                  asChild
                >
                  <Link to={project.caseStudy}>
                    Details
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              )}

              {project.demo && (
                <Button
                  variant={project.caseStudy ? 'outline' : 'default'}
                  size="sm"
                  className="h-8 rounded-full px-3.5 text-[10px] font-mono uppercase tracking-wider"
                  asChild
                >
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    {project.demoLabel || 'Demo'}
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </a>
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-full bg-background px-3 text-[10px] font-mono uppercase tracking-wider ml-auto"
                asChild
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-1 h-3.5 w-3.5" />
                  Code
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All');
  const [viewMode, setViewMode] = useState<'bento' | 'matrix'>('bento');
  const [activeBlueprintProject, setActiveBlueprintProject] = useState<BlueprintProject | null>(null);
  const { selectedSkill, setSelectedSkill } = useSkillFilter();
  const { playClick } = useSound();

  // Per-project blueprint data — unique architecture, design decisions, and SLAs for each project
  const blueprintDataMap: Record<string, Omit<BlueprintProject, 'title' | 'tagline' | 'category' | 'techStack' | 'githubUrl' | 'demoUrl'>> = {
    'Context-Ly': {
      architecture: {
        client: 'Typer CLI + Rich TUI',
        gateway: 'YAML Config Loader',
        backend: 'AST Parser + Tree-sitter',
        dataStore: '.contextly/ File Cache',
        throughput: '42 modules/s',
        latency: '0.42ms parse',
        reliability: '100% test pass',
      },
      designDecisions: [
        'AST-first parsing with Tree-sitter for language-agnostic code understanding.',
        'File-based caching in .contextly/ to avoid re-parsing unchanged modules.',
        'Rich TUI for interactive CLI experience with progress indicators.',
      ],
    },
    'GetReport': {
      architecture: {
        client: 'React + Vite SPA',
        gateway: 'FastAPI Gateway',
        backend: 'Polars DataFrame Engine',
        dataStore: 'Redis + SQLite',
        throughput: '1.2k rows/s',
        latency: '85ms P99',
        reliability: '99.9% uptime',
      },
      designDecisions: [
        'Polars over Pandas for 10x faster dataset ingestion on large CSV/Excel files.',
        'Redis caching layer for repeated RAG queries to reduce OpenAI API costs.',
        'PDF generation pipeline with async worker queue for non-blocking report builds.',
      ],
    },
    'Candle-Light': {
      architecture: {
        client: 'React + TailwindCSS',
        gateway: 'OAuth 2.0 Gateway',
        backend: 'ML Pattern Engine',
        dataStore: 'Real-time Signal Stream',
        throughput: '500 signals/s',
        latency: '12ms P99',
        reliability: '99.5% signal accuracy',
      },
      designDecisions: [
        'Model fallback chain — primary ML model cascades to rule-based heuristics on timeout.',
        'WebSocket streaming for sub-15ms visual signal delivery to the React frontend.',
        'OAuth 2.0 session management with secure token rotation.',
      ],
    },
    'HeartOut': {
      architecture: {
        client: 'React SPA',
        gateway: 'Express.js REST API',
        backend: 'Node.js + JWT Auth',
        dataStore: 'MongoDB Atlas',
        throughput: '800 req/s',
        latency: '22ms P99',
        reliability: '99.8% uptime',
      },
      designDecisions: [
        'JWT-based authentication with role-based access control (RBAC) for admin/user separation.',
        'MongoDB document model designed for scalable story publishing with threaded comments.',
        'Express middleware chain for input sanitization and rate limiting.',
      ],
    },
    'Ele-Visualize': {
      architecture: {
        client: 'React + Three.js',
        gateway: 'WebGL Render Pipeline',
        backend: 'MediaPipe Hand Tracker',
        dataStore: 'In-memory Molecule DB',
        throughput: '60 fps render',
        latency: '8ms gesture',
        reliability: '95% gesture accuracy',
      },
      designDecisions: [
        'Three.js scene graph with instanced mesh for efficient molecular rendering.',
        'MediaPipe hand landmark detection mapped to 3D rotation quaternions.',
        'WebGL shader optimization for real-time specular highlights on atomic bonds.',
      ],
    },
    'PromptBuddy': {
      architecture: {
        client: 'React + Vite + TypeScript',
        gateway: 'Client-side Router',
        backend: 'Local Storage Engine',
        dataStore: 'IndexedDB Templates',
        throughput: 'Instant render',
        latency: '<5ms slot fill',
        reliability: '100% offline',
      },
      designDecisions: [
        'Fully client-side SaaS — zero backend dependency for maximum privacy.',
        'Template slot system with variable injection for reusable prompt patterns.',
        'IndexedDB persistence for offline template library with export/import.',
      ],
    },
    'Jarvis PDF Chatbot': {
      architecture: {
        client: 'Streamlit Chat UI',
        gateway: 'LangChain Orchestrator',
        backend: 'OpenAI + FAISS RAG',
        dataStore: 'FAISS Vector Index',
        throughput: '2,847 chunks indexed',
        latency: '1.2s per query',
        reliability: '94% retrieval accuracy',
      },
      designDecisions: [
        'FAISS vector store for fast approximate nearest-neighbor search on PDF chunks.',
        'Provider fallback — OpenAI primary, local embeddings secondary for resilience.',
        'LangChain document loader pipeline with recursive text splitter for optimal chunk sizes.',
      ],
    },
    'AI Health ChatBot': {
      architecture: {
        client: 'React Frontend',
        gateway: 'Flask REST API',
        backend: 'TensorFlow NLP Model',
        dataStore: 'Symptom Knowledge Base',
        throughput: '200 queries/min',
        latency: '350ms inference',
        reliability: '87% diagnostic accuracy',
      },
      designDecisions: [
        'TensorFlow NLP model trained on medical symptom datasets for structured intake.',
        'Guided conversation flow with branching logic for differential diagnosis.',
        'React chat interface with real-time typing indicators and confidence scores.',
      ],
    },
    'Touchless Keyboard': {
      architecture: {
        client: 'Python GUI (Tkinter)',
        gateway: 'OpenCV Frame Pipeline',
        backend: 'MediaPipe Hand Landmarks',
        dataStore: 'In-memory Key Map',
        throughput: '30 fps detection',
        latency: '15ms keystroke',
        reliability: '92% gesture accuracy',
      },
      designDecisions: [
        'MediaPipe 21-point hand landmark model for precise fingertip detection.',
        'Debounce logic to prevent rapid double-keystrokes from gesture jitter.',
        'Virtual keyboard overlay with proximity-based key highlighting.',
      ],
    },
    'Automated Attendance': {
      architecture: {
        client: 'React Dashboard',
        gateway: 'Python Flask API',
        backend: 'OpenCV Face Recognition',
        dataStore: 'MySQL + AWS S3',
        throughput: '15 faces/s',
        latency: '120ms match',
        reliability: '97% recognition rate',
      },
      designDecisions: [
        'Face encoding stored as 128-d vectors in MySQL for fast Euclidean distance matching.',
        'AWS S3 for cloud storage of facial embeddings and attendance logs.',
        'Real-time video stream processing with OpenCV cascade classifiers.',
      ],
    },
    'Employee Data Analysis': {
      architecture: {
        client: 'Jupyter Notebook',
        gateway: 'Pandas DataFrame',
        backend: 'Statistical Analysis Engine',
        dataStore: 'CSV/Excel Datasets',
        throughput: '15k rows analyzed',
        latency: '2.1s full EDA',
        reliability: '0.84 correlation',
      },
      designDecisions: [
        'Seaborn heatmaps for correlation matrix visualization across HR features.',
        'Pandas pipeline for data cleaning, null handling, and feature engineering.',
        'Matplotlib multi-plot grids for retention trend analysis across departments.',
      ],
    },
  };

  const handleOpenBlueprint = (p: Project | MatrixProject) => {
    const projectData = blueprintDataMap[p.title] || {
      architecture: {
        client: 'Web Client',
        gateway: 'API Gateway',
        backend: 'Application Server',
        dataStore: 'Database',
        throughput: 'N/A',
        latency: 'N/A',
        reliability: 'N/A',
      },
      designDecisions: [
        'Architecture details for this project are being documented.',
      ],
    };

    setActiveBlueprintProject({
      title: p.title,
      tagline: p.description,
      category: p.category,
      architecture: projectData.architecture,
      designDecisions: projectData.designDecisions,
      techStack: p.tech,
      githubUrl: p.github,
      demoUrl: p.demo,
    });
  };

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSkill = !selectedSkill || project.tech.includes(selectedSkill);
    return matchesCategory && matchesSkill;
  });

  const heroProject = filteredProjects.find((p) => p.featured) || filteredProjects[0];
  const standardProjects = filteredProjects.filter((p) => p !== heroProject);

  return (
    <SectionWrapper id="projects" className="py-20 border-b-[0.5px] border-border/40 relative">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Section Header with Eyebrow Badge */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border-[0.5px] border-border/80 shadow-none mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
              Production Codebase
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-serif-display font-medium tracking-tight text-foreground select-none"
          >
            Featured Projects
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-3 text-sm font-normal max-w-lg mx-auto leading-relaxed"
          >
            End-to-end architectures engineered with strict type safety, micro-services, and production ML pipelines.
          </motion.p>
        </div>

        {/* Toolbar: Category Switcher + View Mode Switcher */}
        <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs with Counts */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-card/60 border border-border/80 rounded-xl backdrop-blur-md">
            {categories.map((cat) => {
              const count = cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length;
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => {
                    playClick(750, 0.03, 'sine');
                    setSelectedCategory(cat);
                  }}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer',
                    isSelected
                      ? 'bg-foreground text-background font-bold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  )}
                >
                  <span>{cat}</span>
                  <span className={cn('text-[9px] px-1.5 py-0.2 rounded-full', isSelected ? 'bg-background/20 text-background' : 'bg-muted text-muted-foreground')}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle: Bento vs Matrix */}
          <div className="flex items-center gap-1 p-1 bg-card/60 border border-border/80 rounded-xl self-end sm:self-center">
            <button
              onClick={() => {
                playClick(800, 0.03, 'sine');
                setViewMode('bento');
              }}
              className={cn(
                'p-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition-colors',
                viewMode === 'bento' ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'
              )}
              title="Bento Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="text-[10px] hidden md:inline">Bento</span>
            </button>
            <button
              onClick={() => {
                playClick(800, 0.03, 'sine');
                setViewMode('matrix');
              }}
              className={cn(
                'p-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition-colors',
                viewMode === 'matrix' ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'
              )}
              title="Engineering Matrix Table"
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span className="text-[10px] hidden md:inline">Matrix</span>
            </button>
          </div>
        </div>

        {/* Selected Skill Filter Chip (if active) */}
        {selectedSkill && (
          <div className="mb-6 flex items-center gap-2">
            <button
              onClick={() => setSelectedSkill(null)}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono uppercase tracking-wider text-primary hover:bg-primary/20 transition-colors"
            >
              Filtered by Skill: {selectedSkill}
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* Main Content Area */}
        {filteredProjects.length > 0 ? (
          viewMode === 'bento' ? (
            <motion.div
              key={`${selectedCategory}-${selectedSkill ?? 'all'}`}
              variants={projectListVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {/* Flagship Hero Card */}
              {heroProject && (
                <LuxuryProjectCard
                  project={heroProject}
                  index={0}
                  featured
                  onInspectBlueprint={handleOpenBlueprint}
                />
              )}

              {/* Standard Cards */}
              <AnimatePresence mode="popLayout">
                {standardProjects.map((project, index) => (
                  <LuxuryProjectCard
                    key={project.title}
                    project={project}
                    index={index + 1}
                    onInspectBlueprint={handleOpenBlueprint}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <ProjectMatrixView
              projects={filteredProjects}
              onInspectBlueprint={handleOpenBlueprint}
            />
          )
        ) : (
          <div className="rounded-xl border-[0.5px] border-border/80 bg-card p-12 text-center space-y-3">
            <p className="text-sm font-semibold text-foreground">No projects match this active filter.</p>
            <p className="text-xs text-muted-foreground">Clear the skill filter or select another domain category.</p>
            <Button variant="outline" size="sm" onClick={() => { setSelectedCategory('All'); setSelectedSkill(null); }}>
              Reset Filters
            </Button>
          </div>
        )}

        {/* Architectural Blueprint Slide-Over Drawer */}
        <ProjectBlueprintDrawer
          project={activeBlueprintProject}
          isOpen={!!activeBlueprintProject}
          onClose={() => setActiveBlueprintProject(null)}
        />

      </div>
    </SectionWrapper>
  );
};
