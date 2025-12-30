"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Code,
    Github,
    Settings,
    Check,
    ChevronRight,
    Upload,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingStep {
    id: number;
    title: string;
    icon: React.ElementType;
    description: string;
}

const steps: OnboardingStep[] = [
    {
        id: 1,
        title: "Profile Setup",
        icon: User,
        description: "Tell us about yourself",
    },
    {
        id: 2,
        title: "Select Skills",
        icon: Code,
        description: "Choose your expertise",
    },
    {
        id: 3,
        title: "Connect GitHub",
        icon: Github,
        description: "Link your repositories",
    },
    {
        id: 4,
        title: "Preferences",
        icon: Settings,
        description: "Customize your experience",
    },
];

const availableSkills = [
    "React", "TypeScript", "Next.js", "Tailwind CSS",
    "Solidity", "Web3.js", "Node.js", "Python",
    "GraphQL", "PostgreSQL", "MongoDB", "Docker"
];

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isCompleted, setIsCompleted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        avatar: null as string | null,
        skills: [] as string[],
        githubConnected: false,
        theme: "system",
        notifications: true,
    });

    const progress = (currentStep / steps.length) * 100;

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsCompleted(true);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSkip = () => {
        setIsCompleted(true);
    };

    const toggleSkill = (skill: string) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter((s) => s !== skill)
                : [...prev.skills, skill],
        }));
    };

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, avatar: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    if (isCompleted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-tertiary/10 p-4">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", duration: 1 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 360],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-32 h-32 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
                    >
                        <Sparkles className="w-16 h-16 text-primary" />
                    </motion.div>
                    <h1 className="text-display-large font-bold text-on-surface mb-4">
                        Welcome Aboard! 🎉
                    </h1>
                    <p className="text-headline-small text-on-surface-variant mb-8">
                        You're all set to start your journey
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = "/"}
                        className="px-8 py-4 rounded-full bg-primary text-on-primary text-label-large font-medium shadow-elevation-3"
                    >
                        Go to Dashboard
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4">
            <div className="max-w-4xl mx-auto py-8">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <div
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                        currentStep > step.id
                                            ? "bg-primary text-on-primary"
                                            : currentStep === step.id
                                                ? "bg-primary text-on-primary ring-4 ring-primary/20"
                                                : "bg-surface-variant text-on-surface-variant"
                                    )}
                                >
                                    {currentStep > step.id ? (
                                        <Check className="w-5 h-5" />
                                    ) : (
                                        <step.icon className="w-5 h-5" />
                                    )}
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="w-16 md:w-32 h-1 mx-2 bg-surface-variant overflow-hidden">
                                        <motion.div
                                            className="h-full bg-primary"
                                            initial={{ width: 0 }}
                                            animate={{ width: currentStep > step.id ? "100%" : "0%" }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="h-2 bg-surface-variant rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-surface rounded-3xl p-8 shadow-elevation-2 mb-6"
                    >
                        <h2 className="text-display-small font-bold text-on-surface mb-2">
                            {steps[currentStep - 1].title}
                        </h2>
                        <p className="text-body-large text-on-surface-variant mb-8">
                            {steps[currentStep - 1].description}
                        </p>

                        {/* Step 1: Profile Setup */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="flex justify-center mb-6">
                                    <div className="relative">
                                        <div className="w-32 h-32 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden">
                                            {formData.avatar ? (
                                                <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-16 h-16 text-on-surface-variant" />
                                            )}
                                        </div>
                                        <label className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-on-primary cursor-pointer shadow-elevation-2">
                                            <Upload className="w-5 h-5" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleAvatarUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-label-large text-on-surface mb-2 block">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl bg-surface-variant border border-outline-variant text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label className="text-label-large text-on-surface mb-2 block">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl bg-surface-variant border border-outline-variant text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Skills Selection */}
                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <p className="text-body-medium text-on-surface-variant mb-4">
                                    Select all skills that apply to you
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {availableSkills.map((skill) => (
                                        <motion.button
                                            key={skill}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => toggleSkill(skill)}
                                            className={cn(
                                                "px-4 py-3 rounded-2xl text-label-large font-medium transition-all",
                                                formData.skills.includes(skill)
                                                    ? "bg-primary text-on-primary shadow-elevation-2"
                                                    : "bg-surface-variant text-on-surface-variant hover:bg-surface-variant/70"
                                            )}
                                        >
                                            {skill}
                                        </motion.button>
                                    ))}
                                </div>
                                <p className="text-label-small text-on-surface-variant mt-4">
                                    Selected: {formData.skills.length} skills
                                </p>
                            </div>
                        )}

                        {/* Step 3: GitHub Connection */}
                        {currentStep === 3 && (
                            <div className="text-center space-y-6">
                                <div className="w-24 h-24 mx-auto rounded-full bg-surface-variant flex items-center justify-center">
                                    <Github className="w-12 h-12 text-on-surface-variant" />
                                </div>
                                <p className="text-body-large text-on-surface-variant">
                                    Connect your GitHub account to import repositories and showcase your work
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setFormData({ ...formData, githubConnected: true })}
                                    className={cn(
                                        "px-8 py-4 rounded-full text-label-large font-medium transition-all",
                                        formData.githubConnected
                                            ? "bg-green-600 text-white"
                                            : "bg-surface-variant text-on-surface hover:bg-surface-variant/70"
                                    )}
                                >
                                    {formData.githubConnected ? (
                                        <>
                                            <Check className="w-5 h-5 inline mr-2" />
                                            Connected
                                        </>
                                    ) : (
                                        "Connect GitHub"
                                    )}
                                </motion.button>
                            </div>
                        )}

                        {/* Step 4: Preferences */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="text-label-large text-on-surface mb-3 block">Theme Preference</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {["light", "dark", "system"].map((theme) => (
                                            <motion.button
                                                key={theme}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setFormData({ ...formData, theme })}
                                                className={cn(
                                                    "px-4 py-3 rounded-2xl text-label-large font-medium capitalize transition-all",
                                                    formData.theme === theme
                                                        ? "bg-primary text-on-primary"
                                                        : "bg-surface-variant text-on-surface-variant"
                                                )}
                                            >
                                                {theme}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-variant">
                                    <div>
                                        <h3 className="text-label-large font-medium text-on-surface">Enable Notifications</h3>
                                        <p className="text-body-small text-on-surface-variant">Get updates about your activity</p>
                                    </div>
                                    <button
                                        onClick={() => setFormData({ ...formData, notifications: !formData.notifications })}
                                        className={cn(
                                            "w-12 h-6 rounded-full transition-all relative",
                                            formData.notifications ? "bg-primary" : "bg-outline"
                                        )}
                                    >
                                        <motion.div
                                            className="w-5 h-5 rounded-full bg-white absolute top-0.5"
                                            animate={{ left: formData.notifications ? "26px" : "2px" }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={handleSkip}
                        className="text-label-large text-on-surface-variant hover:text-on-surface transition-colors"
                    >
                        Skip for now
                    </button>

                    <div className="flex gap-3">
                        {currentStep > 1 && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleBack}
                                className="px-6 py-3 rounded-full bg-surface-variant text-on-surface text-label-large font-medium"
                            >
                                Back
                            </motion.button>
                        )}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleNext}
                            className="px-6 py-3 rounded-full bg-primary text-on-primary text-label-large font-medium flex items-center gap-2"
                        >
                            {currentStep === steps.length ? "Complete" : "Next"}
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}
