"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { ProductSpecification, ProductVariant } from "@/lib/types";
import { VariantSelector } from "@/components/VariantSelector";
import { WhatsAppButton } from "@/components/WhatsAppButton";

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
    const displayImage = !imageHasError && activeImage ? activeImage : "/logo-with-slogan.jpeg";
    const activeAlt = selectedVariant ? `${productName} - ${selectedVariant.colorName}` : productName;

    useEffect(() => {
        setImageHasError(false);
    }, [activeImage]);

    return (
        <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                    <Image
                        src={displayImage}
                        alt={activeAlt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        unoptimized={
                            displayImage.startsWith("http://") || displayImage.startsWith("https://")
                        }
                        onError={() => setImageHasError(true)}
                    />
                </div>
                <VariantSelector
                    variants={variants}
                    selectedVariantId={selectedVariant?.id}
                    onSelect={(variant) => setSelectedVariant(variant)}
                />
            </div>
            <div className="space-y-6">
                <div>
                    <h1 className="font-heading text-3xl font-semibold text-slate-900 sm:text-4xl">{productName}</h1>
                    {selectedVariant ? (
                        <p className="mt-2 text-sm text-slate-500">
                            Selected finish: <span className="font-medium text-slate-900">{selectedVariant.colorName}</span>
                        </p>
                    ) : null}
                    {description ? <p className="mt-3 text-base text-slate-600">{description}</p> : null}
                </div>
                {sizes ? (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                        <span className="font-semibold text-slate-900">Sizes:</span> {sizes}
                    </div>
                ) : null}
                {specifications && specifications.length ? (
                    <div className="space-y-3">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Technical specs</h2>
                        <dl className="grid gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-600 sm:grid-cols-2">
                            {specifications.map((spec) => (
                                <div key={`${spec.label}-${spec.value}`} className="flex flex-col gap-1 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{spec.label}</dt>
                                    <dd className="text-sm font-medium text-slate-900">{spec.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                ) : null}
                <WhatsAppButton productName={productName} selectedVariant={selectedVariant?.colorName} className="w-full sm:w-auto" />
            </div>
        </div>
    );
}
