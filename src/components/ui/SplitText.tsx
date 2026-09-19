import React from 'react';
import { cn } from '@/lib/utils';

export interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  letterClassName?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  initial?: any;
  animate?: any;
  transition?: any;
  threshold?: number;
  rootMargin?: any;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  onLetterAnimationComplete?: () => void;
  triggerOnHover?: boolean;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className,
  textAlign = 'left',
}) => {
  return (
    <span
      style={{ textAlign }}
      className={cn('inline-block', className)}
    >
      {text}
    </span>
  );
};
