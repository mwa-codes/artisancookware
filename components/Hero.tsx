import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProductWithRelations } from "@/lib/types";
import { HeroOverlayPrice } from "@/components/HeroOverlayPrice";

type HeroProps = {
    products: ProductWithRelations[];
};

const FALLBACK_IMG =
    "https://images.unsplash.com/photo-1589307004390-97eb644ed3f2?auto=format&fit=crop&w=1400&q=85";

export function Hero({ products }: HeroProps) {
    const hero = products[0];
    const imageUrl =
        hero?.imageUrl?.trim() ||
        hero?.variants?.find((v) => v.imageUrl)?.imageUrl?.trim() ||
        FALLBACK_IMG;

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

                        <h1 className="font-heading text-hero font-light leading-none text-white">
                            <span className="block">Premium</span>
                            <span className="block">
                                <em className="font-heading text-gold-light not-italic">Aluminium</em>
                            </span>
                            <span className="block">Cookware</span>
                        </h1>

                        <p className="font-heading mt-5 text-xl font-light text-[rgba(255,255,255,0.4)] md:text-2xl">
                            For the World&apos;s Kitchens
                        </p>

                        <p className="mt-8 max-w-lg text-[15px] font-light leading-relaxed text-[rgba(255,255,255,0.65)]">
                            Crafted for international wholesalers, retailers, and hospitality groups who demand manufacturing precision,
                            consistent quality, and reliable lead times.
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
                                { n: "40+", l: "Countries Served" },
                                { n: "ISO", l: "Certified Factory" }
                            ].map((s) => (
                                <div key={s.l}>
                                    <p className="font-heading text-[36px] font-light leading-none text-gold-light">{s.n}</p>
                                    <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[rgba(255,255,255,0.45)]">
                                        {s.l}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative min-h-[420px] bg-parchment lg:min-h-0">
                    <Image
                        src={imageUrl}
                        alt={hero?.name ?? "Artisan Cookware"}
                        fill
                        priority
                        className="object-cover"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        unoptimized={imageUrl.startsWith("http")}
                    />
                    <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(247,244,239,0.95)] via-transparent to-transparent"
                        aria-hidden
                    />
                    {hero ? (
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                            <HeroOverlayPrice product={hero} categoryLabel={categoryName} />
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
