import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, ExternalLink, CheckCircle2, Award, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSound } from '@/hooks/useSound';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const { playClick } = useSound();

  if (!isOpen) return null;

  const handleDownload = () => {
    playClick(900, 0.04, 'sine');
    // Open resume or trigger download
    window.open('mailto:vutikurishanmukh17@gmail.com?subject=Resume%20Request', '_blank');
  };

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
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl max-h-[85vh] bg-card border-[0.5px] border-border/80 rounded-xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b-[0.5px] border-border/60 bg-muted/30">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-primary/10 border-[0.5px] border-primary/20 flex items-center justify-center text-primary shrink-0">
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-serif-display font-medium text-foreground truncate">
                  Executive Technical Profile
                </h3>
                <p className="text-[9px] sm:text-[10px] font-mono text-muted-foreground truncate">VUTIKURI_SHANMUKHA_CV.PDF</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="h-7 sm:h-8 text-[10px] sm:text-xs font-mono gap-1 sm:gap-1.5 border-primary/30 text-primary hover:bg-primary/10 px-2 sm:px-3"
              >
                <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden xs:inline">Request PDF</span>
                <span className="xs:hidden">PDF</span>
              </Button>
              <button
                type="button"
                onClick={() => {
                  playClick(600, 0.03, 'sine');
                  onClose();
                }}
                className="p-1 sm:p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6 thin-scrollbar">
            {/* Header Info */}
            <div className="border-b-[0.5px] border-border/40 pb-4 sm:pb-5">
              <h2 className="text-xl sm:text-2xl font-serif-display font-medium text-foreground mb-1">Vutikuri Shanmukha</h2>
              <p className="text-[10px] sm:text-xs font-mono text-primary font-semibold tracking-wide uppercase mb-2">
                Software Engineer • AI/ML Specialist • Cloud Architect
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                B.Tech in Electronics & Communication Engineering specializing in AI integrations, AWS cloud telemetry, vector databases (FAISS, RAG), and production-grade fullstack systems.
              </p>
            </div>

            {/* Core Competencies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-3 sm:p-3.5 rounded bg-muted/20 border-[0.5px] border-border/50">
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2 text-foreground font-semibold text-xs">
                  <Briefcase className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Engineering</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-relaxed">
                  Python, SQL, System Design, Data Structures, FastAPI, React 18, TypeScript, Docker, CI/CD.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded bg-muted/20 border-[0.5px] border-border/50">
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2 text-foreground font-semibold text-xs">
                  <Award className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>AI & Data</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-relaxed">
                  PySpark, Scikit-learn, RAG Architecture, FAISS Vector Search, Pandas, NumPy, NLP, Computer Vision.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded bg-muted/20 border-[0.5px] border-border/50">
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2 text-foreground font-semibold text-xs">
                  <GraduationCap className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Certifications</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-relaxed">
                  AWS Certified Cloud Practitioner, Peer-Reviewed IEEE Publication Author, 10+ Shipped Projects.
                </p>
              </div>
            </div>

            {/* Highlights List */}
            <div className="space-y-2.5 sm:space-y-3">
              <h4 className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Key Technical Highlights</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Engineered <strong>ContextLy</strong>: Published open-source Python CLI package on PyPI for automated LLM codebase context bundling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Author of IEEE peer-reviewed publication on intelligent IoT & ML signal processing systems.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Architected production end-to-end analytical dashboards for Adidas US Retail and Global Unicorn Valuation Datasets.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="px-4 sm:px-6 py-3 border-t-[0.5px] border-border/60 bg-muted/20 flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-0 text-[9px] sm:text-[10px] font-mono text-muted-foreground text-center sm:text-left">
            <span>Direct Email: vutikurishanmukh17@gmail.com</span>
            <a
              href="https://linkedin.com/in/shanmukha-vutikuri"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              <span>LinkedIn Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
