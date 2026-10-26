import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, ArrowDown, Terminal, Database, Server, Cpu, Check, Copy } from 'lucide-react';
import { ResumeModal } from '@/components/ResumeModal';

const heroSocialLinks = [
  { url: 'https://github.com/vutikurishanmukha9', icon: Github, label: 'GitHub' },
  { url: 'https://linkedin.com/in/shanmukha-vutikuri', icon: Linkedin, label: 'LinkedIn' },
  { url: 'mailto:vutikurishanmukh17@gmail.com', icon: Mail, label: 'Email' },
];

export const HeroSection = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'architecture' | 'pipeline' | 'benchmarks'>('architecture');
  const [isCopied, setIsCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText('git clone https://github.com/vutikurishanmukha9/GetReport.git');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full pt-16 sm:pt-20 pb-8 sm:pb-10 overflow-hidden bg-background">
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Subtle Hairline Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '3rem 3rem',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-10 items-center">

          {/* Left Column: Positioning & Engineering Identity */}
          <div className="flex flex-col items-start text-left space-y-4 sm:space-y-5 min-w-0 w-full">

            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/70 text-xs font-medium text-foreground max-w-full truncate"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="truncate">Available for SDE, AI & Cloud Roles</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.08]"
              >
                Shanmukh Vutikuri
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-base sm:text-xl font-medium text-primary tracking-tight"
              >
                AI Systems & Full-Stack Engineer
              </motion.p>
            </div>

            {/* Core Value Proposition Statement */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-sm sm:text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              I architect production-grade AI systems, hybrid RAG pipelines, and scalable cloud microservices engineered for high throughput and verified reliability.
            </motion.p>

            {/* High-Signal Metrics Strip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-md pt-2"
            >
              <div className="p-2.5 sm:p-3.5 rounded-xl border border-border bg-card/60 backdrop-blur-xs min-h-[72px] sm:min-h-[78px] flex flex-col justify-between">
                <div className="text-lg sm:text-2xl font-bold text-foreground">10+</div>
                <div className="text-[11px] sm:text-xs text-muted-foreground font-medium mt-0.5 leading-tight">Shipped Products</div>
              </div>
              <div className="p-2.5 sm:p-3.5 rounded-xl border border-border bg-card/60 backdrop-blur-xs min-h-[72px] sm:min-h-[78px] flex flex-col justify-between">
                <div className="text-lg sm:text-2xl font-bold text-foreground">541+</div>
                <div className="text-[11px] sm:text-xs text-muted-foreground font-medium mt-0.5 leading-tight">Automated Tests</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('publications');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="p-2.5 sm:p-3.5 rounded-xl border border-border bg-card/60 hover:bg-card hover:border-primary/40 backdrop-blur-xs min-h-[72px] sm:min-h-[78px] flex flex-col justify-between text-left transition-all cursor-pointer group/stat"
                title="View IEEE Publication"
              >
                <div className="text-lg sm:text-2xl font-bold text-foreground group-hover/stat:text-primary transition-colors flex items-center justify-between">
                  <span>IEEE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover/stat:text-primary transition-colors" />
                </div>
                <div className="text-[11px] sm:text-xs text-muted-foreground font-medium mt-0.5 leading-tight">Published Author</div>
              </button>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 w-full"
            >
              <button
                type="button"
                onClick={handleScrollToProjects}
                className="group/btn inline-flex items-center justify-center gap-2 pl-4 sm:pl-5 pr-2 py-2 rounded-full bg-foreground text-background text-xs sm:text-sm font-medium hover:opacity-95 transition-all shadow-xs"
              >
                <span>Explore Selected Work</span>
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-background/20 flex items-center justify-center transition-transform duration-200 group-hover/btn:translate-y-0.5 shrink-0">
                  <ArrowDown className="w-3.5 h-3.5 shrink-0" />
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsResumeOpen(true)}
                className="group/btn inline-flex items-center gap-2 pl-3.5 sm:pl-4 pr-1.5 py-2 rounded-full border border-border bg-card text-foreground text-xs sm:text-sm font-medium hover:bg-muted/70 transition-all shadow-2xs"
              >
                <span>View Resume</span>
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-muted border border-border/80 flex items-center justify-center transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover/btn:text-foreground" />
                </span>
              </button>

              {/* Social Links */}
              <div className="flex items-center gap-1.5 pl-2">
                {heroSocialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      aria-label={item.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Real System Architecture Specimen (GetReport Hybrid RAG) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-full min-w-0"
          >
            {/* Double-Bezel Hardware Enclosure (Outer Shell) */}
            <div className="p-1.5 rounded-[1.375rem] border border-border/80 bg-muted/20 shadow-xs">
              {/* Inner Core Card */}
              <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden flex flex-col">

                {/* Window Header */}
                <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-border bg-muted/40 gap-2 sm:gap-3">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    </div>
                    <div className="h-3.5 w-px bg-border mx-0.5 sm:mx-1 shrink-0" />
                    <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground truncate">
                      <Terminal className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate max-w-[120px] sm:max-w-none">getreport // rag_architecture.py</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Verified<span className="hidden xs:inline"> Production System</span></span>
                  </div>
                </div>

                {/* View Selector Tabs */}
                <div className="flex items-center gap-1 p-1.5 sm:p-2 border-b border-border bg-muted/20">
                  <button
                    type="button"
                    onClick={() => setActiveTab('architecture')}
                    className={`flex-1 py-1.5 px-2 sm:px-3 rounded-lg text-[11px] sm:text-xs font-medium transition-colors ${activeTab === 'architecture'
                        ? 'bg-card text-foreground shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    System Flow
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('pipeline')}
                    className={`flex-1 py-1.5 px-2 sm:px-3 rounded-lg text-[11px] sm:text-xs font-medium transition-colors ${activeTab === 'pipeline'
                        ? 'bg-card text-foreground shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    Retrieval Spec
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('benchmarks')}
                    className={`flex-1 py-1.5 px-2 sm:px-3 rounded-lg text-[11px] sm:text-xs font-medium transition-colors ${activeTab === 'benchmarks'
                        ? 'bg-card text-foreground shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    Benchmarks
                  </button>
                </div>

                {/* Specimen Content Body */}
                <div className="p-3.5 sm:p-5 space-y-4">
                  {activeTab === 'architecture' && (
                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-2.5 sm:p-3 rounded-xl border border-border bg-muted/30 space-y-2">
                        <div className="flex flex-col xs:flex-row xs:items-center justify-between text-muted-foreground gap-1">
                          <span className="text-foreground font-semibold flex items-center gap-1.5 text-xs">
                            <Cpu className="w-3.5 h-3.5 text-primary shrink-0" />
                            Hybrid Retrieval Architecture
                          </span>
                          <span className="text-[10px] sm:text-[11px]">FAISS + Reciprocal Rank</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2 pt-1">
                          <div className="flex flex-col xs:flex-row xs:items-center justify-between p-2 rounded-lg bg-card border border-border/80 gap-1 text-[11px] sm:text-xs">
                            <span className="text-muted-foreground">1. Query Ingestion</span>
                            <span className="text-foreground font-medium">FastAPI & Async Worker</span>
                          </div>
                          <div className="flex flex-col xs:flex-row xs:items-center justify-between p-2 rounded-lg bg-card border border-border/80 gap-1 text-[11px] sm:text-xs">
                            <span className="text-muted-foreground">2. Sparse + Dense Search</span>
                            <span className="text-foreground font-medium">FAISS Vector Index + BM25</span>
                          </div>
                          <div className="flex flex-col xs:flex-row xs:items-center justify-between p-2 rounded-lg bg-card border border-border/80 gap-1 text-[11px] sm:text-xs">
                            <span className="text-muted-foreground">3. Re-Ranking Layer</span>
                            <span className="text-foreground font-medium">Cross-Encoder (Score &gt; 0.92)</span>
                          </div>
                          <div className="flex flex-col xs:flex-row xs:items-center justify-between p-2 rounded-lg bg-card border border-border/80 gap-1 text-[11px] sm:text-xs">
                            <span className="text-muted-foreground">4. Storage & Cache</span>
                            <span className="text-foreground font-medium">AWS S3 + Redis Queue</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'pipeline' && (
                    <div className="space-y-2.5 font-mono text-xs">
                      <div className="p-2.5 sm:p-3 rounded-xl border border-border bg-muted/30 space-y-2">
                        <div className="text-foreground font-semibold flex items-center gap-1.5 text-xs">
                          <Database className="w-3.5 h-3.5 text-primary shrink-0" />
                          Component Breakdown
                        </div>
                        <div className="space-y-1.5 text-muted-foreground pt-1 text-[11px] sm:text-xs">
                          <div className="flex flex-col xs:flex-row xs:justify-between border-b border-border/50 pb-1.5 gap-0.5">
                            <span>Vector Store</span>
                            <span className="text-foreground font-medium">FAISS HNSW Index</span>
                          </div>
                          <div className="flex flex-col xs:flex-row xs:justify-between border-b border-border/50 pb-1.5 gap-0.5">
                            <span>Context Fusion</span>
                            <span className="text-foreground font-medium">Reciprocal Rank Fusion</span>
                          </div>
                          <div className="flex flex-col xs:flex-row xs:justify-between border-b border-border/50 pb-1.5 gap-0.5">
                            <span>Task Orchestration</span>
                            <span className="text-foreground font-medium">Celery Worker + Redis</span>
                          </div>
                          <div className="flex flex-col xs:flex-row xs:justify-between gap-0.5">
                            <span>Cloud Deployment</span>
                            <span className="text-foreground font-medium">AWS EC2 / S3 (ap-south-1)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'benchmarks' && (
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 font-mono text-xs">
                      <div className="p-2.5 sm:p-3 rounded-xl border border-border bg-muted/30">
                        <div className="text-muted-foreground text-[10px] sm:text-[11px]">p99 Query Latency</div>
                        <div className="text-base sm:text-lg font-bold text-foreground mt-0.5 sm:mt-1">&lt; 58ms</div>
                        <div className="text-[9px] sm:text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 sm:mt-1">Verified on AWS</div>
                      </div>
                      <div className="p-2.5 sm:p-3 rounded-xl border border-border bg-muted/30">
                        <div className="text-muted-foreground text-[10px] sm:text-[11px]">Test Suite</div>
                        <div className="text-base sm:text-lg font-bold text-foreground mt-0.5 sm:mt-1">541+ Tests</div>
                        <div className="text-[9px] sm:text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 sm:mt-1">CI/CD Passing</div>
                      </div>
                      <div className="p-2.5 sm:p-3 rounded-xl border border-border bg-muted/30">
                        <div className="text-muted-foreground text-[10px] sm:text-[11px]">Hallucination</div>
                        <div className="text-base sm:text-lg font-bold text-foreground mt-0.5 sm:mt-1">38% Decrease</div>
                        <div className="text-[9px] sm:text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 sm:mt-1">Hybrid Re-ranking</div>
                      </div>
                      <div className="p-2.5 sm:p-3 rounded-xl border border-border bg-muted/30">
                        <div className="text-muted-foreground text-[10px] sm:text-[11px]">Architecture Spec</div>
                        <div className="text-base sm:text-lg font-bold text-foreground mt-0.5 sm:mt-1">Production</div>
                        <div className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5 sm:mt-1">Full End-to-End</div>
                      </div>
                    </div>
                  )}

                  {/* Footer Code Command Strip */}
                  <div className="pt-2 flex items-center justify-between border-t border-border font-mono text-xs gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground truncate min-w-0">
                      <Server className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate text-[11px] sm:text-xs">git clone github.com/vutikurishanmukha9/GetReport</span>
                    </div>
                    <button
                      type="button"
                      onClick={copyCommand}
                      className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0 ml-2"
                      aria-label="Copy clone command"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
