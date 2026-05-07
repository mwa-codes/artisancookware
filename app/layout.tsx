import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
    title: "Artisan Cookware | Premium Pakistani Cookware",
    description:
        "Artisan Cookware crafts durable, stylish cookware in Pakistan. Explore categories, product ranges, and connect with us for wholesale inquiries.",
    metadataBase: new URL("https://artisancookware.vercel.app")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={cn(playfair.variable, inter.variable)}>
            <body className="min-h-screen bg-white text-slate-900">
                <div className="flex min-h-screen flex-col">
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
