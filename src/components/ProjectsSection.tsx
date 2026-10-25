import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Cloud,
  Eye,
  Github,
  Globe,
  Layers3,
  Network,
  X,
  LayoutGrid,
  ListFilter,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { cn } from '@/lib/utils';
import { useSkillFilter } from '@/context/SkillFilterContext';
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
type ProjectTone = 'emerald' | 'amber' | 'slate';

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

const categoryConfig: Record<ProjectCategory, { icon: LucideIcon; label: string }> = {
  'AI/ML': { icon: Brain, label: 'AI/ML' },
  Cloud: { icon: Cloud, label: 'Cloud' },
  'Web App': { icon: Globe, label: 'Web App' },
  'Computer Vision': { icon: Eye, label: 'Computer Vision' },
  'Data Analysis': { icon: BarChart3, label: 'Data Analysis' },
  Other: { icon: Layers3, label: 'Other' },
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
    tone: 'amber',
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
    tone: 'emerald',
  },
  {
    title: 'HeartOut',
    description: 'Full-stack anonymous social web application designed for vulnerability-safe creative writing, confessions, and community interaction.',
    impact: 'Production deployment with 541+ automated tests, full CI/CD deployment, and high-concurrency story feed pagination.',
    soloBuild: 'Solo full-stack build',
    metrics: ['541+ automated tests', 'Zero-downtime CI/CD', 'Real-time reactions'],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT Auth', 'Jest'],
    category: 'Web App',
    focus: 'Social Web App',
    github: 'https://github.com/vutikurishanmukha9/heartout',
    demo: 'https://heartout.vercel.app',
    caseStudy: '/case-study/unicorn',
    featured: true,
    tone: 'amber',
  },
  {
    title: 'Candle-Light',
    description: 'Real-time stock technical analysis platform and trading indicator visualizer that generates actionable candlestick chart patterns.',
    impact: 'Processes live historical financial time-series data to detect reversal patterns with algorithmic accuracy.',
    soloBuild: 'Solo frontend & ML build',
    metrics: ['Sub-15ms rendering', '20+ candlestick patterns', 'Historical backtesting'],
    tech: ['Python', 'Streamlit', 'TA-Lib', 'yfinance', 'Plotly', 'Pandas'],
    category: 'AI/ML',
    focus: 'FinTech Analytics',
    github: 'https://github.com/vutikurishanmukha9/Candle-Light',
    demo: 'https://candle-light.streamlit.app',
    tone: 'emerald',
  },
  {
    title: 'Ele-Visualize',
    description: 'Interactive 3D chemical element orbital visualizer and hand gesture-controlled molecular structure modeler.',
    impact: 'Uses MediaPipe hand-tracking computer vision to let students manipulate virtual 3D atoms in real time.',
    soloBuild: 'Solo research prototype',
    metrics: ['60 FPS WebGL', 'Sub-10ms gesture response', 'Full periodic table'],
    tech: ['Three.js', 'React', 'MediaPipe', 'WebXR', 'Python'],
    category: 'Computer Vision',
    focus: 'EdTech 3D/AR',
    github: 'https://github.com/vutikurishanmukha9/Ele-Visualize',
    tone: 'slate',
  },
  {
    title: 'PromptBuddy',
    description: 'Developer productivity tool for organizing, testing, and sharing parameter-injected prompt templates across LLM models.',
    impact: 'Eliminates repetitive prompt engineering workflows with automated variable fill-ins and multi-model diff checking.',
    soloBuild: 'Solo productivity build',
    metrics: ['Instant offline access', 'JSON/YAML exports', 'Zero latency'],
    tech: ['TypeScript', 'React', 'TailwindCSS', 'Local Storage API', 'Vite'],
    category: 'Web App',
    focus: 'AI Developer Tool',
    github: 'https://github.com/vutikurishanmukha9/promptbuddy',
    demo: 'https://promptbuddy.vercel.app',
    tone: 'amber',
  },
  {
    title: 'Jarvis PDF Chatbot',
    description: 'Document intelligence assistant that chunks, embeds, and executes multi-document question-answering using FAISS vector search.',
    impact: 'Indexes academic PDFs and technical manuals for semantic citation search with source verification.',
    soloBuild: 'Solo AI build',
    metrics: ['FAISS vector indexing', 'Source page citations', 'Multi-doc support'],
    tech: ['Python', 'LangChain', 'FAISS', 'OpenAI Embeddings', 'Streamlit'],
    category: 'AI/ML',
    focus: 'RAG Search',
    github: 'https://github.com/vutikurishanmukha9/jarvis-pdf-chatbot',
    tone: 'emerald',
  },
  {
    title: 'AI Health ChatBot',
    description: 'Conversational healthcare triage assistant designed to interpret symptom descriptions and guide users toward verified specialists.',
    impact: 'Features fallback validation rules to prevent medical hallucinations and strictly format advisory disclaimers.',
    soloBuild: 'Solo healthcare AI build',
    metrics: ['Triaged response speed', 'Structured output validation', 'Clinical categorization'],
    tech: ['Python', 'FastAPI', 'React', 'HuggingFace', 'Tailwind CSS'],
    category: 'AI/ML',
    focus: 'Healthcare AI',
    github: 'https://github.com/vutikurishanmukha9/ai-health-chatbot',
    tone: 'slate',
  },
  {
    title: 'Touchless Keyboard',
    description: 'Accessibility-first virtual keyboard interface driven entirely by computer vision fingertip tracking and eye blinks.',
    impact: 'Enables individuals with severe motor disabilities to type and communicate using any basic laptop webcam.',
    soloBuild: 'Solo accessibility build',
    metrics: ['98% tracking accuracy', 'Zero specialized hardware', 'Real-time OpenCV'],
    tech: ['Python', 'OpenCV', 'MediaPipe', 'NumPy', 'Tkinter'],
    category: 'Computer Vision',
    focus: 'Assistive Tech',
    github: 'https://github.com/vutikurishanmukha9/touchless-keyboard',
    tone: 'emerald',
  },
  {
    title: 'Automated Attendance System',
    description: 'Facial recognition pipeline for educational institutions that automates student check-ins with anti-spoofing liveness checks.',
    impact: 'Reduces roll-call time from 10 minutes to sub-second verification while preventing static image proxy fraud.',
    soloBuild: 'Solo vision build',
    metrics: ['Sub-second match time', 'Liveness blink detection', 'Excel automated export'],
    tech: ['Python', 'OpenCV', 'face_recognition', 'SQLite', 'Pandas'],
    category: 'Computer Vision',
    focus: 'Biometric Vision',
    github: 'https://github.com/vutikurishanmukha9/automated-attendance',
    tone: 'amber',
  },
  {
    title: 'Employee Data Analysis',
    description: 'Comprehensive workforce analytics suite analyzing attrition risk, salary compression, and performance distributions.',
    impact: 'Provides HR leadership with statistical regression models identifying turnover drivers with 87% predictive precision.',
    soloBuild: 'Solo analytics project',
    metrics: ['87% predictive precision', 'Interactive Power BI dashboards', 'Statistical hypothesis testing'],
    tech: ['Python', 'Pandas', 'Power BI', 'Scikit-learn', 'Matplotlib'],
    category: 'Data Analysis',
    focus: 'Workforce Analytics',
    github: 'https://github.com/vutikurishanmukha9/employee-data-analysis',
    tone: 'slate',
  },
];

