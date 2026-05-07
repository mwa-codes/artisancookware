import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HighlightList } from "@/components/HighlightList";
import { SectionHeading } from "@/components/SectionHeading";
import { InquiryForm } from "@/components/InquiryForm";
import { ProductShowcase } from "./ProductShowcase";
import { ProductPricing } from "./ProductPricing";
import { getProductById } from "@/lib/repository";
import { slugify } from "@/lib/utils";

interface ProductPageProps {
    params: { id: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const product = await getProductById(params.id);
    if (!product) {
        return {
            title: "Product Not Found | Artisan Cookware"
        };
    }

    return {
        title: `${product.name} | Artisan Cookware`,
        description: product.description ?? "Premium cookware engineered in Pakistan by Artisan Cookware."
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const product = await getProductById(params.id);

    if (!product) {
        notFound();
    }

    const resolvedProduct = product!;

    const defaultFactoryPrice =
        resolvedProduct.factoryPriceValue ??
        (resolvedProduct.priceType === "Factory" ? resolvedProduct.priceValue ?? null : null);
    const defaultFobPrice =
        resolvedProduct.fobPriceValue ??
        (resolvedProduct.priceType === "FOB" ? resolvedProduct.priceValue ?? null : null);

    const breadcrumbCategory = resolvedProduct.category
        ? {
            label: resolvedProduct.category.name,
            href: `/categories/${resolvedProduct.category.slug ?? slugify(resolvedProduct.category.name)
                }`
        }
        : null;

    const highlights = resolvedProduct.features ?? [];

    return (
        <div className="container-grid space-y-12 py-16">
            <Breadcrumbs
                items={[
                    { label: "Home", href: "/" },
                    { label: "Categories", href: "/categories" },
                    ...(breadcrumbCategory ? [breadcrumbCategory] : []),
                    { label: resolvedProduct.name }
                ]}
            />

            <ProductShowcase
                productName={resolvedProduct.name}
                description={resolvedProduct.description}
                sizes={resolvedProduct.sizes}
                imageUrl={resolvedProduct.imageUrl}
                variants={resolvedProduct.variants ?? []}
                specifications={resolvedProduct.specifications ?? []}
            />

            <section className="grid gap-10 lg:grid-cols-[1.6fr,1fr]">
                <div className="space-y-6">
                    <SectionHeading
                        eyebrow="Highlights"
                        title="Why manufacturers and retailers choose this set"
                        description={
                            resolvedProduct.description ??
                            "Designed for professional-grade performance with the aesthetics to match your showroom displays."
                        }
                    />
                    <HighlightList items={highlights} />
                </div>
                <div className="space-y-6">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                        <h3 className="font-heading text-lg font-semibold text-slate-900">Quick facts</h3>
                        <div className="mt-4 space-y-4">
                            <ProductPricing
                                factoryPrice={defaultFactoryPrice}
                                fobPrice={defaultFobPrice}
                                defaultType={resolvedProduct.priceType}
                            />
                            <ul className="space-y-2">
                                <li>
                                    <span className="font-semibold text-slate-900">Category:</span> {resolvedProduct.category?.name ?? "Cookware"}
                                </li>
                                <li>
                                    <span className="font-semibold text-slate-900">WhatsApp:</span> {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923001234567"}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h3 className="font-heading text-lg font-semibold text-slate-900">Request a quote</h3>
                        <p className="mt-2 text-sm text-slate-600">
                            Share your order quantities, preferred finishes, or export requirements. Our sales engineers will respond within
                            one business day.
                        </p>
                        <div className="mt-4">
                            <InquiryForm productId={resolvedProduct.id} productName={resolvedProduct.name} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
