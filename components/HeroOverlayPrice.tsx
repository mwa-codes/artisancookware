"use client";

import type { ProductWithRelations } from "@/lib/types";
import { PriceDisplay } from "@/components/PriceDisplay";

export function HeroOverlayPrice({
    product,
    categoryLabel
}: {
    product: ProductWithRelations;
    categoryLabel: string;
}) {
    return (
        <div className="animate-fade-up-d2 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink-20 bg-white/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink shadow-card backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                {categoryLabel}
            </div>
            <h2 className="font-heading text-2xl font-medium text-ink md:text-3xl">{product.name}</h2>
            <div className="flex flex-wrap items-baseline gap-2 text-sm text-ink-60">
                <PriceDisplay
                    priceUsd={product.factoryPriceUsd}
                    pricePkr={product.factoryPriceValue ?? null}
                    moq={product.moq}
                    showLabel={false}
                    size="md"
                />
            </div>
        </div>
    );
}
