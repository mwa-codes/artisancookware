import { cache } from "react";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { categories as sampleCategories, products as sampleProducts, variants as sampleVariants } from "@/lib/sampleData";
import type { Category, ProductWithRelations } from "@/lib/types";
import {
    attachVariants,
    mapCategoryRow,
    mapProductRow,
    mapVariantRow,
    type SupabaseCategoryRow,
    type SupabaseProductRow,
    type SupabaseVariantRow
} from "@/lib/data/mappers";
import { getCategories, getCategoryBySlug } from "@/lib/data/categories";
import { logSupabaseReadFailure } from "@/lib/supabaseDevLog";

async function fetchVariantsForProductIds(ids: string[]): Promise<Map<string, SupabaseVariantRow[]>> {
    const map = new Map<string, SupabaseVariantRow[]>();
    if (!ids.length || !isSupabaseConfigured()) return map;

    try {
        const client = getSupabaseClient();
        const { data, error } = await client.from("product_variants").select("id, product_id, color_name, image_url").in("product_id", ids);

        if (error || !data) return map;

        for (const row of data as SupabaseVariantRow[]) {
            const list = map.get(row.product_id) ?? [];
            list.push(row);
            map.set(row.product_id, list);
        }
    } catch {
        /* ignore */
    }

    return map;
}

function isActiveRow(row: SupabaseProductRow): boolean {
    const s = row.status;
    if (!s || s === "active") return true;
    return false;
}

/** Homepage hero + featured: show everything except discontinued (includes draft for visibility while setting up). */
function isHomepageFeaturedProduct(row: SupabaseProductRow): boolean {
    return row.status !== "discontinued";
}

/** Category `/categories/[slug]` grid: same rule as homepage — hide only discontinued so drafts stay visible until published. */
function isVisibleOnCategoryPage(row: SupabaseProductRow): boolean {
    return row.status !== "discontinued";
}

export const getFeaturedProducts = cache(async (limit: number = 3): Promise<ProductWithRelations[]> => {
    const take = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 3;
    const allCategories = await getCategories();

    if (!isSupabaseConfigured()) {
        return sampleProducts.slice(0, take).map((product) => {
            const category = allCategories.find((item) => item.id === product.categoryId) ?? undefined;
            return attachVariants({ ...product, category }, sampleVariants);
        });
    }

    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("products")
            .select("*")
            .order("is_featured", { ascending: false })
            .order("created_at", { ascending: false })
            .limit(Math.max(take * 4, 48));

        if (error) {
            logSupabaseReadFailure("featuredProducts", error);
            console.error("[getFeaturedProducts] DB error - did you run the SQL migration?", error.message);
            return [];
        }
        if (!data?.length) {
            return [];
        }

        const filtered = (data as SupabaseProductRow[]).filter(isHomepageFeaturedProduct).slice(0, take);
        const variantMap = await fetchVariantsForProductIds(filtered.map((p) => p.id));

        return filtered.map((row) => {
            const category =
                allCategories.find((item) => item.id === row.category_id) ??
                undefined;
            const base = mapProductRow(row);
            const variants = (variantMap.get(row.id) ?? []).map(mapVariantRow);
            return attachVariants({ ...base, category }, variants);
        });
    } catch (error) {
        logSupabaseReadFailure("featuredProducts.catch", error);
        return [];
    }
});

export const getProductsByCategorySlug = cache(async (slug: string): Promise<ProductWithRelations[]> => {
    /* TEMP DEBUG — remove after diagnosing count vs page mismatch */
    console.log("slug param:", slug);

    const categoryData = await getCategoryBySlug(slug);
    console.log("category row found:", categoryData);
    console.log("querying products with category_id:", categoryData?.id);

    if (!categoryData) return [];

    if (!isSupabaseConfigured()) {
        return sampleProducts
            .filter((product) => product.categoryId === categoryData.id)
            .map((product) => attachVariants({ ...product, category: categoryData }, sampleVariants));
    }

    try {
        const client = getSupabaseClient();
        // Filter on products.category_id (uuid FK to categories.id) — must match DB column name.
        const { data: productsData, error } = await client
            .from("products")
            .select("*")
            .eq("category_id", categoryData.id)
            .order("is_featured", { ascending: false })
            .order("name");

        console.log("products returned:", productsData?.length, productsData);

        if (error || !productsData?.length) {
            if (error) logSupabaseReadFailure("productsByCategory", error);
            return [];
        }

        const rows = (productsData as SupabaseProductRow[]).filter(isVisibleOnCategoryPage);
        console.log(
            "[getProductsByCategorySlug] rows after isVisibleOnCategoryPage filter:",
            rows.length,
            rows.map((r) => ({ id: r.id, status: r.status }))
        );

        const variantMap = await fetchVariantsForProductIds(rows.map((p) => p.id));

        return rows.map((row) => {
            const base = mapProductRow(row);
            const variants = (variantMap.get(row.id) ?? []).map(mapVariantRow);
            return attachVariants({ ...base, category: categoryData }, variants);
        });
    } catch (error) {
        logSupabaseReadFailure("productsByCategory.catch", error);
        return [];
    }
});

