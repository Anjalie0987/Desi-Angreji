import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brand text-white hover:bg-brand-hover",
        secondary: "border-transparent bg-gray-100 text-foreground hover:bg-gray-200",
        breaking: "border-transparent bg-yellow text-foreground hover:bg-yellow/90 animate-pulse",
        destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "text-foreground",
        cyan: "border-transparent bg-cyan text-white hover:bg-cyan-hover",
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
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
