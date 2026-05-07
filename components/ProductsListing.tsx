"use client";

import { useMemo, useState } from "react";
import type { ProductWithRelations } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import type { Category } from "@/lib/types";

const PAGE_SIZE = 9;

export function ProductsListing({
    products,
    categories
}: {
    products: ProductWithRelations[];
    categories: Category[];
}) {
    const [query, setQuery] = useState("");
    const [categoryId, setCategoryId] = useState<string | "all">("all");
    const [page, setPage] = useState(0);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return products.filter((p) => {
            const catOk = categoryId === "all" || p.categoryId === categoryId;
            const textOk =
                !q ||
                p.name.toLowerCase().includes(q) ||
                (p.description ?? "").toLowerCase().includes(q) ||
                (p.category?.name ?? "").toLowerCase().includes(q);
            return catOk && textOk;
        });
    }, [products, query, categoryId]);

    const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount - 1);
    const slice = filtered.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE);

    return (
        <div>
            <div className="flex flex-col gap-4 border-b border-ink-20 pb-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            setCategoryId("all");
                            setPage(0);
                        }}
                        className={`rounded-[2px] border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] ${
                            categoryId === "all" ? "border-ink bg-ink text-gold-light" : "border-ink-20 text-ink-60 hover:border-ink"
                        }`}
                    >
                        All
                    </button>
                    {categories.map((c) => (
                        <button
                            key={c.id}
                            type="button"
                            onClick={() => {
                                setCategoryId(c.id);
                                setPage(0);
                            }}
                            className={`rounded-[2px] border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] ${
                                categoryId === c.id ? "border-ink bg-ink text-gold-light" : "border-ink-20 text-ink-60 hover:border-ink"
                            }`}
                        >
                            {c.name}
                        </button>
                    ))}
                </div>
                <label className="block w-full max-w-sm lg:w-72">
                    <span className="sr-only">Search products</span>
                    <input
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setPage(0);
                        }}
                        placeholder="Search catalogue…"
                        className="w-full rounded-[2px] border border-ink-20 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink-60 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
                    />
                </label>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-[2px] sm:grid-cols-2 xl:grid-cols-3">
                {slice.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>

            {filtered.length === 0 ? <p className="mt-10 text-center text-sm text-ink-60">No products match your filters.</p> : null}

            {pageCount > 1 ? (
                <div className="mt-12 flex items-center justify-center gap-4">
                    <button
                        type="button"
                        className="btn-outline"
                        disabled={currentPage <= 0}
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                    >
                        Previous
                    </button>
                    <span className="text-sm text-ink-60">
                        Page {currentPage + 1} of {pageCount}
                    </span>
                    <button
                        type="button"
                        className="btn-outline"
                        disabled={currentPage >= pageCount - 1}
                        onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                    >
                        Next
                    </button>
                </div>
            ) : null}
        </div>
    );
}
