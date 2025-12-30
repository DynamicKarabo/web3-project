"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, FileText, Code, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Haptics } from "@/lib/mobile";

const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: FileText, label: "Portfolio", href: "/portfolio" },
    { icon: Code, label: "Code Review", href: "/code-review" },
    { icon: Settings, label: "Settings", href: "/settings" },
];

export function AdaptiveSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    // Load state from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("sidebar-collapsed");
        if (saved !== null) {
            setIsCollapsed(JSON.parse(saved));
        }
    }, []);

    // Save state to localStorage
    const toggleSidebar = useCallback(() => {
        setIsCollapsed((prev) => {
            const newState = !prev;
            localStorage.setItem("sidebar-collapsed", JSON.stringify(newState));
            return newState;
        });
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "[" && e.ctrlKey) {
                e.preventDefault();
                toggleSidebar();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    return (
        <>
            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    width: isCollapsed ? "80px" : "240px",
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.4, 0.0, 0.2, 1],
                }}
                className="hidden md:flex fixed left-0 top-0 h-screen bg-surface border-r border-outline-variant flex-col z-40"
            >
                <div className="flex items-center justify-between p-4 border-b border-outline-variant h-16">
                    <AnimatePresence mode="wait">
                        {!isCollapsed && (
                            <motion.h1
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="text-title-large font-semibold text-on-surface"
                            >
                                MD3 App
                            </motion.h1>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-full hover:bg-surface-variant transition-colors"
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {isCollapsed ? (
                            <ChevronRight className="w-5 h-5 text-on-surface" />
                        ) : (
                            <ChevronLeft className="w-5 h-5 text-on-surface" />
                        )}
                    </button>
                </div>

                <nav className="flex-1 p-2 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-full transition-all duration-200",
                                    "hover:bg-secondary-container group",
                                    isActive && "bg-secondary-container text-on-secondary-container"
                                )}
                            >
                                <Icon className={cn(
                                    "w-5 h-5 flex-shrink-0",
                                    isActive ? "text-on-secondary-container" : "text-on-surface-variant"
                                )} />

                                <AnimatePresence mode="wait">
                                    {!isCollapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className={cn(
                                                "text-label-large whitespace-nowrap",
                                                isActive ? "text-on-secondary-container font-medium" : "text-on-surface"
                                            )}
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        );
                    })}
                </nav>
            </motion.aside>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant z-40 pb-[env(safe-area-inset-bottom)]">
                <div className="flex items-center justify-around px-2 py-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => Haptics.light()}
                                className={cn(
                                    "flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200 min-w-[64px]",
                                    "hover:bg-secondary-container",
                                    isActive && "bg-secondary-container"
                                )}
                            >
                                <Icon className={cn(
                                    "w-6 h-6",
                                    isActive ? "text-on-secondary-container" : "text-on-surface-variant"
                                )} />
                                <span className={cn(
                                    "text-label-small",
                                    isActive ? "text-on-secondary-container font-medium" : "text-on-surface-variant"
                                )}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
