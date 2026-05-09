import { cache } from "react";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { categories as sampleCategories } from "@/lib/sampleData";
import { slugify } from "@/lib/utils";
import { logSupabaseReadFailure } from "@/lib/supabaseDevLog";
import type { Category } from "@/lib/types";
import { mapCategoryRow, type SupabaseCategoryRow } from "@/lib/data/mappers";

/** Explicit columns so `description` is never omitted by a narrowed query. */
export const CATEGORY_COLUMNS =
    "id, name, slug, description, image_url, display_order, is_featured" as const;

/** Hyphen-insensitive match so `/categories/nonstick` resolves when DB slug is `non-stick`. */
function compactSlugKey(s: string) {
    return s.toLowerCase().replace(/-/g, "");
}

function findCategoryBySlugLoose(list: Category[], slug: string): Category | undefined {
    const exact = list.find((c) => c.slug === slug || slugify(c.name) === slug);
    if (exact) return exact;
    const key = compactSlugKey(slug);
    return list.find((c) => compactSlugKey(c.slug) === key);
}

export const getCategories = cache(async (): Promise<Category[]> => {
    if (!isSupabaseConfigured()) {
        return sampleCategories;
    }

    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("categories")
            .select(CATEGORY_COLUMNS)
            .order("display_order", { ascending: true })
            .order("name", { ascending: true });

        if (error) {
            logSupabaseReadFailure("categories", error);
            return [];
        }

        const rows = data ?? [];
        return rows.map((row: SupabaseCategoryRow) => mapCategoryRow(row));
    } catch (error) {
        logSupabaseReadFailure("categories.catch", error);
        return [];
    }
});

export const getCategoryBySlug = cache(async (slug: string) => {
    if (!slug) return null;

    if (!isSupabaseConfigured()) {
        return findCategoryBySlugLoose(sampleCategories, slug) ?? null;
    }

    try {
        const client = getSupabaseClient();
        // maybeSingle() — never use .single() here (0 or 2+ rows would throw and skip fallbacks).
        const { data, error } = await client
            .from("categories")
            .select(CATEGORY_COLUMNS)
            .eq("slug", slug)
            .maybeSingle();

        if (!error && data) {
            return mapCategoryRow(data as SupabaseCategoryRow);
        }

        const all = await getCategories();
        return findCategoryBySlugLoose(all, slug) ?? null;
    } catch (e) {
        logSupabaseReadFailure("getCategoryBySlug", e);
        const all = await getCategories();
        return findCategoryBySlugLoose(all, slug) ?? null;
    }
});

export const getFeaturedCategories = cache(async (limit = 4) => {
    if (!isSupabaseConfigured()) {
        return [];
    }

    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("categories")
            .select(CATEGORY_COLUMNS)
            .eq("is_featured", true)
            .order("display_order", { ascending: true })
            .order("name", { ascending: true })
            .limit(limit);

        if (error || !data?.length) {
            return [];
        }

        return (data as SupabaseCategoryRow[]).map(mapCategoryRow);
    } catch {
        return [];
    }
});

export async function getCategoryProductCounts(): Promise<Record<string, number>> {
    const categories = await getCategories();
    const counts: Record<string, number> = {};
    for (const c of categories) {
        counts[c.id] = 0;
    }

    if (!isSupabaseConfigured()) {
        const { products } = await import("@/lib/sampleData");
        for (const p of products) {
            if (p.status === "discontinued") continue;
            counts[p.categoryId] = (counts[p.categoryId] ?? 0) + 1;
        }
        return counts;
    }

    try {
        const client = getSupabaseClient();
        const { data, error } = await client.from("products").select("category_id,status");
        if (error) {
            logSupabaseReadFailure("getCategoryProductCounts", error);
            return counts;
        }
        for (const row of data ?? []) {
            const r = row as { category_id: string; status?: string | null };
            if (r.status === "discontinued") continue;
            counts[r.category_id] = (counts[r.category_id] ?? 0) + 1;
        }
    } catch (e) {
        logSupabaseReadFailure("getCategoryProductCounts.catch", e);
    }

    return counts;
}
