"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Mic,
    X,
    Clock,
    TrendingUp,
    FileCode,
    Folder,
    FileText,
    Filter,
    Command,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
    id: string;
    title: string;
    type: "project" | "code" | "docs";
    description: string;
    relevance: number;
}

const mockResults: SearchResult[] = [
    {
        id: "1",
        title: "DeFi Dashboard",
        type: "project",
        description: "Real-time cryptocurrency portfolio tracker",
        relevance: 95,
    },
    {
        id: "2",
        title: "Token.sol",
        type: "code",
        description: "ERC-20 token implementation",
        relevance: 88,
    },
    {
        id: "3",
        title: "Material Design 3 Guide",
        type: "docs",
        description: "Complete MD3 implementation guide",
        relevance: 82,
    },
];

const recentSearches = ["Next.js authentication", "Solidity best practices", "Tailwind dark mode"];

const typeIcons = {
    project: Folder,
    code: FileCode,
    docs: FileText,
};

const typeColors = {
    project: "text-primary",
    code: "text-secondary",
    docs: "text-tertiary",
};

export function SmartSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [searchHistory, setSearchHistory] = useState<string[]>(recentSearches);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Keyboard shortcut (Cmd/Ctrl + K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(true);
                setTimeout(() => inputRef.current?.focus(), 100);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Simulate search with loading
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        const timer = setTimeout(() => {
            const filtered = mockResults
                .filter((r) => {
                    const matchesQuery = r.title.toLowerCase().includes(query.toLowerCase()) ||
                        r.description.toLowerCase().includes(query.toLowerCase());
                    const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(r.type);
                    return matchesQuery && matchesFilter;
                })
                .sort((a, b) => b.relevance - a.relevance);

            setResults(filtered);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [query, selectedFilters]);

    const handleSearch = (searchQuery: string) => {
        if (!searchQuery.trim()) return;

        if (!searchHistory.includes(searchQuery)) {
            setSearchHistory([searchQuery, ...searchHistory.slice(0, 4)]);
        }
    };

    const deleteHistoryItem = (item: string) => {
        setSearchHistory(searchHistory.filter((h) => h !== item));
    };

    const toggleFilter = (filter: string) => {
        setSelectedFilters((prev) =>
            prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
        );
    };

    const simulateVoiceSearch = () => {
        setIsListening(true);
        setTimeout(() => {
            setQuery("voice search example");
            setIsListening(false);
        }, 2000);
    };

    return (
        <>
            {/* Search Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(true)}
                className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-full",
                    "bg-surface-variant border border-outline-variant",
                    "hover:bg-surface-variant/70 transition-colors",
                    "max-w-md w-full"
                )}
            >
                <Search className="w-5 h-5 text-on-surface-variant" />
                <span className="text-body-medium text-on-surface-variant flex-1 text-left">
                    Search projects, code, docs...
                </span>
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-surface text-label-small text-on-surface-variant">
                    <Command className="w-3 h-3" />
                    <span>K</span>
                </div>
            </motion.button>

            {/* Search Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: -20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: -20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-3xl bg-surface rounded-3xl shadow-elevation-5 overflow-hidden"
                        >
                            {/* Search Input */}
                            <div className="p-4 border-b border-outline-variant">
                                <div className="flex items-center gap-3">
                                    <Search className="w-6 h-6 text-on-surface-variant flex-shrink-0" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
                                        placeholder="Search anything..."
                                        className="flex-1 bg-transparent text-title-large text-on-surface placeholder:text-on-surface-variant focus:outline-none"
                                        autoFocus
                                    />

                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={simulateVoiceSearch}
                                        className={cn(
                                            "p-2 rounded-full transition-colors",
                                            isListening ? "bg-error text-on-error" : "hover:bg-surface-variant"
                                        )}
                                    >
                                        <motion.div
                                            animate={isListening ? { scale: [1, 1.2, 1] } : {}}
                                            transition={{ duration: 0.5, repeat: Infinity }}
                                        >
                                            <Mic className="w-5 h-5" />
                                        </motion.div>
                                    </motion.button>

                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className={cn(
                                            "p-2 rounded-full transition-colors",
                                            showFilters ? "bg-primary text-on-primary" : "hover:bg-surface-variant"
                                        )}
                                    >
                                        <Filter className="w-5 h-5" />
                                    </button>

                                    {query && (
                                        <motion.button
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            onClick={() => setQuery("")}
                                            className="p-2 rounded-full hover:bg-surface-variant"
                                        >
                                            <X className="w-5 h-5 text-on-surface-variant" />
                                        </motion.button>
                                    )}
                                </div>

                                {/* Filters */}
                                <AnimatePresence>
                                    {showFilters && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="flex gap-2 mt-3 overflow-hidden"
                                        >
                                            {["project", "code", "docs"].map((filter) => (
                                                <motion.button
                                                    key={filter}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => toggleFilter(filter)}
                                                    className={cn(
                                                        "px-3 py-1.5 rounded-full text-label-medium font-medium transition-colors capitalize",
                                                        selectedFilters.includes(filter)
                                                            ? "bg-primary text-on-primary"
                                                            : "bg-surface-variant text-on-surface-variant"
                                                    )}
                                                >
                                                    {filter}
                                                </motion.button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Results Area */}
                            <div className="max-h-96 overflow-y-auto">
                                {!query && searchHistory.length > 0 && (
                                    <div className="p-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Clock className="w-4 h-4 text-on-surface-variant" />
                                            <span className="text-label-large text-on-surface-variant">Recent Searches</span>
                                        </div>
                                        {searchHistory.map((item, index) => (
                                            <motion.div
                                                key={item}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-variant group cursor-pointer"
                                                onClick={() => setQuery(item)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <TrendingUp className="w-4 h-4 text-on-surface-variant" />
                                                    <span className="text-body-medium text-on-surface">{item}</span>
                                                </div>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteHistoryItem(item);
                                                    }}
                                                    className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-surface transition-opacity"
                                                >
                                                    <X className="w-4 h-4 text-on-surface-variant" />
                                                </motion.button>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                {/* Loading Skeletons */}
                                {isLoading && (
                                    <div className="p-4 space-y-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="animate-pulse">
                                                <div className="h-4 bg-surface-variant rounded w-3/4 mb-2" />
                                                <div className="h-3 bg-surface-variant rounded w-1/2" />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Search Results */}
                                {!isLoading && query && results.length > 0 && (
                                    <div className="p-4 space-y-2">
                                        {results.map((result, index) => {
                                            const Icon = typeIcons[result.type];
                                            return (
                                                <motion.div
                                                    key={result.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className="p-4 rounded-2xl hover:bg-surface-variant cursor-pointer group"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className={cn("p-2 rounded-xl bg-surface-variant", typeColors[result.type])}>
                                                            <Icon className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="text-body-large font-medium text-on-surface group-hover:text-primary transition-colors">
                                                                {result.title}
                                                            </h3>
                                                            <p className="text-body-small text-on-surface-variant mt-1">
                                                                {result.description}
                                                            </p>
                                                            <div className="flex items-center gap-2 mt-2">
                                                                <span className="text-label-small text-on-surface-variant capitalize">
                                                                    {result.type}
                                                                </span>
                                                                <span className="text-label-small text-on-surface-variant">•</span>
                                                                <span className="text-label-small text-primary">
                                                                    {result.relevance}% match
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* No Results */}
                                {!isLoading && query && results.length === 0 && (
                                    <div className="p-12 text-center">
                                        <Search className="w-12 h-12 text-on-surface-variant mx-auto mb-3 opacity-50" />
                                        <p className="text-body-large text-on-surface-variant">
                                            No results found for "{query}"
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-3 border-t border-outline-variant bg-surface-variant/30">
                                <div className="flex items-center justify-between text-label-small text-on-surface-variant">
                                    <div className="flex items-center gap-4">
                                        <span>↑↓ Navigate</span>
                                        <span>↵ Select</span>
                                        <span>ESC Close</span>
                                    </div>
                                    <span>{results.length} results</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
