import React, { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

export interface SpotlightBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string;
  spotlightRadius?: number;
  borderWidth?: number;
  children: React.ReactNode;
}

export const SpotlightBorderCard: React.FC<SpotlightBorderCardProps> = ({
  children,
  className,
  spotlightColor = 'rgba(204, 120, 92, 0.45)',
  spotlightRadius = 140,
  borderWidth = 1,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition(null);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn('relative rounded-lg overflow-hidden p-[1px] transition-all duration-300', className)}
      style={{
        padding: `${borderWidth}px`,
      }}
      {...props}
    >
      {/* Background base border */}
      <div className="absolute inset-0 rounded-[inherit] bg-border/70 -z-20 pointer-events-none" />

      {/* Dynamic Cursor Spotlight Border Glow */}
      {isHovered && position && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 -z-10"
          style={{
            background: `radial-gradient(${spotlightRadius}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
          }}
        />
      )}

      {/* Card Inner Content Body */}
      <div className="relative w-full h-full rounded-[calc(0.5rem-1px)] bg-card/75 backdrop-blur-md z-10 flex flex-col justify-between overflow-hidden">
        {/* Apple / VisionOS Specular Top Highlight Ray */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 dark:via-white/18 to-transparent transition-opacity duration-500 group-hover:via-primary/70 group-hover:h-[1.5px] z-20" />
        {children}
      </div>
    </div>
  );
};
