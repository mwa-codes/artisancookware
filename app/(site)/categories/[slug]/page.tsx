import { notFound } from "next/navigation";
import { CategoryProducts } from "@/components/CategoryProducts";
import { getCategoryBySlug, getProductsByCategorySlug } from "@/lib/repository";

interface CategoryPageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: CategoryPageProps) {
    const { slug } = params;
    const category = await getCategoryBySlug(slug);
    if (!category) {
        return {
            title: "Category Not Found | Artisan Cookware"
        };
    }

    return {
        title: `${category.name} | Artisan Cookware`,
        description: category.description ?? `${category.name} cookware collections from Artisan Cookware.`
    };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
    const { slug } = params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    const products = await getProductsByCategorySlug(slug);

    return (
        <div>
            <header className="bg-parchment border-b border-ink-20">
                <div className="container-site py-14 sm:py-16">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Collection</p>
                    <h1 className="font-heading text-display font-light text-ink">{category.name}</h1>
                    {category.description ? (
                        <p className="mt-6 max-w-3xl text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.6)]">
                            {category.description}
                        </p>
                    ) : null}
                </div>
            </header>

            <section className="bg-white">
                <div className="container-site py-14 sm:py-16">
                    <CategoryProducts products={products} />
                </div>
            </section>
        </div>
    );
}
