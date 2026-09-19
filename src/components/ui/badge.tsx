import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex h-auto w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-none border-2 border-black px-2.5 py-0.5 text-xs font-head font-medium uppercase tracking-wide whitespace-nowrap shadow-xs transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-neutral-800",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "bg-card text-foreground hover:bg-muted",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-hover",
        accent:
          "bg-accent text-accent-foreground hover:bg-primary/50",
        emerald:
          "bg-emerald-400 text-black hover:bg-emerald-300",
        ghost:
          "border-transparent bg-transparent shadow-none hover:border-black hover:bg-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

