import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

export const ScrollProgress: React.FC = () => {
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
      <div className="fixed top-0 left-0 right-0 h-[4px] z-[100] pointer-events-none bg-muted/60 border-b border-black/30">
        <motion.div
          className="h-full bg-primary border-r-2 border-black"
          style={{ width: `${scrollPercent}%` }}
          transition={{ ease: 'linear', duration: 0.1 }}
        />
      </div>

      {/* Floating Back-to-Top Telemetry Pill */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 pointer-events-auto pb-safe pr-safe"
          >
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="group flex items-center gap-2 px-3 py-1.5 border-2 border-black bg-card hover:bg-primary text-black shadow-[4px_4px_0px_#000] rounded-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer font-head font-bold text-xs uppercase"
            >
              <span className="font-mono text-[11px] font-bold">
                {Math.round(scrollPercent)}%
              </span>
              <div className="w-5 h-5 border border-black bg-white flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
