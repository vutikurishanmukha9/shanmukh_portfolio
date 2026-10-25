import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollProgress: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollPercent(Math.min(100, Math.max(0, currentProgress)));
      }
      setIsVisible(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Subtle Top Reading Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none bg-border/40">
        <motion.div
          className="h-full bg-primary"
          style={{ width: `${scrollPercent}%` }}
          transition={{ ease: 'linear', duration: 0.1 }}
        />
      </div>

      {/* Floating Back-to-Top Pill */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-40 pointer-events-auto pb-safe pr-safe"
          >
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/90 backdrop-blur-md hover:bg-card text-foreground shadow-md transition-all cursor-pointer font-mono text-xs"
            >
              <span className="text-[11px] text-muted-foreground group-hover:text-foreground">
                {Math.round(scrollPercent)}%
              </span>
              <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <ArrowUp className="w-3 h-3" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
