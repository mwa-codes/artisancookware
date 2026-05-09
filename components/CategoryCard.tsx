import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/types";
import { CategoryImagePlaceholder } from "@/components/MediaPlaceholder";

export function CategoryCard({ category, productCount }: { category: Category; productCount?: number }) {
    const remote = category.imageUrl?.trim();

    return (
        <Link
            href={`/categories/${category.slug}`}
            className="group relative block aspect-[3/4] overflow-hidden bg-ink"
            aria-label={`View ${category.name} category`}
        >
            {remote ? (
                <Image
                    src={remote}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    sizes="(min-width: 1280px) 25vw, 40vw"
                />
            ) : (
                <CategoryImagePlaceholder name={category.name} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,13,13,0.85)] via-[rgba(13,13,13,0.35)] to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-heading text-xl text-white">{category.name}</p>
                {typeof productCount === "number" ? (
                    <p className="mt-2 inline-block rounded-[2px] bg-white/10 px-2 py-1 font-mono text-[11px] text-white/90 backdrop-blur-sm">
                        {productCount} {productCount === 1 ? "product" : "products"}
                    </p>
                ) : null}
                <span className="mt-4 inline-block text-[13px] text-[rgba(255,255,255,0.5)] transition-colors group-hover:text-gold">
                    Explore →
                </span>
            </div>
        </Link>
    );
}
