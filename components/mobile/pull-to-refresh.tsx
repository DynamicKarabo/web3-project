"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { RefreshCcw } from "lucide-react";
import { Haptics } from "@/lib/mobile";
import { useMediaQuery } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface PullToRefreshProps {
    onRefresh: () => Promise<void>;
    children: React.ReactNode;
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const containerRef = useRef<HTMLDivElement>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pullProgress, setPullProgress] = useState(0);
    const controls = useAnimation();
    const PULL_THRESHOLD = 100;

    // Use a key to reset animation state when switching devices
    // though usually isMobile check is enough

    const handlePan = async (_: unknown, info: PanInfo) => {
        // Only allow pulling if we are at the top of the scroll
        if (window.scrollY > 0) return;
        if (isRefreshing) return;

        const y = Math.max(0, info.offset.y);
        // Add resistance
        const progress = Math.min(y * 0.5, PULL_THRESHOLD * 1.5);

        setPullProgress(progress);
        controls.set({ y: progress });

        if (progress > PULL_THRESHOLD * 0.8) {
            Haptics.light();
        }
    };

    const handlePanEnd = async (_: unknown, info: PanInfo) => {
        if (window.scrollY > 0) {
            controls.start({ y: 0 });
            setPullProgress(0);
            return;
        }

        const y = Math.max(0, info.offset.y);
        const progress = y * 0.5;

        if (progress > PULL_THRESHOLD) {
            setIsRefreshing(true);
            Haptics.medium();
            await controls.start({ y: PULL_THRESHOLD });

            try {
                await onRefresh();
                Haptics.success();
            } catch (e) {
                Haptics.error();
            } finally {
                setTimeout(() => {
                    setIsRefreshing(false);
                    setPullProgress(0);
                    controls.start({ y: 0 });
                }, 500);
            }
        } else {
            controls.start({ y: 0 });
            setPullProgress(0);
        }
    };

    // On non-mobile, just render children without wrapper logic
    if (!isMobile) {
        return <div className="contents">{children}</div>;
    }

    return (
        <div className="relative touch-none">
            {/* Refresh Indicator */}
            <div
                className="absolute left-0 right-0 flex justify-center -top-12 h-12 items-center z-10 pointer-events-none"
                style={{ opacity: Math.min(pullProgress / PULL_THRESHOLD, 1) }}
            >
                <div className="bg-surface rounded-full p-2 shadow-elevation-2">
                    <motion.div
                        animate={isRefreshing ? { rotate: 360 } : { rotate: pullProgress * 2 }}
                        transition={isRefreshing ? { repeat: Infinity, duration: 1, ease: "linear" } : { duration: 0 }}
                    >
                        <RefreshCcw className="w-5 h-5 text-primary" />
                    </motion.div>
                </div>
            </div>

            <motion.div
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0}
                onDrag={handlePan}
                onDragEnd={handlePanEnd}
                animate={controls}
                className="relative z-0 min-h-full"
                ref={containerRef}
            >
                {children}
            </motion.div>
        </div>
    );
}
