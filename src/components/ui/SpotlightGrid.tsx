import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightGridProps {
  className?: string;
  dotColor?: string;
  spotlightColor?: string;
  spotlightRadius?: number;
}

export const SpotlightGrid: React.FC<SpotlightGridProps> = ({
  className,
  dotColor = 'rgba(20, 20, 19, 0.08)',
  spotlightColor = 'rgba(204, 120, 92, 0.16)',
  spotlightRadius = 160,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only track if cursor is reasonably close to container
      if (x >= -100 && x <= rect.width + 100 && y >= -100 && y <= rect.height + 100) {
        setMousePos({ x, y });
      } else {
        setMousePos(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none', className)}
      aria-hidden="true"
    >
      {/* Base Subtle Dot Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="base-spot-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill={dotColor} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#base-spot-grid)" />
      </svg>

      {/* Magnetic Spotlight Dot Layer (revealed around cursor) */}
      {mousePos && (
        <div
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          style={{
            maskImage: `radial-gradient(circle ${spotlightRadius}px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle ${spotlightRadius}px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          }}
        >
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="spotlight-active-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.6" fill={spotlightColor} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#spotlight-active-grid)" />
          </svg>
        </div>
      )}
    </div>
  );
};
