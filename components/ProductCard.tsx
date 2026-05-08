"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { ProductWithRelations } from "@/lib/types";
import { PriceDisplay } from "@/components/PriceDisplay";

function initialCardImage(product: ProductWithRelations) {
    const variantUrl = product.variants?.find((v) => v.imageUrl)?.imageUrl ?? null;
    const main = product.imageUrl?.trim();
    const variant = variantUrl?.trim();
    return main || variant || "/logo-with-slogan.jpeg";
}

function sizeTokens(sizes: string | null): string[] {
    if (!sizes) return [];
    return sizes
        .split(/[,;]/)
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 4);
}

export function ProductCard({
    product,
    layout = "default"
}: {
    product: ProductWithRelations;
    layout?: "default" | "featured";
}) {
    const [imageSrc, setImageSrc] = useState(() => initialCardImage(product));

    const badge = useMemo(() => {
        if (product.isFeatured) return "Featured";
        return null;
    }, [product.isFeatured]);

    const pills = sizeTokens(product.sizes);

    const inner = (
        <>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-parchment">
                <Image
                    src={imageSrc}
                    alt={product.name}
                    fill
                    className="product-img object-cover"
                    sizes={
                        layout === "featured"
                            ? "(min-width: 1280px) 66vw, 100vw"
                            : "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    }
                    unoptimized={imageSrc.startsWith("http://") || imageSrc.startsWith("https://")}
                    onError={() => setImageSrc("/logo-with-slogan.jpeg")}
                />
                {badge ? (
                    <span className="absolute left-4 top-4 bg-ink px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-light">
                        {badge}
                    </span>
                ) : null}
            </div>

            <div className="flex flex-1 flex-col px-7 pb-7 pt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
                    {product.category?.name ?? "Cookware"}
                </p>
                <h3 className="font-heading mt-2 text-[22px] font-medium leading-snug text-ink">{product.name}</h3>
                {product.description ? (
                    <p className="mt-3 line-clamp-2 text-[13px] font-light leading-relaxed text-[color:rgba(13,13,13,0.6)]">
                        {product.description}
                    </p>
                ) : null}

                {pills.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {pills.map((p) => (
                            <span
                                key={p}
                                className="rounded-[2px] border border-ink-20 px-2 py-1 text-[11px] font-medium text-ink-60"
                            >
                                {p}
                            </span>
                        ))}
                    </div>
                ) : null}

                <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-ink-20 pt-5">
                    <PriceDisplay
                        priceUsd={product.factoryPriceUsd}
                        pricePkr={product.factoryPriceValue ?? null}
                        moq={product.moq}
                        showLabel
                        size="sm"
                    />
                    <Link
                        href={`/products/${product.slug}`}
                        className="group inline-flex items-center gap-1 text-[12px] font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition hover:text-gold hover:decoration-gold"
                        prefetch={false}
                    >
                        View Details
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        </>
    );

    if (layout === "featured") {
        return (
            <article className="product-card shadow-card xl:col-span-2 xl:grid xl:grid-cols-2 xl:gap-0">
                <div className="relative min-h-[280px] lg:min-h-full">
                    <Image
                        src={imageSrc}
                        alt={product.name}
                        fill
                        className="product-img object-cover"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        unoptimized={imageSrc.startsWith("http")}
                        onError={() => setImageSrc("/logo-with-slogan.jpeg")}
                    />
                    {badge ? (
                        <span className="absolute left-4 top-4 bg-ink px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-light">
                            {badge}
                        </span>
                    ) : null}
                </div>
                <div className="flex flex-col justify-center bg-white px-7 pb-7 pt-6 lg:px-10 lg:py-10">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
                        {product.category?.name ?? "Cookware"}
                    </p>
                    <h3 className="font-heading mt-3 text-2xl font-medium text-ink md:text-[26px]">{product.name}</h3>
                    {product.description ? (
                        <p className="mt-4 line-clamp-3 text-[13px] font-light leading-relaxed text-[color:rgba(13,13,13,0.6)]">
                            {product.description}
                        </p>
                    ) : null}
                    {pills.length ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                            {pills.map((p) => (
                                <span
                                    key={p}
                                    className="rounded-[2px] border border-ink-20 px-2 py-1 text-[11px] font-medium text-ink-60"
                                >
                                    {p}
                                </span>
                            ))}
                        </div>
                    ) : null}
                    <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-ink-20 pt-6">
                        <PriceDisplay
                            priceUsd={product.factoryPriceUsd}
                            pricePkr={product.factoryPriceValue ?? null}
                            moq={product.moq}
                            showLabel
                            size="md"
                        />
                        <Link
                            href={`/products/${product.slug}`}
                            className="group inline-flex items-center gap-1 text-[12px] font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition hover:text-gold"
                            prefetch={false}
                        >
                            View Details
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>
            </article>
        );
    }

    return <article className="product-card shadow-card">{inner}</article>;
}
