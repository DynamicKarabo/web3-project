"use client";

import { motion } from "framer-motion";
import { Shield, AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SecurityIssue {
    severity: "critical" | "high" | "medium" | "low" | "info";
    title: string;
    description: string;
    line: number;
    suggestion: string;
}

const mockIssues: SecurityIssue[] = [
    {
        severity: "high",
        title: "Missing Access Control",
        description: "The transfer function lacks proper access control mechanisms",
        line: 15,
        suggestion: "Add onlyOwner or role-based access control modifiers",
    },
    {
        severity: "medium",
        title: "Integer Overflow Risk",
        description: "Arithmetic operations without SafeMath could lead to overflow",
        line: 17,
        suggestion: "Use SafeMath library or Solidity 0.8+ built-in overflow checks",
    },
    {
        severity: "low",
        title: "Missing Event Emission",
        description: "State-changing function should emit an event",
        line: 15,
        suggestion: "Add event Transfer(address indexed from, address indexed to, uint256 amount)",
    },
    {
        severity: "info",
        title: "Gas Optimization",
        description: "Consider using calldata instead of memory for function parameters",
        line: 15,
        suggestion: "Change function parameter from 'memory' to 'calldata'",
    },
];

const severityConfig = {
    critical: { icon: AlertCircle, color: "text-error", bg: "bg-error/10" },
    high: { icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/20" },
    medium: { icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-900/20" },
    low: { icon: Info, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/20" },
    info: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/20" },
};

export function SecurityScanner() {
    const criticalCount = mockIssues.filter((i) => i.severity === "critical").length;
    const highCount = mockIssues.filter((i) => i.severity === "high").length;
    const mediumCount = mockIssues.filter((i) => i.severity === "medium").length;

    return (
        <div className="flex flex-col h-full bg-surface">
            <div className="px-4 py-3 border-b border-outline-variant">
                <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <h3 className="text-title-medium font-semibold text-on-surface">Security Scanner</h3>
                </div>
                <div className="flex gap-4 mt-2 text-label-small">
                    <span className="text-error">{criticalCount} Critical</span>
                    <span className="text-orange-600">{highCount} High</span>
                    <span className="text-yellow-600">{mediumCount} Medium</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {mockIssues.map((issue, index) => {
                    const config = severityConfig[issue.severity];
                    const Icon = config.icon;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "rounded-2xl p-4 border-2",
                                config.bg,
                                "border-outline-variant hover:border-primary transition-colors cursor-pointer"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", config.color)} />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="text-label-large font-semibold text-on-surface">
                                            {issue.title}
                                        </h4>
                                        <span className="text-label-small text-on-surface-variant">
                                            Line {issue.line}
                                        </span>
                                    </div>
                                    <p className="text-body-small text-on-surface-variant mb-2">
                                        {issue.description}
                                    </p>
                                    <div className="bg-surface rounded-xl p-3 mt-2">
                                        <p className="text-label-small font-medium text-on-surface mb-1">
                                            Suggestion:
                                        </p>
                                        <p className="text-body-small text-on-surface-variant">
                                            {issue.suggestion}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
