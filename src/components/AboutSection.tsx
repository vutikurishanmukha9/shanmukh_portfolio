import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { CheckCircle2, ShieldCheck, Terminal as TerminalIcon, Award, FileCode2, Cpu } from 'lucide-react';
import { Terminal, TypingAnimation, AnimatedSpan } from '@/components/magicui/terminal';
import { BlurFade } from '@/components/magicui/blur-fade';

export const AboutSection = () => {
  return (
    <SectionWrapper id="about" className="py-10 sm:py-12 bg-muted/20 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <BlurFade delay={0.05} inView>
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-foreground mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Engineering Background</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Crafting Production Systems with Rigor
            </h2>
            <p className="mt-3 text-muted-foreground text-base leading-relaxed">
              Bridging theoretical electronics and communication foundations with modern full-stack AI architecture.
            </p>
          </div>
        </BlurFade>

        {/* 2-Column Content Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Narrative Biography */}
          <BlurFade delay={0.1} inView className="lg:col-span-7 space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
            <p className="text-foreground font-medium text-base sm:text-lg leading-relaxed">
              I graduated with a B.Tech in <span className="text-primary font-semibold">Electronics and Communication Engineering</span>, but my true foundation was forged in the trenches of shipping production software. Over the past two years, I’ve designed, built, and deployed <span className="text-foreground font-semibold">10+ production-ready full-stack AI products</span>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl border border-border bg-card/60 space-y-1.5">
                <span className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider block">
                  Production Scale
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Architect of <strong className="text-foreground">HeartOut</strong> (541+ automated tests with CI/CD) and <strong className="text-foreground">GetReport</strong> (hybrid RAG with Celery workers, Redis queues, and AWS S3).
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-card/60 space-y-1.5">
                <span className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider block">
                  Academic Depth
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  First author on intelligent IoT and ML signal telemetry architecture published at <strong className="text-foreground">IEEE EAIC 2025</strong> (NIT Jalandhar).
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
              I am actively seeking software engineering roles (SDE, AI Systems, Cloud Backend) where I can bring velocity, architectural precision, and disciplined test coverage to a high-impact team.
            </p>

            {/* Verified Technical Proofs */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card text-xs font-medium text-foreground shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="truncate">541+ Tests Passing</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card text-xs font-medium text-foreground shadow-2xs">
                <Award className="w-4 h-4 text-primary shrink-0" />
                <span className="truncate">AWS Cloud Practitioner</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card text-xs font-medium text-foreground shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="truncate">IEEE EAIC 2025 Author</span>
              </div>
            </div>
          </BlurFade>

          {/* Right Column: Core Engineering Standards Card */}
          <BlurFade delay={0.15} inView className="lg:col-span-5 p-1.5 rounded-[1.375rem] border border-border/80 bg-muted/20 shadow-xs">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-sm space-y-6">
              <div className="border-b border-border pb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Architectural Principles
                </h3>
                <p className="text-base font-bold text-foreground mt-1">
                  How I Build & Ship Software
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-muted border border-border text-foreground shrink-0 mt-0.5">
                    <FileCode2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Automated Test Rigor</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Untested code is broken code. Comprehensive unit, integration, and schema validation before any production deployment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-muted border border-border text-foreground shrink-0 mt-0.5">
                    <Cpu className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Hybrid Retrieval & Low Latency</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Combining dense FAISS vector embeddings with sparse BM25 scoring and cross-encoder re-ranking to minimize hallucinations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-muted border border-border text-foreground shrink-0 mt-0.5">
                    <TerminalIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Scalable Cloud Microservices</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Containerized services on AWS, asynchronous Celery workers, Redis pub/sub queues, and normalized PostgreSQL schemas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>Origin: Hyderabad, India</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Ready to Deploy</span>
              </div>
            </div>
          </BlurFade>

        </div>

        {/* Magic UI Terminal CLI Simulation for Flagship Project */}
        <BlurFade delay={0.2} inView>
          <div className="mt-8 pt-6 border-t border-border/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                  Systems Verification Console
                </span>
                <h3 className="text-base font-bold text-foreground mt-0.5">
                  Context-Ly Code Intelligence Daemon
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 self-start sm:self-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Subprocess Run
              </span>
            </div>

            <Terminal title="zsh - contextly daemon v0.2.4" sequence={true} className="max-w-none">
              <TypingAnimation delay={150} duration={30}>
                $ contextly index --repo ./enterprise-rag --ast-depth 3 --optimize
              </TypingAnimation>
              <AnimatedSpan delay={1000} className="text-muted-foreground">
                [info] AST Parser: Scanning abstract syntax trees across 48 modules...
              </AnimatedSpan>
              <AnimatedSpan delay={1600} className="text-emerald-500">
                ✔ Parsed 1,420 AST nodes and 382 function signatures in 142ms
              </AnimatedSpan>
              <AnimatedSpan delay={2200} className="text-sky-400">
                ✔ Inverted index generated: 3,842 semantic tokens & symbol references
              </AnimatedSpan>
              <AnimatedSpan delay={2800} className="text-muted-foreground">
                ✔ FAISS vector index synchronized [1,536-dim bge-large-en embeddings]
              </AnimatedSpan>
              <AnimatedSpan delay={3400} className="text-emerald-400 font-semibold">
                ✔ Context-Ly daemon active: 0.84ms p99 cache lookup | 18.2MB resident memory
              </AnimatedSpan>
            </Terminal>
          </div>
        </BlurFade>

      </div>
    </SectionWrapper>
  );
};
