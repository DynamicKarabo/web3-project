"use client";

import { useState } from "react";
import { FileTree } from "./components/file-tree";
import { CodeEditor } from "./components/code-editor";
import { AIPanel } from "./components/ai-panel";
import { SecurityScanner } from "./components/security-scanner";
import { GasCalculator } from "./components/gas-calculator";
import { cn } from "@/lib/utils";

export default function CodeReviewPage() {
    const [selectedFile, setSelectedFile] = useState<string | null>("contracts/Token.sol");
    const [activeTab, setActiveTab] = useState<"ai" | "security" | "gas">("ai");

    return (
        <div className="h-screen flex flex-col bg-background">
            {/* Header */}
            <div className="h-14 border-b border-outline-variant bg-surface flex items-center px-4">
                <h1 className="text-title-large font-semibold text-on-surface">Code Review Environment</h1>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* File Tree Sidebar */}
                <div className="w-64 border-r border-outline-variant">
                    <FileTree selectedFile={selectedFile} onFileSelect={setSelectedFile} />
                </div>

                {/* Editor */}
                <div className="flex-1 flex flex-col">
                    {selectedFile && <CodeEditor filePath={selectedFile} />}
                </div>

                {/* Right Sidebar - Tools */}
                <div className="w-96 border-l border-outline-variant flex flex-col bg-surface">
                    {/* Tabs */}
                    <div className="border-b border-outline-variant">
                        <div className="flex p-2 gap-1">
                            {[
                                { id: "ai", label: "AI Assistant" },
                                { id: "security", label: "Security" },
                                { id: "gas", label: "Gas" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as "ai" | "security" | "gas")}
                                    className={cn(
                                        "flex-1 px-4 py-2 rounded-full text-label-large font-medium transition-colors",
                                        activeTab === tab.id
                                            ? "bg-secondary-container text-on-secondary-container"
                                            : "text-on-surface-variant hover:bg-surface-variant"
                                    )}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-hidden">
                        {activeTab === "ai" && <AIPanel />}
                        {activeTab === "security" && <SecurityScanner />}
                        {activeTab === "gas" && <GasCalculator />}
                    </div>
                </div>
            </div>
        </div>
    );
}