export const getProductById = cache(async (id: string): Promise<ProductWithRelations | null> => {
    if (!id) return null;

    if (!isSupabaseConfigured()) {
        const product = sampleProducts.find((item) => item.id === id);
        if (!product) return null;
        const category = sampleCategories.find((item) => item.id === product.categoryId);
        return attachVariants(
            {
                ...product,
                category: category ?? undefined
            },
            sampleVariants
        );
    }

    try {
        const client = getSupabaseClient();
        const { data, error } = await client.from("products").select("*").eq("id", id).maybeSingle();

        if (error || !data) {
            if (error) logSupabaseReadFailure("productById", error);
            return null;
        }

        const row = data as SupabaseProductRow;
        const { data: categoryData } = await client.from("categories").select("*").eq("id", row.category_id).maybeSingle();

        const category: Category | undefined = categoryData
            ? mapCategoryRow(categoryData as SupabaseCategoryRow)
            : undefined;

        const { data: variantData, error: variantError } = await client
            .from("product_variants")
            .select("id, product_id, color_name, image_url")
            .eq("product_id", row.id);

        if (variantError) {
            logSupabaseReadFailure("productVariants", variantError);
        }

        const variantPool = (variantData ?? []).map((v) => mapVariantRow(v as SupabaseVariantRow));

        const base = mapProductRow(row);
        return attachVariants({ ...base, category }, variantPool);
    } catch (error) {
        logSupabaseReadFailure("productById.catch", error);
        return null;
    }
});

export const getProductBySlug = cache(async (slug: string): Promise<ProductWithRelations | null> => {
    if (!slug) return null;

    if (!isSupabaseConfigured()) {
        const product = sampleProducts.find((p) => p.slug === slug);
        if (!product) return null;
        return getProductById(product.id);
    }

    try {
        const client = getSupabaseClient();
        const { data, error } = await client.from("products").select("*").eq("slug", slug).maybeSingle();

        if (!error && data) {
            return getProductById((data as SupabaseProductRow).id);
        }

        return null;
    } catch {
        return null;
    }
});

const UUID_RE =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuidParam(value: string) {
    return UUID_RE.test(value.trim());
}

export async function getAllProductsForListing(): Promise<ProductWithRelations[]> {
    const allCategories = await getCategories();

    if (!isSupabaseConfigured()) {
        return sampleProducts.map((product) => {
            const category = allCategories.find((c) => c.id === product.categoryId);
            return attachVariants({ ...product, category }, sampleVariants);
        });
    }

    try {
        const client = getSupabaseClient();
        const { data, error } = await client.from("products").select("*").order("name");

        if (error || !data?.length) {
            return [];
        }

        const rows = (data as SupabaseProductRow[]).filter(isActiveRow);
        const variantMap = await fetchVariantsForProductIds(rows.map((r) => r.id));

        return rows.map((row) => {
            const category = allCategories.find((c) => c.id === row.category_id);
            const base = mapProductRow(row);
            const variants = (variantMap.get(row.id) ?? []).map(mapVariantRow);
            return attachVariants({ ...base, category }, variants);
        });
    } catch (e) {
        logSupabaseReadFailure("allProductsListing", e);
        return [];
    }
}

export async function getAllProductSlugs(): Promise<{ slug: string }[]> {
    if (!isSupabaseConfigured()) {
        return sampleProducts.map((p) => ({ slug: p.slug }));
    }

    try {
        const client = getSupabaseClient();
        const { data, error } = await client.from("products").select("slug,status");

        if (error || !data?.length) {
            return [];
        }

        return (data as { slug: string; status?: string }[])
            .filter((r) => Boolean(r.slug) && (!r.status || r.status === "active"))
            .map((r) => ({ slug: r.slug }));
    } catch {
        return [];
    }
}
