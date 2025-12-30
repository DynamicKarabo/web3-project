"use client";

import { motion } from "framer-motion";
import { Fuel, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface GasMetric {
    function: string;
    current: number;
    optimized: number;
    savings: number;
}

const mockMetrics: GasMetric[] = [
    { function: "transfer()", current: 51234, optimized: 43567, savings: 15 },
    { function: "mint()", current: 89456, optimized: 78234, savings: 12.5 },
    { function: "approve()", current: 45678, optimized: 42134, savings: 7.8 },
];

export function GasCalculator() {
    const totalCurrent = mockMetrics.reduce((sum, m) => sum + m.current, 0);
    const totalOptimized = mockMetrics.reduce((sum, m) => sum + m.optimized, 0);
    const totalSavings = ((totalCurrent - totalOptimized) / totalCurrent * 100).toFixed(1);

    return (
        <div className="flex flex-col h-full bg-surface">
            <div className="px-4 py-3 border-b border-outline-variant">
                <div className="flex items-center gap-2">
                    <Fuel className="w-5 h-5 text-primary" />
                    <h3 className="text-title-medium font-semibold text-on-surface">Gas Optimizer</h3>
                </div>
                <p className="text-label-small text-on-surface-variant mt-1">
                    Potential savings: {totalSavings}%
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Summary Card */}
                <div className="rounded-2xl bg-primary/10 border-2 border-primary/20 p-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-label-large font-medium text-on-surface">Total Gas Usage</span>
                        <TrendingDown className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-label-small text-on-surface-variant mb-1">Current</p>
                            <p className="text-title-large font-bold text-on-surface">
                                {totalCurrent.toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-label-small text-on-surface-variant mb-1">Optimized</p>
                            <p className="text-title-large font-bold text-primary">
                                {totalOptimized.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Function Metrics */}
                <div className="space-y-3">
                    <h4 className="text-label-large font-semibold text-on-surface">Function Analysis</h4>
                    {mockMetrics.map((metric, index) => (
                        <motion.div
                            key={metric.function}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="rounded-2xl bg-surface-variant p-4"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-label-large font-medium text-on-surface font-mono">
                                    {metric.function}
                                </span>
                                <div className={cn(
                                    "flex items-center gap-1 px-2 py-1 rounded-full text-label-small font-medium",
                                    metric.savings > 10
                                        ? "bg-green-100 dark:bg-green-900/20 text-green-600"
                                        : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600"
                                )}>
                                    <TrendingDown className="w-3 h-3" />
                                    {metric.savings}%
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-body-small">
                                    <span className="text-on-surface-variant">Current</span>
                                    <span className="text-on-surface font-medium">{metric.current.toLocaleString()} gas</span>
                                </div>
                                <div className="flex items-center justify-between text-body-small">
                                    <span className="text-on-surface-variant">Optimized</span>
                                    <span className="text-primary font-medium">{metric.optimized.toLocaleString()} gas</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="h-2 bg-surface rounded-full overflow-hidden mt-2">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(metric.optimized / metric.current) * 100}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                        className="h-full bg-primary rounded-full"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Recommendations */}
                <div className="rounded-2xl bg-tertiary-container p-4">
                    <h4 className="text-label-large font-semibold text-on-tertiary-container mb-2">
                        Optimization Tips
                    </h4>
                    <ul className="space-y-2 text-body-small text-on-tertiary-container">
                        <li className="flex gap-2">
                            <span>•</span>
                            <span>Use uint256 instead of smaller uints for loop counters</span>
                        </li>
                        <li className="flex gap-2">
                            <span>•</span>
                            <span>Cache array length in loops to save gas</span>
                        </li>
                        <li className="flex gap-2">
                            <span>•</span>
                            <span>Use calldata instead of memory for read-only function parameters</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
