import type { Metadata } from "next";
import { CategoryCard } from "@/components/CategoryCard";
import { getCategories, getCategoryProductCounts } from "@/lib/repository";

export const metadata: Metadata = {
    title: "Categories — Aluminium Cookware Ranges",
    description:
        "Four signature aluminium cookware categories: Non-Stick, Hard Anodised, Metal Finish, and Soda Finish. Wholesale pricing direct from our Gujranwala factory.",
    openGraph: {
        title: "Categories — Aluminium Cookware Ranges | Artisan Cookware",
        description:
            "Four premium cookware categories for wholesale buyers. Factory-direct from Gujranwala, Pakistan.",
    },
    alternates: {
        canonical: "https://www.artisancookware.co/categories",
    },
};

export default async function CategoriesPage() {
    const [categories, counts] = await Promise.all([getCategories(), getCategoryProductCounts()]);

    return (
        <div className="bg-white">
            <header className="border-b border-ink-20 bg-parchment">
                <div className="container-site py-14 sm:py-16">
                    <h1 className="font-heading text-display font-light text-ink">Categories</h1>
                    <p className="mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.6)]">
                        Signature aluminium finishes — each engineered for durability, heat response, and repeat manufacturing consistency across large orders.
                    </p>
                </div>
            </header>

            <section className="container-site py-14 sm:py-16">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} productCount={counts[category.id] ?? 0} />
                    ))}
                </div>
            </section>
        </div>
    );
}
