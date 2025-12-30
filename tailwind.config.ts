import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--md-sys-color-primary)",
        onPrimary: "var(--md-sys-color-on-primary)",
        primaryContainer: "var(--md-sys-color-primary-container)",
        onPrimaryContainer: "var(--md-sys-color-on-primary-container)",
        secondary: "var(--md-sys-color-secondary)",
        onSecondary: "var(--md-sys-color-on-secondary)",
        secondaryContainer: "var(--md-sys-color-secondary-container)",
        onSecondaryContainer: "var(--md-sys-color-on-secondary-container)",
        tertiary: "var(--md-sys-color-tertiary)",
        onTertiary: "var(--md-sys-color-on-tertiary)",
        tertiaryContainer: "var(--md-sys-color-tertiary-container)",
        onTertiaryContainer: "var(--md-sys-color-on-tertiary-container)",
        error: "var(--md-sys-color-error)",
        onError: "var(--md-sys-color-on-error)",
        errorContainer: "var(--md-sys-color-error-container)",
        onErrorContainer: "var(--md-sys-color-on-error-container)",
        background: "var(--md-sys-color-background)",
        onBackground: "var(--md-sys-color-on-background)",
        surface: "var(--md-sys-color-surface)",
        onSurface: "var(--md-sys-color-on-surface)",
        surfaceVariant: "var(--md-sys-color-surface-variant)",
        onSurfaceVariant: "var(--md-sys-color-on-surface-variant)",
        outline: "var(--md-sys-color-outline)",
        outlineVariant: "var(--md-sys-color-outline-variant)",
      },
      fontFamily: {
        sans: ["var(--font-google-sans)", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
