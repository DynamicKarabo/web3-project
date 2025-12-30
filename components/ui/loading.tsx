"use client";

import { Skeleton } from "./skeleton";

interface LoadingProps {
    variant?: "page" | "card" | "list" | "table";
    count?: number;
}

export function Loading({ variant = "page", count = 3 }: LoadingProps) {
    if (variant === "page") {
        return (
            <div className="container mx-auto px-4 py-8 space-y-8">
                <div className="space-y-4">
                    <Skeleton className="h-12 w-2/3" />
                    <Skeleton className="h-6 w-1/2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="space-y-4 p-6 bg-surface rounded-3xl">
                            <Skeleton variant="circular" width={64} height={64} />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (variant === "card") {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="p-6 bg-surface rounded-3xl space-y-4">
                        <Skeleton variant="rectangular" height={200} />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                ))}
            </div>
        );
    }

    if (variant === "list") {
        return (
            <div className="space-y-3">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-surface rounded-2xl">
                        <Skeleton variant="circular" width={48} height={48} />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-2/3" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (variant === "table") {
        return (
            <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                {Array.from({ length: count }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                ))}
            </div>
        );
    }

    return null;
}
