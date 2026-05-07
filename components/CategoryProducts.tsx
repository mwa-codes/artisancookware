"use client";

import { useMemo, useState } from "react";
import type { ProductWithRelations } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

type SortKey = "featured" | "price-asc" | "price-desc";

export function CategoryProducts({ products }: { products: ProductWithRelations[] }) {
    const [sort, setSort] = useState<SortKey>("featured");
    const [featuredFirst, setFeaturedFirst] = useState(true);

    const sorted = useMemo(() => {
        const list = [...products];
        if (sort === "featured" && featuredFirst) {
            list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || (a.name ?? "").localeCompare(b.name ?? ""));
            return list;
        }
        if (sort === "price-asc") {
            list.sort((a, b) => (a.factoryPriceUsd ?? 0) - (b.factoryPriceUsd ?? 0));
            return list;
        }
        if (sort === "price-desc") {
            list.sort((a, b) => (b.factoryPriceUsd ?? 0) - (a.factoryPriceUsd ?? 0));
            return list;
        }
        list.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
        return list;
    }, [products, sort, featuredFirst]);

    return (
        <div>
            <div className="flex flex-col gap-4 border-b border-ink-20 pb-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => setSort("featured")}
                        className={`rounded-[2px] border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] ${
                            sort === "featured" ? "border-ink bg-ink text-gold-light" : "border-ink-20 text-ink-60 hover:border-ink"
                        }`}
                    >
                        Featured
                    </button>
                    <button
                        type="button"
                        onClick={() => setSort("price-asc")}
                        className={`rounded-[2px] border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] ${
                            sort === "price-asc" ? "border-ink bg-ink text-gold-light" : "border-ink-20 text-ink-60 hover:border-ink"
                        }`}
                    >
                        Price ↑
                    </button>
                    <button
                        type="button"
                        onClick={() => setSort("price-desc")}
                        className={`rounded-[2px] border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] ${
                            sort === "price-desc" ? "border-ink bg-ink text-gold-light" : "border-ink-20 text-ink-60 hover:border-ink"
                        }`}
                    >
                        Price ↓
                    </button>
                </div>

                <label className="flex items-center gap-2 text-[12px] font-medium text-ink-60">
                    <input
                        type="checkbox"
                        checked={featuredFirst}
                        onChange={(e) => setFeaturedFirst(e.target.checked)}
                        className="h-4 w-4 rounded-[2px] border-ink-20 text-ink focus:ring-ink"
                    />
                    Featured first
                </label>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-[2px] sm:grid-cols-2 xl:grid-cols-3">
                {sorted.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>

            {sorted.length === 0 ? <p className="mt-10 text-center text-sm text-ink-60">No products in this collection yet.</p> : null}
        </div>
    );
}
