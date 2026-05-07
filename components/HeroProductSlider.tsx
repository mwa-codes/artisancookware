'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductWithRelations } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";

type HeroProductSliderProps = {
    products: ProductWithRelations[];
};

const AUTOPLAY_INTERVAL = 5000;
const FALLBACK_PRODUCT_IMAGE = "/logo-with-slogan.jpeg";

export function HeroProductSlider({ products }: HeroProductSliderProps) {
    const slides = useMemo(
        () =>
            (products ?? [])
                .map((product) => ({
                    id: product.id,
                    name: product.name,
                    description: product.description ?? "Premium cookware for modern kitchens.",
                    imageUrl: product.imageUrl ?? FALLBACK_PRODUCT_IMAGE,
                    category: product.category?.name ?? "Cookware",
                    priceLabel: product.priceType ?? (product.factoryPriceValue ? "Factory" : product.fobPriceValue ? "FOB" : null),
                    priceValue:
                        product.priceValue ?? product.factoryPriceValue ?? product.fobPriceValue ?? null
                })),
        [products]
    );

    const [activeIndex, setActiveIndex] = useState(0);
    const [failedSlideIds, setFailedSlideIds] = useState<Record<string, boolean>>({});
    const hasMultipleSlides = slides.length > 1;

    useEffect(() => {
        if (!hasMultipleSlides) return;
        const timer = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, AUTOPLAY_INTERVAL);

        return () => window.clearInterval(timer);
    }, [hasMultipleSlides, slides]);

    const goToSlide = (index: number) => {
        if (!slides.length) return;
        setActiveIndex((index + slides.length) % slides.length);
    };

    if (!slides.length) {
        return (
            <div className="flex aspect-[4/3] w-full items-center justify-center rounded-[2rem] border border-dashed border-brand-gold/40 bg-gradient-to-br from-gray-800 via-brand-black to-gray-900 text-center text-sm font-semibold text-gray-400">
                Product imagery coming soon
            </div>
        );
    }

    const activeSlide = slides[activeIndex];
    const formattedPrice = formatCurrency(activeSlide.priceValue);

    return (
        <div className="flex flex-col gap-6">
            <div className="group relative overflow-hidden rounded-[2.5rem] border-2 border-brand-gold/40 bg-gradient-to-br from-gray-900/95 via-brand-black/95 to-gray-900/95 p-5 shadow-2xl shadow-brand-gold/20 backdrop-blur-sm sm:p-7">
                <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-brand-red/60 via-brand-gold/40 to-brand-red/60 opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-30" />

                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-brand-gold/40 bg-gradient-to-br from-gray-800 to-brand-black shadow-xl">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={cn(
                                "absolute inset-0 transition-all duration-700 ease-out",
                                index === activeIndex
                                    ? "z-20 scale-100 opacity-100"
                                    : "z-10 scale-105 opacity-0"
                            )}
                            aria-hidden={index !== activeIndex}
                        >
                            <Image
                                src={failedSlideIds[slide.id] ? FALLBACK_PRODUCT_IMAGE : slide.imageUrl}
                                alt={slide.name}
                                fill
                                priority={index === 0}
                                sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 35vw, (min-width: 768px) 40vw, 90vw"
                                className="object-cover"
                                onError={() => {
                                    setFailedSlideIds((prev) => ({ ...prev, [slide.id]: true }));
                                }}
                            />
                        </div>
                    ))}

                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/45 via-transparent to-transparent" />

                    <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-brand-gold/40 bg-gradient-to-br from-brand-black/90 via-gray-900/90 to-brand-black/90 px-5 py-4 shadow-xl backdrop-blur-md sm:inset-x-6 sm:bottom-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="space-y-1">
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">{activeSlide.category}</p>
                                <p className="text-lg font-black text-white sm:text-xl">{activeSlide.name}</p>
                                <p className="text-xs text-gray-300 sm:text-sm line-clamp-2">{activeSlide.description}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1 text-right">
                                {activeSlide.priceLabel ? (
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-gold/80">
                                        {activeSlide.priceLabel} price
                                    </span>
                                ) : null}
                                {formattedPrice ? (
                                    <span className="text-lg font-bold text-brand-gold sm:text-xl">{formattedPrice}</span>
                                ) : (
                                    <span className="text-sm font-semibold text-white/70">Get best quote</span>
                                )}
                                <Link
                                    href={`/products/${activeSlide.id}`}
                                    className="mt-2 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-red/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold transition-all duration-300 hover:border-brand-gold/60 hover:bg-brand-red/30"
                                >
                                    Explore
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {hasMultipleSlides ? (
                    <>
                        <div className="absolute left-6 top-6 z-30 flex gap-3">
                            <button
                                type="button"
                                onClick={() => goToSlide(activeIndex - 1)}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-black/80 text-brand-gold transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/60 hover:bg-brand-red/30"
                                aria-label="Previous product"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => goToSlide(activeIndex + 1)}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-black/80 text-brand-gold transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/60 hover:bg-brand-red/30"
                                aria-label="Next product"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="pointer-events-none absolute right-6 top-6 z-30 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-black/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-gold/80">
                            {activeIndex + 1}
                            <span className="text-white/40">/</span>
                            {slides.length}
                        </div>

                        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2 sm:bottom-4">
                            {slides.map((slide, index) => (
                                <button
                                    key={slide.id}
                                    type="button"
                                    onClick={() => goToSlide(index)}
                                    className={cn(
                                        "h-2.5 w-8 rounded-full transition-all duration-300",
                                        index === activeIndex
                                            ? "bg-brand-gold shadow-[0_0_12px_rgba(212,175,55,0.6)]"
                                            : "bg-white/20 hover:bg-brand-gold/60"
                                    )}
                                    aria-label={`View ${slide.name}`}
                                    aria-pressed={index === activeIndex}
                                />
                            ))}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}
