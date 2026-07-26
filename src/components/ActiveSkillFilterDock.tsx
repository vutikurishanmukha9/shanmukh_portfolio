import { useSkillFilter } from '@/context/SkillFilterContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ArrowDown } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

export const ActiveSkillFilterDock = () => {
  const { selectedSkill, setSelectedSkill } = useSkillFilter();
  const { playClick, playFilter } = useSound();

  const handleClear = () => {
    playFilter();
    setSelectedSkill(null);
  };

  const handleJumpToProjects = () => {
    playClick(750, 0.04, 'sine');
    const projectsElem = document.getElementById('projects');
    if (projectsElem) {
      projectsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {selectedSkill && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
        >
          <div className="flex items-center gap-2 p-1.5 pl-3.5 pr-2 rounded-full bg-card/95 border-[0.5px] border-primary/30 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="text-[11px] font-mono text-muted-foreground">Filter:</span>
              <span className="text-xs font-mono font-semibold text-primary px-2 py-0.5 rounded bg-primary/10 border-[0.5px] border-primary/20">
                {selectedSkill}
              </span>
            </div>

            <div className="w-[0.5px] h-4 bg-border/80 mx-1" />

            <button
              onClick={handleJumpToProjects}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-foreground hover:text-primary transition-colors"
            >
              <span>Projects</span>
              <ArrowDown className="w-3 h-3 text-primary" />
            </button>

            <button
              onClick={handleClear}
              aria-label="Clear skill filter"
              className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
