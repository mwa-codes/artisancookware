import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HighlightList } from "@/components/HighlightList";
import { InquirySection } from "@/components/InquirySection";
import { ProductDetailPrices } from "@/components/ProductDetailPrices";
import { ProductShowcase } from "@/components/ProductShowcase";
import { getAllProductSlugs, getAllProductsForListing, getProductById, getProductBySlug, isUuidParam } from "@/lib/repository";

interface ProductPageProps {
    params: { slug: string };
}

export async function generateStaticParams() {
    try {
        const rows = await getAllProductSlugs();
        return rows.map((r) => ({ slug: r.slug }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const product = await resolveProduct(params.slug);
    if (!product) {
        return { title: "Product Not Found | Artisan Cookware" };
    }

    const ogImage = product.imageUrl?.startsWith("http") ? product.imageUrl : undefined;

    return {
        title: product.name,
        description: product.description ?? "Premium aluminium cookware engineered for wholesale buyers.",
        openGraph: ogImage
            ? {
                  images: [{ url: ogImage, alt: product.name }]
              }
            : undefined
    };
}

async function resolveProduct(slug: string) {
    if (isUuidParam(slug)) {
        return getProductById(slug);
    }
    return getProductBySlug(slug);
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = params;

    if (isUuidParam(slug)) {
        const byId = await getProductById(slug);
        if (!byId) {
            notFound();
        }
        redirect(`/products/${byId.slug}`);
    }

    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const catalogue = await getAllProductsForListing();
    const productOptions = catalogue.map((p) => ({ id: p.id, label: p.name }));

    const breadcrumbCategory = product.category
        ? {
              label: product.category.name,
              href: `/categories/${product.category.slug}`
          }
        : null;

    const highlights = product.features ?? [];

    const factoryPkr = product.factoryPriceValue ?? null;
    const fobPkr = product.fobPriceValue ?? null;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description ?? undefined,
        image: product.imageUrl ?? undefined,
        brand: { "@type": "Brand", name: "Artisan Cookware" },
        offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: product.factoryPriceUsd ?? undefined,
            availability: "https://schema.org/InStock"
        }
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <div className="bg-white">
                <div className="container-site py-10 sm:py-14">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Collections", href: "/categories" },
                            ...(breadcrumbCategory ? [breadcrumbCategory] : []),
                            { label: product.name }
                        ]}
                    />

                    <div className="mt-10 grid gap-12 lg:grid-cols-[3fr_2fr] lg:items-start">
                        <ProductShowcase
                            productName={product.name}
                            description={product.description}
                            sizes={product.sizes}
                            imageUrl={product.imageUrl}
                            variants={product.variants ?? []}
                            specifications={product.specifications ?? []}
                        />

                        <div className="space-y-8">
                            <div>
                                <div className="eyebrow mb-4">
                                    <span className="eyebrow-line" />
                                    <span className="eyebrow-text">{product.category?.name ?? "Cookware"}</span>
                                </div>
                                <h1 className="font-heading text-display font-light leading-none text-ink">{product.name}</h1>
                                {product.oemAvailable ? (
                                    <p className="mt-4 inline-block rounded-[2px] border border-ink-20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-60">
                                        OEM / Private label available
                                    </p>
                                ) : null}
                            </div>

                            <ProductDetailPrices
                                factoryUsd={product.factoryPriceUsd}
                                fobUsd={product.fobPriceUsd}
                                factoryPkr={factoryPkr}
                                fobPkr={fobPkr}
                                moq={product.moq}
                            />

                            <div className="rounded-[4px] border border-ink-20 bg-parchment px-4 py-3 text-sm text-ink-60">
                                <span className="font-semibold text-ink">Lead time:</span> {product.leadTimeWeeks} weeks production (typical)
                            </div>
                        </div>
                    </div>

                    <section className="mt-16 border-t border-ink-20 pt-14">
                        <h2 className="font-heading text-2xl font-light text-ink">Highlights</h2>
                        <div className="mt-6 max-w-3xl">
                            <HighlightList items={highlights} />
                        </div>
                    </section>
                </div>
            </div>

            <InquirySection productOptions={productOptions} defaultProductLabel={product.name} />
        </>
    );
}
