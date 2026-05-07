import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/types";

const FALLBACK =
    "https://images.unsplash.com/photo-1589307004390-97eb644ed3f2?auto=format&fit=crop&w=1200&q=80";

export function CategoriesHome({ categories }: { categories: Category[] }) {
    const sorted = [...categories].sort((a, b) => a.displayOrder - b.displayOrder || a.name.localeCompare(b.name));

    return (
        <section className="bg-white py-20 sm:py-24">
            <div className="container-site">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="eyebrow">
                            <span className="eyebrow-line" />
                            <span className="eyebrow-text">Collections</span>
                        </div>
                        <h2 className="font-heading text-section font-light text-ink">Four Signature Collections</h2>
                    </div>
                    <Link href="/categories" className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink underline underline-offset-4 transition hover:text-brand-red md:mb-2">
                        Browse All →
                    </Link>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {sorted.slice(0, 4).map((category, index) => {
                        const img = category.imageUrl?.trim() || FALLBACK;
                        const num = String(index + 1).padStart(2, "0");
                        return (
                            <Link
                                key={category.id}
                                href={`/categories/${category.slug}`}
                                className="group relative block aspect-[3/4] overflow-hidden bg-ink"
                            >
                                <Image
                                    src={img}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                                    sizes="(min-width: 1024px) 25vw, 50vw"
                                    unoptimized={img.startsWith("http")}
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-[rgba(13,13,13,0.85)] via-[rgba(13,13,13,0.35)] to-transparent"
                                    aria-hidden
                                />
                                <div className="absolute inset-x-0 bottom-0 p-6">
                                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">
                                        {num} / {category.name}
                                    </p>
                                    <p className="font-heading mt-2 text-[22px] text-white">{category.name}</p>
                                    <span className="mt-3 inline-block text-[13px] text-[rgba(255,255,255,0.5)] transition-colors group-hover:text-gold">
                                        Explore →
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
