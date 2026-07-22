import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CategoriesHome } from "@/components/CategoriesHome";
import { ProcessSection } from "@/components/ProcessSection";
import { AboutSnippet } from "@/components/AboutSnippet";
import { CertificationsStrip } from "@/components/CertificationsStrip";
import { InquirySection } from "@/components/InquirySection";
import { getCategoryProductCounts, getFeaturedCategories, getFeaturedProducts } from "@/lib/repository";

export const metadata: Metadata = {
    title: "Aluminium Cookware Manufacturer & Wholesale Exporter — Pakistan",
    description:
        "Aluminium cookware manufacturer & wholesale exporter in Gujranwala, Pakistan. Non-stick, hard-anodised, metal finish & soda finish cookware sets. OEM / private label, MOQ 50 units, FOB Karachi.",
    keywords: [
        "aluminium cookware",
        "aluminium cookware manufacturer",
        "metal finish gift set",
        "metal finish cookware",
        "anodized cookware",
        "anodised cookware",
        "dull cooking set",
        "nonstick cookware",
        "non stick cookware",
        "nonstick gift set",
    ],
    openGraph: {
        title: "Aluminium Cookware Manufacturer for Wholesale Buyers | Artisan Cookware",
        description:
            "Premium aluminium cookware, metal finish gift sets, anodized and dull cooking sets, non-stick cookware, and non-stick gift sets.",
        url: "https://www.artisancookware.co",
    },
    alternates: {
        canonical: "https://www.artisancookware.co",
    },
};

export default async function HomePage() {
    const [categories, allProducts, productCounts] = await Promise.all([
        getFeaturedCategories(4),
        getFeaturedProducts(9),
        getCategoryProductCounts(),
    ]);

    const heroProduct = allProducts[0] ?? null;
    const gridProducts = allProducts.slice(0, 6);
    const productOptions = allProducts.map((p) => ({ id: p.id, label: p.name }));
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Artisan Cookware",
        url: "https://www.artisancookware.co",
        description:
            "Premium aluminium cookware manufacturer in Gujranwala, Pakistan, serving wholesale buyers with export-ready production.",
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate:
                    "https://www.artisancookware.co/products?search={search_term_string}",
            },
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
            <Hero products={heroProduct ? [heroProduct] : []} />
            <TrustBar />
            <FeaturedProducts products={gridProducts} />
            <CategoriesHome categories={categories} productCounts={productCounts} />
            <ProcessSection />
            <AboutSnippet />
            <CertificationsStrip />
            <InquirySection productOptions={productOptions} />
        </div>
    );
}
