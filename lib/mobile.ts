"use client";

import { useEffect, useState } from "react";

/**
 * Mobile Experience Utilities
 * Helpers for touch, haptics, and platform detection
 */

// Haptic feedback patterns
export const Haptics = {
    light: () => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(10);
        }
    },
    medium: () => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(40);
        }
    },
    heavy: () => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(80);
        }
    },
    success: () => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate([30, 50, 30]);
        }
    },
    error: () => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate([50, 100, 50, 100]);
        }
    },
};

// Hook for safe area insets (useful for custom positioning)
export function useSafeArea() {
    const [insets, setInsets] = useState({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const updateInsets = () => {
            const computedStyle = getComputedStyle(document.documentElement);
            setInsets({
                top: parseInt(computedStyle.getPropertyValue("--sat") || "0"),
                bottom: parseInt(computedStyle.getPropertyValue("--sab") || "0"),
                left: parseInt(computedStyle.getPropertyValue("--sal") || "0"),
                right: parseInt(computedStyle.getPropertyValue("--sar") || "0"),
            });
        };

        updateInsets();
        window.addEventListener("resize", updateInsets);
        return () => window.removeEventListener("resize", updateInsets);
    }, []);

    return insets;
}

// Hook to detect iOS (often needs special handling for bounce/scroll)
export function useIOS() {
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const ua = window.navigator.userAgent;
        const ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        setIsIOS(ios);
    }, []);

    return isIOS;
}

// Hook for virtual keyboard handling
export function useVirtualKeyboard() {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        if (typeof window === "undefined" || !window.visualViewport) return;

        const handleResize = () => {
            if (!window.visualViewport) return;
            const heightDiff = window.innerHeight - window.visualViewport.height;
            // Heuristic: if viewport is significantly smaller than window height, keyboard is likely open
            if (heightDiff > 100) {
                setIsKeyboardOpen(true);
                setKeyboardHeight(heightDiff);
            } else {
                setIsKeyboardOpen(false);
                setKeyboardHeight(0);
            }
        };

        window.visualViewport.addEventListener("resize", handleResize);
        return () => window.visualViewport?.removeEventListener("resize", handleResize);
    }, []);

    return { isKeyboardOpen, keyboardHeight };
}
