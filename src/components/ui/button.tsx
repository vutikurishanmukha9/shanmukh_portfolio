import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  cn(
    "group/button font-sans font-medium inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl whitespace-nowrap select-none transition-all duration-150",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary aria-invalid:border-destructive",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  ),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs active:scale-[0.98]",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-xs active:scale-[0.98]",
        outline:
          "border border-border bg-card text-foreground hover:bg-muted hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs active:scale-[0.98]",
        ghost:
          "bg-transparent text-foreground hover:bg-muted active:scale-[0.98]",
        link: "bg-transparent text-primary underline-offset-4 hover:underline",
        glass:
          "border border-border/80 bg-card/80 backdrop-blur-md text-foreground hover:bg-card shadow-xs active:scale-[0.98]",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm",
        xs: "h-7 px-2.5 py-0.5 text-xs rounded-lg",
        sm: "h-8 px-3 py-1 text-xs rounded-lg",
        lg: "h-11 px-6 py-2.5 text-base",
        xl: "h-12 px-8 py-3 text-base",
        icon: "h-9 w-9 p-2",
        "icon-xs": "h-7 w-7 p-1 rounded-lg",
        "icon-sm": "h-8 w-8 p-1.5 rounded-lg",
        "icon-lg": "h-11 w-11 p-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
