import { useState, useRef } from 'react';
import { Database, CheckCircle2, FileText, ArrowRight, ShieldCheck, Terminal, Cpu as Processor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { cn } from '@/lib/utils';

type TabType = 'narrative' | 'telemetry' | 'academic';

const specLedger = [
  { label: 'ACADEMIC_ORIGIN', val: 'B.TECH IN ECE' },
  { label: 'PRODUCTION_CAP', val: '10+ SHIPPED PRODUCTS' },
  { label: 'INTEGRITY_COV', val: '541+ CI/CD TESTS' },
  { label: 'RESEARCH_RIGOR', val: 'IEEE EAIC 2025' },
  { label: 'ENGINE_STATUS', val: 'ACTIVE // READY TO SHIP' },
];

export const AboutSection = () => {
  const [activeTab, setActiveTab] = useState<TabType>('narrative');
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SectionWrapper id="about" className="py-16 bg-muted/20 border-y-2 border-black overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={containerRef}>
        
        {/* Monospaced Section Indicator */}
        <div className="mb-10 max-w-7xl mx-auto flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 border-2 border-black bg-primary text-black font-head text-xs font-bold uppercase shadow-[2px_2px_0px_#000]">
            ★ 02 // OPERATOR DOSSIER
          </span>
          <div className="h-0.5 flex-1 bg-black" />
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto items-stretch">
          
          {/* LEFT PANEL: Operator Dossier & Spec Ledger */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-card border-2 border-black p-4 sm:p-6 md:p-8 rounded-none shadow-[6px_6px_0px_#000]">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 border-2 border-black bg-black text-white text-[11px] font-head uppercase tracking-wider font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                SYSTEM OPERATOR // ACTIVE
              </span>
              
              <div className="space-y-2">
                <h3 className="text-xs font-head uppercase tracking-widest text-muted-foreground">IDENTITY</h3>
                <h2 className="text-3xl md:text-4xl font-head font-bold text-foreground tracking-tight leading-tight uppercase select-none">
                  Hey, I’m Shanmukh.
                </h2>
                <div className="text-sm font-sans font-bold text-foreground tracking-wide bg-primary/30 p-2 border-2 border-black">
                  I build AI products that actually ship.
                </div>
              </div>
            </div>

            {/* Spec Ledger - Monospaced Rows */}
            <div className="space-y-3 pt-6 border-t-2 border-black">
              <h4 className="text-xs font-head uppercase tracking-widest text-muted-foreground mb-4">
                CORE ENGINE SPECIFICATIONS
              </h4>
              <div className="border-2 border-black divide-y-2 divide-black bg-muted/40 shadow-xs">
                {specLedger.map((spec, i) => (
                  <div key={spec.label} className="p-2.5 flex justify-between items-center text-[11px] font-mono">
                    <span className="text-foreground font-semibold flex items-center gap-1.5">
                      <span className="font-bold opacity-60">0{i+1}.</span>
                      {spec.label}
                    </span>
                    <span className="text-black font-bold bg-primary px-1.5 py-0.5 border border-black text-[10px]">
                      {spec.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro Tagline */}
            <div className="pt-4 border-t-2 border-black flex items-center justify-between text-[10px] font-mono text-muted-foreground font-semibold">
              <span>LEDGER_ID // #9AF8B2C</span>
              <span>VERIFIED OUTCOMES ONLY</span>
            </div>
          </div>

          {/* RIGHT PANEL: Interactive Console containing Narrative / Telemetry / Academics */}
          <div className="lg:col-span-7 flex flex-col bg-card border-2 border-black rounded-none shadow-[6px_6px_0px_#000] overflow-hidden">
            
            {/* Console Tab Bar */}
            <div className="flex border-b-2 border-black bg-muted divide-x-2 divide-black select-none">
              <button
                type="button"
                onClick={() => setActiveTab('narrative')}
                className={cn(
                  "flex-1 px-3 sm:px-4 py-3 text-xs font-head tracking-wider uppercase transition-colors duration-150 text-center relative truncate cursor-pointer",
                  activeTab === 'narrative' 
                    ? "text-black font-bold bg-primary" 
                    : "text-muted-foreground hover:text-black hover:bg-muted/80"
                )}
              >
                <span className="hidden md:inline">01 // </span>DOSSIER
              </button>
              
              <button
                type="button"
                onClick={() => setActiveTab('telemetry')}
                className={cn(
                  "flex-1 px-3 sm:px-4 py-3 text-xs font-head tracking-wider uppercase transition-colors duration-150 text-center relative truncate cursor-pointer",
                  activeTab === 'telemetry' 
                    ? "text-black font-bold bg-primary" 
                    : "text-muted-foreground hover:text-black hover:bg-muted/80"
                )}
              >
                <span className="hidden md:inline">02 // </span>TELEMETRY
              </button>
              
              <button
                type="button"
                onClick={() => setActiveTab('academic')}
                className={cn(
                  "flex-1 px-3 sm:px-4 py-3 text-xs font-head tracking-wider uppercase transition-colors duration-150 text-center relative truncate cursor-pointer",
                  activeTab === 'academic' 
                    ? "text-black font-bold bg-primary" 
                    : "text-muted-foreground hover:text-black hover:bg-muted/80"
                )}
              >
                <span className="hidden md:inline">03 // </span>ACADEMICS
              </button>
            </div>

            {/* Console Screen Panel */}
            <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {/* TAB 1: Narrative Biography */}
                {activeTab === 'narrative' && (
                  <motion.div
                    key="narrative"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-5 text-sm text-foreground leading-relaxed font-normal"
                  >
                    <p>
                      I graduated with a B.Tech in <strong className="text-foreground font-bold border-b-2 border-black pb-0.5">Electronics and Communication Engineering</strong>, but my real education happened while building things. Over the past two years, I’ve shipped <span className="font-head text-[10px] bg-primary border-2 border-black text-black px-2 py-0.5 font-bold shadow-xs">10+ FULL-STACK AI PRODUCTS</span>. These are not side projects that sit on GitHub, but live, working tools with real users, real backends, and real complexity.
                    </p>

                    <p>
                      From <span className="text-black font-bold font-mono text-[11px] bg-white border-2 border-black px-2 py-0.5 shadow-xs">HeartOut</span>, an anonymous storytelling platform with 541+ automated tests and a full CI/CD pipeline, to <span className="text-black font-bold font-mono text-[11px] bg-white border-2 border-black px-2 py-0.5 shadow-xs">GetReport</span>, an AI data analysis tool with a Hybrid RAG engine, Celery task queues, and AWS S3. I’ve built AI debate arenas, HR outreach tools with AES-256 encryption, virtual chemistry workbenches with WebXR and hand tracking, and a conversational assessment recommender with a three-tier LLM failover system. I don’t just connect APIs; I understand what’s happening under the hood.
                    </p>

                    <p>
                      I also had a research paper accepted at <span className="text-black font-bold bg-primary px-1 border border-black">IEEE EAIC 2025</span> at <span className="font-bold">NIT Jalandhar</span>, which means I can go deep on theory when it matters, not just vibe-code my way through problems.
                    </p>

                    <p>
                      Right now I’m looking for an entry-level role where I can contribute to something ambitious in the AI, data, or full-stack space. If you’re building something that needs someone who <strong className="text-foreground font-bold underline decoration-2 underline-offset-2">ships fast and thinks carefully</strong>, I’d genuinely love to talk.
                    </p>

                    <div className="pt-4 border-t-2 border-black flex flex-wrap gap-x-4 gap-y-2 items-center text-xs font-head font-bold text-foreground select-none">
                      <span className="flex items-center gap-1.5 border-2 border-black bg-muted px-2.5 py-1 shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        541+ Automated Tests Verified
                      </span>
                      <span className="flex items-center gap-1.5 border-2 border-black bg-muted px-2.5 py-1 shadow-xs">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
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
                    <div className="flex items-center justify-between border-b-2 border-black pb-3">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-black" />
                        <h4 className="text-xs font-head uppercase tracking-widest text-foreground font-bold">
                          DEPLOYED PIPELINE LEDGER
                        </h4>
                      </div>
                      <span className="text-[10px] font-head bg-emerald-400 text-black border-2 border-black px-2 py-0.5 font-bold shadow-xs">
                        STATUS: OPERATIONAL
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      
                      {/* Sub-Panel A: CI/CD Test suite runner */}
                      <div className="border-2 border-black bg-card shadow-xs p-4 font-mono text-[10px] text-muted-foreground space-y-2.5">
                        <div className="flex justify-between items-center border-b-2 border-black pb-1.5">
                          <span className="text-foreground font-bold">HEARTOUT_TEST_SUITE</span>
                          <span className="text-emerald-700 font-bold bg-emerald-100 border border-black px-1">[PASS]</span>
                        </div>
                        <div className="space-y-1 text-foreground font-medium leading-relaxed max-h-24 overflow-y-auto pr-1">
                          <div>PASS src/tests/auth.test.ts (1.42s)</div>
                          <div>PASS src/tests/db_connection.test.ts (0.84s)</div>
                          <div>PASS src/tests/middleware.test.ts (1.12s)</div>
                          <div>PASS src/tests/encryption.test.ts (2.03s)</div>
                        </div>
                        <div className="border-t-2 border-black pt-1.5 flex justify-between text-[9px] font-bold text-foreground">
                          <span>TESTS: 541 / 541 PASSED</span>
                          <span>TIME: 5.41s</span>
                        </div>
                      </div>

                      {/* Sub-Panel B: Celery + Redis Broker */}
                      <div className="border-2 border-black bg-card shadow-xs p-4 font-mono text-[10px] text-muted-foreground space-y-2.5">
                        <div className="flex justify-between items-center border-b-2 border-black pb-1.5">
                          <span className="text-foreground font-bold">GETREPORT_RAG_QUEUE</span>
                          <span className="text-black font-bold bg-primary border border-black px-1">[ACTIVE]</span>
                        </div>
                        
                        {/* Custom SVG telemetry vector flow */}
                        <div className="h-16 flex items-center justify-center relative border-2 border-black bg-white">
                          <svg className="w-full h-10 text-black" viewBox="0 0 160 40" role="img" aria-label="Pipeline schematic showing raw CSV converting via Celery worker and Redis to a PDF document">
                            <rect x="5" y="10" width="30" height="20" fill="#fff7e8" stroke="currentColor" strokeWidth="1.5" />
                            <text x="20" y="22" textAnchor="middle" fontSize="6" fontFamily="monospace" fontWeight="bold" fill="currentColor">CSV</text>
                            
                            <path d="M 35 20 L 50 20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                            
                            <rect x="50" y="5" width="60" height="30" fill="#ffdc58" stroke="currentColor" strokeWidth="1.5" />
                            <text x="80" y="17" textAnchor="middle" fontSize="5" fontFamily="monospace" fontWeight="bold" fill="currentColor">CELERY_WORKER</text>
                            <text x="80" y="26" textAnchor="middle" fontSize="5" fontFamily="monospace" fontWeight="bold" fill="currentColor">REDIS_READY</text>
                            
                            <path d="M 110 20 L 125 20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                            
                            <rect x="125" y="10" width="30" height="20" fill="#fff7e8" stroke="currentColor" strokeWidth="1.5" />
                            <text x="140" y="22" textAnchor="middle" fontSize="6" fontFamily="monospace" fontWeight="bold" fill="currentColor">PDF</text>
                          </svg>
                        </div>

                        <div className="border-t-2 border-black pt-1.5 flex justify-between text-[9px] font-bold text-foreground">
                          <span>BROKER: REDIS // S3</span>
                          <span>TASK_CAP: POLARS</span>
                        </div>
                      </div>
                    </div>

                    {/* Infrastructure Summary log */}
                    <div className="border-2 border-black bg-muted/40 p-3 text-xs font-mono text-foreground leading-relaxed shadow-xs">
                      <div className="flex gap-2 items-center text-foreground font-head font-bold uppercase mb-1">
                        <Database className="w-3.5 h-3.5 text-black" />
                        HYBRID DATA LAYER SPECIFICATIONS
                      </div>
                      Active caching powered by <span className="font-bold bg-primary px-1 border border-black">Redis</span> alongside structural data stores in <span className="font-bold bg-primary px-1 border border-black">PostgreSQL</span>. File ingestion pipelines are decoupled using Celery asynchronous workers streaming parsed assets into cloud storage.
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
                    <div className="flex items-center justify-between border-b-2 border-black pb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-black" />
                        <h4 className="text-xs font-head uppercase tracking-widest text-foreground font-bold">
                          ACADEMIC PUBLICATION RECORDFILE
                        </h4>
                      </div>
                      <span className="text-[10px] font-head bg-primary text-black border-2 border-black px-2 py-0.5 font-bold shadow-xs">
                        PEER-REVIEWED
                      </span>
                    </div>

                    {/* Paper card */}
                    <div className="border-2 border-black bg-card p-5 space-y-4 shadow-xs">
                      <div className="text-center space-y-1.5">
                        <p className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase font-semibold">
                          PROCEEDINGS OF THE IEEE EAIC 2025
                        </p>
                        <h5 className="font-head font-bold text-base text-foreground tracking-tight leading-snug uppercase">
                          IoT-Enabled Cognitive Smart Telemetry Systems: A Convergence Study
                        </h5>
                        <p className="text-[10px] font-mono text-foreground font-bold">
                          Vutikuri Shanmukha // National Institute of Technology, Jalandhar
                        </p>
                      </div>

                      <div className="border-t-2 border-b-2 border-black py-3">
                        <span className="text-[10px] font-mono text-foreground font-bold block mb-1">
                          ABSTRACT // COGNITIVE INFRASTRUCTURE
                        </span>
                        <p className="text-xs leading-relaxed text-foreground font-sans text-justify">
                          "This paper explores the structural convergence of high-frequency cognitive sensor signals with IoT-enabled smart architecture. By decoupling signal processing metrics and utilizing low-latency neural model evaluation networks, we establish a robust telemetry model that maintains 98.42% accuracy under vector-RAG RRF scoring pipelines."
                        </p>
                      </div>

                      <div className="flex justify-between items-center text-[10px] font-mono text-foreground font-bold">
                        <span>CONFERENCE: IEEE EAIC 2025</span>
                        <span className="flex items-center gap-1 bg-primary px-2 py-0.5 border border-black">
                          NIT Jalandhar
                          <ArrowRight className="w-3 h-3 text-black" />
                        </span>
                      </div>
                    </div>

                    <div className="border-2 border-black bg-muted/40 p-3 text-xs font-mono text-foreground leading-relaxed shadow-xs">
                      <div className="flex gap-2 items-center text-foreground font-head font-bold uppercase mb-1">
                        <Processor className="w-3.5 h-3.5 text-black" />
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
