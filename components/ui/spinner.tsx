"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { spinnerRotation } from "@/lib/animations";

interface SpinnerProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
    const sizes = {
        sm: "w-4 h-4 border-2",
        md: "w-8 h-8 border-3",
        lg: "w-12 h-12 border-4",
    };

    return (
        <motion.div
            animate={spinnerRotation}
            className={cn(
                "rounded-full border-primary border-t-transparent",
                sizes[size],
                className
            )}
        />
    );
}
