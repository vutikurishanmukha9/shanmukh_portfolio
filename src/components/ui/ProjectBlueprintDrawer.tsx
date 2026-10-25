import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Github, ExternalLink, Activity, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    onCloseRef.current();
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

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
            className="fixed inset-0 bg-background/80 backdrop-blur-md cursor-pointer z-0"
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            key="blueprint-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative z-10 w-full max-w-2xl bg-card border-l border-border shadow-2xl h-full flex flex-col justify-between overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="sticky top-0 z-30 p-6 border-b border-border bg-card/95 backdrop-blur-md flex items-start justify-between">
              <div className="space-y-1.5 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full border border-border bg-muted text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
                    <Network className="w-3.5 h-3.5 text-primary" />
                    <span>System Architecture • {displayProject.category}</span>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-head font-bold text-foreground">
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
                className="p-2 rounded-xl border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0 shadow-xs relative z-50"
              >
                <X className="w-4 h-4" />
                <span className="sr-only">Close Blueprint</span>
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 sm:p-8 space-y-6 flex-1">
              
              {/* Interactive Node Topology Flow */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-2 text-foreground font-medium">
                    <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                    <span>Data Flow Topology</span>
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono">
                    Verified
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-border bg-muted/30 grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-center">
                  
                  {/* Node 1: Client Ingestion */}
                  <div className="p-3 rounded-lg border border-border bg-card flex flex-col items-center justify-between min-h-[90px] shadow-xs">
                    <span className="text-[10px] text-muted-foreground uppercase">01 Client</span>
                    <span className="text-xs font-semibold text-foreground mt-1 truncate max-w-full">{displayProject.architecture.client}</span>
                    <span className="text-[10px] text-primary">Ingestion</span>
                  </div>

                  {/* Node 2: Gateway */}
                  <div className="p-3 rounded-lg border border-border bg-card flex flex-col items-center justify-between min-h-[90px] shadow-xs">
                    <span className="text-[10px] text-muted-foreground uppercase">02 Gateway</span>
                    <span className="text-xs font-semibold text-foreground mt-1 truncate max-w-full">{displayProject.architecture.gateway}</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Routing</span>
                  </div>

                  {/* Node 3: Backend & Compute */}
                  <div className="p-3 rounded-lg border border-border bg-card flex flex-col items-center justify-between min-h-[90px] shadow-xs">
                    <span className="text-[10px] text-muted-foreground uppercase">03 Compute</span>
                    <span className="text-xs font-semibold text-foreground mt-1 truncate max-w-full">{displayProject.architecture.backend}</span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400">Processing</span>
                  </div>

                  {/* Node 4: Storage & Vectors */}
                  <div className="p-3 rounded-lg border border-border bg-card flex flex-col items-center justify-between min-h-[90px] shadow-xs">
                    <span className="text-[10px] text-muted-foreground uppercase">04 Persist</span>
                    <span className="text-xs font-semibold text-foreground mt-1 truncate max-w-full">{displayProject.architecture.dataStore}</span>
                    <span className="text-[10px] text-zinc-600 dark:text-zinc-400">Vector Index</span>
                  </div>
                </div>
              </div>

              {/* Real SLA & Telemetry Performance Ledger */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
                  Performance & Reliability Benchmarks
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl border border-border bg-card text-center font-mono shadow-xs">
                    <div className="text-xl font-head font-bold text-foreground">{displayProject.architecture.latency}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">p99 Latency</div>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-card text-center font-mono shadow-xs">
                    <div className="text-xl font-head font-bold text-foreground">{displayProject.architecture.throughput}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Throughput</div>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-card text-center font-mono shadow-xs">
                    <div className="text-xl font-head font-bold text-foreground">{displayProject.architecture.reliability}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Reliability SLA</div>
                  </div>
                </div>
              </div>

              {/* Core Architectural Trade-offs & Decisions */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
                  System Design Decisions & Trade-Offs
                </h4>
                <div className="space-y-2.5">
                  {displayProject.designDecisions.map((decision) => (
                    <div key={decision} className="p-3.5 rounded-xl border border-border bg-muted/30 flex items-start gap-3 text-xs font-mono text-foreground leading-relaxed">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{decision}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack Badges */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
                  Provisioned Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {displayProject.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-full border border-border bg-card text-xs font-mono text-foreground shadow-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 border-t border-border bg-muted/30 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-muted-foreground">
                Verified Architectural Blueprint
              </span>

              <div className="flex items-center gap-2">
                {displayProject.githubUrl && (
                  <Button variant="outline" size="sm" className="font-mono text-xs h-8 px-3 rounded-lg" asChild>
                    <a href={displayProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3.5 h-3.5 mr-1.5" />
                      Repository
                    </a>
                  </Button>
                )}
                {displayProject.demoUrl && (
                  <Button size="sm" className="font-mono text-xs h-8 px-3 rounded-lg" asChild>
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
