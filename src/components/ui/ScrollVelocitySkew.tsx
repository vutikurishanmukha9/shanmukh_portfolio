import React, { useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollVelocitySkewProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxSkew?: number;
}

export const ScrollVelocitySkew: React.FC<ScrollVelocitySkewProps> = ({
  children,
  className,
  maxSkew = 1.6,
  ...props
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 30,
    stiffness: 250,
  });

  const skewY = useTransform(smoothVelocity, [-1500, 1500], [-maxSkew, maxSkew]);

  return (
    <motion.div
      ref={targetRef}
      style={{ skewY }}
      className={cn('will-change-transform transform-gpu', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
