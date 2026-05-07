import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CategoriesHome } from "@/components/CategoriesHome";
import { ProcessSection } from "@/components/ProcessSection";
import { AboutSnippet } from "@/components/AboutSnippet";
import { CertificationsStrip } from "@/components/CertificationsStrip";
import { InquirySection } from "@/components/InquirySection";
import { getFeaturedCategories, getFeaturedProducts } from "@/lib/repository";
import { HERO_FEATURED_PRODUCT_LIMIT, HOMEPAGE_FEATURED_PRODUCT_LIMIT } from "@/lib/constants";

export default async function HomePage() {
    const totalFeaturedLimit = HERO_FEATURED_PRODUCT_LIMIT + HOMEPAGE_FEATURED_PRODUCT_LIMIT;

    const [categories, featuredProducts] = await Promise.all([
        getFeaturedCategories(4),
        getFeaturedProducts(totalFeaturedLimit)
    ]);

    const heroProducts = featuredProducts.slice(0, HERO_FEATURED_PRODUCT_LIMIT);

    const remainingProducts = featuredProducts.slice(HERO_FEATURED_PRODUCT_LIMIT);
    const heroIds = new Set(heroProducts.map((product) => product.id));

    const primaryGridProducts = remainingProducts.filter((product) => !heroIds.has(product.id)).slice(0, HOMEPAGE_FEATURED_PRODUCT_LIMIT);

    const gridProducts = (() => {
        if (primaryGridProducts.length >= HOMEPAGE_FEATURED_PRODUCT_LIMIT) {
            return primaryGridProducts;
        }

        const needed = HOMEPAGE_FEATURED_PRODUCT_LIMIT - primaryGridProducts.length;
        const fallbackPool = featuredProducts.filter((product) => !primaryGridProducts.some((item) => item.id === product.id));

        return [...primaryGridProducts, ...fallbackPool.slice(0, needed)];
    })();

    const productOptions = featuredProducts.map((p) => ({ id: p.id, label: p.name }));

    return (
        <div>
            <Hero products={heroProducts} />
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
