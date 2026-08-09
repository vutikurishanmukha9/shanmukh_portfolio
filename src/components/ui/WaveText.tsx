import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WaveTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  letterClassName?: string;
  jumpHeight?: number;
  staggerDuration?: number;
  onHoverStart?: () => void;
}

export const WaveText = ({
  text,
  className,
  wordClassName,
  letterClassName,
  jumpHeight = -18,
  staggerDuration = 0.045,
  onHoverStart,
}: WaveTextProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [waveKey, setWaveKey] = useState(0);
  const isAnimatingRef = useRef(false);

  const triggerWave = useCallback(() => {
    setWaveKey((k) => k + 1);
    setIsHovered(true);
    isAnimatingRef.current = true;
    onHoverStart?.();

    // Reset hover animation lock after wave completes
    const totalDuration = (text.length * staggerDuration + 0.45) * 1000;
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, totalDuration);
  }, [text.length, staggerDuration, onHoverStart]);

  const handleMouseEnter = useCallback(() => {
    triggerWave();
  }, [triggerWave]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const letters = Array.from(text);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn('inline-block cursor-default select-none py-1 group', className, wordClassName)}
    >
      {letters.map((char, index) => {
        if (char === ' ') {
          return <span key={index} className="inline-block">&nbsp;</span>;
        }

        return (
          <motion.span
            key={`${waveKey}-${index}`}
            initial={{ y: 0, scale: 1 }}
            animate={
              isHovered
                ? {
                    y: [0, jumpHeight, 2, 0],
                    scale: [1, 1.08, 0.98, 1],
                  }
                : { y: 0, scale: 1 }
            }
            transition={{
              duration: 0.45,
              delay: index * staggerDuration,
              ease: [0.25, 1.1, 0.4, 1], // Fluid spring arc
            }}
            whileHover={{
              y: jumpHeight * 1.3,
              scale: 1.15,
              transition: { duration: 0.18, ease: 'easeOut' },
            }}
            className={cn(
              'inline-block origin-bottom transition-colors duration-200 will-change-transform',
              letterClassName
            )}
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
};
