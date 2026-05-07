import Link from "next/link";
import { ArrowRight, ChefHat } from "lucide-react";
import type { Category } from "@/lib/types";
import { slugify } from "@/lib/utils";

type CategoryCardProps = {
    category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
    const href = `/categories/${category.slug ?? slugify(category.name)}`;

    return (
        <Link
            href={href}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-card backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-brand-red/20 hover:shadow-card-hover"
            aria-label={`View the ${category.name} collection`}
        >
            {/* Premium Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 via-transparent to-brand-gold/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute -right-16 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-brand-gold/20 to-transparent blur-3xl transition-transform duration-500 group-hover:scale-125" />

            <div className="relative flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3">
                        {/* Category Badge */}
                        <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-red shadow-sm">
                            <ChefHat className="h-3.5 w-3.5" /> Premium collection
                        </span>
                        {/* Category Name */}
                        <h3 className="heading-card text-2xl transition-colors group-hover:text-brand-red">
                            {category.name}
                        </h3>
                        {/* Description */}
                        <p className="text-sm leading-relaxed text-text-body line-clamp-3">
                            {category.description ?? "Discover premium cookware engineered for professional kitchens and discerning home chefs."}
                        </p>
                    </div>
                    {/* Brand Icon */}
                    <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl border border-brand-red/20 bg-gradient-to-br from-white to-gray-50 text-sm font-bold text-brand-red shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-brand-red group-hover:from-brand-red group-hover:to-brand-red-hover group-hover:text-white">
                        AC
                    </span>
                </div>

                {/* CTA Footer */}
                <div className="mt-auto flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all group-hover:border-brand-red/30 group-hover:bg-white">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted transition-colors group-hover:text-brand-red">
                        View collection
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-red text-white shadow-sm transition-all group-hover:bg-brand-gold group-hover:shadow-md">
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
