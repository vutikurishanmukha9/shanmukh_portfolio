import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Github, ExternalLink, Activity, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSound } from '@/hooks/useSound';

export interface BlueprintProject {
  title: string;
  tagline: string;
  category: string;
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
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
}

interface ProjectBlueprintDrawerProps {
  project: BlueprintProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectBlueprintDrawer: React.FC<ProjectBlueprintDrawerProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const { playClick } = useSound();
  const lastProjectRef = useRef<BlueprintProject | null>(project);

  useEffect(() => {
    if (project) {
      lastProjectRef.current = project;
    }
  }, [project]);

  const displayProject = project ?? lastProjectRef.current;

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  const handleClose = useCallback(() => {
    playClick(700, 0.03, 'sine');
    onCloseRef.current();
  }, [playClick]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playClick(700, 0.03, 'sine');
        onCloseRef.current();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, playClick]);

  if (globalThis.document === undefined) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && displayProject ? (
        <motion.div
          key="blueprint-modal-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[999999] flex justify-end overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label={displayProject.title}
        >
          {/* Full Screen Backdrop Blur */}
          <motion.div
            key="blueprint-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-background/85 backdrop-blur-md cursor-pointer z-0"
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            key="blueprint-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative z-10 w-full max-w-2xl bg-card border-l-[0.5px] border-border shadow-[0_0_80px_rgba(0,0,0,0.35)] h-full flex flex-col justify-between overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="sticky top-0 z-30 p-5 sm:p-7 border-b-[0.5px] border-border/80 flex items-start justify-between bg-card/95 backdrop-blur-xl">
              <div className="space-y-1.5 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full border-[0.5px] border-primary/30 bg-primary/10 text-primary text-[9px] font-mono uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <Network className="w-3 h-3" />
                    SYSTEM BLUEPRINT // {displayProject.category}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif-display font-medium text-foreground tracking-tight">
                  {displayProject.title}
                </h2>
                <p className="text-xs text-muted-foreground font-mono">
                  {displayProject.tagline}
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClose();
                }}
                aria-label="Close Blueprint"
                className="p-2.5 rounded-full hover:bg-muted text-foreground border border-border transition-[transform,background-color] hover:scale-105 active:scale-95 cursor-pointer shrink-0 shadow-sm bg-background relative z-50"
              >
                <X className="w-4 h-4 text-foreground" />
                <span className="sr-only">Close Blueprint</span>
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-5 sm:p-7 space-y-8 flex-1">
              
              {/* Interactive Node Topology Flow */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-foreground font-semibold">
                    <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
                    Active Data-Flow Topology
                  </span>
                  <span className="text-[9px] text-emerald-500 font-bold">FLOW_VERIFIED</span>
                </div>

                <div className="p-4 sm:p-5 rounded-xl border-[0.5px] border-border/80 bg-background/50 grid grid-cols-1 sm:grid-cols-4 gap-3 relative overflow-hidden font-mono text-center">
                  
                  {/* Node 1: Client Ingestion */}
                  <div className="p-3 rounded-lg border-[0.5px] border-border bg-card/60 flex flex-col items-center justify-between min-h-[90px] relative">
                    <span className="text-[8px] text-muted-foreground uppercase">01 // CLIENT</span>
                    <span className="text-xs font-semibold text-foreground mt-1">{displayProject.architecture.client}</span>
                    <span className="text-[7.5px] text-primary/80">INGESTION</span>
                  </div>

                  {/* Node 2: Gateway */}
                  <div className="p-3 rounded-lg border-[0.5px] border-border bg-card/60 flex flex-col items-center justify-between min-h-[90px] relative">
                    <span className="text-[8px] text-muted-foreground uppercase">02 // GATEWAY</span>
                    <span className="text-xs font-semibold text-foreground mt-1">{displayProject.architecture.gateway}</span>
                    <span className="text-[7.5px] text-emerald-500">ROUTING</span>
                  </div>

                  {/* Node 3: Backend & Compute */}
                  <div className="p-3 rounded-lg border-[0.5px] border-border bg-card/60 flex flex-col items-center justify-between min-h-[90px] relative">
                    <span className="text-[8px] text-muted-foreground uppercase">03 // INFERENCE</span>
                    <span className="text-xs font-semibold text-foreground mt-1">{displayProject.architecture.backend}</span>
                    <span className="text-[7.5px] text-amber-500">PROCESSING</span>
                  </div>

                  {/* Node 4: Storage & Vectors */}
                  <div className="p-3 rounded-lg border-[0.5px] border-border bg-card/60 flex flex-col items-center justify-between min-h-[90px] relative">
                    <span className="text-[8px] text-muted-foreground uppercase">04 // PERSIST</span>
                    <span className="text-xs font-semibold text-foreground mt-1">{displayProject.architecture.dataStore}</span>
                    <span className="text-[7.5px] text-sky-500">INDEXED STORE</span>
                  </div>
                </div>
              </div>

              {/* Real SLA & Telemetry Performance Ledger */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  OPERATIONAL TELEMETRY & SLA TARGETS
                </h4>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-lg border-[0.5px] border-border bg-card/40 text-center font-mono">
                    <div className="text-lg font-serif-display font-medium text-foreground">{displayProject.architecture.latency}</div>
                    <div className="text-[8px] text-muted-foreground uppercase tracking-wider mt-0.5">P99 LATENCY</div>
                  </div>
                  <div className="p-3.5 rounded-lg border-[0.5px] border-border bg-card/40 text-center font-mono">
                    <div className="text-lg font-serif-display font-medium text-foreground">{displayProject.architecture.throughput}</div>
                    <div className="text-[8px] text-muted-foreground uppercase tracking-wider mt-0.5">THROUGHPUT</div>
                  </div>
                  <div className="p-3.5 rounded-lg border-[0.5px] border-border bg-card/40 text-center font-mono">
                    <div className="text-lg font-serif-display font-medium text-foreground">{displayProject.architecture.reliability}</div>
                    <div className="text-[8px] text-muted-foreground uppercase tracking-wider mt-0.5">UPTIME SLA</div>
                  </div>
                </div>
              </div>

              {/* Core Architectural Trade-offs & Decisions */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  SYSTEM DESIGN DECISIONS & TRADE-OFFS
                </h4>
                <div className="space-y-2.5">
                  {displayProject.designDecisions.map((decision) => (
                    <div key={decision} className="p-3 rounded-lg border-[0.5px] border-border/60 bg-muted/20 flex items-start gap-2.5 text-xs font-mono text-muted-foreground leading-relaxed">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{decision}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack Badges */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  PROVISIONED STACK & LIBRARIES
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {displayProject.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded border-[0.5px] border-border bg-background text-[10px] font-mono text-foreground font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-5 sm:p-6 border-t-[0.5px] border-border/80 bg-muted/30 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[9px] font-mono text-muted-foreground">
                BLUEPRINT_ID // #{displayProject.title.substring(0, 4).toUpperCase()}-SYS
              </span>

              <div className="flex items-center gap-2">
                {displayProject.githubUrl && (
                  <Button variant="outline" size="sm" className="rounded-full h-8 px-4 text-xs font-mono uppercase bg-background" asChild>
                    <a href={displayProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3.5 h-3.5 mr-1.5" />
                      Repository
                    </a>
                  </Button>
                )}
                {displayProject.demoUrl && (
                  <Button size="sm" className="rounded-full h-8 px-4 text-xs font-mono uppercase bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                    <a href={displayProject.demoUrl} target="_blank" rel="noopener noreferrer">
                      Live App
                      <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                    </a>
                  </Button>
                )}
              </div>
            </div>

          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
};
