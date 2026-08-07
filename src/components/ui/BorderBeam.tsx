import React from 'react';
import { cn } from '@/lib/utils';

interface BorderBeamProps {
  className?: string;
  duration?: number;
  borderWidth?: number;
  borderRadius?: number;
  color?: string;
  variant?: 'dark' | 'primary' | 'gradient';
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className,
  duration = 3,
  borderWidth = 1.2,
  borderRadius = 8,
  variant = 'dark',
}) => {
  const gradientId = React.useId();

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20',
        className
      )}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            {variant === 'primary' ? (
              <>
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              </>
            ) : variant === 'gradient' ? (
              <>
                <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.95" />
                <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.1" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.9" />
                <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.15" />
              </>
            )}
          </linearGradient>
        </defs>
        <rect
          x={borderWidth / 2}
          y={borderWidth / 2}
          width={`calc(100% - ${borderWidth}px)`}
          height={`calc(100% - ${borderWidth}px)`}
          rx={borderRadius}
          ry={borderRadius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={borderWidth}
          pathLength="100"
          strokeDasharray="24 76"
          className="animate-border-beam"
          style={{
            animationDuration: `${duration}s`,
          }}
        />
      </svg>
    </div>
  );
};
