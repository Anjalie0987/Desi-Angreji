import * as React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/20", className)}
      {...props}
    />
  );
}

export function NavbarSkeleton() {
  return (
    <div className="w-full border-b bg-background py-4">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-8 lg:hidden" />
        <Skeleton className="h-8 w-40" />
        <div className="hidden lg:flex items-center gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-5 w-20" />
          ))}
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
}

export function TickerSkeleton() {
  return (
    <div className="flex items-center gap-4 bg-gray-50 border-y py-2 px-4 sm:px-6 lg:px-8 h-10 w-full overflow-hidden">
      <Skeleton className="h-6 w-24 rounded-sm shrink-0" />
      <Skeleton className="h-5 w-full flex-1" />
    </div>
  );
}

export function FooterSkeleton() {
  return (
    <div className="w-full border-t bg-gray-50 pt-16 pb-8 h-96">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="space-y-4">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
          <div className="space-y-3">
             <Skeleton className="h-6 w-32 mb-6" />
             {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-4 w-24" />)}
          </div>
          <div className="space-y-3">
             <Skeleton className="h-6 w-32 mb-6" />
             {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-4 w-24" />)}
          </div>
          <div className="space-y-3">
             <Skeleton className="h-6 w-32 mb-6" />
             <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
