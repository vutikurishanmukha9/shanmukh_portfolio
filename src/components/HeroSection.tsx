import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, ArrowDown, GitBranch } from 'lucide-react';
import { ResumeModal } from '@/components/ResumeModal';
import { Marquee } from '@/components/magicui/marquee';
import { BorderBeam } from '@/components/magicui/border-beam';
import { GridPattern } from '@/components/magicui/grid-pattern';
import { ShimmerButton } from '@/components/magicui/shimmer-button';

const heroSocialLinks = [
  { url: 'https://github.com/vutikurishanmukha9', icon: Github, label: 'GitHub' },
  { url: 'https://linkedin.com/in/shanmukha-vutikuri', icon: Linkedin, label: 'LinkedIn' },
  { url: 'mailto:vutikurishanmukh17@gmail.com', icon: Mail, label: 'Email' },
];

const marqueeTechStack = [
  { name: 'Python', role: 'AI & Systems' },
  { name: 'PyTorch', role: 'Deep Learning' },
  { name: 'FastAPI', role: 'Async Microservices' },
  { name: 'PySpark', role: 'Distributed Processing' },
  { name: 'Docker', role: 'Containers' },
  { name: 'Kubernetes', role: 'Orchestration' },
  { name: 'FAISS', role: 'Vector Search' },
  { name: 'PostgreSQL', role: 'Relational DB' },
  { name: 'Redis', role: 'Cache & Pub/Sub' },
  { name: 'AWS Cloud', role: 'Infrastructure' },
  { name: 'Polars', role: 'High-Throughput ETL' },
  { name: 'LangChain', role: 'RAG Architecture' },
  { name: 'TypeScript', role: 'Type Safety' },
  { name: 'React 19', role: 'Frontend Architecture' },
  { name: 'Tailwind CSS', role: 'Design Tokens' },
  { name: 'CI/CD & Pytest', role: '541+ Automated Tests' },
];

type SystemKey = 'contextly' | 'getreport' | 'heartout';

interface SystemArchitecture {
  id: SystemKey;
  name: string;
  category: string;
  tagline: string;
  pipeline: string[];
  cliCommand: string;
  cliOutput: string[];
  githubUrl: string;
}

const FLAGSHIP_SYSTEMS: Record<SystemKey, SystemArchitecture> = {
  contextly: {
    id: 'contextly',
    name: 'Context-Ly',
    category: 'AST Code Intelligence Engine',
    tagline: 'Deterministic compiler-depth code analysis kernel & persistent context layer for LLMs.',
    pipeline: [
      'Source Files',
      'Tree-Sitter AST Parse',
      'Symbol Reference Graph',
      'Dense Vector Store',
      'Sub-15ms LLM Prompt Injection',
    ],
    cliCommand: 'contextly daemon --stream --repo ./src --ast-depth 3',
    cliOutput: [
      '[info] Parsed 48 TypeScript modules in 14.2ms via Tree-Sitter',
      '[info] Constructed symbol DAG: 1,842 nodes, 3,910 directed edges',
      '[ready] Kernel listening on localhost:7841 • Sub-15ms context injection active',
    ],
    githubUrl: 'https://github.com/vutikurishanmukha9/context-ly',
  },
  getreport: {
    id: 'getreport',
    name: 'GetReport',
    category: 'High-Throughput Polars ETL & RAG',
    tagline: 'Asynchronous columnar analytics pipeline with Celery workers, Redis pub/sub, and hybrid search.',
    pipeline: [
      'Raw Datasets (CSV/Parquet)',
      'Polars Columnar Engine',
      'Celery Distributed Workers',
      'FAISS Dense + BM25 Sparse',
      'Synthesized Executive Briefs',
    ],
    cliCommand: 'getreport process --worker-pool 8 --batch-size 50000 --format parquet',
    cliOutput: [
      '[etl] Ingested 250,000 records into memory-mapped Apache Arrow buffer',
      '[worker] 8 Celery workers spawned across Redis task queue',
      '[complete] Synthesized cross-tabulated metrics in 2.94s • Exported to S3',
    ],
    githubUrl: 'https://github.com/vutikurishanmukha9/GetReport',
  },
  heartout: {
    id: 'heartout',
    name: 'HeartOut',
    category: 'Zero-Regression Distributed Backend',
    tagline: 'Production full-stack social platform verified with 541 automated tests and CI/CD pipelines.',
    pipeline: [
      'Client Gateway',
      'FastAPI Async Router',
      'Argon2id + JWT Auth',
      'Async SQLAlchemy / PostgreSQL',
      'Pytest Automated Verification',
    ],
    cliCommand: 'pytest tests/ -v --cov=services/ --strict-markers',
    cliOutput: [
      'tests/test_auth.py::test_argon2_hashing PASSED [  4%]',
      'tests/test_feed.py::test_distributed_feed_query PASSED [ 42%]',
      'tests/test_moderation.py::test_content_filtering PASSED [100%]',
      '=== 541 passed, 0 failed, 0 warnings in 18.42s (Coverage: 94.2%) ===',
    ],
    githubUrl: 'https://github.com/vutikurishanmukha9/HeartOut',
  },
};

