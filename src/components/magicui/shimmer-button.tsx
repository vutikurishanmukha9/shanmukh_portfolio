import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = "rgba(255, 255, 255, 0.45)",
      shimmerSize = "0.06em",
      shimmerDuration = "3s",
      borderRadius = "9999px",
      background,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        style={
          {
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--shimmer-color": shimmerColor,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-[var(--radius)] px-5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 ease-out active:scale-[0.98] shadow-sm select-none",
          "bg-foreground text-background hover:opacity-95",
          className
        )}
        {...props}
      >
        {/* Shimmer Rotating Sweep */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 overflow-hidden rounded-[inherit] pointer-events-none"
        >
          <div
            className="absolute -inset-full animate-[spin_4s_linear_infinite] opacity-60 group-hover:opacity-100 transition-opacity"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, var(--shimmer-color) 60deg, transparent 120deg)`,
            }}
          />
        </div>

        {/* Inner Solid Backdrop creating the crisp 1px border shimmer */}
        <div
          aria-hidden="true"
          className="absolute inset-[1px] -z-10 rounded-[inherit] bg-foreground transition-colors"
        />

        {children}
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";

