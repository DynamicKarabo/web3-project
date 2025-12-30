"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Array<{ x: number; y: number; age: number; vx: number; vy: number }>>([]);
    const requestRef = useRef<number>();
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion || typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

        const cursor = cursorRef.current;
        if (!cursor) return;

        let mouseX = -100;
        let mouseY = -100;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update main cursor immediately
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

            // Add particle
            if (Math.random() > 0.5) { // Throttle particles
                particlesRef.current.push({
                    x: mouseX,
                    y: mouseY,
                    age: 0,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2
                });
            }
        };

        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9998'; // Behind cursor (9999)
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');

        // Resize handling
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', handleResize);
        handleResize();

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particlesRef.current = particlesRef.current.filter(p => p.age < 20);

            ctx.fillStyle = 'rgba(var(--primary-rgb, 59, 130, 246), 0.5)';

            particlesRef.current.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.age++;

                const size = (20 - p.age) / 5;
                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fill();
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        };
    }, [prefersReducedMotion]);

    if (prefersReducedMotion) return null;

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-4 h-4 rounded-full border-2 border-primary pointer-events-none z-[9999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block"
            style={{ willChange: "transform" }}
        />
    );
}
