"use client";

import { useMemo, useState } from "react";
import type { ProductWithRelations } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";

const FILTERS = [
    { id: "all", label: "All" },
    { id: "non-stick", label: "Non-Stick" },
    { id: "anodised-dull", label: "Anodised" },
    { id: "metal-finish", label: "Metal Finish" }
] as const;

export function FeaturedProducts({ products }: { products: ProductWithRelations[] }) {
    const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

    const filtered = useMemo(() => {
        if (filter === "all") return products;
        return products.filter((p) => p.category?.slug === filter);
    }, [products, filter]);

    const [featured, ...rest] = filtered.length ? filtered : products;

    return (
        <section className="bg-parchment py-20 sm:py-24">
            <div className="container-site">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="animate-fade-up max-w-2xl">
                        <div className="eyebrow">
                            <span className="eyebrow-line" />
                            <span className="eyebrow-text">Wholesale Catalogue</span>
                        </div>
                        <h2 className="font-heading text-section font-light text-ink">Featured Product Lines</h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {FILTERS.map((f) => {
                            const active = filter === f.id;
                            return (
                                <button
                                    key={f.id}
                                    type="button"
                                    onClick={() => setFilter(f.id)}
                                    className={`rounded-[2px] border px-[18px] py-2 text-[11px] font-semibold uppercase tracking-[0.1em] transition ${
                                        active
                                            ? "border-ink bg-ink text-gold-light"
                                            : "border-ink-20 bg-transparent text-ink-60 hover:border-ink hover:text-ink"
                                    }`}
                                >
                                    {f.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-[2px] md:grid-cols-2 xl:grid-cols-3">
                    {featured ? (
                        <ProductCard key={featured.id} product={featured} layout="featured" />
                    ) : null}
                    {rest.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>

                {!featured && !rest.length ? (
                    <p className="mt-10 text-center text-sm text-ink-60">No products match this filter.</p>
                ) : null}

                <div className="mt-12 text-center">
                    <Link href="/products" className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink underline underline-offset-4 transition hover:text-brand-red">
                        View Full Catalogue
                    </Link>
                </div>
            </div>
        </section>
    );
}
