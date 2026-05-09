"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

import { ADMIN_EMAIL } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import { getSupabaseSession } from "@/lib/supabaseServer";
import { getSupabaseServiceClient } from "@/lib/supabase";
import { uploadImage } from "@/lib/adminUpload";

export type ProductActionState = {
    success: boolean;
    error?: string;
};

function isAuthorized(email?: string | null) {
    return email === ADMIN_EMAIL;
}

function parseNumber(value: FormDataEntryValue | null): number | null {
    if (value == null) return null;
    const asString = String(value).trim();
    if (!asString) return null;
    const parsed = Number(asString.replace(/,/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
}

function revalidateProductRoutes() {
    revalidatePath("/admin/products");
    revalidatePath("/admin/variants");
    revalidatePath("/");
    revalidatePath("/categories");
    revalidatePath("/products");
}

async function revalidateCategoryPagesForIds(
    supabase: ReturnType<typeof getSupabaseServiceClient>,
    categoryIds: (string | undefined | null)[]
) {
    const ids = [...new Set(categoryIds.filter((id): id is string => Boolean(id)))];
    if (!ids.length) return;

    for (const id of ids) {
        const { data } = await supabase.from("categories").select("slug").eq("id", id).maybeSingle();
        const slug = typeof data?.slug === "string" ? data.slug.trim() : "";
        if (slug) {
            revalidatePath(`/categories/${slug}`);
        }
    }
}

function serialiseFeatures(value: FormDataEntryValue | null) {
    if (!value) return null;
    const raw = String(value).trim();
    if (!raw) return null;
    return raw
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .join("\n");
}

export async function createProductAction(_: ProductActionState, formData: FormData): Promise<ProductActionState> {
    const session = await getSupabaseSession();
    if (!isAuthorized(session?.user?.email)) {
        return { success: false, error: "Unauthorized." };
    }

    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim() || null;
    const sizes = String(formData.get("sizes") ?? "").trim() || null;
    const features = serialiseFeatures(formData.get("features"));
    const categoryId = String(formData.get("categoryId") ?? "").trim();
    const priceType = String(formData.get("priceType") ?? "").trim() || null;
    const factoryPriceValue = parseNumber(formData.get("factoryPriceValue"));
    const fobPriceValue = parseNumber(formData.get("fobPriceValue"));
    const factoryPriceUsd = parseNumber(formData.get("factoryPriceUsd"));
    const fobPriceUsd = parseNumber(formData.get("fobPriceUsd"));
    const moq = parseNumber(formData.get("moq")) ?? 50;
    const leadTimeWeeks = parseNumber(formData.get("leadTimeWeeks")) ?? 4;
    const oemAvailable = String(formData.get("oemAvailable") ?? "") === "on";
    const status = String(formData.get("status") ?? "active").trim();
    const isFeatured = String(formData.get("isFeatured") ?? "") === "on";
    const imageFile = formData.get("image") as File | null;
    const customSlug = String(formData.get("slug") ?? "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
    const slug = customSlug || `${slugify(name)}-${randomUUID().slice(0, 6)}`;

    const priceValue =
        priceType === "Factory" ? factoryPriceValue : priceType === "FOB" ? fobPriceValue : null;

    if (!name || !categoryId) {
        return { success: false, error: "Name and category are required." };
    }

    const supabase = getSupabaseServiceClient();
    let imageUrl: string | null = null;

    if (imageFile && imageFile.size > 0) {
        const uploadResult = await uploadImage(imageFile, "product-images");
        if (uploadResult.error) {
            return { success: false, error: uploadResult.error };
        }
        imageUrl = uploadResult.publicUrl;
    }

    const { error } = await supabase.from("products").insert({
        name,
        slug,
        description,
        sizes,
        features,
        category_id: categoryId,
        price_type: priceType,
        price_value: priceValue,
        factory_price_value: factoryPriceValue ?? (priceType === "Factory" ? priceValue : null),
        fob_price_value: fobPriceValue ?? (priceType === "FOB" ? priceValue : null),
        is_featured: isFeatured,
        image_url: imageUrl,
        factory_price_usd: factoryPriceUsd,
        fob_price_usd: fobPriceUsd,
        moq,
        lead_time_weeks: leadTimeWeeks,
        oem_available: oemAvailable,
        status
    });

    if (error) {
        console.error("createProductAction", error);
        return { success: false, error: "Unable to create product." };
    }

    revalidateProductRoutes();
    revalidatePath(`/products`);
    revalidatePath(`/products/${slug}`);
    await revalidateCategoryPagesForIds(supabase, [categoryId]);
    return { success: true };
}

export async function updateProductAction(_: ProductActionState, formData: FormData): Promise<ProductActionState> {
    const session = await getSupabaseSession();
    if (!isAuthorized(session?.user?.email)) {
        return { success: false, error: "Unauthorized." };
    }

    const id = String(formData.get("id") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim() || null;
    const sizes = String(formData.get("sizes") ?? "").trim() || null;
    const features = serialiseFeatures(formData.get("features"));
    const categoryId = String(formData.get("categoryId") ?? "").trim();
    const priceType = String(formData.get("priceType") ?? "").trim() || null;
    const priceValue = parseNumber(formData.get("priceValue"));
    const factoryPriceValue = parseNumber(formData.get("factoryPriceValue"));
    const fobPriceValue = parseNumber(formData.get("fobPriceValue"));
    const isFeatured = String(formData.get("isFeatured") ?? "") === "on";
    const imageFile = formData.get("image") as File | null;
    const moq = parseNumber(formData.get("moq")) ?? 50;
    const leadTimeWeeks = parseNumber(formData.get("leadTimeWeeks")) ?? 4;
    const oemAvailable = String(formData.get("oemAvailable") ?? "") === "on";
    const status = String(formData.get("status") ?? "active").trim();
    const factoryPriceUsd = parseNumber(formData.get("factoryPriceUsd"));
    const fobPriceUsd = parseNumber(formData.get("fobPriceUsd"));
    const slug = String(formData.get("slug") ?? "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

    if (!id || !name || !categoryId) {
        return { success: false, error: "Required fields are missing." };
    }

    const supabase = getSupabaseServiceClient();

    const { data: existingProduct } = await supabase.from("products").select("category_id").eq("id", id).maybeSingle();

    let imageUrl: string | undefined;
    if (imageFile && imageFile.size > 0) {
        const uploadResult = await uploadImage(imageFile, "product-images");
        if (uploadResult.error) {
            return { success: false, error: uploadResult.error };
        }
        imageUrl = uploadResult.publicUrl ?? undefined;
    }

    const derivedPriceValue =
        priceValue ??
        (priceType === "Factory" ? factoryPriceValue : priceType === "FOB" ? fobPriceValue : null);

    const updates: Record<string, unknown> = {
        name,
        description,
        sizes,
        features,
        category_id: categoryId,
        price_type: priceType,
        price_value: derivedPriceValue,
        factory_price_value: factoryPriceValue ?? (priceType === "Factory" ? derivedPriceValue : null),
        fob_price_value: fobPriceValue ?? (priceType === "FOB" ? derivedPriceValue : null),
        is_featured: isFeatured,
        moq,
        lead_time_weeks: leadTimeWeeks,
        oem_available: oemAvailable,
        status,
        factory_price_usd: factoryPriceUsd,
        fob_price_usd: fobPriceUsd
    };

    if (slug) {
        updates.slug = slug;
    }

    if (typeof imageUrl !== "undefined") {
        updates.image_url = imageUrl;
    }

    const { error } = await supabase.from("products").update(updates).eq("id", id);

    if (error) {
        console.error("updateProductAction", error);
        return { success: false, error: "Unable to update product." };
    }

    revalidateProductRoutes();
    revalidatePath(`/products`);

    const { data: updated } = await supabase.from("products").select("slug").eq("id", id).single();
    if (updated?.slug) {
        revalidatePath(`/products/${updated.slug}`);
    }

    await revalidateCategoryPagesForIds(supabase, [existingProduct?.category_id, categoryId]);

    return { success: true };
}

export async function deleteProductAction(_: ProductActionState, formData: FormData): Promise<ProductActionState> {
    const session = await getSupabaseSession();
    if (!isAuthorized(session?.user?.email)) {
        return { success: false, error: "Unauthorized." };
    }

    const id = String(formData.get("id") ?? "").trim();

    if (!id) {
        return { success: false, error: "Product not found." };
    }

    const supabase = getSupabaseServiceClient();

    const { data: existingProduct } = await supabase.from("products").select("category_id").eq("id", id).maybeSingle();

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
        console.error("deleteProductAction", error);
        return { success: false, error: "Unable to delete product." };
    }

    revalidateProductRoutes();
    revalidatePath(`/products`);
    await revalidateCategoryPagesForIds(supabase, [existingProduct?.category_id]);
    return { success: true };
}
