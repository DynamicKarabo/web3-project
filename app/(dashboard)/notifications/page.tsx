"use client";

import { useNotifications } from "@/components/ui/notification-context";
import { motion } from "framer-motion";

export default function NotificationDemoPage() {
    const { addNotification } = useNotifications();

    const showSuccessNotification = () => {
        addNotification({
            type: "success",
            title: "Success!",
            message: "Your changes have been saved successfully.",
            duration: 5000,
        });
    };

    const showErrorNotification = () => {
        addNotification({
            type: "error",
            title: "Error occurred",
            message: "Failed to process your request. Please try again.",
            duration: 5000,
        });
    };

    const showWarningNotification = () => {
        addNotification({
            type: "warning",
            title: "Warning",
            message: "Your session will expire in 5 minutes.",
            duration: 5000,
        });
    };

    const showInfoNotification = () => {
        addNotification({
            type: "info",
            title: "New update available",
            message: "Version 2.0 is now available for download.",
            duration: 5000,
            action: {
                label: "Update Now",
                onClick: () => alert("Updating..."),
            },
        });
    };

    const showPersistentNotification = () => {
        addNotification({
            type: "info",
            title: "Important Notice",
            message: "This notification will stay until you dismiss it.",
            duration: 0,
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-display-large font-bold text-on-surface mb-4">
                Notification System Demo
            </h1>
            <p className="text-body-large text-on-surface-variant mb-8">
                Click the buttons below to test different notification types
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={showSuccessNotification}
                    className="px-6 py-4 rounded-2xl bg-green-100 dark:bg-green-900/20 text-green-600 font-medium hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors"
                >
                    Show Success
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={showErrorNotification}
                    className="px-6 py-4 rounded-2xl bg-red-100 dark:bg-red-900/20 text-red-600 font-medium hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                >
                    Show Error
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={showWarningNotification}
                    className="px-6 py-4 rounded-2xl bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 font-medium hover:bg-yellow-200 dark:hover:bg-yellow-900/30 transition-colors"
                >
                    Show Warning
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={showInfoNotification}
                    className="px-6 py-4 rounded-2xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 font-medium hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                >
                    Show Info with Action
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={showPersistentNotification}
                    className="px-6 py-4 rounded-2xl bg-purple-100 dark:bg-purple-900/20 text-purple-600 font-medium hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors"
                >
                    Show Persistent
                </motion.button>
            </div>

            <div className="mt-12 p-6 rounded-3xl bg-surface border border-outline-variant">
                <h2 className="text-title-large font-semibold text-on-surface mb-4">Features</h2>
                <ul className="space-y-2 text-body-medium text-on-surface-variant">
                    <li>✅ Toast notifications with 4 states (success, error, info, warning)</li>
                    <li>✅ Auto-dismiss with progress bar</li>
                    <li>✅ Hover to pause auto-dismiss</li>
                    <li>✅ Swipe to dismiss on mobile</li>
                    <li>✅ Notification center with history</li>
                    <li>✅ Action buttons within notifications</li>
                    <li>✅ Stacking notifications with proper z-index</li>
                    <li>✅ Smooth slide in/out animations</li>
                </ul>
            </div>
        </div>
    );
}
