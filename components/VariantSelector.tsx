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
            <p className="text-sm font-medium text-slate-700">Available colors</p>
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
                                "group flex items-center gap-3 rounded-full border px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brand-primary/70",
                                isActive
                                    ? "border-brand-primary bg-brand-light text-brand-primary shadow-sm"
                                    : "border-slate-200 text-slate-600 hover:border-brand-primary/40 hover:text-brand-primary"
                            )}
                        >
                            <span className="relative h-10 w-10 overflow-hidden rounded-full border border-white/60 bg-slate-200 shadow">
                                {variant.imageUrl ? (
                                    <Image
                                        src={variant.imageUrl}
                                        alt={variant.colorName}
                                        fill
                                        sizes="40px"
                                        className="object-cover"
                                    />
                                ) : (
                                    <span className="flex h-full w-full items-center justify-center text-xs uppercase text-slate-600">
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
