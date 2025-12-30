"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRipple } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Haptics } from "@/lib/mobile";

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "filled" | "outlined" | "text";
}

export function RippleButton({ children, variant = "filled", className, ...props }: RippleButtonProps) {
    const { ripples, addRipple } = useRipple();

    const variantStyles = {
        filled: "bg-primary text-on-primary hover:shadow-elevation-2",
        outlined: "border-2 border-primary text-primary hover:bg-primary/10",
        text: "text-primary hover:bg-primary/10",
    };

    return (
        <button
            onClick={addRipple}
            className={cn(
                "relative overflow-hidden px-6 py-3 rounded-full font-medium transition-all",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                variantStyles[variant],
                className
            )}
            {...props}
        >
            <span className="relative z-10">{children}</span>

            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.span
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute w-32 h-32 rounded-full bg-white pointer-events-none"
                        style={{
                            left: ripple.x - 64,
                            top: ripple.y - 64,
                        }}
                    />
                ))}
            </AnimatePresence>
        </button>
    );
}
