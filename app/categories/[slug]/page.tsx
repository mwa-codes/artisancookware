import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
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
        title: `${category.name} Cookware | Artisan Cookware`,
        description: category.description ?? `${category.name} cookware collections from Artisan Cookware.`
    };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
    const { slug } = params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    const resolvedCategory = category!;

    const products = await getProductsByCategorySlug(slug);

    return (
        <div className="container-grid space-y-12 py-16">
            <SectionHeading
                eyebrow="Collection"
                title={`${resolvedCategory.name} Cookware`}
                description={
                    resolvedCategory.description ?? "Explore cookware engineered for balance, durability, and heat performance."
                }
                align="center"
            />

            {products.length ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="rounded-3xl border border-dashed border-brand-primary/40 bg-brand-light/40 p-10 text-center">
                    <p className="text-base font-medium text-brand-primary">We are curating new pieces for this category.</p>
                    <p className="mt-2 text-sm text-slate-600">
                        Reach out via WhatsApp for custom orders or upcoming production schedules.
                    </p>
                </div>
            )}
        </div>
    );
}
