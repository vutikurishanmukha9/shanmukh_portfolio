import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, type MarginType, type TargetAndTransition, type Transition } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  letterClassName?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  transition?: Transition;
  threshold?: number;
  rootMargin?: MarginType;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  onLetterAnimationComplete?: () => void;
  triggerOnHover?: boolean;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className,
  wordClassName,
  letterClassName,
  delay = 0,
  duration = 0.6,
  stagger = 0.035,
  initial = { opacity: 0, y: 40, rotateX: -45 },
  animate = { opacity: 1, y: 0, rotateX: 0 },
  transition = { ease: [0.16, 1, 0.3, 1] },
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'left',
  onLetterAnimationComplete,
  triggerOnHover = false,
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: threshold,
    margin: rootMargin,
  });

  const [isHovered, setIsHovered] = useState(false);
  const words = text.split(' ');

  let letterCount = 0;

  return (
    <p
      ref={containerRef}
      onMouseEnter={triggerOnHover ? () => setIsHovered(true) : undefined}
      onMouseLeave={triggerOnHover ? () => setIsHovered(false) : undefined}
      style={{ textAlign, perspective: 1000 }}
      className={cn('inline-block overflow-hidden select-none', className)}
    >
      {words.map((word, wordIndex) => {
        const letters = Array.from(word);
        return (
          <span
            key={wordIndex}
            className={cn('inline-block whitespace-nowrap overflow-visible', wordClassName)}
          >
            {letters.map((char, charIndex) => {
              const currentLetterIdx = letterCount++;
              return (
                <motion.span
                  key={charIndex}
                  initial={initial}
                  animate={
                    isInView || isHovered
                      ? {
                          ...animate,
                          transition: {
                            ...transition,
                            duration,
                            delay: delay + currentLetterIdx * stagger,
                          },
                        }
                      : initial
                  }
                  onAnimationComplete={
                    currentLetterIdx === text.replace(/\s/g, '').length - 1
                      ? onLetterAnimationComplete
                      : undefined
                  }
                  className={cn(
                    'inline-block origin-bottom transform-gpu will-change-transform',
                    letterClassName
                  )}
                >
                  {char}
                </motion.span>
              );
            })}
            <span className="inline-block">&nbsp;</span>
          </span>
        );
      })}
    </p>
  );
};
