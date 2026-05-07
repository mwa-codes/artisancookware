import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProductWithRelations } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export function ProductCard({ product }: { product: ProductWithRelations }) {
    const preferredPrice =
        product.priceType === "FOB"
            ? product.fobPriceValue ?? product.priceValue ?? product.factoryPriceValue ?? null
            : product.factoryPriceValue ?? product.priceValue ?? product.fobPriceValue ?? null;

    const priceLabel =
        product.priceType ?? (product.factoryPriceValue ? "Factory" : product.fobPriceValue ? "FOB" : null);
    const formattedPrice = formatCurrency(preferredPrice);

    return (
        <article className="product-card group flex h-full flex-col transition-all duration-300 hover:-translate-y-1">
            {/* Product Image with Hover Overlay */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-2xl bg-gray-50">
                {product.imageUrl ? (
                    <>
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="product-image object-cover"
                            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 90vw"
                        />
                        {/* Red gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-brand-red/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </>
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-text-muted">
                        Image coming soon
                    </div>
                )}

                {/* Category Badge */}
                <div className="absolute left-4 top-4 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red shadow-lg backdrop-blur">
                        {product.category?.name ?? "Cookware"}
                    </span>
                </div>
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col gap-4 rounded-b-2xl bg-white p-6">
                <div className="space-y-2">
                    <h3 className="heading-card transition-colors group-hover:text-brand-red">
                        {product.name}
                    </h3>
                    {product.description ? (
                        <p className="line-clamp-2 text-sm leading-relaxed text-text-body">
                            {product.description}
                        </p>
                    ) : null}
                </div>

                {/* Price & CTA Section */}
                <div className="mt-auto flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm">
                    <div className="space-y-1">
                        <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-text-muted">{priceLabel ?? "Pricing"}</span>
                        <span className="block text-base font-bold text-brand-red">
                            {formattedPrice ?? "Get Quote"}
                        </span>
                    </div>
                    <Link
                        href={`/products/${product.id}`}
                        className="relative z-10 inline-flex items-center gap-2 rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:gap-3 hover:bg-brand-gold hover:shadow-md"
                        prefetch={false}
                        aria-label={`View details for ${product.name}`}
                    >
                        View
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
