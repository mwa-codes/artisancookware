import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { AboutSnippet } from "@/components/AboutSnippet";
import { CompanyHighlights } from "@/components/CompanyHighlights";
import { getFeaturedCategories, getFeaturedProducts } from "@/lib/repository";
import { Award, Star } from "lucide-react";
import { HERO_FEATURED_PRODUCT_LIMIT, HOMEPAGE_FEATURED_PRODUCT_LIMIT } from "@/lib/constants";

export default async function HomePage() {
    const totalFeaturedLimit = HERO_FEATURED_PRODUCT_LIMIT + HOMEPAGE_FEATURED_PRODUCT_LIMIT;

    const [categories, featuredProducts] = await Promise.all([
        getFeaturedCategories(),
        getFeaturedProducts(totalFeaturedLimit)
    ]);

    const heroProducts = featuredProducts.slice(0, HERO_FEATURED_PRODUCT_LIMIT);

    const remainingProducts = featuredProducts.slice(HERO_FEATURED_PRODUCT_LIMIT);
    const heroIds = new Set(heroProducts.map((product) => product.id));

    const primaryGridProducts = remainingProducts.filter((product) => !heroIds.has(product.id)).slice(0, HOMEPAGE_FEATURED_PRODUCT_LIMIT);

    const products = (() => {
        if (primaryGridProducts.length >= HOMEPAGE_FEATURED_PRODUCT_LIMIT) {
            return primaryGridProducts;
        }

        const needed = HOMEPAGE_FEATURED_PRODUCT_LIMIT - primaryGridProducts.length;
        const fallbackPool = featuredProducts.filter((product) => !primaryGridProducts.some((item) => item.id === product.id));

        return [...primaryGridProducts, ...fallbackPool.slice(0, needed)];
    })();

    return (
        <div className="space-y-0">
            <Hero products={heroProducts} />

            <CompanyHighlights />

            <section className="relative overflow-hidden bg-gradient-to-br from-brand-black via-gray-900 to-brand-black py-32">
                {/* Vibrant background elements */}
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute left-1/4 top-0 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-gradient-radial from-brand-red/20 to-transparent blur-3xl animate-pulse" />
                    <div className="absolute right-1/4 bottom-0 h-[500px] w-[500px] translate-y-1/2 rounded-full bg-gradient-radial from-brand-gold/25 to-transparent blur-3xl animate-pulse animation-delay-1000" />
                </div>

                <div className="container-grid relative space-y-20">
                    <div className="text-center">
                        <div className="mb-8 inline-flex items-center gap-3 rounded-full border-2 border-brand-red/40 bg-gradient-to-r from-brand-red/20 via-brand-gold/20 to-brand-red/20 px-8 py-4 text-base font-black uppercase tracking-[0.12em] text-brand-gold backdrop-blur-md shadow-2xl shadow-brand-red/20 animate-pulse">
                            <Award className="h-6 w-6 animate-spin-slow" />
                            Premium Collections
                        </div>
                        <h2 className="text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                            <span className="block animate-fade-in-up">SIGNATURE</span>
                            <span className="block animate-fade-in-up animation-delay-300 bg-gradient-to-r from-brand-red via-brand-gold to-brand-red bg-clip-text text-transparent animate-shimmer">
                                COOKWARE
                            </span>
                            <span className="block animate-fade-in-up animation-delay-600 text-4xl text-brand-gold sm:text-5xl lg:text-6xl xl:text-7xl">
                                COLLECTIONS
                            </span>
                        </h2>
                        <p className="mx-auto mt-8 max-w-4xl animate-fade-in-up animation-delay-900 text-2xl leading-relaxed text-gray-300 sm:text-3xl">
                            Four distinctive ranges designed for <span className="text-brand-gold font-bold">Pakistani kitchens</span> — from classic anodised workhorses to contemporary <span className="text-brand-red font-bold">non-stick statements</span>.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-12 animate-fade-in-up animation-delay-1200 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {categories.map((category, index) => (
                            <div key={category.id} className="animate-fade-in-up" style={{ animationDelay: `${1500 + index * 200}ms` }}>
                                <CategoryCard category={category} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white py-32">
                {/* Dynamic background elements */}
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute right-1/3 top-1/4 h-[500px] w-[500px] rounded-full bg-gradient-radial from-brand-gold/15 to-transparent blur-3xl animate-bounce-slow" />
                    <div className="absolute left-1/3 bottom-1/4 h-[400px] w-[400px] rounded-full bg-gradient-radial from-brand-red/12 to-transparent blur-3xl animate-bounce-slow animation-delay-1000" />
                </div>

                <div className="container-grid relative space-y-20">
                    <div className="text-center">
                        <div className="mb-8 inline-flex items-center gap-3 rounded-full border-2 border-brand-gold/40 bg-gradient-to-r from-brand-gold/20 via-white/80 to-brand-gold/20 px-8 py-4 text-base font-black uppercase tracking-[0.12em] text-brand-gold backdrop-blur-md shadow-2xl shadow-brand-gold/20 animate-pulse">
                            <Star className="h-6 w-6 animate-spin-slow" />
                            Featured Products
                        </div>
                        <h2 className="text-5xl font-black leading-tight text-gray-900 sm:text-6xl lg:text-7xl xl:text-8xl">
                            <span className="block animate-fade-in-up">CRAFTSMANSHIP</span>
                            <span className="block animate-fade-in-up animation-delay-300 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">IN</span>
                            <span className="block animate-fade-in-up animation-delay-600 bg-gradient-to-r from-brand-red via-brand-gold to-brand-red bg-clip-text text-transparent animate-shimmer">
                                FOCUS
                            </span>
                        </h2>
                        <p className="mx-auto mt-8 max-w-4xl animate-fade-in-up animation-delay-900 text-2xl leading-relaxed text-gray-700 sm:text-3xl">
                            A curated selection of premium sets crafted for <span className="text-brand-red font-bold">wholesalers</span>, <span className="text-brand-gold font-bold">retailers</span>, and culinary professionals who demand <span className="text-brand-red font-bold">reliable performance</span>.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-16 animate-fade-in-up animation-delay-1200 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {products.map((product, index) => (
                            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${1500 + index * 200}ms` }}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-gradient-to-br from-brand-black via-gray-900 to-brand-black py-32">
                {/* Dynamic background elements */}
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute left-0 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-brand-red/20 to-transparent blur-3xl animate-pulse" />
                    <div className="absolute right-0 bottom-1/4 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-gradient-radial from-brand-gold/25 to-transparent blur-3xl animate-pulse animation-delay-1500" />
                </div>

                <div className="container-grid relative">
                    <AboutSnippet />
                </div>
            </section>
        </div>
    );
}
