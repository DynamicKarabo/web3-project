"use client";

import { useKonamiCode } from "@/lib/easter-eggs";
import { ACHIEVEMENTS, unlockAchievement } from "@/components/ui/achievement-toast";
import { useEffect } from "react";
import { Haptics } from "@/lib/mobile";

export function EasterEggManager() {
    useKonamiCode(() => {
        // Unlock Konami Achievement
        unlockAchievement(ACHIEVEMENTS.KONAMI);

        // Toggle Dev Mode (visual change)
        document.documentElement.classList.toggle("dev-mode");
        if (document.documentElement.classList.contains("dev-mode")) {
            Haptics.success();
            console.log("👨‍💻 Developer Mode Activated");
        }
    });

    // Check for theme master achievement
    useEffect(() => {
        // This could be expanded to track theme changes
    }, []);

    return null;
}
