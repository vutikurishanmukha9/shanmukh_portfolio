import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { ResumeModal } from '@/components/ResumeModal';
import { Marquee } from '@/components/magicui/marquee';
import { NumberTicker } from '@/components/magicui/number-ticker';
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

export const HeroSection = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 overflow-hidden bg-background">
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
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center">

          {/* Left Column: Positioning & Engineering Identity */}
          <div className="flex flex-col items-start text-left space-y-4 sm:space-y-5 min-w-0 w-full">

            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-muted/70 text-xs font-medium text-foreground shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Available for SDE, AI & Cloud Roles</span>
            </motion.div>

            {/* Main Headline & Subtitle */}
            <div className="space-y-1.5 sm:space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="text-4xl xs:text-5xl sm:text-6xl font-bold font-display tracking-tight text-foreground leading-[1.08]"
              >
                Shanmukh Vutikuri
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-base sm:text-xl font-semibold text-primary tracking-tight"
              >
                AI Systems & Full-Stack Engineer
              </motion.p>
            </div>

            {/* Core Value Proposition Statement */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl"
            >
              I architect production-grade AI systems, hybrid RAG pipelines, and scalable cloud microservices engineered for high throughput and verified reliability.
            </motion.p>

            {/* High-Signal Metrics Strip with Magic UI NumberTicker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-md pt-1"
            >
              <div className="p-2.5 sm:p-3 rounded-xl border border-border bg-card/70 backdrop-blur-xs min-h-[72px] sm:min-h-[78px] flex flex-col justify-between shadow-2xs">
                <div className="text-xl sm:text-2xl font-bold font-display text-foreground">
                  <NumberTicker value={10} suffix="+" />
                </div>
                <div className="text-[11px] sm:text-xs text-muted-foreground font-medium mt-0.5 leading-tight">Shipped Products</div>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl border border-border bg-card/70 backdrop-blur-xs min-h-[72px] sm:min-h-[78px] flex flex-col justify-between shadow-2xs">
                <div className="text-xl sm:text-2xl font-bold font-display text-foreground">
                  <NumberTicker value={541} suffix="+" />
                </div>
                <div className="text-[11px] sm:text-xs text-muted-foreground font-medium mt-0.5 leading-tight">Automated Tests</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('publications');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="p-2.5 sm:p-3 rounded-xl border border-border bg-card/70 hover:bg-card hover:border-primary/40 backdrop-blur-xs min-h-[72px] sm:min-h-[78px] flex flex-col justify-between text-left transition-all cursor-pointer group/stat shadow-2xs"
                title="View IEEE Publication"
              >
                <div className="text-xl sm:text-2xl font-bold font-display text-foreground group-hover/stat:text-primary transition-colors flex items-center justify-between">
                  <span>IEEE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover/stat:text-primary transition-colors" />
                </div>
                <div className="text-[11px] sm:text-xs text-muted-foreground font-medium mt-0.5 leading-tight">Published Author</div>
              </button>
            </motion.div>

            {/* Primary Action Buttons & Social Strip with Magic UI ShimmerButton */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2 w-full"
            >
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <ShimmerButton
                  type="button"
                  onClick={handleScrollToProjects}
                  className="gap-2 pl-4 sm:pl-5 pr-2 py-2.5 text-xs sm:text-sm font-medium"
                >
                  <span>Explore Work</span>
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-background/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-y-0.5 shrink-0">
                    <ArrowDown className="w-3.5 h-3.5 shrink-0" />
                  </span>
                </ShimmerButton>

                <button
                  type="button"
                  onClick={() => setIsResumeOpen(true)}
                  className="group/btn inline-flex items-center gap-2 pl-3.5 sm:pl-4 pr-1.5 py-2.5 rounded-full border border-border bg-card text-foreground text-xs sm:text-sm font-medium hover:bg-muted/70 transition-all shadow-2xs cursor-pointer"
                >
                  <span>View Resume</span>
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-muted border border-border/80 flex items-center justify-center transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover/btn:text-foreground" />
                  </span>
                </button>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-1.5 sm:pl-2">
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

          {/* Right Column: Executive Engineering Dossier Card with Magic UI BorderBeam */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="w-full flex justify-center lg:justify-end min-w-0"
          >
            <div className="w-full max-w-[440px] p-1.5 rounded-[1.5rem] border border-border/80 bg-muted/20 shadow-sm relative overflow-hidden">
              {/* Magic UI BorderBeam - clean engineering emerald laser perimeter, no AI sparkle slop */}
              <BorderBeam
                size={80}
                duration={12}
                delay={0}
                colorFrom="hsl(var(--primary))"
                colorTo="#10b981"
              />

              <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 space-y-4 relative z-10">
                
                {/* Dossier Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
                      Engineering Dossier
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Verified Systems</span>
                  </span>
                </div>

                {/* Flagship Production Builds */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                    Flagship Systems
                  </div>
                  
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl border border-border/60 bg-muted/30 hover:border-border transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground">Context-Ly</span>
                        <span className="text-[10px] font-mono text-primary font-medium">AST Engine</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                        Persistent code context & memory layer for LLMs with CLI
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl border border-border/60 bg-muted/30 hover:border-border transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground">GetReport</span>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">Polars ETL</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                        High-throughput analytical dataset processing & RAG reports
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl border border-border/60 bg-muted/30 hover:border-border transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground">HeartOut</span>
                        <span className="text-[10px] font-mono text-foreground font-medium">541+ Tests Pass</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                        Production social platform with full CI/CD test automation
                      </p>
                    </div>
                  </div>
                </div>

                {/* Research & Cloud Accreditations */}
                <div className="space-y-2 pt-1 border-t border-border/60">
                  <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                    Research & Accreditation
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl border border-border/60 bg-muted/30 flex flex-col justify-between min-h-[64px]">
                      <span className="text-[10px] font-mono text-primary font-semibold">IEEE EAIC 2025</span>
                      <span className="text-[11px] font-medium text-foreground mt-0.5">First / Lead Author</span>
                      <span className="text-[10px] text-muted-foreground mt-0.5">NIT Jalandhar</span>
                    </div>
                    <div className="p-2.5 rounded-xl border border-border/60 bg-muted/30 flex flex-col justify-between min-h-[64px]">
                      <span className="text-[10px] font-mono text-foreground font-semibold">AWS Cloud</span>
                      <span className="text-[11px] font-medium text-foreground mt-0.5">Certified Practitioner</span>
                      <span className="text-[10px] text-muted-foreground mt-0.5">Amazon Web Services</span>
                    </div>
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="pt-1 border-t border-border/60">
                  <div className="flex flex-wrap gap-1.5">
                    {['Python', 'TypeScript', 'FastAPI', 'Docker', 'PySpark', 'FAISS', 'PostgreSQL'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-muted/60 text-foreground border border-border/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>

        {/* Magic UI Infinite Marquee Tech Ecosystem Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="relative w-full max-w-6xl mx-auto mt-10 sm:mt-12 pt-6 border-t border-border/60"
        >
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Core Engineering Ecosystem & Tooling
            </span>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Verified Production Stack
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
