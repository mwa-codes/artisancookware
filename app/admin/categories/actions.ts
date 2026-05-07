"use server";

import { revalidatePath } from "next/cache";
import { ADMIN_EMAIL } from "@/lib/constants";
import { getSupabaseSession } from "@/lib/supabaseServer";
import { getSupabaseServiceClient } from "@/lib/supabase";

export type CategoryActionState = {
    success: boolean;
    error?: string;
};

function isAuthorized(sessionEmail?: string | null) {
    return sessionEmail === ADMIN_EMAIL;
}

function revalidateCategoryRoutes() {
    revalidatePath("/admin/categories");
    revalidatePath("/");
    revalidatePath("/categories");
}

export async function createCategoryAction(_: CategoryActionState, formData: FormData): Promise<CategoryActionState> {
    const session = await getSupabaseSession();
    if (!isAuthorized(session?.user?.email)) {
        return { success: false, error: "Unauthorized." };
    }

    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim() || null;

    if (!name) {
        return { success: false, error: "Name is required." };
    }

    const supabase = getSupabaseServiceClient();
    const { error } = await supabase.from("categories").insert({ name, description });

    if (error) {
        console.error("createCategoryAction", error);
        return { success: false, error: "Unable to create category." };
    }

    revalidateCategoryRoutes();
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

    if (!id || !name) {
        return { success: false, error: "All fields are required." };
    }

    const supabase = getSupabaseServiceClient();
    const { error } = await supabase.from("categories").update({ name, description }).eq("id", id);

    if (error) {
        console.error("updateCategoryAction", error);
        return { success: false, error: "Unable to update category." };
    }

    revalidateCategoryRoutes();
    return { success: true };
}

export async function deleteCategoryAction(_: CategoryActionState, formData: FormData): Promise<CategoryActionState> {
    const session = await getSupabaseSession();
    if (!isAuthorized(session?.user?.email)) {
        return { success: false, error: "Unauthorized." };
    }

    const id = String(formData.get("id") ?? "").trim();

    if (!id) {
        return { success: false, error: "Category not found." };
    }

    const supabase = getSupabaseServiceClient();
    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) {
        console.error("deleteCategoryAction", error);
        return { success: false, error: "Unable to delete category." };
    }

    revalidateCategoryRoutes();
    return { success: true };
}
