"use client";

import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
}

interface StatProps {
    value: number;
    label: string;
    suffix?: string;
}

function AnimatedStat({ value, label, suffix = "" }: StatProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        const duration = 2000;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * value));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
            className="text-center"
        >
            <div className="text-display-small font-bold text-primary">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-body-medium text-on-surface-variant mt-1">
                {label}
            </div>
        </motion.div>
    );
}

export function HeroSection() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const parallaxX = useTransform(mouseX, [-300, 300], [-15, 15]);
    const parallaxY = useTransform(mouseY, [-300, 300], [-15, 15]);

    // Generate particles
    useEffect(() => {
        const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 10 + 10,
        }));
        setParticles(newParticles);
    }, []);

    // Track mouse position
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const chipVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.4,
                ease: [0.4, 0.0, 0.2, 1] as [number, number, number, number],
            },
        }),
    };

    const tags = ["TypeScript", "Material Design 3", "Framer Motion", "Next.js 14"];

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-secondary/5 to-tertiary/5 p-8 md:p-16"
        >
            {/* Animated gradient background */}
            <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                    background: [
                        "radial-gradient(circle at 20% 50%, rgba(0, 96, 167, 0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 50%, rgba(107, 87, 120, 0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 50% 80%, rgba(83, 95, 112, 0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 20% 50%, rgba(0, 96, 167, 0.3) 0%, transparent 50%)",
                    ],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            {/* Particle system */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-primary/20"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Content */}
            <motion.div
                style={{ x: parallaxX, y: parallaxY }}
                className="relative z-10 mx-auto max-w-4xl text-center"
            >
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
                    className="text-display-large font-bold text-on-surface mb-6"
                >
                    Build with{" "}
                    <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
                        Material Design 3
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0.0, 0.2, 1] }}
                    className="text-headline-small text-on-surface-variant mb-8 max-w-2xl mx-auto"
                >
                    A modern, accessible, and beautiful design system powered by Next.js 14 and Tailwind CSS
                </motion.p>

                {/* Tags */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {tags.map((tag, i) => (
                        <motion.span
                            key={tag}
                            custom={i}
                            variants={chipVariants}
                            whileHover={{ scale: 1.05 }}
                            className={cn(
                                "px-4 py-2 rounded-full text-label-large",
                                "bg-secondary-container text-on-secondary-container",
                                "border border-outline-variant",
                                "cursor-default"
                            )}
                        >
                            {tag}
                        </motion.span>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                >
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                            "group px-8 py-4 rounded-full",
                            "bg-primary text-on-primary shadow-elevation-2",
                            "hover:shadow-elevation-3 transition-shadow duration-200",
                            "flex items-center justify-center gap-2 text-label-large font-medium"
                        )}
                    >
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                            "px-8 py-4 rounded-full",
                            "bg-surface text-on-surface border border-outline",
                            "hover:bg-surface-variant transition-colors duration-200",
                            "flex items-center justify-center gap-2 text-label-large font-medium"
                        )}
                    >
                        <Sparkles className="w-5 h-5" />
                        View Demo
                    </motion.button>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-outline-variant">
                    <AnimatedStat value={99} label="Performance Score" suffix="%" />
                    <AnimatedStat value={150} label="Components" suffix="+" />
                    <AnimatedStat value={12} label="Themes" />
                </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
                className="absolute top-10 right-10 text-primary/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <Zap className="w-24 h-24" />
            </motion.div>

            <motion.div
                className="absolute bottom-10 left-10 text-secondary/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
                <TrendingUp className="w-20 h-20" />
            </motion.div>
        </div>
    );
}
