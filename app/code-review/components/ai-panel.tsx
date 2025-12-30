"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const mockResponses = [
    "I've analyzed your smart contract. Here are some suggestions:\n\n1. Add input validation for the `transfer` function\n2. Consider using SafeMath for arithmetic operations\n3. Implement access control for sensitive functions",
    "The gas optimization looks good. You could save approximately 15% by using `uint256` instead of `uint8` for loop counters.",
    "I recommend adding events for all state-changing functions to improve transparency and enable better off-chain tracking.",
];

export function AIPanel() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hi! I'm your AI code review assistant. Ask me anything about your smart contract code, security, or gas optimization.",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: Message = {
                role: "assistant",
                content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
            };
            setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="flex flex-col h-full bg-surface">
            <div className="px-4 py-3 border-b border-outline-variant">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="text-title-medium font-semibold text-on-surface">AI Assistant</h3>
                </div>
                <p className="text-label-small text-on-surface-variant mt-1">
                    Powered by advanced code analysis
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                            "flex gap-3",
                            message.role === "user" ? "justify-end" : "justify-start"
                        )}
                    >
                        {message.role === "assistant" && (
                            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-4 h-4" />
                            </div>
                        )}

                        <div
                            className={cn(
                                "max-w-[80%] rounded-2xl px-4 py-3 relative group",
                                message.role === "user"
                                    ? "bg-primary text-on-primary"
                                    : "bg-surface-variant text-on-surface"
                            )}
                        >
                            <p className="text-body-medium whitespace-pre-wrap">{message.content}</p>

                            {message.role === "assistant" && (
                                <button
                                    onClick={() => copyToClipboard(message.content, index)}
                                    className="absolute top-2 right-2 p-1.5 rounded-full bg-surface/50 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    {copiedIndex === index ? (
                                        <Check className="w-4 h-4 text-green-600" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-on-surface-variant" />
                                    )}
                                </button>
                            )}
                        </div>

                        {message.role === "user" && (
                            <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center flex-shrink-0">
                                U
                            </div>
                        )}
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="bg-surface-variant rounded-2xl px-4 py-3">
                            <div className="flex gap-1">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                    className="w-2 h-2 rounded-full bg-on-surface-variant"
                                />
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                    className="w-2 h-2 rounded-full bg-on-surface-variant"
                                />
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                    className="w-2 h-2 rounded-full bg-on-surface-variant"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="p-4 border-t border-outline-variant">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Ask about code quality, security, or optimizations..."
                        className={cn(
                            "flex-1 px-4 py-2.5 rounded-full",
                            "bg-surface-variant border border-outline-variant",
                            "text-on-surface placeholder:text-on-surface-variant",
                            "focus:outline-none focus:ring-2 focus:ring-primary"
                        )}
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className={cn(
                            "p-2.5 rounded-full",
                            input.trim()
                                ? "bg-primary text-on-primary"
                                : "bg-surface-variant text-on-surface-variant cursor-not-allowed"
                        )}
                    >
                        <Send className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
