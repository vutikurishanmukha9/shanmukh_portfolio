import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { CheckCircle2, ShieldCheck, Terminal, Award, FileCode2, Cpu } from 'lucide-react';

export const AboutSection = () => {
  return (
    <SectionWrapper id="about" className="py-10 sm:py-12 bg-muted/20 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-foreground mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Engineering Background</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
          >
            Crafting Production Systems with Rigor
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-muted-foreground text-base leading-relaxed"
          >
            Bridging theoretical electronics and communication foundations with modern full-stack AI architecture.
          </motion.p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Narrative Biography */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-normal"
          >
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
          </motion.div>

          {/* Right Column: Core Engineering Standards Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 p-1.5 rounded-[1.375rem] border border-border/80 bg-muted/20 shadow-xs"
          >
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
                  <Terminal className="w-4 h-4 text-primary" />
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
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
};
