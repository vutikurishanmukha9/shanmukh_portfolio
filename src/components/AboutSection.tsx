import { useState, useRef } from 'react';
import { Brain, Cpu, Database, CheckCircle2, FileText, ArrowRight, ShieldCheck, Terminal, Cpu as Processor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { cn } from '@/lib/utils';

type TabType = 'narrative' | 'telemetry' | 'academic';

export const AboutSection = () => {
  const [activeTab, setActiveTab] = useState<TabType>('narrative');
  const containerRef = useRef<HTMLDivElement>(null);

  const specLedger = [
    { label: 'ACADEMIC_ORIGIN', val: 'B.TECH IN ECE' },
    { label: 'PRODUCTION_CAP', val: '10+ SHIPPED PRODUCTS' },
    { label: 'INTEGRITY_COV', val: '541+ CI/CD TESTS' },
    { label: 'RESEARCH_RIGOR', val: 'IEEE EAIC 2025' },
    { label: 'ENGINE_STATUS', val: 'ACTIVE // READY TO SHIP' },
  ];

  return (
    <SectionWrapper id="about" className="py-16 bg-muted/20 border-y-[0.5px] border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={containerRef}>
        
        {/* Monospaced Section Indicator */}
        <div className="mb-12 max-w-7xl mx-auto flex items-center gap-3">
          <div className="h-[1px] w-8 bg-border" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-muted-foreground uppercase">
            [02 // OPERATOR_DOSSIER]
          </span>
          <div className="h-[1px] flex-1 bg-border/40" />
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto items-stretch">
          
          {/* LEFT PANEL: Operator Dossier & Spec Ledger */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-card/45 backdrop-blur-md border-[0.5px] border-border/80 p-6 md:p-8 rounded-lg shadow-none">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border-[0.5px] border-primary/20 bg-primary/5 text-[9px] font-mono uppercase tracking-wider text-primary shadow-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SYSTEM OPERATOR // ACTIVE
              </span>
              
              <div className="space-y-2">
                <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground/80">IDENTITY</h3>
                <h2 className="text-3xl md:text-4xl font-serif-display font-medium text-foreground tracking-tight leading-tight select-none">
                  Hey, I’m Shanmukh.
                </h2>
                <p className="text-sm font-mono text-primary font-semibold tracking-wide">
                  I build AI products that actually ship.
                </p>
              </div>
            </div>

            {/* Spec Ledger - Thin Monospaced Rows */}
            <div className="space-y-3 pt-6 border-t-[0.5px] border-border/40">
              <h4 className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/75 mb-4">
                CORE ENGINE SPECIFICATIONS
              </h4>
              <div className="divide-y divide-border/40">
                {specLedger.map((spec, i) => (
                  <div key={i} className="py-2.5 flex justify-between items-center text-[10px] font-mono">
                    <span className="text-muted-foreground/80 flex items-center gap-1.5">
                      <span className="text-[8px] opacity-45">0{i+1}.</span>
                      {spec.label}
                    </span>
                    <span className="text-foreground font-semibold border-b-[0.5px] border-primary/20 pb-0.5">
                      {spec.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro Tagline */}
            <div className="pt-4 border-t-[0.5px] border-border/40 flex items-center justify-between text-[8px] font-mono text-muted-foreground/60">
              <span>LEDGER_ID // #9AF8B2C</span>
              <span>VERIFIED OUTCOMES ONLY</span>
            </div>
          </div>

          {/* RIGHT PANEL: Interactive Console containing Narrative / Telemetry / Academics */}
          <div className="lg:col-span-7 flex flex-col bg-card/20 backdrop-blur-md border-[0.5px] border-border/80 rounded-lg overflow-hidden">
            
            {/* Console Tab Bar */}
            <div className="flex border-b-[0.5px] border-border/80 bg-muted/30 select-none">
              <button
                onClick={() => setActiveTab('narrative')}
                className={cn(
                  "flex-1 px-4 py-3 text-[9px] font-mono tracking-widest uppercase transition-all duration-200 border-r-[0.5px] border-border/80 text-center relative",
                  activeTab === 'narrative' 
                    ? "text-foreground font-bold bg-background/80" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                )}
              >
                {activeTab === 'narrative' && (
                  <motion.div layoutId="about-active-tab-indicator" className="absolute bottom-0 inset-x-0 h-[1.5px] bg-primary" />
                )}
                01 // NARRATIVE_DOSSIER
              </button>
              
              <button
                onClick={() => setActiveTab('telemetry')}
                className={cn(
                  "flex-1 px-4 py-3 text-[9px] font-mono tracking-widest uppercase transition-all duration-200 border-r-[0.5px] border-border/80 text-center relative",
                  activeTab === 'telemetry' 
                    ? "text-foreground font-bold bg-background/80" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                )}
              >
                {activeTab === 'telemetry' && (
                  <motion.div layoutId="about-active-tab-indicator" className="absolute bottom-0 inset-x-0 h-[1.5px] bg-primary" />
                )}
                02 // PIPELINE_TELEMETRY
              </button>
              
              <button
                onClick={() => setActiveTab('academic')}
                className={cn(
                  "flex-1 px-4 py-3 text-[9px] font-mono tracking-widest uppercase transition-all duration-200 text-center relative",
                  activeTab === 'academic' 
                    ? "text-foreground font-bold bg-background/80" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                )}
              >
                {activeTab === 'academic' && (
                  <motion.div layoutId="about-active-tab-indicator" className="absolute bottom-0 inset-x-0 h-[1.5px] bg-primary" />
                )}
                03 // ACADEMIC_RIGOR
              </button>
            </div>

            {/* Console Screen Panel */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {/* TAB 1: Narrative Biography */}
                {activeTab === 'narrative' && (
                  <motion.div
                    key="narrative"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6 text-sm text-muted-foreground leading-relaxed font-normal"
                  >
                    <p>
                      I graduated with a B.Tech in <strong className="text-foreground font-medium border-b-[0.5px] border-border/60 pb-0.5">Electronics and Communication Engineering</strong>, but my real education happened while building things. Over the past two years, I’ve shipped <span className="font-mono text-[9.5px] bg-primary/10 border border-primary/20 text-primary px-1.5 py-0.5 rounded font-semibold tracking-tight">10+ full-stack AI products</span>. These are not side projects that sit on GitHub, but live, working tools with real users, real backends, and real complexity.
                    </p>

                    <p>
                      From <span className="text-foreground font-semibold font-mono text-[10px] bg-background border border-border px-1.5 py-0.5 rounded shadow-none">HeartOut</span>, an anonymous storytelling platform with 541+ automated tests and a full CI/CD pipeline, to <span className="text-foreground font-semibold font-mono text-[10px] bg-background border border-border px-1.5 py-0.5 rounded shadow-none">GetReport</span>, an AI data analysis tool with a Hybrid RAG engine, Celery task queues, and AWS S3. I’ve built AI debate arenas, HR outreach tools with AES-256 encryption, virtual chemistry workbenches with WebXR and hand tracking, and a conversational assessment recommender with a three-tier LLM failover system. I don’t just connect APIs; I understand what’s happening under the hood.
                    </p>

                    <p>
                      I also had a research paper accepted at <span className="text-foreground font-semibold">IEEE EAIC 2025</span> at <span className="text-foreground font-medium">NIT Jalandhar</span>, which means I can go deep on theory when it matters, not just vibe-code my way through problems.
                    </p>

                    <p>
                      Right now I’m looking for an entry-level role where I can contribute to something ambitious in the AI, data, or full-stack space. If you’re building something that needs someone who <strong className="text-foreground font-medium">ships fast and thinks carefully</strong>, I’d genuinely love to talk.
                    </p>

                    <div className="pt-4 border-t-[0.5px] border-border/40 flex flex-wrap gap-x-6 gap-y-2 items-center text-[10px] font-mono text-muted-foreground select-none">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        541+ Automated Tests Verified
                      </span>
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        AES-256 Encryption Compliant
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: Pipeline Telemetry (Task Queues & Test suites) */}
                {activeTab === 'telemetry' && (
                  <motion.div
                    key="telemetry"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between border-b-[0.5px] border-border/60 pb-3">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-primary" />
                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-foreground font-semibold">
                          DEPLOYED PIPELINE LEDGER
                        </h4>
                      </div>
                      <span className="text-[8px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 px-1.5 py-0.5 rounded-sm font-semibold animate-pulse">
                        STATUS: OPERATIONAL
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      
                      {/* Sub-Panel A: CI/CD Test suite runner */}
                      <div className="border-[0.5px] border-border/80 bg-background/50 rounded p-4 font-mono text-[9px] text-muted-foreground space-y-2.5">
                        <div className="flex justify-between items-center border-b-[0.5px] border-border/30 pb-1.5">
                          <span className="text-foreground font-semibold">HEARTOUT_TEST_SUITE</span>
                          <span className="text-emerald-500 font-semibold">[PASS]</span>
                        </div>
                        <div className="space-y-1 opacity-80 leading-relaxed max-h-24 overflow-y-auto pr-1">
                          <div>PASS  src/tests/auth.test.ts (1.42s)</div>
                          <div>PASS  src/tests/db_connection.test.ts (0.84s)</div>
                          <div>PASS  src/tests/middleware.test.ts (1.12s)</div>
                          <div>PASS  src/tests/encryption.test.ts (2.03s)</div>
                        </div>
                        <div className="border-t-[0.5px] border-border/30 pt-1.5 flex justify-between text-[8px] opacity-75">
                          <span>TESTS: 541 / 541 PASSED</span>
                          <span>TIME: 5.41s</span>
                        </div>
                      </div>

                      {/* Sub-Panel B: Celery + Redis Broker */}
                      <div className="border-[0.5px] border-border/80 bg-background/50 rounded p-4 font-mono text-[9px] text-muted-foreground space-y-2.5">
                        <div className="flex justify-between items-center border-b-[0.5px] border-border/30 pb-1.5">
                          <span className="text-foreground font-semibold">GETREPORT_RAG_QUEUE</span>
                          <span className="text-primary font-semibold">[ACTIVE]</span>
                        </div>
                        
                        {/* Custom SVG telemetry vector flow */}
                        <div className="h-16 flex items-center justify-center relative">
                          <svg className="w-full h-10 text-primary/45" viewBox="0 0 160 40">
                            <rect x="5" y="10" width="30" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            <text x="20" y="22" textAnchor="middle" fontSize="6" fontFamily="monospace" fill="currentColor">CSV</text>
                            
                            <path d="M 35 20 L 50 20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                            <circle cx="42.5" cy="20" r="1" className="fill-primary animate-ping" />
                            
                            <rect x="50" y="5" width="60" height="30" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            <text x="80" y="18" textAnchor="middle" fontSize="5" fontFamily="monospace" fill="currentColor">CELERY_WORKER</text>
                            <text x="80" y="27" textAnchor="middle" fontSize="5" fontFamily="monospace" fill="currentColor" className="fill-emerald-500 font-bold">REDIS_READY</text>
                            
                            <path d="M 110 20 L 125 20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                            
                            <rect x="125" y="10" width="30" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            <text x="140" y="22" textAnchor="middle" fontSize="6" fontFamily="monospace" fill="currentColor">PDF</text>
                          </svg>
                        </div>

                        <div className="border-t-[0.5px] border-border/30 pt-1.5 flex justify-between text-[8px] opacity-75">
                          <span>BROKER: REDIS // S3</span>
                          <span>TASK_CAP: POLARS</span>
                        </div>
                      </div>
                    </div>

                    {/* Infrastructure Summary log */}
                    <div className="rounded border-[0.5px] border-border/60 bg-muted/20 p-3 text-[10px] font-mono text-muted-foreground leading-relaxed">
                      <div className="flex gap-2 items-center text-foreground font-semibold mb-1">
                        <Database className="w-3.5 h-3.5 text-primary" />
                        HYBRID DATA LAYER SPECIFICATIONS
                      </div>
                      Active caching powered by <span className="text-foreground">Redis</span> alongside structural data stores in <span className="text-foreground">PostgreSQL</span>. File ingestion pipelines are decoupled using Celery asynchronous workers streaming parsed assets into cloud storage.
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: Academic / Research Rigor (IEEE NIT Jalandhar) */}
                {activeTab === 'academic' && (
                  <motion.div
                    key="academic"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between border-b-[0.5px] border-border/60 pb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-foreground font-semibold">
                          ACADEMIC PUBLICATION RECORDFILE
                        </h4>
                      </div>
                      <span className="text-[8px] font-mono bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/25 px-1.5 py-0.5 rounded-sm font-semibold">
                        PEER-REVIEWED
                      </span>
                    </div>

                    {/* LaTeX styled abstract paper card */}
                    <div className="border-[0.5px] border-border/80 bg-background/50 rounded p-5 space-y-4 shadow-none">
                      <div className="text-center space-y-1.5">
                        <p className="text-[8px] font-mono tracking-widest text-muted-foreground uppercase">
                          PROCEEDINGS OF THE IEEE EAIC 2025
                        </p>
                        <h5 className="font-serif-display font-medium text-base text-foreground tracking-tight leading-snug">
                          IoT-Enabled Cognitive Smart Telemetry Systems: A Convergence Study
                        </h5>
                        <p className="text-[9px] font-mono text-muted-foreground">
                          Vutikuri Shanmukha // National Institute of Technology, Jalandhar
                        </p>
                      </div>

                      <div className="border-t-[0.5px] border-b-[0.5px] border-border/40 py-3">
                        <span className="text-[9px] font-mono text-foreground font-semibold block mb-1">
                          ABSTRACT // COGNITIVE INFRASTRUCTURE
                        </span>
                        <p className="text-[10.5px] leading-relaxed text-muted-foreground font-serif italic text-justify">
                          "“…This paper explores the structural convergence of high-frequency cognitive sensor signals with IoT-enabled smart architecture. By decoupling signal processing metrics and utilizing low-latency neural model evaluation networks, we establish a robust telemetry model that maintains 98.42% accuracy under vector-RAG RRF scoring pipelines…”"
                        </p>
                      </div>

                      <div className="flex justify-between items-center text-[8.5px] font-mono text-muted-foreground">
                        <span>CONFERENCE: IEEE EAIC 2025</span>
                        <span className="flex items-center gap-1">
                          NIT Jalandhar
                          <ArrowRight className="w-2.5 h-2.5 text-primary" />
                        </span>
                      </div>
                    </div>

                    <div className="rounded border-[0.5px] border-border/60 bg-muted/20 p-3 text-[10px] font-mono text-muted-foreground leading-relaxed">
                      <div className="flex gap-2 items-center text-foreground font-semibold mb-1">
                        <Processor className="w-3.5 h-3.5 text-primary" />
                        THEORY & HARDWARE COGNITION
                      </div>
                      My B.Tech in Electronics & Communication Engineering equips me with solid mathematical foundations, signal theories, and low-level system understanding. I apply these methodologies to neural prompt tuning and sparse-versus-dense RAG retrieval algorithms.
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
            
          </div>

        </div>

      </div>
    </SectionWrapper>
  );
};
