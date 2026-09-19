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
            className="relative z-10 w-full max-w-2xl bg-card border-l-2 border-black shadow-[0_0_0_9999px_rgba(0,0,0,0.4)] h-full flex flex-col justify-between overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="sticky top-0 z-30 p-4 sm:p-6 border-b-2 border-black bg-primary text-black flex items-start justify-between">
              <div className="space-y-1.5 sm:space-y-2 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 border-2 border-black bg-white text-black text-[10px] font-head font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-none">
                    <Network className="w-3.5 h-3.5 stroke-[2.5]" />
                    SYSTEM BLUEPRINT // {displayProject.category}
                  </span>
                </div>
                <h2 className="text-xl sm:text-3xl font-head font-bold uppercase text-black tracking-tight">
                  {displayProject.title}
                </h2>
                <p className="text-xs text-black/80 font-mono font-bold">
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
                className="p-2 border-2 border-black bg-card hover:bg-destructive hover:text-white text-black transition-colors cursor-pointer shrink-0 shadow-xs active:translate-x-0.5 active:translate-y-0.5 relative z-50"
              >
                <X className="w-4 h-4" />
                <span className="sr-only">Close Blueprint</span>
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-4 sm:p-7 space-y-5 sm:space-y-7 flex-1">
              
              {/* Interactive Node Topology Flow */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-head font-bold uppercase tracking-wider text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-foreground">
                    <Activity className="w-4 h-4 text-black animate-pulse stroke-[2.5]" />
                    ACTIVE DATA-FLOW TOPOLOGY
                  </span>
                  <span className="text-[10px] text-black bg-emerald-400 px-2 py-0.5 border border-black font-mono font-bold">
                    FLOW_VERIFIED
                  </span>
                </div>

                <div className="p-3 sm:p-5 border-2 border-black bg-card shadow-[4px_4px_0px_#000] grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 relative overflow-hidden font-mono text-center">
                  
                  {/* Node 1: Client Ingestion */}
                  <div className="p-2.5 sm:p-3 border-2 border-black bg-muted/40 flex flex-col items-center justify-between min-h-[85px] sm:min-h-[90px] shadow-xs">
                    <span className="text-[9px] font-head font-bold text-muted-foreground uppercase">01 // CLIENT</span>
                    <span className="text-xs font-bold text-foreground mt-1 truncate max-w-full">{displayProject.architecture.client}</span>
                    <span className="text-[9px] font-bold bg-primary px-1 border border-black text-black">INGESTION</span>
                  </div>

                  {/* Node 2: Gateway */}
                  <div className="p-2.5 sm:p-3 border-2 border-black bg-muted/40 flex flex-col items-center justify-between min-h-[85px] sm:min-h-[90px] shadow-xs">
                    <span className="text-[9px] font-head font-bold text-muted-foreground uppercase">02 // GATEWAY</span>
                    <span className="text-xs font-bold text-foreground mt-1 truncate max-w-full">{displayProject.architecture.gateway}</span>
                    <span className="text-[9px] font-bold text-emerald-700">ROUTING</span>
                  </div>

                  {/* Node 3: Backend & Compute */}
                  <div className="p-2.5 sm:p-3 border-2 border-black bg-muted/40 flex flex-col items-center justify-between min-h-[85px] sm:min-h-[90px] shadow-xs">
                    <span className="text-[9px] font-head font-bold text-muted-foreground uppercase">03 // INFERENCE</span>
                    <span className="text-xs font-bold text-foreground mt-1 truncate max-w-full">{displayProject.architecture.backend}</span>
                    <span className="text-[9px] font-bold text-amber-700">PROCESSING</span>
                  </div>

                  {/* Node 4: Storage & Vectors */}
                  <div className="p-2.5 sm:p-3 border-2 border-black bg-muted/40 flex flex-col items-center justify-between min-h-[85px] sm:min-h-[90px] shadow-xs">
                    <span className="text-[9px] font-head font-bold text-muted-foreground uppercase">04 // PERSIST</span>
                    <span className="text-xs font-bold text-foreground mt-1 truncate max-w-full">{displayProject.architecture.dataStore}</span>
                    <span className="text-[9px] font-bold text-sky-700">INDEXED STORE</span>
                  </div>
                </div>
              </div>

              {/* Real SLA & Telemetry Performance Ledger */}
              <div className="space-y-3">
                <h4 className="text-xs font-head font-bold uppercase tracking-wider text-foreground">
                  OPERATIONAL TELEMETRY & SLA TARGETS
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  <div className="p-3 sm:p-3.5 border-2 border-black bg-card text-center font-mono shadow-[3px_3px_0px_#000]">
                    <div className="text-lg sm:text-2xl font-head font-bold text-foreground">{displayProject.architecture.latency}</div>
                    <div className="text-[9px] font-head font-bold text-muted-foreground uppercase tracking-wider mt-1">P99 LATENCY</div>
                  </div>
                  <div className="p-3 sm:p-3.5 border-2 border-black bg-card text-center font-mono shadow-[3px_3px_0px_#000]">
                    <div className="text-lg sm:text-2xl font-head font-bold text-foreground">{displayProject.architecture.throughput}</div>
                    <div className="text-[9px] font-head font-bold text-muted-foreground uppercase tracking-wider mt-1">THROUGHPUT</div>
                  </div>
                  <div className="p-3 sm:p-3.5 border-2 border-black bg-card text-center font-mono shadow-[3px_3px_0px_#000]">
                    <div className="text-lg sm:text-2xl font-head font-bold text-foreground">{displayProject.architecture.reliability}</div>
                    <div className="text-[9px] font-head font-bold text-muted-foreground uppercase tracking-wider mt-1">UPTIME SLA</div>
                  </div>
                </div>
              </div>

              {/* Core Architectural Trade-offs & Decisions */}
              <div className="space-y-3">
                <h4 className="text-xs font-head font-bold uppercase tracking-wider text-foreground">
                  SYSTEM DESIGN DECISIONS & TRADE-OFFS
                </h4>
                <div className="space-y-2.5">
                  {displayProject.designDecisions.map((decision) => (
                    <div key={decision} className="p-3 border-2 border-black bg-muted/40 flex items-start gap-2.5 text-xs font-mono text-foreground font-semibold leading-relaxed shadow-xs">
                      <ShieldCheck className="w-4 h-4 text-black shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{decision}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack Badges */}
              <div className="space-y-3">
                <h4 className="text-xs font-head font-bold uppercase tracking-wider text-foreground">
                  PROVISIONED STACK & LIBRARIES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {displayProject.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 border-2 border-black bg-card text-[11px] font-head font-bold text-foreground uppercase shadow-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-5 sm:p-6 border-t-2 border-black bg-muted flex flex-wrap items-center justify-between gap-3">
              <span className="text-[10px] font-mono font-bold text-foreground">
                BLUEPRINT_ID // #{displayProject.title.substring(0, 4).toUpperCase()}-SYS
              </span>

              <div className="flex items-center gap-2">
                {displayProject.githubUrl && (
                  <Button variant="outline" size="sm" className="font-head text-xs font-bold uppercase h-8 px-4 border-2 border-black bg-card shadow-xs active:translate-x-0.5 active:translate-y-0.5" asChild>
                    <a href={displayProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3.5 h-3.5 mr-1.5" />
                      Repository
                    </a>
                  </Button>
                )}
                {displayProject.demoUrl && (
                  <Button size="sm" className="font-head text-xs font-bold uppercase h-8 px-4 border-2 border-black bg-primary text-black hover:bg-primary/90 shadow-xs active:translate-x-0.5 active:translate-y-0.5" asChild>
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
