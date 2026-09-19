import React from 'react';
import { cn } from '@/lib/utils';

interface TextScrambleProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  speed?: number;
  chars?: string;
  as?: React.ElementType;
}

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  className,
  as: Component = 'span',
}) => {
  return (
    <Component className={cn('inline-block font-inherit cursor-default select-none', className)}>
      {text}
    </Component>
  );
};

