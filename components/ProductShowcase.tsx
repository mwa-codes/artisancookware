"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { ProductSpecification, ProductVariant } from "@/lib/types";
import { VariantSelector } from "@/components/VariantSelector";
import { CardImagePlaceholder } from "@/components/MediaPlaceholder";

export type ProductShowcaseProps = {
    productName: string;
    description: string | null;
    sizes: string | null;
    imageUrl: string | null;
    variants: ProductVariant[];
    specifications?: ProductSpecification[] | null;
};

export function ProductShowcase({ productName, description, sizes, imageUrl, variants, specifications }: ProductShowcaseProps) {
    const initialVariant = useMemo(() => variants.at(0) ?? null, [variants]);
    const [selectedVariant, setSelectedVariant] = useState(initialVariant);
    const [imageHasError, setImageHasError] = useState(false);

    useEffect(() => {
        setSelectedVariant(initialVariant);
    }, [initialVariant]);

    const activeImage = selectedVariant?.imageUrl ?? imageUrl;
    const activeAlt = selectedVariant ? `${productName} — ${selectedVariant.colorName}` : productName;

    useEffect(() => {
        setImageHasError(false);
    }, [activeImage]);

    const showPhoto = Boolean(activeImage?.trim()) && !imageHasError;

    return (
        <div className="space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] border border-ink-20 bg-parchment">
                {showPhoto ? (
                    <Image
                        src={activeImage!.trim()}
                        alt={activeAlt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        onError={() => setImageHasError(true)}
                        priority
                    />
                ) : (
                    <CardImagePlaceholder title={productName} />
                )}
            </div>
            <VariantSelector variants={variants} selectedVariantId={selectedVariant?.id} onSelect={(v) => setSelectedVariant(v)} />

            <div className="space-y-4">
                {description ? <p className="text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.65)]">{description}</p> : null}
                {sizes ? (
                    <div className="rounded-[4px] border border-ink-20 bg-white px-4 py-3 text-sm text-ink-60">
                        <span className="font-semibold text-ink">Sizes:</span> {sizes}
                    </div>
                ) : null}
                {specifications && specifications.length ? (
                    <div className="overflow-hidden rounded-[4px] border border-ink-20">
                        <table className="w-full text-sm">
                            <tbody>
                                {specifications.map((spec) => (
                                    <tr key={`${spec.label}-${spec.value}`} className="border-t border-ink-20 first:border-t-0">
                                        <th className="w-1/3 bg-parchment px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-60">
                                            {spec.label}
                                        </th>
                                        <td className="px-4 py-3 font-medium text-ink">{spec.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
