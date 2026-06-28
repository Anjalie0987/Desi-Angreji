import * as React from "react";
import { cn } from "@/lib/utils";

export function H1({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight font-heading lg:text-5xl", className)}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight font-heading first:mt-0", className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("scroll-m-20 text-2xl font-semibold tracking-tight font-heading", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function H4({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn("scroll-m-20 text-xl font-semibold tracking-tight font-heading", className)}
      {...props}
    >
      {children}
    </h4>
  );
}

export function P({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function Blockquote({ className, children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 border-brand pl-6 italic text-muted", className)}
      {...props}
    >
      {children}
    </blockquote>
  );
}

export function Large({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-lg font-semibold text-foreground font-heading", className)} {...props}>
      {children}
    </div>
  );
}

export function Small({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <small className={cn("text-sm font-medium leading-none", className)} {...props}>
      {children}
    </small>
  );
}

export function Muted({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted", className)} {...props}>
      {children}
    </p>
  );
}
