import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSound } from '@/hooks/useSound';

interface AudioVisualizerProps {
  className?: string;
  bars?: number;
}

export const AudioVisualizer = ({ className, bars = 5 }: AudioVisualizerProps) => {
  const { isMuted } = useSound();

  return (
    <div
      className={cn('flex items-center gap-[2px] h-3 px-1 select-none pointer-events-none', className)}
      aria-hidden="true"
    >
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          animate={
            isMuted
              ? { height: 2, opacity: 0.3 }
              : {
                  height: [2, 10, 4, 12, 3, 8, 2][i % 7],
                  opacity: [0.6, 1, 0.7, 1, 0.5][i % 5],
                }
          }
          transition={
            isMuted
              ? { duration: 0.3 }
              : {
                  duration: 0.75 + (i * 0.12),
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                }
          }
          className={cn(
            'w-[2px] rounded-full transition-colors',
            isMuted ? 'bg-muted-foreground' : 'bg-primary'
          )}
        />
      ))}
    </div>
  );
};
