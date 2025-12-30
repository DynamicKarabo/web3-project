"use client";

import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Code, Blocks, Wrench, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Skill {
    id: string;
    name: string;
    level: number;
    category: "Frontend" | "Blockchain" | "Tools";
    description: string;
    projects: number;
}

const skillsData: Skill[] = [
    { id: "1", name: "React", level: 95, category: "Frontend", description: "Building complex UIs with hooks and context", projects: 24 },
    { id: "2", name: "TypeScript", level: 90, category: "Frontend", description: "Type-safe development with advanced patterns", projects: 20 },
    { id: "3", name: "Next.js", level: 88, category: "Frontend", description: "Full-stack React framework with SSR/SSG", projects: 15 },
    { id: "4", name: "Tailwind CSS", level: 92, category: "Frontend", description: "Utility-first CSS framework", projects: 18 },
    { id: "5", name: "Solidity", level: 75, category: "Blockchain", description: "Smart contract development", projects: 8 },
    { id: "6", name: "Web3.js", level: 80, category: "Blockchain", description: "Ethereum blockchain interaction", projects: 10 },
    { id: "7", name: "Hardhat", level: 70, category: "Blockchain", description: "Ethereum development environment", projects: 6 },
    { id: "8", name: "Git", level: 85, category: "Tools", description: "Version control and collaboration", projects: 30 },
    { id: "9", name: "Figma", level: 78, category: "Tools", description: "UI/UX design and prototyping", projects: 12 },
];

const categoryIcons = {
    Frontend: Code,
    Blockchain: Blocks,
    Tools: Wrench,
};

const categoryColors = {
    Frontend: "bg-primary/10 text-primary border-primary/20",
    Blockchain: "bg-secondary/10 text-secondary border-secondary/20",
    Tools: "bg-tertiary/10 text-tertiary border-tertiary/20",
};

export function SkillsMatrix() {
    const [skills, setSkills] = useState(skillsData);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    const filteredSkills = selectedCategory
        ? skills.filter((s) => s.category === selectedCategory)
        : skills;

    const categories = ["Frontend", "Blockchain", "Tools"] as const;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-headline-large font-bold text-on-surface">Skills Matrix</h2>
                    <p className="text-body-medium text-on-surface-variant mt-1">
                        Drag to reorder by priority
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex gap-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(null)}
                        className={cn(
                            "px-4 py-2 rounded-full text-label-large font-medium transition-colors",
                            selectedCategory === null
                                ? "bg-primary text-on-primary"
                                : "bg-surface-variant text-on-surface-variant hover:bg-surface-variant/70"
                        )}
                    >
                        All
                    </motion.button>
                    {categories.map((category) => {
                        const Icon = categoryIcons[category];
                        return (
                            <motion.button
                                key={category}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCategory(category)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-label-large font-medium transition-colors flex items-center gap-2",
                                    selectedCategory === category
                                        ? "bg-primary text-on-primary"
                                        : "bg-surface-variant text-on-surface-variant hover:bg-surface-variant/70"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                {category}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Skills Grid */}
            <Reorder.Group
                axis="y"
                values={filteredSkills}
                onReorder={setSkills}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                <AnimatePresence mode="popLayout">
                    {filteredSkills.map((skill) => {
                        const Icon = categoryIcons[skill.category];
                        const isHovered = hoveredSkill === skill.id;

                        return (
                            <Reorder.Item
                                key={skill.id}
                                value={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ scale: 1.02 }}
                                onMouseEnter={() => setHoveredSkill(skill.id)}
                                onMouseLeave={() => setHoveredSkill(null)}
                                onClick={() => setSelectedSkill(skill)}
                                className="cursor-pointer"
                            >
                                <motion.div
                                    layout
                                    className={cn(
                                        "relative p-6 rounded-2xl border-2 transition-all duration-200",
                                        categoryColors[skill.category],
                                        "hover:shadow-elevation-2"
                                    )}
                                >
                                    {/* Category Badge */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <Icon className="w-5 h-5" />
                                            <span className="text-label-small font-medium opacity-70">
                                                {skill.category}
                                            </span>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: isHovered ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ChevronDown className="w-4 h-4 opacity-50" />
                                        </motion.div>
                                    </div>

                                    {/* Skill Name */}
                                    <h3 className="text-title-large font-semibold mb-3">{skill.name}</h3>

                                    {/* Progress Bar */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-label-small">
                                            <span className="opacity-70">Proficiency</span>
                                            <span className="font-semibold">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 bg-surface-variant/50 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
                                                className="h-full bg-current rounded-full"
                                            />
                                        </div>
                                    </div>

                                    {/* Hover Details */}
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="mt-4 pt-4 border-t border-current/20"
                                            >
                                                <p className="text-body-small opacity-80 mb-2">{skill.description}</p>
                                                <div className="flex items-center gap-4 text-label-small">
                                                    <span className="opacity-70">
                                                        {skill.projects} projects
                                                    </span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </Reorder.Item>
                        );
                    })}
                </AnimatePresence>
            </Reorder.Group>

            {/* Detailed View Modal */}
            <AnimatePresence>
                {selectedSkill && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedSkill(null)}
                        className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className={cn(
                                "relative max-w-2xl w-full p-8 rounded-3xl border-2",
                                categoryColors[selectedSkill.category],
                                "shadow-elevation-4"
                            )}
                        >
                            <button
                                onClick={() => setSelectedSkill(null)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-variant/50 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex items-start gap-4 mb-6">
                                {(() => {
                                    const Icon = categoryIcons[selectedSkill.category];
                                    return <Icon className="w-12 h-12" />;
                                })()}
                                <div>
                                    <h2 className="text-display-small font-bold">{selectedSkill.name}</h2>
                                    <p className="text-body-large opacity-70 mt-1">{selectedSkill.category}</p>
                                </div>
                            </div>

                            <p className="text-body-large mb-6">{selectedSkill.description}</p>

                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div>
                                    <div className="text-label-small opacity-70 mb-2">Proficiency Level</div>
                                    <div className="text-display-medium font-bold">{selectedSkill.level}%</div>
                                </div>
                                <div>
                                    <div className="text-label-small opacity-70 mb-2">Projects Completed</div>
                                    <div className="text-display-medium font-bold">{selectedSkill.projects}</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-label-medium opacity-70 mb-3">Skill Progress</div>
                                <div className="h-4 bg-surface-variant/50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${selectedSkill.level}%` }}
                                        transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
                                        className="h-full bg-current rounded-full"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
