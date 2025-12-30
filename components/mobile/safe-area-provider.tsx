"use client";

import { useEffect } from "react";
import { useSafeArea } from "@/lib/mobile";

export function SafeAreaProvider({ children }: { children: React.ReactNode }) {
    const insets = useSafeArea();

    useEffect(() => {
        // Set CSS variables for safe areas
        const root = document.documentElement;
        root.style.setProperty("--sat", "env(safe-area-inset-top)");
        root.style.setProperty("--sab", "env(safe-area-inset-bottom)");
        root.style.setProperty("--sal", "env(safe-area-inset-left)");
        root.style.setProperty("--sar", "env(safe-area-inset-right)");
    }, []);

    return (
        <div
            style={{
                paddingTop: `var(--sat, 0px)`,
                paddingBottom: `var(--sab, 0px)`,
                paddingLeft: `var(--sal, 0px)`,
                paddingRight: `var(--sar, 0px)`,
            }}
            className="contents"
        >
            {children}
        </div>
    );
}
