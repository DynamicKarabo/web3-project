"use client";

import { useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Notification } from "./notification-context";

interface ToastProps {
    notification: Notification;
    onRemove: (id: string) => void;
}

const typeConfig = {
    success: {
        icon: CheckCircle,
        color: "bg-green-100 dark:bg-green-900/20 text-green-600 border-green-200 dark:border-green-800",
        progressColor: "bg-green-600",
    },
    error: {
        icon: AlertCircle,
        color: "bg-red-100 dark:bg-red-900/20 text-red-600 border-red-200 dark:border-red-800",
        progressColor: "bg-red-600",
    },
    warning: {
        icon: AlertTriangle,
        color: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 border-yellow-200 dark:border-yellow-800",
        progressColor: "bg-yellow-600",
    },
    info: {
        icon: Info,
        color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 border-blue-200 dark:border-blue-800",
        progressColor: "bg-blue-600",
    },
};

export function Toast({ notification, onRemove }: ToastProps) {
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(100);
    const config = typeConfig[notification.type];
    const Icon = config.icon;
    const duration = notification.duration || 5000;

    useEffect(() => {
        if (notification.duration === 0 || isPaused) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev - (100 / (duration / 100));
                if (newProgress <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return newProgress;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [duration, isPaused, notification.duration]);

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (Math.abs(info.offset.x) > 100) {
            onRemove(notification.id);
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={cn(
                "relative w-full max-w-md rounded-2xl border-2 p-4 shadow-elevation-3",
                "bg-surface backdrop-blur-sm",
                config.color
            )}
        >
            <div className="flex items-start gap-3">
                <Icon className="w-6 h-6 flex-shrink-0 mt-0.5" />

                <div className="flex-1 min-w-0">
                    <h4 className="text-label-large font-semibold mb-1">{notification.title}</h4>
                    <p className="text-body-small opacity-90">{notification.message}</p>

                    {notification.action && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={notification.action.onClick}
                            className="mt-3 px-4 py-2 rounded-full bg-current/10 hover:bg-current/20 text-label-medium font-medium transition-colors"
                        >
                            {notification.action.label}
                        </motion.button>
                    )}
                </div>

                <button
                    onClick={() => onRemove(notification.id)}
                    className="p-1 rounded-full hover:bg-current/10 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Progress bar */}
            {notification.duration !== 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-current/10 rounded-b-2xl overflow-hidden">
                    <motion.div
                        className={cn("h-full", config.progressColor)}
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                    />
                </div>
            )}
        </motion.div>
    );
}
