import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Precision dot follows cursor tightly
  const dotX = useSpring(cursorX, { damping: 38, stiffness: 500, mass: 0.04 });
  const dotY = useSpring(cursorY, { damping: 38, stiffness: 500, mass: 0.04 });

  // Trailing ring follows with soft spring physics
  const ringX = useSpring(cursorX, { damping: 24, stiffness: 220, mass: 0.08 });
  const ringY = useSpring(cursorY, { damping: 24, stiffness: 220, mass: 0.08 });

  // Compute speed for dynamic stretch ribbon
  const [angle, setAngle] = useState(0);
  const [speedScale, setSpeedScale] = useState(1);
  const lastPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktops/laptops)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 1.5) {
        const theta = Math.atan2(dy, dx) * (180 / Math.PI);
        setAngle(theta);
        const stretch = Math.min(1 + dist / 25, 2.2);
        setSpeedScale(stretch);
      }

      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const settleLoop = () => {
      setSpeedScale((prev) => {
        if (prev <= 1.01) return 1;
        return prev + (1 - prev) * 0.15;
      });
      animationFrameId = requestAnimationFrame(settleLoop);
    };
    animationFrameId = requestAnimationFrame(settleLoop);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkHoverables = (e: MouseEvent) => {
      const target = e.target instanceof HTMLElement ? e.target : null;
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
      cancelAnimationFrame(animationFrameId);
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
      {/* Elastic Trailing Velocity Ribbon Ring */}
      <motion.div
        className="fixed top-0 left-0 w-7 h-7 rounded-full border-[1.2px] border-primary/50 pointer-events-none transform-gpu"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          rotate: `${angle}deg`,
          scaleX: isHovered ? 1 : speedScale,
          scaleY: isHovered ? 1 : 1 / Math.max(speedScale * 0.8, 1),
        }}
        animate={{
          scale: isHovered ? 1.57 : isClicking ? 0.71 : 1,
          backgroundColor: isHovered ? 'rgba(204, 120, 92, 0.08)' : 'transparent',
          borderColor: isHovered ? 'rgba(204, 120, 92, 0.7)' : 'rgba(204, 120, 92, 0.35)',
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 320, mass: 0.08 }}
      />

      {/* Precision Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-primary pointer-events-none transform-gpu"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.2 : isClicking ? 0.6 : 1,
          opacity: isHovered ? 0.9 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 420 }}
      />
    </div>
  );
};
