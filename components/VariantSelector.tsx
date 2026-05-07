"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductVariant } from "@/lib/types";

type VariantSelectorProps = {
    variants: ProductVariant[];
    selectedVariantId?: string;
    onSelect: (variant: ProductVariant) => void;
};

export function VariantSelector({ variants, selectedVariantId, onSelect }: VariantSelectorProps) {
    if (!variants.length) return null;

    return (
        <div className="space-y-3">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-60">Available finishes</p>
            <div className="flex flex-wrap gap-3">
                {variants.map((variant) => {
                    const isActive = variant.id === selectedVariantId;

                    return (
                        <button
                            key={variant.id}
                            type="button"
                            onClick={() => onSelect(variant)}
                            aria-pressed={isActive}
                            className={cn(
                                "group flex items-center gap-3 rounded-[2px] border px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-1 focus:ring-ink",
                                isActive
                                    ? "border-ink bg-parchment text-ink shadow-card"
                                    : "border-ink-20 text-ink-60 hover:border-ink hover:text-ink"
                            )}
                        >
                            <span className="relative h-10 w-10 overflow-hidden rounded-[2px] border border-ink-20 bg-parchment shadow-sm">
                                {variant.imageUrl ? (
                                    <Image
                                        src={variant.imageUrl}
                                        alt={variant.colorName}
                                        fill
                                        sizes="40px"
                                        className="object-cover"
                                    />
                                ) : (
                                    <span className="flex h-full w-full items-center justify-center text-xs uppercase text-ink-60">
                                        {variant.colorName.slice(0, 2)}
                                    </span>
                                )}
                            </span>
                            <span>{variant.colorName}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
