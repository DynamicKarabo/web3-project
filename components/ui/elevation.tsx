"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ElevationProps extends React.HTMLAttributes<HTMLDivElement> {
    level?: 0 | 1 | 2 | 3 | 4 | 5;
    interactive?: boolean;
}

export const Elevation = React.forwardRef<HTMLDivElement, ElevationProps>(
    ({ className, level = 0, interactive = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "bg-surface text-on-surface transition-all duration-300 ease-emphasized",
                    {
                        "shadow-none": level === 0,
                        "shadow-elevation-1": level === 1,
                        "shadow-elevation-2": level === 2,
                        "shadow-elevation-3": level === 3,
                        "shadow-elevation-4": level === 4,
                        "shadow-elevation-5": level === 5,
                        "hover:shadow-elevation-2 cursor-pointer": interactive && level === 1,
                        "hover:shadow-elevation-3 cursor-pointer": interactive && level === 2,
                        "hover:shadow-elevation-4 cursor-pointer": interactive && level === 3,
                        "hover:shadow-elevation-5 cursor-pointer": interactive && level === 4,
                    },
                    className
                )}
                {...props}
            >
                {children}
                {/* Surface Tint Layer (opacity-based) could be added here if strict MD3 is required, 
            but Tailwind bg-opacity handles color tinting well enough for most use cases. 
        */}
            </div>
        );
    }
);

Elevation.displayName = "Elevation";
