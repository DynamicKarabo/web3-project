"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, Share2, ExternalLink, X, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Elevation } from "@/components/ui/elevation";

interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    category: "Web3" | "Frontend" | "Full Stack";
    tags: string[];
    github?: string;
    demo?: string;
    isFavorite: boolean;
}

const projectsData: Project[] = [
    {
        id: "1",
        title: "DeFi Dashboard",
        description: "Real-time cryptocurrency portfolio tracker with Web3 integration",
        longDescription: "A comprehensive DeFi dashboard built with Next.js and ethers.js. Features include real-time price tracking, portfolio analytics, and direct wallet integration for seamless transactions.",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
        category: "Web3",
        tags: ["React", "Web3.js", "Tailwind"],
        github: "https://github.com",
        demo: "https://demo.com",
        isFavorite: false,
    },
    {
        id: "2",
        title: "NFT Marketplace",
        description: "Decentralized marketplace for buying and selling NFTs",
        longDescription: "A full-featured NFT marketplace with smart contract integration, IPFS storage, and seamless wallet connectivity. Built with modern Web3 technologies.",
        image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&h=600&fit=crop",
        category: "Web3",
        tags: ["Solidity", "IPFS", "Next.js"],
        github: "https://github.com",
        isFavorite: true,
    },
    {
        id: "3",
        title: "Material Design System",
        description: "Comprehensive UI component library following Material Design 3",
        longDescription: "A complete design system implementation with 50+ components, dark mode support, and full accessibility compliance. Built with React and Tailwind CSS.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
        category: "Frontend",
        tags: ["React", "TypeScript", "Tailwind"],
        demo: "https://demo.com",
        isFavorite: false,
    },
    {
        id: "4",
        title: "E-Commerce Platform",
        description: "Full-stack online store with payment processing",
        longDescription: "Modern e-commerce solution with Stripe integration, inventory management, and admin dashboard. Features include real-time analytics and automated email notifications.",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
        category: "Full Stack",
        tags: ["Next.js", "Stripe", "PostgreSQL"],
        github: "https://github.com",
        demo: "https://demo.com",
        isFavorite: true,
    },
    {
        id: "5",
        title: "AI Content Generator",
        description: "GPT-powered content creation tool for marketers",
        longDescription: "An AI-powered platform that generates marketing copy, blog posts, and social media content. Integrates with OpenAI's GPT-4 API for high-quality outputs.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
        category: "Full Stack",
        tags: ["OpenAI", "React", "Node.js"],
        isFavorite: false,
    },
    {
        id: "6",
        title: "Smart Contract Auditor",
        description: "Automated security analysis for Solidity contracts",
        longDescription: "Security tool that analyzes smart contracts for common vulnerabilities and provides detailed reports with remediation suggestions.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
        category: "Web3",
        tags: ["Solidity", "Security", "Python"],
        github: "https://github.com",
        isFavorite: false,
    },
];

export function ProjectGallery() {
    const [projects, setProjects] = useState(projectsData);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const categories = ["Web3", "Frontend", "Full Stack"] as const;

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchesCategory = !selectedCategory || project.category === selectedCategory;
            const matchesSearch =
                !searchQuery ||
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [projects, selectedCategory, searchQuery]);

    const toggleFavorite = (id: string) => {
        setProjects((prev) =>
            prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-display-medium font-bold text-on-surface">Project Gallery</h2>
                <p className="text-body-large text-on-surface-variant mt-2">
                    Explore my latest work and side projects
                </p>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
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
                        All Projects
                    </motion.button>
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(category)}
                            className={cn(
                                "px-4 py-2 rounded-full text-label-large font-medium transition-colors",
                                selectedCategory === category
                                    ? "bg-primary text-on-primary"
                                    : "bg-surface-variant text-on-surface-variant hover:bg-surface-variant/70"
                            )}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-auto sm:min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                    <input
                        type="search"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={cn(
                            "w-full pl-10 pr-4 py-2.5 rounded-full",
                            "bg-surface-variant border border-outline-variant",
                            "text-on-surface placeholder:text-on-surface-variant",
                            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                            "transition-all duration-200"
                        )}
                    />
                </div>
            </div>

            {/* Project Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Elevation
                                level={1}
                                interactive
                                className="group overflow-hidden rounded-3xl cursor-pointer h-full flex flex-col"
                                onClick={() => setSelectedProject(project)}
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden bg-surface-variant">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />

                                    {/* Favorite Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(project.id);
                                        }}
                                        className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm"
                                    >
                                        <motion.div
                                            animate={{
                                                scale: project.isFavorite ? [1, 1.3, 1] : 1,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Heart
                                                className={cn(
                                                    "w-5 h-5 transition-colors",
                                                    project.isFavorite
                                                        ? "fill-error text-error"
                                                        : "text-on-surface-variant"
                                                )}
                                            />
                                        </motion.div>
                                    </motion.button>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-title-large font-semibold text-on-surface mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-body-medium text-on-surface-variant mb-4 flex-1">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 rounded-full text-label-small bg-secondary-container text-on-secondary-container"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        {project.github && (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex-1 px-4 py-2 rounded-full bg-surface-variant text-on-surface text-label-medium font-medium hover:bg-surface-variant/70 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Github className="w-4 h-4" />
                                                Code
                                            </motion.button>
                                        )}
                                        {project.demo && (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex-1 px-4 py-2 rounded-full bg-primary text-on-primary text-label-medium font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Demo
                                            </motion.button>
                                        )}
                                    </div>
                                </div>
                            </Elevation>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <p className="text-headline-small text-on-surface-variant">
                        No projects found matching your criteria
                    </p>
                </motion.div>
            )}

            {/* Detailed View Dialog */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-4xl w-full bg-surface rounded-3xl shadow-elevation-5 overflow-hidden my-8"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-surface/80 backdrop-blur-sm hover:bg-surface-variant transition-colors"
                            >
                                <X className="w-6 h-6 text-on-surface" />
                            </button>

                            <img
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                className="w-full h-64 object-cover"
                            />

                            <div className="p-8">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h2 className="text-display-small font-bold text-on-surface mb-2">
                                            {selectedProject.title}
                                        </h2>
                                        <span className="px-3 py-1 rounded-full text-label-medium bg-primary-container text-on-primary-container">
                                            {selectedProject.category}
                                        </span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-3 rounded-full bg-surface-variant hover:bg-surface-variant/70 transition-colors"
                                    >
                                        <Share2 className="w-6 h-6 text-on-surface" />
                                    </motion.button>
                                </div>

                                <p className="text-body-large text-on-surface mb-6">
                                    {selectedProject.longDescription}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {selectedProject.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-4 py-2 rounded-full text-label-large bg-secondary-container text-on-secondary-container"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    {selectedProject.github && (
                                        <motion.a
                                            href={selectedProject.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 px-6 py-3 rounded-full bg-surface-variant text-on-surface text-label-large font-medium hover:bg-surface-variant/70 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Github className="w-5 h-5" />
                                            View Code
                                        </motion.a>
                                    )}
                                    {selectedProject.demo && (
                                        <motion.a
                                            href={selectedProject.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 px-6 py-3 rounded-full bg-primary text-on-primary text-label-large font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                            Live Demo
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
