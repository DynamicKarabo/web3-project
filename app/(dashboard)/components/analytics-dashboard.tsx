"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, Eye, Clock, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, subDays } from "date-fns";

// Generate mock data
const generateTimeSeriesData = () => {
    return Array.from({ length: 30 }, (_, i) => ({
        date: format(subDays(new Date(), 29 - i), "MMM dd"),
        views: Math.floor(Math.random() * 5000) + 2000,
        users: Math.floor(Math.random() * 1000) + 500,
        engagement: Math.floor(Math.random() * 60) + 20,
    }));
};

const generateHeatmapData = () => {
    const weeks = 52;
    const days = 7;
    return Array.from({ length: weeks }, (_, week) =>
        Array.from({ length: days }, (_, day) => ({
            week,
            day,
            value: Math.floor(Math.random() * 10),
        }))
    ).flat();
};

interface MetricCardProps {
    title: string;
    value: number;
    change: number;
    icon: React.ElementType;
    suffix?: string;
}

function MetricCard({ title, value, change, icon: Icon, suffix = "" }: MetricCardProps) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const increment = value / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setDisplayValue(value);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value]);

    const isPositive = change >= 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface rounded-3xl p-6 border border-outline-variant hover:shadow-elevation-2 transition-shadow"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-label-small font-medium",
                    isPositive
                        ? "bg-green-100 dark:bg-green-900/20 text-green-600"
                        : "bg-red-100 dark:bg-red-900/20 text-red-600"
                )}>
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(change)}%
                </div>
            </div>
            <h3 className="text-label-large text-on-surface-variant mb-2">{title}</h3>
            <p className="text-display-small font-bold text-on-surface">
                {displayValue.toLocaleString()}{suffix}
            </p>
        </motion.div>
    );
}

export function AnalyticsDashboard() {
    const [timeSeriesData] = useState(generateTimeSeriesData());
    const [heatmapData] = useState(generateHeatmapData());
    const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");
    const [isLive, setIsLive] = useState(false);

    // Simulate real-time updates
    useEffect(() => {
        if (!isLive) return;

        const interval = setInterval(() => {
            // In a real app, this would fetch new data
            console.log("Fetching new data...");
        }, 3000);

        return () => clearInterval(interval);
    }, [isLive]);

    const exportData = (format: "csv" | "json") => {
        const dataStr = format === "json"
            ? JSON.stringify(timeSeriesData, null, 2)
            : timeSeriesData.map(d => `${d.date},${d.views},${d.users},${d.engagement}`).join("\n");

        const blob = new Blob([dataStr], { type: format === "json" ? "application/json" : "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `analytics-${Date.now()}.${format}`;
        a.click();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-display-medium font-bold text-on-surface">Analytics Dashboard</h2>
                    <p className="text-body-large text-on-surface-variant mt-1">
                        Track your performance metrics and insights
                    </p>
                </div>

                <div className="flex gap-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsLive(!isLive)}
                        className={cn(
                            "px-4 py-2 rounded-full text-label-large font-medium transition-colors flex items-center gap-2",
                            isLive
                                ? "bg-primary text-on-primary"
                                : "bg-surface-variant text-on-surface-variant"
                        )}
                    >
                        <div className={cn("w-2 h-2 rounded-full", isLive ? "bg-on-primary animate-pulse" : "bg-on-surface-variant")} />
                        {isLive ? "Live" : "Paused"}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => exportData("json")}
                        className="px-4 py-2 rounded-full bg-surface-variant text-on-surface-variant hover:bg-surface-variant/70 transition-colors flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export
                    </motion.button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard title="Total Views" value={127543} change={12.5} icon={Eye} />
                <MetricCard title="Active Users" value={8234} change={-3.2} icon={Users} />
                <MetricCard title="Avg. Session" value={245} change={8.7} icon={Clock} suffix="s" />
                <MetricCard title="Engagement" value={67} change={15.3} icon={TrendingUp} suffix="%" />
            </div>

            {/* Time Range Selector */}
            <div className="flex gap-2">
                {(["7d", "30d", "90d"] as const).map((range) => (
                    <motion.button
                        key={range}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setTimeRange(range)}
                        className={cn(
                            "px-4 py-2 rounded-full text-label-large font-medium transition-colors",
                            timeRange === range
                                ? "bg-primary text-on-primary"
                                : "bg-surface-variant text-on-surface-variant hover:bg-surface-variant/70"
                        )}
                    >
                        {range === "7d" ? "Last 7 days" : range === "30d" ? "Last 30 days" : "Last 90 days"}
                    </motion.button>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Time Series Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-surface rounded-3xl p-6 border border-outline-variant"
                >
                    <h3 className="text-title-large font-semibold text-on-surface mb-4">Traffic Overview</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={timeSeriesData}>
                            <defs>
                                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="rgb(var(--md-sys-color-primary))" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="rgb(var(--md-sys-color-primary))" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--md-sys-color-outline-variant))" />
                            <XAxis dataKey="date" stroke="rgb(var(--md-sys-color-on-surface-variant))" />
                            <YAxis stroke="rgb(var(--md-sys-color-on-surface-variant))" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "rgb(var(--md-sys-color-surface))",
                                    border: "1px solid rgb(var(--md-sys-color-outline-variant))",
                                    borderRadius: "12px",
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="views"
                                stroke="rgb(var(--md-sys-color-primary))"
                                fillOpacity={1}
                                fill="url(#colorViews)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Comparison Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-surface rounded-3xl p-6 border border-outline-variant"
                >
                    <h3 className="text-title-large font-semibold text-on-surface mb-4">You vs Industry</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={timeSeriesData.slice(-7)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--md-sys-color-outline-variant))" />
                            <XAxis dataKey="date" stroke="rgb(var(--md-sys-color-on-surface-variant))" />
                            <YAxis stroke="rgb(var(--md-sys-color-on-surface-variant))" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "rgb(var(--md-sys-color-surface))",
                                    border: "1px solid rgb(var(--md-sys-color-outline-variant))",
                                    borderRadius: "12px",
                                }}
                            />
                            <Legend />
                            <Bar dataKey="users" fill="rgb(var(--md-sys-color-primary))" name="Your Users" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="engagement" fill="rgb(var(--md-sys-color-secondary))" name="Industry Avg" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Activity Heatmap */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-surface rounded-3xl p-6 border border-outline-variant"
            >
                <h3 className="text-title-large font-semibold text-on-surface mb-4">Activity Heatmap</h3>
                <div className="overflow-x-auto">
                    <div className="inline-grid grid-cols-52 gap-1">
                        {heatmapData.map((cell, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.001 }}
                                className={cn(
                                    "w-3 h-3 rounded-sm cursor-pointer hover:ring-2 hover:ring-primary transition-all",
                                    cell.value === 0 && "bg-surface-variant",
                                    cell.value > 0 && cell.value <= 3 && "bg-primary/20",
                                    cell.value > 3 && cell.value <= 6 && "bg-primary/50",
                                    cell.value > 6 && "bg-primary"
                                )}
                                title={`${cell.value} contributions`}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-4 text-label-small text-on-surface-variant">
                    <span>Less</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-sm bg-surface-variant" />
                        <div className="w-3 h-3 rounded-sm bg-primary/20" />
                        <div className="w-3 h-3 rounded-sm bg-primary/50" />
                        <div className="w-3 h-3 rounded-sm bg-primary" />
                    </div>
                    <span>More</span>
                </div>
            </motion.div>
        </div>
    );
}
