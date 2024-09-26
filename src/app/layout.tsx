import { SessionProvider } from "next-auth/react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { TooltipProvider } from '@/components/ui';
import { Toaster } from '@/components/ui/sonner';
import AuthModal from '@/components/auth-modal';
import MAINTENANCE from "./maintenance/page";
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Wind AI",
    description: "Generate code using shadcn/nextui/tailwindcss",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionProvider>
            <TooltipProvider>
                <html lang="en">
                    <head>
                        <link rel="icon" href="favicon.ico" type="image/ico" sizes="32x32" />
                        {/* //TODO remove scripts after fixing the bug in iframe */}
                        <Script
                            type="module"
                            src={"https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"}
                            strategy="afterInteractive"
                        />
                        <Script
                            noModule
                            src={"https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"}
                            strategy="afterInteractive"
                        />
                    </head>
                    <body className={inter.className}>
                        <Toaster richColors expand />
                        {
                            (process.env.MAINTENANCE === "MAINTENANCE")?(
                                <MAINTENANCE />
                            ):(
                                <>
                                {children}
                                <AuthModal />
                                </>
                            )
                        }
                        <Analytics />
                        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
                    </body>
                </html>
            </TooltipProvider>
        </SessionProvider>
    );
}
