import { cache } from "react";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { categories as sampleCategories } from "@/lib/sampleData";
import { slugify } from "@/lib/utils";
import { logSupabaseReadFailure } from "@/lib/supabaseDevLog";
import type { Category } from "@/lib/types";
import { mapCategoryRow, type SupabaseCategoryRow } from "@/lib/data/mappers";

export const getCategories = cache(async (): Promise<Category[]> => {
    if (!isSupabaseConfigured()) {
        return sampleCategories;
    }

    try {
        const client = getSupabaseClient();
        const { data, error } = await client.from("categories").select("*").order("name");

        if (error) {
            logSupabaseReadFailure("categories", error);
            return sampleCategories;
        }

        return (
            data?.map((row: SupabaseCategoryRow) => mapCategoryRow(row)) ?? sampleCategories
        );
    } catch (error) {
        logSupabaseReadFailure("categories.catch", error);
        return sampleCategories;
    }
});

export const getCategoryBySlug = cache(async (slug: string) => {
    if (!slug) return null;

    if (!isSupabaseConfigured()) {
        return sampleCategories.find((c) => c.slug === slug || slugify(c.name) === slug) ?? null;
    }

    try {
        const client = getSupabaseClient();
        const { data, error } = await client.from("categories").select("*").eq("slug", slug).maybeSingle();

        if (!error && data) {
            return mapCategoryRow(data as SupabaseCategoryRow);
        }

        const all = await getCategories();
        return all.find((c) => c.slug === slug || slugify(c.name) === slug) ?? null;
    } catch (e) {
        logSupabaseReadFailure("getCategoryBySlug", e);
        const all = await getCategories();
        return all.find((c) => c.slug === slug || slugify(c.name) === slug) ?? null;
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
            .select("*")
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
            counts[p.categoryId] = (counts[p.categoryId] ?? 0) + 1;
        }
        return counts;
    }

    try {
        const client = getSupabaseClient();
        const { data } = await client.from("products").select("category_id");
        for (const row of data ?? []) {
            const id = (row as { category_id: string }).category_id;
            counts[id] = (counts[id] ?? 0) + 1;
        }
    } catch {
        /* ignore */
    }

    return counts;
}
