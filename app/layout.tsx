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
        "Premium aluminium cookware manufacturer in Gujranwala, Pakistan. Hand-finished, batch-inspected. Wholesale & B2B. Export-ready production. MOQ 50 units.",
    keywords: [
        "aluminium cookware",
        "aluminium cookware manufacturer Pakistan",
        "aluminium utensils manufacturer",
        "aluminium utensils manufacturer Pakistan",
        "cookware manufacturer Pakistan",
        "cookware manufacturer Gujranwala",
        "wholesale aluminium cookware",
        "wholesale cookware",
        "B2B cookware",
        "B2B cookware supplier Pakistan",
        "non-stick cookware manufacturer",
        "cookware export Pakistan",
        "cookware sets wholesale",
        "anodised cookware manufacturer",
        "Pakistani cookware exporter",
        "metal finish cookware",
        "metal finish gift set",
        "15 piece kitchen set",
        "Gujranwala cookware",
        "Gujranwala cookware manufacturer",
        "Gujranwala cookware exporter",
        "Gujranwala cookware supplier",
        "Gujranwala cookware sets",
        "Gujranwala cookware sets exporter",
        "Gujranwala cookware sets supplier",
        "Gujranwala cookware sets exporter"
    ],
    authors: [{ name: "Artisan Cookware", url: "https://www.artisancookware.co" }],
    creator: "Artisan Cookware",
    publisher: "Artisan Cookware",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_GB",
        url: "https://www.artisancookware.co",
        siteName: "Artisan Cookware",
        title: "Artisan Cookware | Aluminium Cookware Manufacturer — Pakistan",
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
        description: "Wholesale aluminium cookware from Gujranwala — hand-inspected, export-ready.",
        images: ["/og-image.jpg"]
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Artisan Cookware",
        url: "https://www.artisancookware.co",
        logo: "https://www.artisancookware.co/Artisan-logo.jpg",
        description:
            "Aluminium cookware manufacturer in Gujranwala, Pakistan. Making premium cookware sets since 1998.",
        foundingDate: "1998",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Gujranwala",
            addressRegion: "Punjab",
            addressCountry: "PK",
        },
        contactPoint: [
            {
                "@type": "ContactPoint",
                telephone: "+92-301-6636557",
                contactType: "sales",
                availableLanguage: ["English", "Urdu"],
            },
            {
                "@type": "ContactPoint",
                email: "info@artisancookware.co",
                contactType: "customer support",
            },
        ],
        sameAs: ["https://wa.me/923016636557"],
    };

    return (
        <html lang="en-GB">
            <body className="min-h-screen bg-[#FEFEFE] font-body text-ink antialiased">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                <CurrencyProvider>{children}</CurrencyProvider>
            </body>
        </html>
    );
}
