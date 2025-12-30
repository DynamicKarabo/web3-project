"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications } from "./notification-context";
import { Toast } from "./toast";

export function Notifications() {
    const { notifications, removeNotification, clearAll } = useNotifications();
    const [showCenter, setShowCenter] = useState(false);

    // Get only the 3 most recent notifications for toasts
    const recentNotifications = notifications.slice(-3);
    const unreadCount = notifications.length;

    return (
        <>
            {/* Toast Container */}
            <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 pointer-events-none">
                <AnimatePresence mode="popLayout">
                    {recentNotifications.map((notification) => (
                        <div key={notification.id} className="pointer-events-auto">
                            <Toast notification={notification} onRemove={removeNotification} />
                        </div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Notification Bell Button */}
            <div className="relative">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCenter(!showCenter)}
                    className={cn(
                        "p-2.5 rounded-full relative",
                        "hover:bg-surface-variant transition-colors",
                        "focus:outline-none focus:ring-2 focus:ring-primary"
                    )}
                    aria-label="Notifications"
                >
                    <Bell className="w-5 h-5 text-on-surface" />
                    {unreadCount > 0 && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-error text-on-error text-label-small font-bold flex items-center justify-center"
                        >
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </motion.span>
                    )}
                </motion.button>

                {/* Notification Center */}
                <AnimatePresence>
                    {showCenter && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="absolute right-0 top-full mt-2 w-96 max-h-[500px] bg-surface rounded-3xl shadow-elevation-5 border border-outline-variant overflow-hidden"
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-outline-variant flex items-center justify-between">
                                <h3 className="text-title-medium font-semibold text-on-surface">
                                    Notifications
                                </h3>
                                <div className="flex items-center gap-2">
                                    {notifications.length > 0 && (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={clearAll}
                                            className="p-2 rounded-full hover:bg-surface-variant transition-colors"
                                            title="Clear all"
                                        >
                                            <Trash2 className="w-4 h-4 text-on-surface-variant" />
                                        </motion.button>
                                    )}
                                    <button
                                        onClick={() => setShowCenter(false)}
                                        className="p-2 rounded-full hover:bg-surface-variant transition-colors"
                                    >
                                        <X className="w-4 h-4 text-on-surface-variant" />
                                    </button>
                                </div>
                            </div>

                            {/* Notification List */}
                            <div className="max-h-96 overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <div className="p-12 text-center">
                                        <Bell className="w-12 h-12 text-on-surface-variant mx-auto mb-3 opacity-50" />
                                        <p className="text-body-medium text-on-surface-variant">
                                            No notifications yet
                                        </p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-outline-variant">
                                        {[...notifications].reverse().map((notification, index) => (
                                            <motion.div
                                                key={notification.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="p-4 hover:bg-surface-variant transition-colors group"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="flex-1">
                                                        <h4 className="text-label-large font-semibold text-on-surface mb-1">
                                                            {notification.title}
                                                        </h4>
                                                        <p className="text-body-small text-on-surface-variant mb-2">
                                                            {notification.message}
                                                        </p>
                                                        <span className="text-label-small text-on-surface-variant">
                                                            {notification.timestamp.toLocaleTimeString()}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() => removeNotification(notification.id)}
                                                        className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-surface transition-opacity"
                                                    >
                                                        <X className="w-4 h-4 text-on-surface-variant" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