const categories: Array<ProjectCategory | 'All'> = ['All', 'AI/ML', 'Cloud', 'Web App', 'Computer Vision', 'Data Analysis'];

const projectListVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const projectCardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

const renderProjectMockup = (title: string) => {
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

const ModernProjectCard: React.FC<{
  project: Project;
  featured?: boolean;
  onInspectBlueprint?: (project: Project) => void;
}> = ({ project, featured = false, onInspectBlueprint }) => {
  const visual = categoryConfig[project.category];
  const Icon = visual.icon;
  const primaryTech = project.tech.slice(0, featured ? 6 : 4);

  return (
    <motion.div
      variants={projectCardVariants}
      className={cn(
        'group relative rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs hover:border-primary/50 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between',
        featured && 'md:col-span-2 xl:col-span-3'
      )}
    >
      <div className={cn(featured ? 'grid grid-cols-1 md:grid-cols-12 gap-6 items-center' : 'space-y-4')}>
        
        {/* Visual Mockup Container */}
        <div className={cn('w-full', featured ? 'md:col-span-6' : 'mb-3')}>
          <div className="rounded-xl overflow-hidden border border-border/80 bg-muted/30">
            {renderProjectMockup(project.title)}
          </div>
        </div>

        {/* Content & Metadata */}
        <div className={cn('flex flex-col justify-between flex-1', featured && 'md:col-span-6 space-y-3')}>
          <div>
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium border border-border bg-muted/60 text-foreground whitespace-nowrap shrink-0">
                  <Icon className="w-3 h-3 text-muted-foreground shrink-0" />
                  <span>{project.category}</span>
                </span>
                <span className="text-[11px] font-mono text-muted-foreground px-2 py-1 rounded-lg border border-border/60 bg-muted/30 whitespace-nowrap shrink-0">
                  {project.focus}
                </span>
              </div>

              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 whitespace-nowrap shrink-0">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>{project.soloBuild}</span>
              </span>
            </div>

            {/* Title & Description */}
            <h3 className={cn('font-bold tracking-tight text-foreground', featured ? 'text-2xl sm:text-3xl' : 'text-xl')}>
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            {/* Impact Metric Box */}
            <div className="mt-3.5 p-3 rounded-xl border border-border/70 bg-muted/20 text-xs font-mono">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block mb-0.5">
                SYSTEM IMPACT
              </span>
              <p className="text-foreground font-medium leading-relaxed">
                {project.impact}
              </p>
            </div>
          </div>

          {/* Tech Stack & Action Toolbar */}
          <div className="mt-4 pt-3.5 border-t border-border space-y-3">
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5">
              {primaryTech.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-muted/60 border border-border/60 text-foreground"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > primaryTech.length && (
                <span className="px-2 py-0.5 rounded-lg text-xs font-medium text-muted-foreground border border-border/60 bg-card">
                  +{project.tech.length - primaryTech.length}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onInspectBlueprint?.(project)}
                className="h-8 rounded-lg border border-border bg-muted/60 hover:bg-muted text-foreground px-3 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Network className="h-3.5 w-3.5 text-muted-foreground" />
                Blueprint
              </button>

              {project.caseStudy && (
                <Link
                  to={project.caseStudy}
                  className="h-8 rounded-lg bg-foreground text-background hover:opacity-90 px-3.5 text-xs font-medium flex items-center gap-1 transition-opacity"
                >
                  Details
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              )}

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 rounded-lg border border-border bg-card hover:bg-muted text-foreground px-3 text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  {project.demoLabel || 'Demo'}
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              )}

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 rounded-lg border border-border bg-card hover:bg-muted text-foreground px-3 text-xs font-medium flex items-center gap-1.5 sm:ml-auto transition-colors"
              >
                <Github className="h-3.5 w-3.5 text-muted-foreground" />
                Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const blueprintDataMap: Record<string, {
  architecture: {
    client: string;
    gateway: string;
    backend: string;
    dataStore: string;
    throughput: string;
    latency: string;
    reliability: string;
  };
  designDecisions: string[];
}> = {
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
};

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All');
  const [viewMode, setViewMode] = useState<'bento' | 'matrix'>('bento');
  const [activeBlueprintProject, setActiveBlueprintProject] = useState<BlueprintProject | null>(null);
  const { selectedSkill, setSelectedSkill } = useSkillFilter();

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
    <SectionWrapper id="projects" className="py-10 sm:py-12 border-t border-border relative bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/60 text-xs font-medium text-foreground mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Production Codebase</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
          >
            Featured Projects
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-3 text-base leading-relaxed"
          >
            End-to-end architectures engineered with strict type safety, asynchronous microservices, and production ML pipelines.
          </motion.p>
        </div>

        {/* Toolbar: Category Switcher + View Mode Switcher */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Category Tabs with Counts */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-card border border-border rounded-xl">
            {categories.map((cat) => {
              const count = cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length;
              const isSelected = selectedCategory === cat;

              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0',
                    isSelected
                      ? 'bg-foreground text-background shadow-xs'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  <span>{cat}</span>
                  <span className={cn('text-[10px] px-1.5 py-0.2 rounded-md font-mono', isSelected ? 'bg-background/20 text-background' : 'bg-muted text-muted-foreground')}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle: Bento vs Matrix */}
          <div className="flex items-center gap-1 p-1 bg-card border border-border rounded-xl self-end sm:self-center">
            <button
              type="button"
              onClick={() => setViewMode('bento')}
              className={cn(
                'px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors',
                viewMode === 'bento' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
              title="Bento Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="text-xs hidden md:inline">Bento</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('matrix')}
              className={cn(
                'px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors',
                viewMode === 'matrix' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
              title="Engineering Matrix Table"
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span className="text-xs hidden md:inline">Matrix</span>
            </button>
          </div>
        </div>

        {/* Selected Skill Filter Chip (if active) */}
        {selectedSkill && (
          <div className="mb-6 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedSkill(null)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              Filtered by: {selectedSkill}
              <X className="h-3 w-3 text-muted-foreground" />
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
              {heroProject && (
                <ModernProjectCard
                  project={heroProject}
                  featured
                  onInspectBlueprint={handleOpenBlueprint}
                />
              )}

              <AnimatePresence mode="popLayout">
                {standardProjects.map((project) => (
                  <ModernProjectCard
                    key={project.title}
                    project={project}
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
          <div className="rounded-2xl border border-border bg-card p-12 text-center space-y-3">
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
