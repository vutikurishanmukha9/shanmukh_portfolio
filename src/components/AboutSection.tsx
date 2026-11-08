import React, { useState } from 'react';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { CheckCircle2, Award, FileCode2, Cpu, Terminal as TerminalIcon, Network, Layers, Copy, Check } from 'lucide-react';
import { Terminal, TypingAnimation, AnimatedSpan } from '@/components/magicui/terminal';
import { BlurFade } from '@/components/magicui/blur-fade';

export const AboutSection = () => {
  const [copiedCmd, setCopiedCmd] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('contextly index --repo ./enterprise-rag --ast-depth 3 --optimize');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <SectionWrapper id="about" className="py-20 sm:py-28 md:py-32 bg-muted/20 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <BlurFade delay={0.05} inView>
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card text-xs font-mono font-medium text-foreground mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>SYSTEMS MANIFESTO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground font-display leading-[1.12]">
              From Silicon Intuition to Distributed Intelligence
            </h2>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-[62ch]">
              Why deterministic correctness, compiler-level efficiency, and zero-compromise test discipline matter more than AI hype.
            </p>
          </div>
        </BlurFade>

        {/* 2-Column Content Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Narrative Philosophy */}
          <BlurFade delay={0.1} inView className="lg:col-span-7 space-y-5 text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
            <p className="text-foreground font-medium text-base sm:text-lg leading-relaxed max-w-[62ch]">
              My engineering discipline began in hardware and telecommunications—analyzing transistor logic, clock domains, and bus bandwidth. That low-level intuition fundamentally shapes how I build distributed software: treating memory allocations, network packets, and CPU cache-lines with absolute respect.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="p-4 rounded-xl border border-border bg-card/60 space-y-1.5 shadow-2xs hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider">
                    Code as Data
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Instead of slicing code into blind string chunks, I parse source files into Abstract Syntax Trees (Tree-Sitter) to yield 100% deterministic symbol graphs for LLMs.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card/60 space-y-1.5 shadow-2xs hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider">
                    High-Throughput ETL
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Architecting columnar Apache Arrow and Polars pipelines with Celery distributed workers, processing 85k rows/sec with hybrid BM25 + FAISS vector search.
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1 max-w-[62ch]">
              Untested software is unverified software. Across systems like HeartOut and GetReport, I treat comprehensive test suites (541+ automated unit and integration specs) not as bureaucratic overhead, but as the foundational bedrock of fearless shipping.
            </p>

            {/* Architectural Credential Badges */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-border bg-card text-xs font-medium text-foreground shadow-2xs hover:border-primary/40 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="truncate font-mono">541+ Automated Tests</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-border bg-card text-xs font-medium text-foreground shadow-2xs hover:border-primary/40 transition-colors">
                <Award className="w-4 h-4 text-primary shrink-0" />
                <span className="truncate font-mono">AWS Certified</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-border bg-card text-xs font-medium text-foreground shadow-2xs hover:border-primary/40 transition-colors">
                <FileCode2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="truncate font-mono">IEEE EAIC Author</span>
              </div>
            </div>
          </BlurFade>

          {/* Right Column: Architectural Principles Card (Double-Bezel) */}
          <BlurFade delay={0.15} inView className="lg:col-span-5 p-1.5 rounded-[1.5rem] border border-border/80 bg-muted/20 shadow-xs hover:border-primary/40 transition-all duration-300">
            <div className="rounded-[1.375rem] border border-border/80 bg-card p-6 sm:p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] space-y-6">
              <div className="border-b border-border pb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                  Architectural Tenets
                </span>
                <h3 className="text-base font-bold text-foreground mt-1">
                  How I Architect & Ship Software
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-muted border border-border text-foreground shrink-0 mt-0.5">
                    <FileCode2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Deterministic Over Heuristic</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Prefer formal grammars, typed contracts, and AST symbol graphs before relying on probabilistic models.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-muted border border-border text-foreground shrink-0 mt-0.5">
                    <Cpu className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Columnar & Asynchronous First</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Utilize memory-mapped Arrow buffers, Polars vectorization, and non-blocking worker pools to sustain 80k+ ops/sec.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-muted border border-border text-foreground shrink-0 mt-0.5">
                    <TerminalIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Exhaustive Test Coverage</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Comprehensive unit, integration, and contract validation before every merge. 94%+ code coverage guaranteed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>Location: Hyderabad, India</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Available for High-Impact Teams</span>
              </div>
            </div>
          </BlurFade>

        </div>

        {/* Magic UI Terminal CLI Simulation for Architecture Verification */}
        <BlurFade delay={0.2} inView>
          <div className="mt-14 pt-10 border-t border-border/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                  Automated Verification Console
                </span>
                <h3 className="text-base font-bold text-foreground mt-0.5">
                  Context-Ly Code Intelligence Benchmark Run
                </h3>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground px-2.5 py-1 rounded-md border border-border bg-card shadow-2xs transition-colors cursor-pointer"
                  title="Copy benchmark command"
                >
                  {copiedCmd ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Command</span>
                    </>
                  )}
                </button>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Subprocess Run
                </span>
              </div>
            </div>

            <Terminal title="zsh - contextly daemon v0.2.4" sequence={true} className="max-w-none">
              <TypingAnimation delay={150} duration={30}>
                $ contextly index --repo ./enterprise-rag --ast-depth 3 --optimize
              </TypingAnimation>

              <AnimatedSpan delay={1200} className="text-muted-foreground">
                [info] Initializing Tree-Sitter parser for Python & TypeScript grammars...
              </AnimatedSpan>

              <AnimatedSpan delay={1800} className="text-muted-foreground">
                [info] Scanned 48 source files • Parsed 1,842 symbols in 14.2ms
              </AnimatedSpan>

              <AnimatedSpan delay={2400} className="text-emerald-500 dark:text-emerald-400">
                [cache] Generated symbol reference DAG: 3,910 edges resolved
              </AnimatedSpan>

              <AnimatedSpan delay={3000} className="text-primary">
                [vector] Stored 384-dim dense embeddings in FAISS index (latency: 18ms)
              </AnimatedSpan>

              <AnimatedSpan delay={3600} className="text-foreground font-semibold">
                ✔ Context kernel ready on localhost:7841 • Sub-15ms injection active
              </AnimatedSpan>
            </Terminal>
          </div>
        </BlurFade>

      </div>
    </SectionWrapper>
  );
};