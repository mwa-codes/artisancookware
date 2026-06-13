import type { MetadataRoute } from "next";
import { getAllProductSlugs, getCategories } from "@/lib/repository";

const BASE = "https://www.artisancookware.co";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [categories, productRows] = await Promise.all([
        getCategories(),
        getAllProductSlugs(),
    ]);

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: BASE,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${BASE}/products`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE}/categories`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${BASE}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE}/privacy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.2,
        },
        {
            url: `${BASE}/return-policy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.2,
        },
        {
            url: `${BASE}/terms`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.2,
        },
    ];

    const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
        url: `${BASE}/categories/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    const productRoutes: MetadataRoute.Sitemap = productRows.map((p) => ({
        url: `${BASE}/products/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
