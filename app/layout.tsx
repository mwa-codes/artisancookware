import type { Metadata } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/context/CurrencyContext";

export const metadata: Metadata = {
    metadataBase: new URL("https://www.artisancookware.co"),
    title: {
        default: "Artisan Cookware | Premium Aluminium Cookware — Pakistan",
        template: "%s | Artisan Cookware"
    },
    description:
        "Premium aluminium cookware manufacturer in Gujranwala, Pakistan. ISO certified. Wholesale & B2B. Export-ready production. MOQ 50 units. FOB Karachi.",
    keywords: [
        "aluminium cookware",
        "cookware manufacturer Pakistan",
        "wholesale cookware",
        "B2B cookware",
        "Gujranwala cookware"
    ],
    openGraph: {
        type: "website",
        locale: "en_PK",
        url: "https://www.artisancookware.co",
        siteName: "Artisan Cookware",
        title: "Artisan Cookware | Premium Aluminium Cookware — Pakistan",
        description:
            "Premium aluminium cookware manufacturer in Gujranwala, Pakistan.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Artisan Cookware — premium aluminium cookware from Pakistan"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Artisan Cookware | Premium Aluminium Cookware — Pakistan",
        description: "Wholesale aluminium cookware from Gujranwala — ISO certified, export-ready.",
        images: ["/og-image.jpg"]
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-[#FEFEFE] font-body text-ink antialiased">
                <CurrencyProvider>{children}</CurrencyProvider>
            </body>
        </html>
    );
}
