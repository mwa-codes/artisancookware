import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryProducts } from "@/components/CategoryProducts";
import { getCategoryContent } from "@/lib/data/categoryContent";
import { getCategories, getCategoryBySlug, getProductsByCategorySlug } from "@/lib/repository";

const BASE = "https://www.artisancookware.co";

/**
 * ISR, not force-dynamic: pre-render every category so Googlebot always gets a fast,
 * static response (a slow/failing Supabase read can no longer surface a 5xx at crawl time).
 * Admin edits still appear immediately — admin actions call revalidatePath(`/categories/${slug}`).
 * The 1-hour window is just a safety-net refresh for anything that bypasses that path.
 */
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
    try {
        const categories = await getCategories();
        return categories.map((c) => ({ slug: c.slug }));
    } catch {
        return [];
    }
}

interface CategoryPageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const category = await getCategoryBySlug(params.slug);
    if (!category) return { title: "Category Not Found" };

    const content = getCategoryContent(params.slug);
    const title = `${category.name} Cookware Manufacturer & Wholesale Supplier`;
    const intro = content?.paragraphs[0]?.trim() || category.description?.trim();
    const description = intro
        ? `${intro.slice(0, 155)}${intro.length > 155 ? "…" : ""}`
        : `${category.name} aluminium cookware sets for wholesale and export buyers. Manufacturer in Gujranwala, Pakistan. MOQ 50 units, OEM / private label available.`;

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
    const content = getCategoryContent(slug);

    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${category.name} Cookware`,
        url: `${BASE}/categories/${slug}`,
        description:
            category.description?.trim() ||
            `${category.name} aluminium cookware sets manufactured in Gujranwala, Pakistan for wholesale and export buyers.`,
        isPartOf: { "@type": "WebSite", name: "Artisan Cookware", url: BASE },
        mainEntity: {
            "@type": "ItemList",
            numberOfItems: products.length,
            itemListElement: products.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.name,
                url: `${BASE}/products/${p.slug}`,
            })),
        },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE },
            { "@type": "ListItem", position: 2, name: "Categories", item: `${BASE}/categories` },
            { "@type": "ListItem", position: 3, name: category.name, item: `${BASE}/categories/${slug}` },
        ],
    };

    const faqSchema = content?.faqs.length
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: content.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
        }
        : null;

    return (
        <div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {faqSchema ? (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            ) : null}

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

            {content ? (
                <section className="border-t border-ink-20 bg-parchment/40">
                    <div className="container-site grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
                        <div>
                            <h2 className="font-heading text-section font-light text-ink">{content.heading}</h2>
                            <div className="mt-6 space-y-5 text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.68)]">
                                {content.paragraphs.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-[4px] border border-ink-20 bg-white p-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Specification</p>
                            <dl className="mt-4 divide-y divide-ink-20 text-[14px]">
                                {content.specs.map((s) => (
                                    <div key={s.label} className="flex flex-col gap-1 py-3">
                                        <dt className="font-semibold text-ink">{s.label}</dt>
                                        <dd className="font-light leading-relaxed text-[color:rgba(13,13,13,0.65)]">{s.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>

                    <div className="container-site pb-14 sm:pb-16">
                        <h2 className="font-heading text-2xl font-light text-ink">Wholesale buyer FAQ</h2>
                        <div className="mt-6 divide-y divide-ink-20 rounded-[4px] border border-ink-20 bg-white">
                            {content.faqs.map((faq) => (
                                <div key={faq.question} className="px-6 py-5">
                                    <h3 className="text-[16px] font-medium text-ink">{faq.question}</h3>
                                    <p className="mt-2 text-[14px] font-light leading-relaxed text-[color:rgba(13,13,13,0.68)]">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}
        </div>
    );
}
