import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const robotoMono = Roboto_Mono({
    subsets: ["latin"],
    variable: "--font-roboto-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Material 3 Next.js App",
    description: "Next.js 14 application with Material Design 3",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    inter.variable,
                    robotoMono.variable
                )}
            >
                {children}
            </body>
        </html>
    );
}
