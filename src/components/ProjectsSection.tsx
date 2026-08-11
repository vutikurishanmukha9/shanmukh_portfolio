import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { cn } from '@/lib/utils';
import { useSkillFilter } from '@/context/SkillFilterContext';
import { ProjectBlueprintDrawer, type BlueprintProject } from '@/components/ui/ProjectBlueprintDrawer';

type ProjectCategory = 'AI/ML' | 'Cloud' | 'Web App' | 'Computer Vision' | 'Data Analysis' | 'Other';
type ProjectTone = 'blue' | 'violet' | 'rose' | 'emerald' | 'amber' | 'slate';

type Project = {
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
};

const categoryConfig: Record<ProjectCategory, { icon: LucideIcon; color: string }> = {
  'AI/ML': { icon: Brain, color: 'text-violet-500' },
  Cloud: { icon: Cloud, color: 'text-sky-500' },
  'Web App': { icon: Globe, color: 'text-primary' },
  'Computer Vision': { icon: Eye, color: 'text-emerald-500' },
  'Data Analysis': { icon: BarChart3, color: 'text-amber-500' },
  Other: { icon: Layers3, color: 'text-muted-foreground' },
};

const toneClasses: Record<ProjectTone, { bg: string; mark: string; border: string }> = {
  blue: {
    bg: 'from-sky-500/12 via-background to-background',
    mark: 'bg-sky-500',
    border: 'group-hover:border-sky-500/35',
  },
  violet: {
    bg: 'from-violet-500/12 via-background to-background',
    mark: 'bg-violet-500',
    border: 'group-hover:border-violet-500/35',
  },
  rose: {
    bg: 'from-rose-500/12 via-background to-background',
    mark: 'bg-rose-500',
    border: 'group-hover:border-rose-500/35',
  },
  emerald: {
    bg: 'from-emerald-500/12 via-background to-background',
    mark: 'bg-emerald-500',
    border: 'group-hover:border-emerald-500/35',
  },
  amber: {
    bg: 'from-amber-500/12 via-background to-background',
    mark: 'bg-amber-500',
    border: 'group-hover:border-amber-500/35',
  },
  slate: {
    bg: 'from-slate-500/10 via-background to-background',
    mark: 'bg-slate-500',
    border: 'group-hover:border-slate-500/35',
  },
};

const projects: Project[] = [
  {
    title: 'Context-Ly',
    description: 'Open-source Context Intelligence Engine and CLI that works as a persistent memory layer for LLM-assisted development.',
    impact: 'Helps AI tools understand project conventions faster, reducing repeated context setup and wasted prompts.',
    soloBuild: 'Solo open-source build',
    metrics: ['AST parsing', '100% tests', 'PyPI package'],
    tech: ['Python', 'Typer', 'Rich', 'Pytest', 'PyYAML'],
    category: 'AI/ML',
    focus: 'Developer Tools',
    github: 'https://github.com/vutikurishanmukha9/contextly',
    demo: 'https://pypi.org/project/contextly/',
    demoLabel: 'View Package',
    caseStudy: '/project/contextly',
    featured: true,
    tone: 'violet',
  },
  {
    title: 'GetReport',
    description: 'Full-stack reporting platform that turns raw datasets into PDF reports with Polars processing and AI-assisted querying.',
    impact: 'Combines upload, analysis, semantic exploration, and report generation into one end-to-end workflow.',
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
    description: 'AI-powered market pattern analysis interface with model fallback and low-latency visual signal flows.',
    impact: 'Turns technical market-pattern recognition into a clearer AI product experience.',
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
    description: 'Interactive 3D molecule visualization engine using WebGL and MediaPipe hand tracking for gesture-led exploration.',
    impact: 'Transforms hand movement into touchless 3D interaction for a STEM learning use case.',
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
    impact: 'Makes prompt reuse, structure, and iteration easier for regular AI work.',
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
    impact: 'Turns static PDFs into searchable knowledge through a practical RAG pipeline.',
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
    impact: 'Organizes symptom input into a clearer healthcare assistant experience.',
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
    impact: 'Converts messy HR data into clear analysis views and business-readable insights.',
    soloBuild: 'Solo analytics project',
    metrics: ['EDA', 'Retention', 'Reports'],
    tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
    category: 'Data Analysis',
    focus: 'Data Insights',
    github: 'https://github.com/vutikurishanmukha9/Employee_Data_Analysis',
    tone: 'amber',
  },
];

import { type Variants } from 'framer-motion';

