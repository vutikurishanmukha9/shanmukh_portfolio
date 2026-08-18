import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useSound } from '@/hooks/useSound';

interface TextScrambleProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  speed?: number;
  chars?: string;
  as?: React.ElementType;
}

const DEFAULT_CHARS = '0123456789ABCDEFΣΔΨ⏣#*+~/_';

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  className,
  triggerOnHover = true,
  speed = 30,
  chars = DEFAULT_CHARS,
  as: Component = 'span',
}) => {
  const [displayText, setDisplayText] = useState(text);
  const isScramblingRef = useRef(false);
  const intervalRef = useRef<number | null>(null);
  const { playClick } = useSound();

  const scramble = useCallback(() => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;
    playClick(1200, 0.015, 'sine');

    let iteration = 0;
    const maxIterations = text.length * 2;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 2) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration += 1;

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        isScramblingRef.current = false;
      }
    }, speed);
  }, [text, speed, chars, playClick]);

  useEffect(() => {
    setDisplayText(text);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <Component
      onMouseEnter={triggerOnHover ? scramble : undefined}
      className={cn('inline-block font-inherit cursor-default select-none', className)}
    >
      {displayText}
    </Component>
  );
};
