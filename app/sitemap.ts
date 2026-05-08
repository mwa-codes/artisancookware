import type { MetadataRoute } from "next";
import { getAllProductSlugs, getCategories } from "@/lib/repository";

const BASE = "https://www.artisancookware.co";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [categories, productRows] = await Promise.all([getCategories(), getAllProductSlugs()]);

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
        { url: `${BASE}/products`, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE}/categories`, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE}/privacy`, lastModified: new Date(), priority: 0.3 },
        { url: `${BASE}/terms`, lastModified: new Date(), priority: 0.3 }
    ];

    const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
        url: `${BASE}/categories/${c.slug}`,
        changeFrequency: "weekly",
        priority: 0.8
    }));

    const productRoutes: MetadataRoute.Sitemap = productRows.map((p) => ({
        url: `${BASE}/products/${p.slug}`,
        changeFrequency: "weekly",
        priority: 0.8
    }));

    return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
