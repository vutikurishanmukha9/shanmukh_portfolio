import React from 'react';
import { cn } from '@/lib/utils';

interface ScrollVelocitySkewProps extends React.HTMLAttributes<HTMLDivElement> {
  maxSkew?: number;
}

export const ScrollVelocitySkew: React.FC<ScrollVelocitySkewProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};