const categories: Array<ProjectCategory | 'All'> = ['All', 'Web App', 'AI/ML', 'Computer Vision', 'Data Analysis', 'Cloud'];

const projectListVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.04,
    },
  },
};

const projectCardVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: 8,
    filter: 'blur(6px)',
    transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
  },
};

const ProductMark = ({ project, featured = false }: { project: Project; featured?: boolean }) => {
  const visual = categoryConfig[project.category];
  const Icon = visual.icon;
  const tone = toneClasses[project.tone];

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'relative overflow-hidden rounded-md border-[0.5px] border-border bg-gradient-to-br p-4',
        featured ? 'min-h-72' : 'min-h-56',
        tone.bg
      )}
    >
      <motion.div
        aria-hidden="true"
        className={cn('absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-10 blur-2xl', tone.mark)}
        animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative flex items-start justify-between gap-4">
        <motion.div
          className={cn('flex h-10 w-10 items-center justify-center rounded-md text-white shadow-sm', tone.mark)}
          whileHover={{ rotate: -4, scale: 1.04 }}
          transition={{ duration: 0.18 }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
        <div className="rounded-full border-[0.5px] border-border bg-background/70 px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
          {project.focus}
        </div>
      </div>

      <div className="relative mt-10 space-y-2">
        <motion.div
          className="h-2 w-2/3 rounded-full bg-foreground/15"
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="h-2 w-1/2 rounded-full bg-foreground/10"
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="relative mt-6 grid grid-cols-3 gap-2">
        {project.metrics.map((metric) => (
          <motion.div
            key={metric}
            className="rounded-md border-[0.5px] border-border bg-background/60 px-2 py-2"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={cn('mb-2 h-1.5 w-6 rounded-full', tone.mark)} />
            <p className="truncate text-[10px] font-medium text-foreground">{metric}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const ProjectCard = ({
  project,
  index,
  featured = false,
  onInspectBlueprint,
}: {
  project: Project;
  index: number;
  featured?: boolean;
  onInspectBlueprint?: (project: Project) => void;
}) => {
  const visual = categoryConfig[project.category];
  const Icon = visual.icon;
  const primaryTech = project.tech.slice(0, featured ? 5 : 4);

  return (
    <motion.article
      layout
      variants={projectCardVariants}
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.32, delay: Math.min(index * 0.025, 0.12), ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group h-full rounded-lg border-[0.5px] border-border bg-card/65 p-3 shadow-none transition-colors duration-200 hover:bg-card',
        toneClasses[project.tone].border,
        featured && 'grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:p-4'
      )}
    >
      <ProductMark project={project} featured={featured} />

      <div className="flex h-full flex-col px-1 py-1">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <motion.span
              className="inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-border bg-background px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-muted-foreground"
              whileHover={{ y: -1 }}
            >
              <Icon className={cn('h-3 w-3', visual.color)} />
              {project.category}
            </motion.span>
            <motion.span
              className="inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-emerald-500/25 bg-emerald-500/5 px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-emerald-600"
              whileHover={{ y: -1 }}
            >
              <CheckCircle2 className="h-3 w-3" />
              {project.soloBuild}
            </motion.span>
          </div>

          <h3 className={cn('font-serif-display font-medium tracking-tight text-foreground', featured ? 'text-3xl md:text-4xl' : 'text-2xl')}>
            {project.title}
          </h3>
          <p className={cn('mt-3 text-muted-foreground', featured ? 'text-sm leading-7' : 'text-xs leading-6')}>
            {project.description}
          </p>

          <motion.div
            className="mt-5 rounded-md border-[0.5px] border-border/80 bg-background/45 p-3"
            whileHover={{ backgroundColor: 'hsl(var(--background) / 0.78)' }}
            transition={{ duration: 0.18 }}
          >
            <p className="mb-1.5 text-[9px] font-mono uppercase tracking-widest text-foreground">Why it matters</p>
            <p className="text-xs leading-6 text-muted-foreground">{project.impact}</p>
          </motion.div>
        </div>

        <div className="mt-5 border-t-[0.5px] border-border/60 pt-4">
          <div className="mb-4 flex flex-wrap gap-1.5">
            {primaryTech.map((tech) => (
              <motion.span
                key={tech}
                className="rounded border-[0.5px] border-border bg-background px-2 py-1 text-[10px] font-mono text-muted-foreground"
                whileHover={{ y: -1, color: 'hsl(var(--foreground))' }}
              >
                {tech}
              </motion.span>
            ))}
            {project.tech.length > primaryTech.length && (
              <span className="rounded border-[0.5px] border-border bg-muted/40 px-2 py-1 text-[10px] font-mono text-muted-foreground">
                +{project.tech.length - primaryTech.length}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onInspectBlueprint?.(project)}
              className="h-8 rounded-full bg-background border-primary/30 text-primary hover:bg-primary/10 px-3.5 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1"
            >
              <Network className="h-3 w-3" />
              Blueprint
            </Button>
            {project.caseStudy && (
              <Button size="sm" className="h-8 rounded-full px-4 text-[10px] font-mono uppercase tracking-wider" asChild>
                <Link to={project.caseStudy}>
                  Details
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            )}
            {project.demo && (
              <Button variant={project.caseStudy ? 'outline' : 'default'} size="sm" className="h-8 rounded-full px-4 text-[10px] font-mono uppercase tracking-wider" asChild>
                <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live demo`}>
                  {project.demoLabel || 'Live Demo'}
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </a>
              </Button>
            )}
            <Button variant="outline" size="sm" className="h-8 rounded-full bg-background px-4 text-[10px] font-mono uppercase tracking-wider" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} GitHub repository`}>
                <Github className="mr-1 h-3.5 w-3.5" />
                Code
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All');
  const [activeBlueprintProject, setActiveBlueprintProject] = useState<BlueprintProject | null>(null);
  const { selectedSkill, setSelectedSkill } = useSkillFilter();

  const handleOpenBlueprint = (p: Project) => {
    setActiveBlueprintProject({
      title: p.title,
      tagline: p.description,
      category: p.category,
      architecture: {
        client: p.category === 'AI/ML' ? 'Next.js / Vite SPA' : 'Web Client UI',
        gateway: 'AWS API Gateway / Cloudflare Edge',
        backend: p.tech.includes('Python') ? 'FastAPI / Python ML Worker' : 'Node.js / Serverless Lambdas',
        dataStore: p.tech.includes('PostgreSQL') ? 'PostgreSQL / RDS' : p.tech.includes('AWS S3') ? 'Amazon S3 + FAISS' : 'Vector Database',
        throughput: '1.2k req/sec',
        latency: '< 45ms P99',
        reliability: '99.95% SLA',
      },
      designDecisions: [
        `Engineered modular pipeline isolating ${p.tech[0] || 'core compute'} from downstream presentation layers.`,
        `Optimized data serialization and reduced network round-trips via indexed memory caching.`,
        `Implemented defensive fallback error boundaries and automated telemetry logging.`,
      ],
      techStack: p.tech,
      githubUrl: p.github,
      demoUrl: p.demo,
    });
  };

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
    <SectionWrapper id="projects" className="relative overflow-hidden border-b-[0.5px] border-border/40 bg-background py-20">
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border-[0.5px] border-border/80 bg-card px-3 py-1"
          >
            <Code2 className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Selected Work</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-serif-display text-4xl font-normal tracking-tight text-foreground md:text-5xl"
          >
            Solo-built projects, easy to scan.
          </motion.h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            A focused view of shipped work: what it does, why it matters, the stack behind it, and where to view the code or live product.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex max-w-full flex-wrap gap-1.5 rounded-full border-[0.5px] border-border/70 bg-muted/35 p-1">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'relative rounded-full px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors',
                    isSelected ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="projects-active-filter"
                      className="absolute inset-0 rounded-full border-[0.5px] border-border bg-card shadow-sm"
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>

          {selectedSkill && (
            <button
              onClick={() => setSelectedSkill(null)}
              className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-primary hover:bg-primary/10"
            >
              Skill: {selectedSkill}
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {filteredProjects.length > 0 && heroProject ? (
          <motion.div
            key={`${selectedCategory}-${selectedSkill ?? 'all'}`}
            variants={projectListVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <ProjectCard
              project={heroProject}
              index={0}
              featured
              onInspectBlueprint={handleOpenBlueprint}
            />
            {standardProjects.length > 0 && (
              <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {standardProjects.map((project, index) => (
                    <ProjectCard
                      key={project.title}
                      project={project}
                      index={index + 1}
                      onInspectBlueprint={handleOpenBlueprint}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div className="rounded-lg border-[0.5px] border-border/80 bg-card p-10 text-center">
            <p className="text-sm font-semibold text-foreground">No projects match this filter.</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Clear the active skill filter or choose another category.</p>
          </div>
        )}

        <ProjectBlueprintDrawer
          project={activeBlueprintProject}
          isOpen={!!activeBlueprintProject}
          onClose={() => setActiveBlueprintProject(null)}
        />
      </div>
    </SectionWrapper>
  );
};
