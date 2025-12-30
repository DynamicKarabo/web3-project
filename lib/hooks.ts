import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Custom hooks for premium microinteractions
 */

// Ripple effect hook
export function useRipple() {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

    const addRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const id = Date.now();

        setRipples((prev) => [...prev, { x, y, id }]);

        setTimeout(() => {
            setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
        }, 600);
    }, []);

    return { ripples, addRipple };
}

// Advanced hover state hook
export function useHover<T extends HTMLElement = HTMLElement>() {
    const [isHovered, setIsHovered] = useState(false);
    const [hoverDuration, setHoverDuration] = useState(0);
    const ref = useRef<T>(null);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseEnter = () => {
            setIsHovered(true);
            startTimeRef.current = Date.now();
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            setHoverDuration(Date.now() - startTimeRef.current);
        };

        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mouseenter", handleMouseEnter);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return { ref, isHovered, hoverDuration };
}

// Scroll animation hook
export function useScrollAnimation(threshold = 0.1) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold]);

    return { ref, isVisible };
}

// Gesture hook for touch/pointer events
export function useGesture<T extends HTMLElement = HTMLElement>() {
    const [gesture, setGesture] = useState({
        isDragging: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        deltaX: 0,
        deltaY: 0,
    });
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handlePointerDown = (e: PointerEvent) => {
            setGesture((prev) => ({
                ...prev,
                isDragging: true,
                startX: e.clientX,
                startY: e.clientY,
                currentX: e.clientX,
                currentY: e.clientY,
            }));
        };

        const handlePointerMove = (e: PointerEvent) => {
            setGesture((prev) => {
                if (!prev.isDragging) return prev;
                return {
                    ...prev,
                    currentX: e.clientX,
                    currentY: e.clientY,
                    deltaX: e.clientX - prev.startX,
                    deltaY: e.clientY - prev.startY,
                };
            });
        };

        const handlePointerUp = () => {
            setGesture((prev) => ({
                ...prev,
                isDragging: false,
            }));
        };

        element.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);

        return () => {
            element.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, []);

    return { ref, gesture };
}

// Reduced motion hook for accessibility
export function useReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    return prefersReducedMotion;
}

// Intersection observer hook for lazy loading
export function useIntersectionObserver(
    options: IntersectionObserverInit = {}
) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, options);

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [options]);

    return { ref, isIntersecting };
}

// Mouse position hook
export function useMousePosition() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return position;
}

// Window size hook
export function useWindowSize() {
    const [size, setSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return size;
}

// Debounce hook
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

// Media query hook
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);

        const listener = (e: MediaQueryListEvent) => {
            setMatches(e.matches);
        };

        media.addEventListener("change", listener);

        return () => {
            media.removeEventListener("change", listener);
        };
    }, [query]);

    return matches;
}
