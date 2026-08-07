import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Precision dot follows cursor tightly
  const dotX = useSpring(cursorX, { damping: 40, stiffness: 450, mass: 0.05 });
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 450, mass: 0.05 });

  // Trailing ring follows with soft spring physics
  const ringX = useSpring(cursorX, { damping: 25, stiffness: 200, mass: 0.1 });
  const ringY = useSpring(cursorY, { damping: 25, stiffness: 200, mass: 0.1 });

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktops/laptops)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkHoverables = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = Boolean(
        target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, .hover-lift-minimal')
      );
      setIsHovered(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', checkHoverables);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', checkHoverables);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Outer Spring Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border-[1.5px] border-primary/50 pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 44 : isClicking ? 22 : 30,
          height: isHovered ? 44 : isClicking ? 22 : 30,
          backgroundColor: isHovered ? 'rgba(204, 120, 92, 0.08)' : 'transparent',
          borderColor: isHovered ? 'rgba(204, 120, 92, 0.7)' : 'rgba(204, 120, 92, 0.35)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.1 }}
      />

      {/* Precision Center Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-primary pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 6 : isClicking ? 3 : 5,
          height: isHovered ? 6 : isClicking ? 3 : 5,
          opacity: isHovered ? 0.9 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
      />
    </div>
  );
};
