"use client";

import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FABProps {
    onClick?: () => void;
    icon?: React.ReactNode;
    label?: string;
}

export function FAB({ onClick, icon = <Plus className="w-6 h-6" />, label }: FABProps) {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = { x, y, id: Date.now() };
        setRipples((prev) => [...prev, newRipple]);

        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);

        onClick?.();
    };

    return (
        <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className={cn(
                "fixed bottom-6 right-6 md:bottom-8 md:right-8",
                "flex items-center gap-3 px-6 py-4 rounded-full",
                "bg-primary text-on-primary shadow-elevation-3",
                "hover:shadow-elevation-4 transition-shadow duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                "overflow-hidden relative z-50"
            )}
            aria-label={label || "Primary action"}
        >
            {/* Ripple effects */}
            {ripples.map((ripple) => (
                <motion.span
                    key={ripple.id}
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute bg-on-primary rounded-full w-10 h-10"
                    style={{
                        left: ripple.x - 20,
                        top: ripple.y - 20,
                    }}
                />
            ))}

            <span className="relative z-10">{icon}</span>
            {label && (
                <span className="relative z-10 text-label-large font-medium hidden sm:inline">
                    {label}
                </span>
            )}
        </motion.button>
    );
}
