import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/60 border-[0.5px] border-border/40", className)}
      {...props}
    />
  );
}

export { Skeleton };
