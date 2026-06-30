import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand text-white hover:bg-brand-hover shadow-sm",
        secondary: "bg-yellow text-foreground hover:bg-yellow/90 shadow-sm",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
        outline: "border border-muted bg-background hover:bg-gray-50 text-foreground",
        ghost: "hover:bg-gray-100 text-foreground",
        link: "text-brand underline-offset-4 hover:underline",
        cyan: "bg-cyan text-white hover:bg-cyan-hover shadow-sm",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
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
    // We aren't using Radix Slot here to keep dependencies low, unless requested.
    // So we'll stick to a standard button if asChild is false.
    const Comp = asChild ? "span" : "button"; // Very simplified asChild
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as React.Ref<HTMLButtonElement & HTMLSpanElement>}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
