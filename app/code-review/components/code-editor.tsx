"use client";

import { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism-tomorrow.css";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Comment {
    id: string;
    line: number;
    author: string;
    text: string;
    timestamp: Date;
}

interface CodeEditorProps {
    filePath: string;
    initialCode?: string;
}

const sampleCode: Record<string, string> = {
    "contracts/Token.sol": `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    string public name = "MyToken";
    string public symbol = "MTK";
    uint256 public totalSupply = 1000000;
    
    mapping(address => uint256) public balanceOf;
    
    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }
    
    function transfer(address to, uint256 amount) public {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
    }
}`,
    "contracts/NFT.sol": `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFT {
    string public name = "MyNFT";
    string public symbol = "MNFT";
    uint256 public tokenCounter = 0;
    
    mapping(uint256 => address) public ownerOf;
    
    function mint() public {
        ownerOf[tokenCounter] = msg.sender;
        tokenCounter++;
    }
}`,
};

export function CodeEditor({ filePath, initialCode }: CodeEditorProps) {
    const [code, setCode] = useState(initialCode || sampleCode[filePath] || "// Select a file to view");
    const [comments, setComments] = useState<Comment[]>([
        {
            id: "1",
            line: 15,
            author: "Alice",
            text: "Consider adding an event emission here for better tracking",
            timestamp: new Date(),
        },
    ]);
    const [activeCommentLine, setActiveCommentLine] = useState<number | null>(null);
    const [newCommentText, setNewCommentText] = useState("");
    const [collaborators] = useState([
        { name: "Alice", color: "#FF6B6B", active: true },
        { name: "Bob", color: "#4ECDC4", active: false },
    ]);

    const language = filePath.endsWith(".sol") ? languages.solidity : languages.typescript;

    const addComment = (line: number) => {
        if (!newCommentText.trim()) return;

        const newComment: Comment = {
            id: Date.now().toString(),
            line,
            author: "You",
            text: newCommentText,
            timestamp: new Date(),
        };

        setComments([...comments, newComment]);
        setNewCommentText("");
        setActiveCommentLine(null);
    };

    const lineComments = comments.filter((c) => c.line === activeCommentLine);

    return (
        <div className="flex flex-col h-full bg-surface">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant">
                <div>
                    <h3 className="text-title-medium font-semibold text-on-surface">{filePath}</h3>
                    <p className="text-label-small text-on-surface-variant">Solidity • UTF-8</p>
                </div>

                {/* Collaboration Indicators */}
                <div className="flex items-center gap-2">
                    {collaborators.map((collab) => (
                        <motion.div
                            key={collab.name}
                            whileHover={{ scale: 1.1 }}
                            className="relative"
                            title={`${collab.name} ${collab.active ? "(active)" : ""}`}
                        >
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-label-small font-medium"
                                style={{ backgroundColor: collab.color }}
                            >
                                {collab.name[0]}
                            </div>
                            {collab.active && (
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-surface" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1 overflow-hidden flex">
                <div className="flex-1 overflow-auto relative">
                    <Editor
                        value={code}
                        onValueChange={setCode}
                        highlight={(code) => highlight(code, language, filePath.split('.').pop() || 'sol')}
                        padding={16}
                        className="font-mono text-body-medium"
                        style={{
                            minHeight: "100%",
                            backgroundColor: "rgb(var(--md-sys-color-surface))",
                            color: "rgb(var(--md-sys-color-on-surface))",
                        }}
                        textareaClassName="focus:outline-none"
                    />

                    {/* Comment Indicators */}
                    {comments.map((comment) => (
                        <motion.button
                            key={comment.id}
                            whileHover={{ scale: 1.2 }}
                            onClick={() => setActiveCommentLine(comment.line)}
                            className="absolute right-4 w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-elevation-2"
                            style={{ top: `${comment.line * 24 + 8}px` }}
                        >
                            <MessageSquare className="w-4 h-4" />
                        </motion.button>
                    ))}
                </div>

                {/* Comment Thread Panel */}
                <AnimatePresence>
                    {activeCommentLine !== null && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 400, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-l border-outline-variant bg-surface-variant overflow-hidden"
                        >
                            <div className="h-full flex flex-col p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-title-small font-semibold text-on-surface">
                                        Comments (Line {activeCommentLine})
                                    </h4>
                                    <button
                                        onClick={() => setActiveCommentLine(null)}
                                        className="p-1 rounded-full hover:bg-surface transition-colors"
                                    >
                                        <X className="w-5 h-5 text-on-surface-variant" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                                    {lineComments.map((comment) => (
                                        <div key={comment.id} className="bg-surface rounded-2xl p-3">
                                            <div className="flex items-start gap-2 mb-2">
                                                <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-label-large font-medium text-on-surface">
                                                            {comment.author}
                                                        </span>
                                                        <span className="text-label-small text-on-surface-variant">
                                                            {comment.timestamp.toLocaleTimeString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-body-medium text-on-surface mt-1">
                                                        {comment.text}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newCommentText}
                                        onChange={(e) => setNewCommentText(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && addComment(activeCommentLine)}
                                        placeholder="Add a comment..."
                                        className={cn(
                                            "flex-1 px-4 py-2 rounded-full",
                                            "bg-surface border border-outline-variant",
                                            "text-on-surface placeholder:text-on-surface-variant",
                                            "focus:outline-none focus:ring-2 focus:ring-primary"
                                        )}
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => addComment(activeCommentLine)}
                                        className="p-2 rounded-full bg-primary text-on-primary"
                                    >
                                        <Send className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
