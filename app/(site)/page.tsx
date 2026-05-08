import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CategoriesHome } from "@/components/CategoriesHome";
import { ProcessSection } from "@/components/ProcessSection";
import { AboutSnippet } from "@/components/AboutSnippet";
import { CertificationsStrip } from "@/components/CertificationsStrip";
import { InquirySection } from "@/components/InquirySection";
import { getFeaturedCategories, getFeaturedProducts } from "@/lib/repository";

export default async function HomePage() {
    const [categories, allProducts] = await Promise.all([
        getFeaturedCategories(4),
        getFeaturedProducts(9)
    ]);

    const heroProduct = allProducts[0] ?? null;
    const gridProducts = allProducts.slice(0, 6);
    const productOptions = allProducts.map((p) => ({ id: p.id, label: p.name }));

    return (
        <div>
            <Hero products={heroProduct ? [heroProduct] : []} />
            <TrustBar />
            <FeaturedProducts products={gridProducts} />
            <CategoriesHome categories={categories} />
            <ProcessSection />
            <AboutSnippet />
            <CertificationsStrip />
            <InquirySection productOptions={productOptions} />
        </div>
    );
}
