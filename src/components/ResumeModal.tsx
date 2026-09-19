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
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl max-h-[85vh] bg-card border-2 border-black shadow-[8px_8px_0px_#000] rounded-none overflow-hidden flex flex-col z-10"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b-2 border-black bg-primary text-black">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 border-2 border-black bg-white flex items-center justify-center text-black font-bold shrink-0 shadow-none">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-head font-bold uppercase text-black truncate">
                  Executive Technical Profile
                </h3>
                <p className="text-[10px] font-mono font-bold text-black/80 truncate">VUTIKURI_SHANMUKHA_CV.PDF</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="default"
                size="sm"
                onClick={handleDownload}
                className="h-8 text-xs font-head font-bold uppercase gap-1.5 border-2 border-black bg-white text-black hover:bg-card shadow-xs active:translate-x-0.5 active:translate-y-0.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Request PDF</span>
                <span className="xs:hidden">PDF</span>
              </Button>
              <button
                type="button"
                onClick={() => {
                  playClick(600, 0.03, 'sine');
                  onClose();
                }}
                className="p-1.5 border-2 border-black bg-card hover:bg-destructive hover:text-white text-black transition-colors cursor-pointer shadow-xs active:translate-x-0.5 active:translate-y-0.5"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6 thin-scrollbar">
            {/* Header Info */}
            <div className="border-b-2 border-black pb-4 sm:pb-5">
              <h2 className="text-2xl sm:text-3xl font-head font-bold uppercase text-foreground mb-2">
                Vutikuri Shanmukha
              </h2>
              <div className="inline-block px-2.5 py-1 border-2 border-black bg-primary font-head text-[11px] font-bold text-black uppercase tracking-wide mb-3 shadow-xs">
                Software Engineer • AI/ML Specialist • Cloud Architect
              </div>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed max-w-2xl font-sans">
                B.Tech in Electronics & Communication Engineering specializing in AI integrations, AWS cloud telemetry, vector databases (FAISS, RAG), and production-grade fullstack systems.
              </p>
            </div>

            {/* Core Competencies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-3.5 border-2 border-black bg-card shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-foreground font-head font-bold text-xs uppercase">
                  <Briefcase className="w-4 h-4 text-black shrink-0" />
                  <span>Engineering</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                  Python, SQL, System Design, Data Structures, FastAPI, React 18, TypeScript, Docker, CI/CD.
                </p>
              </div>

              <div className="p-3.5 border-2 border-black bg-card shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-foreground font-head font-bold text-xs uppercase">
                  <Award className="w-4 h-4 text-black shrink-0" />
                  <span>AI & Data</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                  PySpark, Scikit-learn, RAG Architecture, FAISS Vector Search, Pandas, NumPy, NLP, Computer Vision.
                </p>
              </div>

              <div className="p-3.5 border-2 border-black bg-card shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-foreground font-head font-bold text-xs uppercase">
                  <GraduationCap className="w-4 h-4 text-black shrink-0" />
                  <span>Credentials</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                  AWS Certified Cloud Practitioner, Peer-Reviewed IEEE Publication Author, 10+ Shipped Projects.
                </p>
              </div>
            </div>

            {/* Highlights List */}
            <div className="space-y-3">
              <h4 className="text-xs font-head font-bold uppercase tracking-wider text-foreground">
                KEY TECHNICAL ACHIEVEMENTS
              </h4>
              <ul className="space-y-2.5 text-xs text-foreground font-sans">
                <li className="flex items-start gap-2.5 p-2.5 border border-black bg-muted/40 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>Engineered <strong>ContextLy</strong>: Published open-source Python CLI package on PyPI for automated LLM codebase context bundling.</span>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 border border-black bg-muted/40 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>Author of <strong>IEEE peer-reviewed publication</strong> on intelligent IoT & ML signal processing telemetry systems.</span>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 border border-black bg-muted/40 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>Architected production end-to-end analytical dashboards for Adidas US Retail and Global Unicorn Valuation Datasets.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="px-4 sm:px-6 py-3 border-t-2 border-black bg-muted flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-mono font-bold text-foreground text-center sm:text-left">
            <span>DIRECT: vutikurishanmukh17@gmail.com</span>
            <a
              href="https://linkedin.com/in/shanmukha-vutikuri"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black bg-primary px-2 py-0.5 border border-black hover:underline inline-flex items-center gap-1 shadow-xs"
            >
              <span>LINKEDIN PROFILE</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
