"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { ProductWithRelations } from "@/lib/types";
import { HeroOverlayPrice } from "@/components/HeroOverlayPrice";

type HeroProps = {
    products: ProductWithRelations[];
};

export function Hero({ products }: HeroProps) {
    const hero = products[0];
    const rawHeroImage =
        hero?.imageUrl?.trim() || hero?.variants?.find((v) => v.imageUrl?.trim())?.imageUrl?.trim() || "";

    const [heroImageFailed, setHeroImageFailed] = useState(false);

    useEffect(() => {
        setHeroImageFailed(false);
    }, [rawHeroImage]);

    const showHeroPhoto = Boolean(rawHeroImage) && !heroImageFailed;
    const categoryName = hero?.category?.name ?? "Featured";

    return (
        <section className="relative min-h-[100vh] pt-[68px]">
            <div className="grid min-h-[calc(100vh-68px)] lg:grid-cols-2">
                <div className="flex flex-col justify-center bg-ink px-6 py-14 sm:px-10 lg:px-16 lg:py-20 xl:pl-20 xl:pr-16">
                    <div className="animate-fade-up max-w-xl">
                        <div className="eyebrow mb-8">
                            <span className="eyebrow-line" />
                            <span className="eyebrow-text text-gold">Since 1998 — Gujranwala, Pakistan</span>
                        </div>

                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[rgba(255,255,255,0.62)] md:text-base">
                            Premium Aluminium Cookware
                        </p>

                        <h1 className="font-heading text-hero font-light leading-none text-white">
                            <span className="block">Artisan</span>
                            <span className="block">
                                <em className="font-heading text-gold-light not-italic">Cookware</em>
                            </span>
                        </h1>

                        <p className="font-heading mt-5 text-2xl font-normal text-white md:text-3xl">Your Kitchen Needs</p>

                        <p className="mt-8 max-w-lg text-[15px] font-light leading-relaxed text-[rgba(255,255,255,0.65)]">
                            Crafted for international wholesalers, retailers, and hospitality groups who demand manufacturing precision, consistent
                            quality, and reliable lead times.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-[2px] bg-gold-light px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink transition hover:bg-gold"
                            >
                                Request Wholesale Quote
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link href="/products" className="btn-ghost-white">
                                View Catalogue
                            </Link>
                        </div>

                        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-[rgba(255,255,255,0.1)] pt-10">
                            {[
                                { n: "25+", l: "Years Manufacturing" },
                                { n: "B2B", l: "Export Focused" },
                                { n: "QC", l: "Batch Inspection" }
                            ].map((s) => (
                                <div key={s.l}>
                                    <p className="font-heading text-[36px] font-light leading-none text-gold-light">{s.n}</p>
                                    <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[rgba(255,255,255,0.45)]">{s.l}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative min-h-[420px] bg-parchment lg:min-h-0">
                    {showHeroPhoto ? (
                        <Image
                            src={rawHeroImage}
                            alt={hero?.name ?? "Artisan Cookware"}
                            fill
                            priority
                            className="object-cover"
                            sizes="50vw"
                            onError={() => setHeroImageFailed(true)}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-parchment">
                            <div className="px-8 text-center">
                                <div className="font-heading mb-4 text-3xl font-light text-ink-30">Artisan Cookware</div>
                                <p className="text-sm text-ink-60">
                                    Add a product with an image
                                    <br />
                                    to show here
                                </p>
                                <a href="/admin/products" className="mt-4 inline-block text-xs text-gold underline">
                                    Go to Admin →
                                </a>
                            </div>
                        </div>
                    )}
                    {hero ? (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-parchment via-parchment/60 to-transparent p-6 sm:p-8">
                            <HeroOverlayPrice product={hero} categoryLabel={categoryName} />
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
