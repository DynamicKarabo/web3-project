import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { NotificationProvider } from "@/components/ui/notification-context";
import { SafeAreaProvider } from "@/components/mobile/safe-area-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { AchievementToast } from "@/components/ui/achievement-toast";
import { EasterEggManager } from "@/components/ui/easter-egg-manager";
import Script from "next/script";

// Optimized font loading
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
    preload: true,
});

export const metadata: Metadata = {
    title: "Material 3 Next.js App",
    description: "Next.js 14 application with Material Design 3",
    metadataBase: new URL("https://example.com"),
    openGraph: {
        title: "Material 3 Next.js App",
        description: "Next.js 14 application with Material Design 3",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={inter.variable}>
            <body
                className={cn(
                    "min-h-screen bg-gradient-to-br from-background via-surface to-surface-variant font-sans antialiased",
                    "relative overflow-x-hidden"
                )}
            >
                {/* Noise texture overlay */}
                <div
                    className="pointer-events-none fixed inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />

                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NotificationProvider>
                        <SafeAreaProvider>
                            <div className="relative z-10 mx-auto max-w-[1920px]">
                                {children}
                            </div>
                            <CustomCursor />
                            {/* <AchievementToast /> */}
                            <EasterEggManager />
                        </SafeAreaProvider>
                    </NotificationProvider>
                </ThemeProvider>
                <Script
                    id="register-sw"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            if ('serviceWorker' in navigator) {
                                window.addEventListener('load', function() {
                                    navigator.serviceWorker.register('/sw.js').then(
                                        function(registration) {
                                            console.log('Service Worker registration successful with scope: ', registration.scope);
                                        },
                                        function(err) {
                                            console.log('Service Worker registration failed: ', err);
                                        }
                                    );
                                });
                            }
                        `,
                    }}
                />
            </body>
        </html>
    );
}
