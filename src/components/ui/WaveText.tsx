import { useState, useCallback, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
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
  jumpHeight = -20,
  staggerDuration = 0.04,
  onHoverStart,
}: WaveTextProps) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const isAnimatingRef = useRef(false);
  const controls = useAnimationControls();

  const triggerWave = useCallback(async () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    onHoverStart?.();

    await controls.start((i: number) => ({
      y: [0, jumpHeight, 3, -1, 0],
      scale: [1, 1.08, 0.98, 1],
      rotate: [0, (i % 2 === 0 ? -2.5 : 2.5), 0],
      transition: {
        duration: 0.55,
        delay: i * staggerDuration,
        ease: [0.22, 1, 0.36, 1], // Smooth elastic spring curve
      },
    }));

    isAnimatingRef.current = false;
  }, [controls, jumpHeight, staggerDuration, onHoverStart]);

  const letters = Array.from(text);

  return (
    <span
      onMouseEnter={triggerWave}
      className={cn(
        'inline-flex items-baseline cursor-pointer select-none py-1 group overflow-visible',
        className,
        wordClassName
      )}
    >
      {letters.map((char, index) => {
        if (char === ' ') {
          return <span key={index} className="inline-block">&nbsp;</span>;
        }

        const isDirectlyHovered = hoveredIdx === index;

        return (
          <motion.span
            key={index}
            custom={index}
            animate={controls}
            initial={{ y: 0, scale: 1, rotate: 0 }}
            whileHover={{
              y: jumpHeight * 1.15,
              scale: 1.14,
              rotate: index % 2 === 0 ? -3 : 3,
              transition: { type: 'spring', stiffness: 450, damping: 18 },
            }}
            onMouseEnter={() => setHoveredIdx(index)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={cn(
              'inline-block origin-bottom transition-colors duration-200 transform-gpu will-change-transform',
              isDirectlyHovered && 'text-primary',
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
