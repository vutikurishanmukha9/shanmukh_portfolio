import React, { useRef, useCallback, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Distance multiplier
  strengthY?: number; // Optional vertical multiplier (defaults to strength)
  radius?: number; // Proximity attraction radius in pixels
}

const springConfig = { damping: 14, stiffness: 160, mass: 0.1 };

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  className,
  strength = 0.4,
  strengthY = 0.45,
  radius = 140,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const smoothX = useSpring(0, springConfig);
  const smoothY = useSpring(0, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < radius) {
        // Apply magnetic gravity pull in all directions (left, right, up, down)
        smoothX.set(deltaX * strength);
        smoothY.set(deltaY * (strengthY || strength));
      } else {
        smoothX.set(0);
        smoothY.set(0);
      }
    },
    [radius, strength, strengthY, smoothX, smoothY]
  );

  const handleMouseLeave = useCallback(() => {
    smoothX.set(0);
    smoothY.set(0);
  }, [smoothX, smoothY]);

  useEffect(() => {
    // Listen to window mousemove for true magnetic proximity attraction even before entering button boundaries
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
      className={cn('inline-block relative', className)}
    >
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