export const HeroSection = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSystemKey, setActiveSystemKey] = useState<SystemKey>('contextly');

  const activeSystem = FLAGSHIP_SYSTEMS[activeSystemKey];

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-24 overflow-hidden bg-background">
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Magic UI Architectural SVG Grid Pattern */}
      <GridPattern
        width={48}
        height={48}
        x={-1}
        y={-1}
        strokeDasharray="4 2"
        squares={[
          [1, 1],
          [3, 2],
          [6, 1],
          [8, 3],
          [12, 2],
          [15, 4],
        ]}
        className="opacity-40 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)]"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">

        {/* Top Editorial Identity & Hero Typography Block */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Architectural Status Kicker (Pure Typography, Zero Oval Shape) */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono tracking-widest uppercase text-muted-foreground"
          >
            <span className="flex items-center gap-2 text-foreground font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              Systems & Compiler Architecture
            </span>
            <span className="text-border select-none">/</span>
            <span>Distributed Engines</span>
            <span className="text-border select-none hidden sm:inline">/</span>
            <span className="hidden sm:inline">Hyderabad & Remote</span>
          </motion.div>

          {/* Main Cinematic 2-Line Headline */}
          <div className="space-y-3 sm:space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight text-foreground leading-[1.08] max-w-4xl"
            >
              Shanmukh Vutikuri
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-foreground/90 max-w-3xl mx-auto leading-snug"
            >
              Architecting Developer Engines, High-Throughput Pipelines & Distributed Systems
            </motion.p>
          </div>

          {/* Positioning & Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl font-normal"
          >
            Bridging hardware-level intuition with compiler-grade software intelligence. I build persistent AST code context kernels, columnar ETL engines, and deterministically verified cloud architectures.
          </motion.p>

          {/* Action CTAs & Social Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 w-full"
          >
            <div className="flex flex-wrap items-center justify-center gap-3">
              <ShimmerButton
                type="button"
                onClick={handleScrollToProjects}
                className="gap-2.5 pl-5 pr-2.5 py-2.5 text-xs sm:text-sm font-medium"
              >
                <span>Explore Featured Systems</span>
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-background/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-y-0.5 shrink-0">
                  <ArrowDown className="w-3.5 h-3.5 shrink-0" />
                </span>
              </ShimmerButton>

              <button
                type="button"
                onClick={() => setIsResumeOpen(true)}
                className="group/btn inline-flex items-center gap-2.5 pl-4 pr-1.5 py-2.5 rounded-full border border-border bg-card text-foreground text-xs sm:text-sm font-medium hover:bg-muted/70 transition-all shadow-2xs cursor-pointer"
              >
                <span>Curated CV & Technical Profile</span>
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-muted border border-border/80 flex items-center justify-center transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover/btn:text-foreground" />
                </span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-1.5 sm:pl-3">
              {heroSocialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-2.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center justify-center"
                    aria-label={item.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* Centerpiece: The Systems Architecture Showcase Deck (Double-Bezel Hardware Chassis) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="w-full mt-12 sm:mt-16"
        >
          {/* Double-Bezel Outer Hardware Shell */}
          <div className="w-full p-1.5 sm:p-2 rounded-[1.75rem] sm:rounded-[2rem] border border-border/70 bg-muted/20 shadow-md relative overflow-hidden">
            {/* BorderBeam Machined Edge Light */}
            <BorderBeam
              size={120}
              duration={14}
              delay={0}
              colorFrom="hsl(var(--primary))"
              colorTo="#10b981"
            />

            {/* Double-Bezel Inner Core */}
            <div className="rounded-[1.5rem] sm:rounded-[1.75rem] border border-border/80 bg-card p-5 sm:p-7 md:p-8 space-y-6 relative z-10">

              {/* Deck Header: System Selector Tabs & Status */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-border/60 gap-4">
                
                {/* System Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {(Object.keys(FLAGSHIP_SYSTEMS) as SystemKey[]).map((key) => {
                    const sys = FLAGSHIP_SYSTEMS[key];
                    const isSelected = activeSystemKey === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveSystemKey(key)}
                        className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? 'bg-foreground text-background shadow-xs'
                            : 'bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-400' : 'bg-muted-foreground/50'}`} />
                        <span>{sys.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Right Metadata */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
                    Architectural Blueprint
                  </span>
                  <a
                    href={activeSystem.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-muted/30 hover:bg-muted text-foreground text-xs font-mono transition-colors"
                  >
                    <GitBranch className="w-3.5 h-3.5 text-primary" />
                    <span>View Repository</span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
                  </a>
                </div>

              </div>

              {/* System Architecture Content Area */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSystem.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  
                  {/* Title & Tagline */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                        {activeSystem.category}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                        Production Kernel
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground font-normal mt-1 leading-relaxed max-w-2xl">
                      {activeSystem.tagline}
                    </p>
                  </div>

                  {/* Visual Architecture Flow Pipeline */}
                  <div className="p-4 rounded-xl border border-border/70 bg-muted/20">
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3 flex items-center justify-between">
                      <span>Execution Pipeline Topology</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Sub-Millisecond Pipeline</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center">
                      {activeSystem.pipeline.map((step, idx) => (
                        <React.Fragment key={step}>
                          <div className="p-3 rounded-lg border border-border/80 bg-card/90 shadow-2xs text-center flex flex-col justify-center min-h-[64px]">
                            <span className="text-[10px] font-mono text-muted-foreground">0{idx + 1}</span>
                            <span className="text-xs font-medium text-foreground mt-0.5 leading-snug">{step}</span>
                          </div>
                          {idx < activeSystem.pipeline.length - 1 && (
                            <div className="hidden sm:flex items-center justify-center text-muted-foreground/60">
                              <span className="text-xs font-mono font-bold">→</span>
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Interactive CLI Console View */}
                  <div className="rounded-xl border border-border/80 bg-black/90 p-4 font-mono text-xs text-emerald-400 space-y-1.5 overflow-x-auto shadow-inner">
                    <div className="text-muted-foreground flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                      <span className="text-[11px] text-white/70 font-semibold">$ {activeSystem.cliCommand}</span>
                      <span className="text-[10px] font-mono text-emerald-400/90 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        DAEMON_READY
                      </span>
                    </div>
                    {activeSystem.cliOutput.map((line, i) => (
                      <div key={i} className="leading-relaxed">
                        {line}
                      </div>
                    ))}
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </motion.div>

        {/* Magic UI Infinite Marquee Tech Ecosystem Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          className="relative w-full max-w-6xl mx-auto mt-12 sm:mt-16 pt-8 border-t border-border/60"
        >
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Core Engineering Stack & Tooling
            </span>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Battle-Tested in Production
            </span>
          </div>

          <div className="relative overflow-hidden py-1">
            {/* Seamless Left & Right Edge Fade Masks */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-background to-transparent" />

            <Marquee pauseOnHover className="[--duration:36s]">
              {marqueeTechStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border border-border/70 bg-card/80 backdrop-blur-xs text-xs font-mono text-foreground shadow-2xs hover:border-primary/50 transition-colors cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span className="font-semibold text-foreground">{tech.name}</span>
                  <span className="text-muted-foreground text-[10px] hidden sm:inline">({tech.role})</span>
                </div>
              ))}
            </Marquee>
          </div>
        </motion.div>

      </div>
    </section>
  );
};