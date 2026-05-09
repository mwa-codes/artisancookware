"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

import { ADMIN_EMAIL } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import { getSupabaseSession } from "@/lib/supabaseServer";
import { getSupabaseServiceClient } from "@/lib/supabase";
import { uploadImage } from "@/lib/adminUpload";

export type CategoryActionState = {
    success: boolean;
    error?: string;
};

function isAuthorized(sessionEmail?: string | null) {
    return sessionEmail === ADMIN_EMAIL;
}

function revalidateCategoryRoutes(slug?: string) {
    revalidatePath("/admin/categories");
    revalidatePath("/");
    revalidatePath("/categories");
    if (slug) {
        revalidatePath(`/categories/${slug}`);
    }
}

export async function createCategoryAction(_: CategoryActionState, formData: FormData): Promise<CategoryActionState> {
    const session = await getSupabaseSession();
    if (!isAuthorized(session?.user?.email)) {
        return { success: false, error: "Unauthorized." };
    }

    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim() || null;
    const customSlug = String(formData.get("slug") ?? "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
    const slug = customSlug || `${slugify(name)}-${randomUUID().slice(0, 6)}`;
    const displayOrder = parseInt(String(formData.get("displayOrder") ?? "0"), 10) || 0;
    const isFeatured = String(formData.get("isFeatured") ?? "") === "on";
    const imageFile = formData.get("image") as File | null;

    if (!name || !slug) {
        return { success: false, error: "Name and slug are required." };
    }

    let imageUrl: string | null = null;
    if (imageFile && imageFile.size > 0) {
        const result = await uploadImage(imageFile, "category-images");
        if (result.error) return { success: false, error: result.error };
        imageUrl = result.publicUrl;
    }

    const supabase = getSupabaseServiceClient();
    const { error } = await supabase.from("categories").insert({
        name,
        slug,
        description,
        image_url: imageUrl,
        display_order: displayOrder,
        is_featured: isFeatured
    });

    if (error) {
        console.error("createCategoryAction", error);
        return { success: false, error: "Unable to create category." };
    }

    revalidateCategoryRoutes(slug);
    return { success: true };
}

export async function updateCategoryAction(_: CategoryActionState, formData: FormData): Promise<CategoryActionState> {
    const session = await getSupabaseSession();
    if (!isAuthorized(session?.user?.email)) {
        return { success: false, error: "Unauthorized." };
    }

    const id = String(formData.get("id") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim() || null;
    const previousSlug = String(formData.get("previousSlug") ?? "")
        .trim()
        .toLowerCase();
    const customSlug = String(formData.get("slug") ?? "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
    const displayOrder = parseInt(String(formData.get("displayOrder") ?? "0"), 10) || 0;
    const isFeatured = String(formData.get("isFeatured") ?? "") === "on";
    const imageFile = formData.get("image") as File | null;

    if (!id || !name || !customSlug) {
        return { success: false, error: "All fields are required." };
    }

    const supabase = getSupabaseServiceClient();

    let imageUrl: string | undefined;
    if (imageFile && imageFile.size > 0) {
        const result = await uploadImage(imageFile, "category-images");
        if (result.error) return { success: false, error: result.error };
        imageUrl = result.publicUrl ?? undefined;
    }

    const updates: Record<string, unknown> = {
        name,
        slug: customSlug,
        description,
        display_order: displayOrder,
        is_featured: isFeatured
    };

    if (typeof imageUrl !== "undefined") {
        updates.image_url = imageUrl;
    }

    const { error } = await supabase.from("categories").update(updates).eq("id", id);

    if (error) {
        console.error("updateCategoryAction", error);
        return { success: false, error: "Unable to update category." };
    }

    revalidateCategoryRoutes(customSlug);
    if (previousSlug && previousSlug !== customSlug) {
        revalidatePath(`/categories/${previousSlug}`);
    }
    return { success: true };
}

export async function deleteCategoryAction(_: CategoryActionState, formData: FormData): Promise<CategoryActionState> {
    const session = await getSupabaseSession();
    if (!isAuthorized(session?.user?.email)) {
        return { success: false, error: "Unauthorized." };
    }

    const id = String(formData.get("id") ?? "").trim();
    const slug = String(formData.get("slug") ?? "").trim();

    if (!id) {
        return { success: false, error: "Category not found." };
    }

    const supabase = getSupabaseServiceClient();
    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) {
        console.error("deleteCategoryAction", error);
        return { success: false, error: "Unable to delete category." };
    }

    revalidateCategoryRoutes(slug || undefined);
    return { success: true };
}
