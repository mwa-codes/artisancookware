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
            .limit(take * 2);

        if (error || !data?.length) {
            if (error) console.error("Failed to fetch featured products", error);
            return sampleProducts.slice(0, take).map((product) => {
                const category = allCategories.find((item) => item.id === product.categoryId) ?? undefined;
                return attachVariants({ ...product, category }, sampleVariants);
            });
        }

        const filtered = (data as SupabaseProductRow[]).filter(isActiveRow).slice(0, take);
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
        console.error("Supabase featured products fetch error", error);
        return sampleProducts.slice(0, take).map((product) => {
            const category = allCategories.find((item) => item.id === product.categoryId) ?? undefined;
            return attachVariants({ ...product, category }, sampleVariants);
        });
    }
});

export const getProductsByCategorySlug = cache(async (slug: string): Promise<ProductWithRelations[]> => {
    const category = await getCategoryBySlug(slug);
    if (!category) return [];

    if (!isSupabaseConfigured()) {
        return sampleProducts
            .filter((product) => product.categoryId === category.id)
            .map((product) => attachVariants({ ...product, category }, sampleVariants));
    }

    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("products")
            .select("*")
            .eq("category_id", category.id)
            .order("is_featured", { ascending: false })
            .order("name");

        if (error || !data?.length) {
            if (error) console.error("Failed to fetch products by category", error);
            return sampleProducts
                .filter((product) => product.categoryId === category.id)
                .map((product) => attachVariants({ ...product, category }, sampleVariants));
        }

        const rows = (data as SupabaseProductRow[]).filter(isActiveRow);
        const variantMap = await fetchVariantsForProductIds(rows.map((p) => p.id));

        return rows.map((row) => {
            const base = mapProductRow(row);
            const variants = (variantMap.get(row.id) ?? []).map(mapVariantRow);
            return attachVariants({ ...base, category }, variants);
        });
    } catch (error) {
        console.error("Supabase products by category fetch error", error);
        return sampleProducts
            .filter((product) => product.categoryId === category.id)
            .map((product) => attachVariants({ ...product, category }, sampleVariants));
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
            if (error) console.error("Failed to fetch product", error);
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
            console.error("Product variant fetch error", variantError);
        }

        const variantPool = (variantData ?? []).map((v) => mapVariantRow(v as SupabaseVariantRow));

        const base = mapProductRow(row);
        return attachVariants({ ...base, category }, variantPool);
    } catch (error) {
        console.error("Supabase product fetch error", error);
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

        const all = sampleProducts;
        const match = all.find((p) => p.slug === slug);
        if (match) return getProductById(match.id);

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
            return sampleProducts.map((product) => {
                const category = allCategories.find((c) => c.id === product.categoryId);
                return attachVariants({ ...product, category }, sampleVariants);
            });
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
        console.error("getAllProductsForListing", e);
        return sampleProducts.map((product) => {
            const category = allCategories.find((c) => c.id === product.categoryId);
            return attachVariants({ ...product, category }, sampleVariants);
        });
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
            return sampleProducts.filter((p) => p.status === "active").map((p) => ({ slug: p.slug }));
        }

        return (data as { slug: string; status?: string }[])
            .filter((r) => Boolean(r.slug) && (!r.status || r.status === "active"))
            .map((r) => ({ slug: r.slug }));
    } catch {
        return sampleProducts.map((p) => ({ slug: p.slug }));
    }
}
