"use client";

import { Skeleton } from "./ui/skeleton";
import { cn } from "../lib/utils";

type ContentLoaderProps = {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: 'card' | 'text' | 'media';
};

export function ContentLoader({ 
  isLoading, 
  children, 
  className,
  variant = 'card'
}: ContentLoaderProps) {
  if (!isLoading) return <>{children}</>;
  
  if (variant === 'text') {
    return (
      <div className={cn("w-full space-y-2", className)}>
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  }
  
  if (variant === 'media') {
    return (
      <div className={cn("w-full", className)}>
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  // Default card variant
  return (
    <div className={cn("w-full space-y-4 rounded-xl border p-6", className)}>
      <Skeleton className="h-8 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <Skeleton className="h-10 w-1/3" />
    </div>
  );
}