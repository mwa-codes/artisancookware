import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CategoriesHome } from "@/components/CategoriesHome";
import { ProcessSection } from "@/components/ProcessSection";
import { AboutSnippet } from "@/components/AboutSnippet";
import { CertificationsStrip } from "@/components/CertificationsStrip";
import { InquirySection } from "@/components/InquirySection";
import { getCategoryProductCounts, getFeaturedCategories, getFeaturedProducts } from "@/lib/repository";

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
