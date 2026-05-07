"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { Buffer } from "node:buffer";
import { ADMIN_EMAIL } from "@/lib/constants";
import { getSupabaseSession } from "@/lib/supabaseServer";
import { getSupabaseServiceClient } from "@/lib/supabase";

export type VariantActionState = {
    success: boolean;
    error?: string;
};

function isAuthorized(email?: string | null) {
    return email === ADMIN_EMAIL;
}

function revalidateVariantRoutes() {
    revalidatePath("/admin/variants");
    revalidatePath("/admin/products");
    revalidatePath("/");
}

async function uploadVariantImage(file: File | null) {
    if (!file || file.size === 0) return { publicUrl: null, error: undefined };
    const supabase = getSupabaseServiceClient();
    const extension = file.name.split(".").pop();
    const filePath = `variants/${randomUUID()}${extension ? `.${extension}` : ""}`;
    const { error } = await supabase.storage.from("variant-images").upload(filePath, Buffer.from(await file.arrayBuffer()), {
        contentType: file.type,
        upsert: true
    });

    if (error) {
        console.error("uploadVariantImage", error);
        return { publicUrl: null, error: "Unable to upload variant image." };
    }

    const {
        data: { publicUrl }
    } = supabase.storage.from("variant-images").getPublicUrl(filePath);

    return { publicUrl, error: undefined };
}

export async function createVariantAction(_: VariantActionState, formData: FormData): Promise<VariantActionState> {
    const session = await getSupabaseSession();
    if (!isAuthorized(session?.user?.email)) {
        return { success: false, error: "Unauthorized." };
    }

    const productId = String(formData.get("productId") ?? "").trim();
    const colorName = String(formData.get("colorName") ?? "").trim();
    const imageFile = formData.get("image") as File | null;

    if (!productId || !colorName) {
        return { success: false, error: "Product and color are required." };
    }

    const supabase = getSupabaseServiceClient();
    const uploadResult = await uploadVariantImage(imageFile);
    if (uploadResult.error) {
        return { success: false, error: uploadResult.error };
    }

    const { error } = await supabase.from("product_variants").insert({
        product_id: productId,
        color_name: colorName,
        image_url: uploadResult.publicUrl
    });

    if (error) {
        console.error("createVariantAction", error);
        return { success: false, error: "Unable to create variant." };
    }

    revalidateVariantRoutes();
    return { success: true };
}

export async function updateVariantAction(_: VariantActionState, formData: FormData): Promise<VariantActionState> {
    const session = await getSupabaseSession();
    if (!isAuthorized(session?.user?.email)) {
        return { success: false, error: "Unauthorized." };
    }

    const id = String(formData.get("id") ?? "").trim();
    const productId = String(formData.get("productId") ?? "").trim();
    const colorName = String(formData.get("colorName") ?? "").trim();
    const imageFile = formData.get("image") as File | null;

    if (!id || !productId || !colorName) {
        return { success: false, error: "All fields are required." };
    }

    const supabase = getSupabaseServiceClient();

    let imageUrl: string | undefined;
    if (imageFile && imageFile.size > 0) {
        const uploadResult = await uploadVariantImage(imageFile);
        if (uploadResult.error) {
            return { success: false, error: uploadResult.error };
        }
        imageUrl = uploadResult.publicUrl ?? undefined;
    }

    const updates: Record<string, unknown> = {
        product_id: productId,
        color_name: colorName
    };

    if (typeof imageUrl !== "undefined") {
        updates.image_url = imageUrl;
    }

    const { error } = await supabase.from("product_variants").update(updates).eq("id", id);

    if (error) {
        console.error("updateVariantAction", error);
        return { success: false, error: "Unable to update variant." };
    }

    revalidateVariantRoutes();
    return { success: true };
}

export async function deleteVariantAction(_: VariantActionState, formData: FormData): Promise<VariantActionState> {
    const session = await getSupabaseSession();
    if (!isAuthorized(session?.user?.email)) {
        return { success: false, error: "Unauthorized." };
    }

    const id = String(formData.get("id") ?? "").trim();

    if (!id) {
        return { success: false, error: "Variant not found." };
    }

    const supabase = getSupabaseServiceClient();
    const { error } = await supabase.from("product_variants").delete().eq("id", id);

    if (error) {
        console.error("deleteVariantAction", error);
        return { success: false, error: "Unable to delete variant." };
    }

    revalidateVariantRoutes();
    return { success: true };
}
