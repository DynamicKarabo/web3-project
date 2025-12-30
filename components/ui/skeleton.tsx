"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
    variant?: "text" | "circular" | "rectangular";
    width?: string | number;
    height?: string | number;
}

export function Skeleton({
    className,
    variant = "rectangular",
    width,
    height
}: SkeletonProps) {
    const variantStyles = {
        text: "h-4 rounded",
        circular: "rounded-full",
        rectangular: "rounded-2xl",
    };

    return (
        <motion.div
            className={cn(
                "bg-gradient-to-r from-surface-variant via-surface to-surface-variant bg-[length:200%_100%]",
                variantStyles[variant],
                className
            )}
            style={{ width, height }}
            animate={{
                backgroundPosition: ["200% 0", "-200% 0"],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
            }}
        />
    );
}

// Preset skeleton layouts
export function SkeletonCard() {
    return (
        <div className="p-6 bg-surface rounded-3xl space-y-4">
            <Skeleton variant="circular" width={64} height={64} />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="rectangular" height={200} />
        </div>
    );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                    <Skeleton variant="circular" width={48} height={48} />
                    <div className="flex-1 space-y-2">
                        <Skeleton variant="text" width="70%" />
                        <Skeleton variant="text" width="40%" />
                    </div>
                </div>
            ))}
        </div>
    );
}
