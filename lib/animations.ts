import { Variants } from "framer-motion";

/**
 * Material Design 3 Animation Utilities
 * Premium microinteractions and motion design patterns
 */

// Easing curves from Material Design 3
export const easings = {
    standard: [0.2, 0.0, 0, 1.0],
    emphasized: [0.2, 0.0, 0, 1.0],
    decelerated: [0.0, 0.0, 0.2, 1.0],
    accelerated: [0.3, 0.0, 1.0, 1.0],
} as const;

// Duration tokens
export const durations = {
    short1: 50,
    short2: 100,
    short3: 150,
    short4: 200,
    medium1: 250,
    medium2: 300,
    medium3: 350,
    medium4: 400,
    long1: 450,
    long2: 500,
    long3: 550,
    long4: 600,
    extraLong1: 700,
    extraLong2: 800,
    extraLong3: 900,
    extraLong4: 1000,
} as const;

// Page transition animations
export const pageTransition: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: durations.medium2 / 1000,
            ease: easings.emphasized,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: durations.short4 / 1000,
            ease: easings.accelerated,
        },
    },
};

// Staggered list animations
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: durations.medium2 / 1000,
            ease: easings.emphasized,
        },
    },
};

// Scale animations
export const scaleIn: Variants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
        },
    },
    exit: {
        scale: 0,
        opacity: 0,
        transition: {
            duration: durations.short3 / 1000,
        },
    },
};

// Slide animations
export const slideIn = {
    left: {
        initial: { x: -100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -100, opacity: 0 },
    },
    right: {
        initial: { x: 100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 100, opacity: 0 },
    },
    up: {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 100, opacity: 0 },
    },
    down: {
        initial: { y: -100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -100, opacity: 0 },
    },
};

// Fade animations
export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            duration: durations.medium2 / 1000,
            ease: easings.emphasized,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: durations.short3 / 1000,
            ease: easings.accelerated,
        },
    },
};

// Morphing animations
export const morph: Variants = {
    initial: {
        borderRadius: "0%",
        scale: 0.8,
    },
    animate: {
        borderRadius: "50%",
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 15,
        },
    },
};

// Bounce animation
export const bounce = {
    y: [0, -20, 0],
    transition: {
        duration: 0.6,
        repeat: Infinity as number,
        ease: "easeInOut" as const,
    },
};

// Pulse animation
export const pulse = {
    scale: [1, 1.05, 1],
    transition: {
        duration: 2,
        repeat: Infinity as number,
        ease: "easeInOut" as const,
    },
};

// Shimmer animation for skeleton loading
export const shimmer = {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
        duration: 2,
        repeat: Infinity as number,
        ease: "linear" as const,
    },
};

// Spring configurations
export const springs = {
    gentle: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
    },
    bouncy: {
        type: "spring" as const,
        stiffness: 300,
        damping: 10,
    },
    stiff: {
        type: "spring" as const,
        stiffness: 500,
        damping: 30,
    },
    slow: {
        type: "spring" as const,
        stiffness: 50,
        damping: 20,
    },
};

// Ripple effect keyframes
export const rippleEffect = {
    scale: [0, 2],
    opacity: [0.5, 0],
    transition: {
        duration: 0.6,
        ease: "easeOut" as const,
    },
};

// Focus ring animation
export const focusRing = {
    scale: [1, 1.05, 1],
    transition: {
        duration: 0.3,
        ease: easings.emphasized,
    },
};

// Loading spinner rotation
export const spinnerRotation = {
    rotate: 360,
    transition: {
        duration: 1,
        repeat: Infinity as number,
        ease: "linear" as const,
    },
};

// Hover lift effect
export const hoverLift = {
    y: -4,
    scale: 1.02,
    transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
    },
};

// Card flip animation
export const cardFlip: Variants = {
    front: {
        rotateY: 0,
        transition: {
            duration: durations.medium4 / 1000,
            ease: easings.emphasized,
        },
    },
    back: {
        rotateY: 180,
        transition: {
            duration: durations.medium4 / 1000,
            ease: easings.emphasized,
        },
    },
};

// Scroll reveal animation
export const scrollReveal: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: durations.medium3 / 1000,
            ease: easings.emphasized,
        },
    },
};
