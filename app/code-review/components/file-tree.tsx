"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileNode {
    name: string;
    type: "file" | "folder";
    children?: FileNode[];
    path: string;
}

const sampleFileTree: FileNode[] = [
    {
        name: "contracts",
        type: "folder",
        path: "contracts",
        children: [
            { name: "Token.sol", type: "file", path: "contracts/Token.sol" },
            { name: "NFT.sol", type: "file", path: "contracts/NFT.sol" },
            { name: "Marketplace.sol", type: "file", path: "contracts/Marketplace.sol" },
        ],
    },
    {
        name: "test",
        type: "folder",
        path: "test",
        children: [
            { name: "Token.test.ts", type: "file", path: "test/Token.test.ts" },
            { name: "NFT.test.ts", type: "file", path: "test/NFT.test.ts" },
        ],
    },
    {
        name: "scripts",
        type: "folder",
        path: "scripts",
        children: [
            { name: "deploy.ts", type: "file", path: "scripts/deploy.ts" },
        ],
    },
    { name: "hardhat.config.ts", type: "file", path: "hardhat.config.ts" },
    { name: "package.json", type: "file", path: "package.json" },
];

interface FileTreeNodeProps {
    node: FileNode;
    level: number;
    selectedFile: string | null;
    onFileSelect: (path: string) => void;
}

function FileTreeNode({ node, level, selectedFile, onFileSelect }: FileTreeNodeProps) {
    const [isExpanded, setIsExpanded] = useState(level === 0);

    const handleClick = () => {
        if (node.type === "folder") {
            setIsExpanded(!isExpanded);
        } else {
            onFileSelect(node.path);
        }
    };

    const isSelected = selectedFile === node.path;

    return (
        <div>
            <motion.div
                whileHover={{ backgroundColor: "rgba(var(--md-sys-color-surface-variant) / 0.5)" }}
                onClick={handleClick}
                className={cn(
                    "flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors",
                    isSelected && "bg-secondary-container text-on-secondary-container"
                )}
                style={{ paddingLeft: `${level * 16 + 8}px` }}
            >
                {node.type === "folder" && (
                    <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronRight className="w-4 h-4 text-on-surface-variant" />
                    </motion.div>
                )}

                {node.type === "folder" ? (
                    isExpanded ? (
                        <FolderOpen className="w-4 h-4 text-primary" />
                    ) : (
                        <Folder className="w-4 h-4 text-on-surface-variant" />
                    )
                ) : (
                    <File className="w-4 h-4 text-on-surface-variant" />
                )}

                <span className={cn(
                    "text-label-large",
                    isSelected ? "font-medium" : "text-on-surface"
                )}>
                    {node.name}
                </span>
            </motion.div>

            <AnimatePresence>
                {node.type === "folder" && isExpanded && node.children && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        {node.children.map((child) => (
                            <FileTreeNode
                                key={child.path}
                                node={child}
                                level={level + 1}
                                selectedFile={selectedFile}
                                onFileSelect={onFileSelect}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface FileTreeProps {
    onFileSelect: (path: string) => void;
    selectedFile: string | null;
}

export function FileTree({ onFileSelect, selectedFile }: FileTreeProps) {
    return (
        <div className="h-full overflow-y-auto bg-surface border-r border-outline-variant p-2">
            <div className="mb-3 px-2">
                <h3 className="text-title-small font-semibold text-on-surface">Files</h3>
            </div>
            {sampleFileTree.map((node) => (
                <FileTreeNode
                    key={node.path}
                    node={node}
                    level={0}
                    selectedFile={selectedFile}
                    onFileSelect={onFileSelect}
                />
            ))}
        </div>
    );
}
