import type { Metadata } from "next";
import { getAllProductsForListing, getCategories } from "@/lib/repository";
import { ProductsListing } from "@/components/ProductsListing";

export const metadata: Metadata = {
    title: "Wholesale Aluminium Cookware Catalogue — Factory-Direct Sets",
    description:
        "Browse the full wholesale catalogue of aluminium cookware sets from a Pakistan manufacturer & exporter. Non-stick, hard-anodised, metal finish & soda finish. OEM / private label, MOQ 50 units, FOB Karachi.",
    openGraph: {
        title: "Products — Aluminium Cookware Sets Wholesale | Artisan Cookware",
        description:
            "Full catalogue of premium aluminium cookware sets. Non-stick, anodised, metal finish. Direct from manufacturer in Gujranwala, Pakistan.",
    },
    alternates: {
        canonical: "https://www.artisancookware.co/products",
    },
};

export default async function ProductsIndexPage() {
    const [products, categories] = await Promise.all([getAllProductsForListing(), getCategories()]);

    return (
        <div>
            <header className="bg-parchment">
                <div className="container-site py-14 sm:py-16">
                    <h1 className="font-heading text-display font-light text-ink">Our Products</h1>
                    <p className="mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.6)]">
                        Factory-priced aluminium cookware ranges — engineered for volume buyers who need stable specs, inspection-ready packing,
                        and dependable shipping out of Karachi.
                    </p>
                </div>
            </header>

            <section className="bg-white">
                <div className="container-site py-14 sm:py-16">
                    <ProductsListing products={products} categories={categories} />
                </div>
            </section>
        </div>
    );
}
