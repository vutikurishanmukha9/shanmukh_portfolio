import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs font-mono uppercase tracking-wider select-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)] hover:bg-foreground/90 active:scale-[0.97]",
        primary: "bg-primary text-primary-foreground shadow-[0_1px_2px_rgba(204,120,92,0.15),0_4px_12px_rgba(204,120,92,0.12)] hover:bg-primary/90 active:scale-[0.97]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm active:scale-[0.97]",
        outline: "border-[0.5px] border-border/80 bg-background/60 backdrop-blur-md text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:bg-muted/80 hover:border-foreground/20 active:scale-[0.97]",
        secondary: "bg-muted/70 backdrop-blur-md text-foreground border-[0.5px] border-border/60 hover:bg-muted active:scale-[0.97]",
        ghost: "hover:bg-muted/70 text-muted-foreground hover:text-foreground active:scale-[0.96]",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "bg-card/40 backdrop-blur-xl border-[0.5px] border-border/80 text-foreground shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:bg-card/70 hover:border-foreground/25 active:scale-[0.97]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-full px-3.5 text-[10px]",
        lg: "h-11 rounded-full px-6 text-xs",
        xl: "h-12 rounded-full px-8 text-sm",
        icon: "h-9 w-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button };
