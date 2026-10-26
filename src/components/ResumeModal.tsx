import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, ExternalLink, CheckCircle2, Award, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    window.open('mailto:vutikurishanmukh17@gmail.com?subject=Resume%20Request%20-%20Shanmukh%20Vutikuri', '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl max-h-[85vh] p-1.5 rounded-[1.375rem] border border-border/80 bg-muted/20 shadow-2xl flex flex-col z-10"
        >
          <div className="w-full h-full bg-card border border-border/70 rounded-2xl overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl border border-border bg-card flex items-center justify-center text-primary shrink-0 shadow-xs">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-head font-semibold text-foreground truncate">
                  Technical Profile & Curriculum Vitae
                </h3>
                <p className="text-xs font-mono text-muted-foreground truncate">Shanmukh_Vutikuri_CV.pdf</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleDownload}
                className="group/btn h-8 text-xs font-mono inline-flex items-center gap-2 pl-3 pr-1.5 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-xs transition-all cursor-pointer"
              >
                <span>Request PDF</span>
                <span className="w-5 h-5 rounded-full bg-black/15 dark:bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover/btn:translate-y-0.5 shrink-0">
                  <Download className="w-3 h-3" />
                </span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer shadow-xs"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Header Info */}
            <div className="border-b border-border pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h2 className="text-2xl font-head font-bold text-foreground">
                  Shanmukh Vutikuri
                </h2>
                <span className="px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-medium">
                  Available for Hire
                </span>
              </div>
              <p className="text-xs font-mono text-primary font-medium mb-3">
                AI Systems Engineer • Backend Architect • Cloud Practitioner
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                B.Tech in Electronics & Communication Engineering specializing in production RAG systems, asynchronous task queues (Celery/Redis), vector retrieval (FAISS), and high-throughput cloud microservices on AWS.
              </p>
            </div>

            {/* Core Competencies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-border bg-muted/30">
                <div className="flex items-center gap-2 mb-2 text-foreground font-head font-semibold text-xs">
                  <Briefcase className="w-4 h-4 text-primary shrink-0" />
                  <span>Engineering</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                  Python, FastAPI, TypeScript, React, PostgreSQL, Docker, Redis, Celery, CI/CD.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border bg-muted/30">
                <div className="flex items-center gap-2 mb-2 text-foreground font-head font-semibold text-xs">
                  <Award className="w-4 h-4 text-primary shrink-0" />
                  <span>AI & Data</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                  Hybrid RAG, FAISS Vector Search, PySpark, Scikit-learn, Pandas, Data Intelligence.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border bg-muted/30">
                <div className="flex items-center gap-2 mb-2 text-foreground font-head font-semibold text-xs">
                  <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                  <span>Credentials</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                  AWS Certified Cloud Practitioner, Peer-Reviewed IEEE Author, 10+ Shipped Products.
                </p>
              </div>
            </div>

            {/* Highlights List */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
                Verified Technical Highlights
              </h4>
              <ul className="space-y-2 text-sm text-foreground font-sans">
                <li className="flex items-start gap-2.5 p-3 rounded-xl border border-border bg-card">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>HeartOut:</strong> Anonymous emotional expression platform with 541+ automated unit and integration tests and automated CI/CD deployment.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl border border-border bg-card">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>GetReport:</strong> Hybrid RAG document intelligence engine combining dense vector retrieval with keyword ranking, Celery task workers, and AWS S3 artifact staging.</span>
                </li>
                <li className="flex items-start justify-between gap-2.5 p-3 rounded-xl border border-border bg-card">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>IEEE Published Researcher:</strong> First author on intelligent IoT and ML signal telemetry architecture published at IEEE EAIC 2025 (NIT Jalandhar).</span>
                  </div>
                  <a
                    href="https://ieeexplore.ieee.org/document/11101373"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                    title="View IEEE Xplore Publication"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3.5 border-t border-border bg-muted/30 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-mono text-muted-foreground">
            <span>Direct: vutikurishanmukh17@gmail.com</span>
            <a
              href="https://linkedin.com/in/shanmukha-vutikuri"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
            >
              <span>LinkedIn Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
