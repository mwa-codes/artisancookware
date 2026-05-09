import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryProducts } from "@/components/CategoryProducts";
import { getCategoryBySlug, getProductsByCategorySlug } from "@/lib/repository";

/** Admin-edited descriptions must show immediately after save (no stale static shell). */
export const dynamic = "force-dynamic";

interface CategoryPageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const category = await getCategoryBySlug(params.slug);
    if (!category) return { title: "Category Not Found" };

    const title = `${category.name} Cookware — Wholesale Sets`;
    const intro = category.description?.trim();
    const description = intro
        ? `${intro.slice(0, 150)}${intro.length > 150 ? "…" : ""}. Direct from manufacturer in Gujranwala, Pakistan. MOQ 50 units.`
        : `${category.name} aluminium cookware sets for wholesale buyers. Manufacturer in Gujranwala, Pakistan. MOQ 50 units.`;

    return {
        title,
        description,
        openGraph: {
            title: `${title} | Artisan Cookware`,
            description,
        },
        alternates: {
            canonical: `https://www.artisancookware.co/categories/${params.slug}`,
        },
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
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Category</p>
                    <h1 className="font-heading text-display font-light text-ink">{category.name}</h1>
                    {category.description?.trim() ? (
                        <p className="mt-6 text-sm text-muted-foreground max-w-2xl whitespace-pre-line leading-relaxed">
                            {category.description.trim()}
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
