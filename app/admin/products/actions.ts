"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { Buffer } from "node:buffer";
import type { SupabaseClient } from "@supabase/supabase-js";

import { ADMIN_EMAIL } from "@/lib/constants";
import { getSupabaseSession } from "@/lib/supabaseServer";
import { getSupabaseServiceClient } from "@/lib/supabase";

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
}

async function uploadImage(file: File | null, bucket: string) {
    if (!file || file.size === 0) return { publicUrl: null, path: null };

    const supabase = getSupabaseServiceClient();
    const ensureBucket = await ensureStorageBucket(supabase, bucket);
    if (!ensureBucket.success) {
        console.error("ensureStorageBucket", ensureBucket.error);
        return { publicUrl: null, path: null, error: ensureBucket.error ?? "Storage bucket unavailable." };
    }

    const extension = file.name.split(".").pop();
    const fileName = `${randomUUID()}${extension ? `.${extension}` : ""}`;
    const arrayBuffer = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, Buffer.from(arrayBuffer), {
        upsert: true,
        contentType: file.type
    });

    if (uploadError) {
        console.error("uploadImage", uploadError);
        const message = uploadError.message ?? "Unable to upload image.";
        return { publicUrl: null, path: null, error: `Unable to upload image: ${message}` };
    }

    const {
        data: { publicUrl }
    } = supabase.storage.from(bucket).getPublicUrl(fileName);

    return { publicUrl, path: fileName };
}

async function ensureStorageBucket(supabase: SupabaseClient, bucket: string) {
    const { data, error } = await supabase.storage.getBucket(bucket);

    if (data) {
        return { success: true as const };
    }

    if (error && !error.message?.toLowerCase?.().includes("not found")) {
        return { success: false as const, error: error.message };
    }

    const { error: createError } = await supabase.storage.createBucket(bucket, {
        public: true,
        fileSizeLimit: "10MB",
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"]
    });

    if (createError) {
        return { success: false as const, error: createError.message };
    }

    return { success: true as const };
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
    const priceValue = parseNumber(formData.get("priceValue"));
    const factoryPriceValue = parseNumber(formData.get("factoryPriceValue"));
    const fobPriceValue = parseNumber(formData.get("fobPriceValue"));
    const imageFile = formData.get("image") as File | null;

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
        description,
        sizes,
        features,
        category_id: categoryId,
        price_type: priceType,
        price_value: priceValue,
        factory_price_value: factoryPriceValue ?? (priceType === "Factory" ? priceValue : null),
        fob_price_value: fobPriceValue ?? (priceType === "FOB" ? priceValue : null),
        image_url: imageUrl
    });

    if (error) {
        console.error("createProductAction", error);
        return { success: false, error: "Unable to create product." };
    }

    revalidateProductRoutes();
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
    const imageFile = formData.get("image") as File | null;

    if (!id || !name || !categoryId) {
        return { success: false, error: "Required fields are missing." };
    }

    const supabase = getSupabaseServiceClient();

    let imageUrl: string | undefined;
    if (imageFile && imageFile.size > 0) {
        const uploadResult = await uploadImage(imageFile, "product-images");
        if (uploadResult.error) {
            return { success: false, error: uploadResult.error };
        }
        imageUrl = uploadResult.publicUrl ?? undefined;
    }

    const updates: Record<string, unknown> = {
        name,
        description,
        sizes,
        features,
        category_id: categoryId,
        price_type: priceType,
        price_value: priceValue,
        factory_price_value: factoryPriceValue ?? (priceType === "Factory" ? priceValue : null),
        fob_price_value: fobPriceValue ?? (priceType === "FOB" ? priceValue : null)
    };

    if (typeof imageUrl !== "undefined") {
        updates.image_url = imageUrl;
    }

    const { error } = await supabase.from("products").update(updates).eq("id", id);

    if (error) {
        console.error("updateProductAction", error);
        return { success: false, error: "Unable to update product." };
    }

    revalidateProductRoutes();
    revalidatePath(`/products/${id}`);
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
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
        console.error("deleteProductAction", error);
        return { success: false, error: "Unable to delete product." };
    }

    revalidateProductRoutes();
    revalidatePath(`/products/${id}`);
    return { success: true };
}
