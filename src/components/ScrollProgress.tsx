import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

export const ScrollProgress = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { playClick } = useSound();

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
    playClick(900, 0.04, 'sine');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[100] pointer-events-none bg-border/20">
        <motion.div
          className="h-full bg-gradient-to-r from-primary/80 via-primary to-primary/90 shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]"
          style={{ width: `${scrollPercent}%` }}
          transition={{ ease: 'linear', duration: 0.1 }}
        />
      </div>

      {/* Floating Back-to-Top Telemetry Pill */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-40 pointer-events-auto"
          >
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/95 border-[0.5px] border-border/80 shadow-md backdrop-blur-md hover:border-primary/40 hover:bg-card transition-all duration-200"
            >
              <span className="text-[10px] font-mono text-muted-foreground group-hover:text-foreground transition-colors tracking-tight">
                {Math.round(scrollPercent)}%
              </span>
              <div className="w-5 h-5 rounded-full bg-primary/10 border-[0.5px] border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <ArrowUp className="w-3 h-3" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
