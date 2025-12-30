"use client";

import { useEffect, useState } from "react";

const KONAMI_CODE = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
];

export function useKonamiCode(onUnlock: () => void) {
    const [sequence, setSequence] = useState<string[]>([]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setSequence((prev) => {
                const newSequence = [...prev, e.key];
                if (newSequence.length > KONAMI_CODE.length) {
                    newSequence.shift();
                }

                if (JSON.stringify(newSequence) === JSON.stringify(KONAMI_CODE)) {
                    onUnlock();
                    return [];
                }

                // Reset if the sequence doesn't match the end of the code so far
                const isMatch = KONAMI_CODE.slice(0, newSequence.length).every(
                    (key, index) => key === newSequence[index]
                );

                if (!isMatch) {
                    // Keep the last key if it matches the start, otherwise clear
                    return e.key === KONAMI_CODE[0] ? [e.key] : [];
                }

                return newSequence;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onUnlock]);
}
