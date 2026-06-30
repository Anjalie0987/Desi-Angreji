import * as React from "react";
import { cn } from "@/lib/utils";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export type SectionProps = React.HTMLAttributes<HTMLElement>;

export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn("py-8 md:py-12 lg:py-16", className)}
      {...props}
    >
      {children}
    </section>
  );
}
