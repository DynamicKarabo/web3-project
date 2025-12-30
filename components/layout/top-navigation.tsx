"use client";

import { Search, Sun, Moon, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant transition-colors group-focus-within:text-primary" />
                        <input
                            type="search"
                            placeholder="Search..."
                            className={cn(
                                "w-full pl-12 pr-4 py-3 rounded-full",
                                "bg-surface-variant/50 border border-outline-variant",
                                "text-on-surface placeholder:text-on-surface-variant",
                                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                                "transition-all duration-200",
                                "hover:bg-surface-variant/70"
                            )}
                        />
                    </div>
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
