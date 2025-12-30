# Material 3 Next.js Application 🎨

> A premium, production-ready web application built with Next.js 14, TypeScript, and Material Design 3.

![Project Banner](/opengraph-image.png)

## ✨ Overview

This project demonstrates a high-performance, aesthetically pleasing web application that bridges the gap between complex functionality and intuitive design. It features a complete Google-inspired interface, advanced animations, and a suite of "billion-dollar" polish features.

## 🚀 Key Features

### 💎 Premium Mobile Experience
- **Progressive Web App (PWA)**: Installable on iOS/Android with offline capabilities.
- **Native Interactions**: Physics-based **Pull-to-Refresh**, haptic feedback, and touch-optimized navigation.
- **Safe Area Handling**: Smart adaptation for notched devices.

### 🎨 Advanced UI/UX
- **Material Design 3**: Full implementation of Google's latest design system.
- **Microinteractions**: 15+ custom Framer Motion animations (Ripple, Morph, Focus Ring).
- **Onboarding Wizard**: mult-step flow with avatar upload and skills assessment.
- **Themes**: System-aware dark/light mode with smooth transitions.

### ⚡ Performance First
- **Core Web Vitals**: Optimized for LCP, FID, and CLS.
- **Smart Loading**: Route-based skeleton screens and progressive hydration.
- **Optimized Assets**: Next.js Image and Font optimization (Inter & Roboto Mono).
- **Bundle Analysis**: Automated checks to keep JavaScript bundles small.

### 🛠️ Developer Tools
- **Code Review Environment**: VS Code-like editor with syntax highlighting and gas optimization metrics.
- **Analytics Dashboard**: Real-time data visualization with Recharts and GitHub-style heatmaps.
- **Smart Search**: `Cmd+K` global command palette with fuzzy search.

### 🥚 Easter Eggs & Polish
- **Developer Mode**: Konami Code (`↑↑↓↓←→←→ba`) activation.
- **Gamification**: Built-in achievement system with global toast notifications.
- **Custom Cursor**: Desktop-only particle trail effect.
- **Download Manager**: Client-side data export utility.

## 🏗️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + CSS Variables
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)

## 📂 Project Structure

```bash
├── app/                  # App Router pages & layouts
│   ├── (dashboard)/      # Main application routes
│   ├── onboarding/       # Standalone onboarding flow
│   ├── layout.tsx        # Root layout with providers
│   └── globals.css       # Global styles & tailwind
├── components/           # Reusable UI components
│   ├── layout/           # Sidebar, Navbar, etc.
│   ├── mobile/           # Mobile-specific components
│   └── ui/               # Design system primitives
├── lib/                  # Utilities & Hooks
│   ├── animations.ts     # Animation variants
│   ├── mobile.ts         # Haptics & Safe Area utils
│   └── performance.tsx   # Performance helpers
└── public/               # Static assets & PWA manifest
```

## 🔗 Quick Links

- [Installation Guide](./INSTALLATION.md)
- [Performance Report](./PERFORMANCE.md)

---
*Built by Antigravity*
