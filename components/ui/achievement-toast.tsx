"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import { Haptics } from "@/lib/mobile";

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
}

export const ACHIEVEMENTS = {
    KONAMI: {
        id: "konami",
        title: "Cheat Code Activated",
        description: "You found the hidden developer mode!",
    },
    FIRST_REVIEW: {
        id: "first_review",
        title: "Code Reviewer",
        description: "You completed your first code review.",
    },
    THEME_MASTER: {
        id: "theme_master",
        title: "Theme Master",
        description: "You tried every theme option.",
    },
};

export function AchievementToast() {
    const [achievement, setAchievement] = useState<Achievement | null>(null);

    useEffect(() => {
        const handleAchievement = (event: CustomEvent<Achievement>) => {
            setAchievement(event.detail);
            Haptics.success();

            // Play sound effect (optional/subtle)
            const audio = new Audio("/achievement.mp3"); // Ensure this file exists or use base64
            audio.volume = 0.5;
            audio.play().catch(() => { }); // Ignore auto-play errors

            setTimeout(() => setAchievement(null), 4000);
        };

        window.addEventListener("achievement", handleAchievement as EventListener);
        return () => window.removeEventListener("achievement", handleAchievement as EventListener);
    }, []);

    return (
        <AnimatePresence>
            {achievement && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.8 }}
                    className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] bg-surface-variant border border-primary/20 text-on-surface-variant px-6 py-4 rounded-full shadow-elevation-3 flex items-center gap-4 min-w-[300px]"
                >
                    <div className="bg-primary/20 p-2 rounded-full">
                        <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h4 className="text-label-large font-bold text-primary">{achievement.title}</h4>
                        <p className="text-body-medium">{achievement.description}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Helper to trigger achievement
export function unlockAchievement(achievement: Achievement) {
    if (typeof window === "undefined") return;

    // Check if already unlocked (persist in localStorage)
    const unlocked = JSON.parse(localStorage.getItem("achievements") || "[]");
    if (unlocked.includes(achievement.id)) return;

    unlocked.push(achievement.id);
    localStorage.setItem("achievements", JSON.stringify(unlocked));

    const event = new CustomEvent("achievement", { detail: achievement });
    window.dispatchEvent(event);
}
