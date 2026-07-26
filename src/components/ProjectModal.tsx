import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Layers, Code, CheckCircle, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSound } from '@/hooks/useSound';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  metrics?: { label: string; value: string }[];
  highlights?: string[];
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { playClick } = useSound();

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playClick(600, 0.03, 'sine');
            onClose();
          }}
          className="fixed inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl max-h-[85vh] bg-card border-[0.5px] border-border/80 rounded-xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b-[0.5px] border-border/60 bg-muted/30">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-primary/10 border-[0.5px] border-primary/20 flex items-center justify-center text-primary shrink-0">
                <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-mono text-primary font-semibold uppercase tracking-wider block truncate">
                  {project.category}
                </span>
                <h3 className="text-sm sm:text-base font-serif-display font-medium text-foreground truncate">
                  {project.title}
                </h3>
              </div>
            </div>

            <button
              onClick={() => {
                playClick(600, 0.03, 'sine');
                onClose();
              }}
              className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0 ml-2"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6 thin-scrollbar">
            {/* Overview */}
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5 sm:mb-2">Architectural Summary</h4>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Key Metrics Grid if present */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {project.metrics.map((m, i) => (
                  <div key={i} className="p-2.5 sm:p-3 rounded bg-muted/20 border-[0.5px] border-border/40 font-mono">
                    <span className="text-[8px] sm:text-[9px] text-muted-foreground uppercase block mb-0.5 sm:mb-1 truncate">{m.label}</span>
                    <span className="text-xs sm:text-sm font-semibold text-primary block truncate">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Engineering Highlights</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Tags */}
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Technologies & Frameworks</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-background/60 border-[0.5px] border-border/60 text-[10px] sm:text-xs font-mono text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t-[0.5px] border-border/60 bg-muted/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto justify-stretch sm:justify-start">
              {project.githubUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-8 text-xs font-mono gap-1.5 border-border/80 hover:border-primary/40 flex-1 sm:flex-initial"
                  onClick={() => playClick(800, 0.04, 'sine')}
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-3.5 h-3.5" />
                    <span>Repository</span>
                  </a>
                </Button>
              )}

              {project.liveUrl && (
                <Button
                  variant="default"
                  size="sm"
                  asChild
                  className="h-8 text-xs font-mono gap-1.5 flex-1 sm:flex-initial"
                  onClick={() => playClick(800, 0.04, 'sine')}
                >
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                </Button>
              )}
            </div>

            {project.caseStudyUrl && (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-8 text-xs font-mono text-primary hover:text-primary hover:bg-primary/10 gap-1 w-full sm:w-auto justify-center"
                onClick={() => playClick(800, 0.04, 'sine')}
              >
                <a href={project.caseStudyUrl}>
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Case Study →</span>
                </a>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
