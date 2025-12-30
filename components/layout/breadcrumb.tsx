"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 px-4 md:px-6 py-3">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                        className="flex items-center gap-2"
                    >
                        {item.href && !isLast ? (
                            <Link
                                href={item.href}
                                className={cn(
                                    "text-body-medium text-on-surface-variant",
                                    "hover:text-primary transition-colors"
                                )}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className={cn(
                                    "text-body-medium",
                                    isLast ? "text-on-surface font-medium" : "text-on-surface-variant"
                                )}
                            >
                                {item.label}
                            </span>
                        )}

                        {!isLast && (
                            <ChevronRight className="w-4 h-4 text-on-surface-variant" />
                        )}
                    </motion.div>
                );
            })}
        </nav>
    );
}
