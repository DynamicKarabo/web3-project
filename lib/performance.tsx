import React from 'react';

/**
 * Performance Utilities
 * Tools for monitoring and optimizing application performance
 */

// Lazy load components with loading fallback
export function lazyLoad<T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>,
    fallback?: React.ReactNode
) {
    const LazyComponent = React.lazy(importFunc);

    return (props: React.ComponentProps<T>) => (
        <React.Suspense fallback= { fallback || <div>Loading...</div>
}>
    <LazyComponent { ...props } />
    </React.Suspense>
  );
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll/resize events
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean;

    return function executedFunction(...args: Parameters<T>) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Performance measurement
export function measurePerformance(name: string, fn: () => void) {
    if (typeof window === 'undefined') return fn();

    const start = performance.now();
    const result = fn();
    const end = performance.now();

    console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);

    return result;
}

// Report Web Vitals
export function reportWebVitals(metric: any) {
    if (process.env.NODE_ENV === 'development') {
        console.log(metric);
    }

    // Send to analytics
    // Example: sendToAnalytics(metric);
}

// Preload critical resources
export function preloadResource(href: string, as: string) {
    if (typeof document === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
}

// Virtual scrolling helper
export function getVisibleRange(
    scrollTop: number,
    containerHeight: number,
    itemHeight: number,
    totalItems: number,
    overscan: number = 3
) {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(
        totalItems,
        Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    return { start, end };
}

// Memory-efficient list rendering
export class VirtualList {
    private items: any[];
    private itemHeight: number;
    private containerHeight: number;

    constructor(items: any[], itemHeight: number, containerHeight: number) {
        this.items = items;
        this.itemHeight = itemHeight;
        this.containerHeight = containerHeight;
    }

    getVisibleItems(scrollTop: number) {
        const { start, end } = getVisibleRange(
            scrollTop,
            this.containerHeight,
            this.itemHeight,
            this.items.length
        );

        return {
            items: this.items.slice(start, end),
            offsetY: start * this.itemHeight,
            totalHeight: this.items.length * this.itemHeight,
        };
    }
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
) {
    if (typeof window === 'undefined') return null;

    return new IntersectionObserver(callback, {
        rootMargin: '50px',
        threshold: 0.01,
        ...options,
    });
}

// Image preloader
export function preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
    });
}

// Batch updates for better performance
export function batchUpdates<T>(
    items: T[],
    batchSize: number,
    callback: (batch: T[]) => void
) {
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        requestAnimationFrame(() => callback(batch));
    }
}


