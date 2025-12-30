"use client";

import { motion } from "framer-motion";
import { RippleButton } from "@/components/ui/ripple-button";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton, SkeletonCard, SkeletonList } from "@/components/ui/skeleton";
import { useScrollAnimation, useHover, useReducedMotion } from "@/lib/hooks";
import {
    pageTransition,
    staggerContainer,
    staggerItem,
    scaleIn,
    fadeIn,
    hoverLift,
    pulse,
    bounce,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function AnimationsPage() {
    const { ref: scrollRef, isVisible } = useScrollAnimation();
    const { ref: hoverRef, isHovered } = useHover<HTMLDivElement>();
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="container mx-auto px-4 py-8 space-y-12"
        >
            <div>
                <h1 className="text-display-large font-bold text-on-surface mb-2">
                    Animation Library
                </h1>
                <p className="text-body-large text-on-surface-variant">
                    Premium microinteractions and motion design patterns
                </p>
                {prefersReducedMotion && (
                    <p className="mt-2 text-label-medium text-warning">
                        ⚠️ Reduced motion is enabled
                    </p>
                )}
            </div>

            {/* Ripple Buttons */}
            <section className="space-y-4">
                <h2 className="text-headline-large font-semibold text-on-surface">
                    Ripple Buttons
                </h2>
                <div className="flex flex-wrap gap-4">
                    <RippleButton variant="filled">Filled Button</RippleButton>
                    <RippleButton variant="outlined">Outlined Button</RippleButton>
                    <RippleButton variant="text">Text Button</RippleButton>
                </div>
            </section>

            {/* Loading Spinners */}
            <section className="space-y-4">
                <h2 className="text-headline-large font-semibold text-on-surface">
                    Loading Spinners
                </h2>
                <div className="flex items-center gap-6">
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                </div>
            </section>

            {/* Skeleton Loaders */}
            <section className="space-y-4">
                <h2 className="text-headline-large font-semibold text-on-surface">
                    Skeleton Loaders
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SkeletonCard />
                    <div>
                        <SkeletonList count={4} />
                    </div>
                </div>
            </section>

            {/* Staggered List */}
            <section className="space-y-4">
                <h2 className="text-headline-large font-semibold text-on-surface">
                    Staggered Animations
                </h2>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <motion.div
                            key={i}
                            variants={staggerItem}
                            className="p-6 bg-surface rounded-3xl border border-outline-variant"
                        >
                            <h3 className="text-title-medium font-semibold text-on-surface">
                                Item {i}
                            </h3>
                            <p className="text-body-small text-on-surface-variant mt-2">
                                Staggered entrance animation
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Hover Effects */}
            <section className="space-y-4">
                <h2 className="text-headline-large font-semibold text-on-surface">
                    Hover Effects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="p-6 bg-surface rounded-3xl border border-outline-variant cursor-pointer"
                    >
                        <h3 className="text-title-medium font-semibold text-on-surface">
                            Hover Lift
                        </h3>
                        <p className="text-body-small text-on-surface-variant mt-2">
                            Lifts up on hover
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-6 bg-surface rounded-3xl border border-outline-variant cursor-pointer"
                    >
                        <h3 className="text-title-medium font-semibold text-on-surface">
                            Scale Effect
                        </h3>
                        <p className="text-body-small text-on-surface-variant mt-2">
                            Scales on hover and tap
                        </p>
                    </motion.div>

                    <div
                        ref={hoverRef}
                        className={cn(
                            "p-6 bg-surface rounded-3xl border border-outline-variant cursor-pointer transition-colors",
                            isHovered && "bg-primary/10 border-primary"
                        )}
                    >
                        <h3 className="text-title-medium font-semibold text-on-surface">
                            Custom Hook
                        </h3>
                        <p className="text-body-small text-on-surface-variant mt-2">
                            Using useHover hook
                        </p>
                    </div>
                </div>
            </section>

            {/* Scroll Animations */}
            <section className="space-y-4">
                <h2 className="text-headline-large font-semibold text-on-surface">
                    Scroll Reveal
                </h2>
                <motion.div
                    ref={scrollRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="p-12 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl text-center"
                >
                    <h3 className="text-headline-large font-bold text-on-surface">
                        Scroll to reveal this section
                    </h3>
                    <p className="text-body-large text-on-surface-variant mt-2">
                        Animates when it enters the viewport
                    </p>
                </motion.div>
            </section>

            {/* Continuous Animations */}
            <section className="space-y-4">
                <h2 className="text-headline-large font-semibold text-on-surface">
                    Continuous Animations
                </h2>
                <div className="flex gap-8 items-center">
                    <div className="text-center">
                        <motion.div
                            animate={pulse}
                            className="w-16 h-16 rounded-full bg-primary mx-auto mb-2"
                        />
                        <p className="text-label-medium text-on-surface-variant">Pulse</p>
                    </div>

                    <div className="text-center">
                        <motion.div
                            animate={bounce}
                            className="w-16 h-16 rounded-full bg-secondary mx-auto mb-2"
                        />
                        <p className="text-label-medium text-on-surface-variant">Bounce</p>
                    </div>

                    <div className="text-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 rounded-lg bg-tertiary mx-auto mb-2"
                        />
                        <p className="text-label-medium text-on-surface-variant">Rotate</p>
                    </div>
                </div>
            </section>

            {/* Scale In */}
            <section className="space-y-4">
                <h2 className="text-headline-large font-semibold text-on-surface">
                    Scale Animations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            variants={scaleIn}
                            initial="initial"
                            animate="animate"
                            className="p-6 bg-surface rounded-3xl border border-outline-variant"
                        >
                            <h3 className="text-title-medium font-semibold text-on-surface">
                                Scale In {i}
                            </h3>
                            <p className="text-body-small text-on-surface-variant mt-2">
                                Spring-based scale animation
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Fade In */}
            <section className="space-y-4">
                <h2 className="text-headline-large font-semibold text-on-surface">
                    Fade Animations
                </h2>
                <motion.div
                    variants={fadeIn}
                    initial="initial"
                    animate="animate"
                    className="p-12 bg-surface rounded-3xl border border-outline-variant text-center"
                >
                    <h3 className="text-headline-medium font-bold text-on-surface">
                        Smooth Fade In
                    </h3>
                    <p className="text-body-large text-on-surface-variant mt-2">
                        Using Material Design emphasized easing
                    </p>
                </motion.div>
            </section>
        </motion.div>
    );
}
