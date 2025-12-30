"use client";

import { Sun, Moon, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SmartSearch } from "@/components/ui/smart-search";

export function TopNavigation() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-xl border-b border-outline-variant">
            <div className="flex items-center gap-4 px-4 md:px-6 h-16">
                {/* Search Bar */}
                <div className="flex-1 max-w-2xl">
                    <SmartSearch />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className={cn(
                                "p-2.5 rounded-full",
                                "hover:bg-surface-variant transition-colors",
                                "focus:outline-none focus:ring-2 focus:ring-primary"
                            )}
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <Sun className="w-5 h-5 text-on-surface" />
                            ) : (
                                <Moon className="w-5 h-5 text-on-surface" />
                            )}
                        </button>
                    )}

                    {/* User Menu */}
                    <button
                        className={cn(
                            "p-2.5 rounded-full",
                            "hover:bg-surface-variant transition-colors",
                            "focus:outline-none focus:ring-2 focus:ring-primary"
                        )}
                        aria-label="User menu"
                    >
                        <User className="w-5 h-5 text-on-surface" />
                    </button>
                </div>
            </div>
        </header>
    );
}
