import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Distance multiplier
  radius?: number; // Interaction radius in pixels
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  className,
  strength = 0.35,
  radius = 120,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(0, springConfig);
  const smoothY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < radius) {
      smoothX.set(distanceX * strength);
      smoothY.set(distanceY * strength);
    } else {
      smoothX.set(0);
      smoothY.set(0);
    }
  };

  const handleMouseLeave = () => {
    smoothX.set(0);
    smoothY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  );
};
