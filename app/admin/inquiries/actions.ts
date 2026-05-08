"use server";

import { revalidatePath } from "next/cache";

import { ADMIN_EMAIL } from "@/lib/constants";
import { getSupabaseSession } from "@/lib/supabaseServer";
import { getSupabaseServiceClient } from "@/lib/supabase";

export type InquiryActionState = { success: boolean; error?: string };

function isAuthorized(email?: string | null) {
    return email === ADMIN_EMAIL;
}

export async function updateInquiryStatusAction(_: InquiryActionState, formData: FormData): Promise<InquiryActionState> {
    const session = await getSupabaseSession();
    if (!isAuthorized(session?.user?.email)) return { success: false, error: "Unauthorized." };

    const id = String(formData.get("id") ?? "").trim();
    const status = String(formData.get("status") ?? "").trim();
    const validStatuses = ["unread", "read", "replied", "closed"];
    if (!id || !validStatuses.includes(status)) return { success: false, error: "Invalid." };

    const supabase = getSupabaseServiceClient();
    const updates: Record<string, unknown> = { status };
    if (status === "replied") updates.replied_at = new Date().toISOString();

    const { error } = await supabase.from("inquiries").update(updates).eq("id", id);
    if (error) return { success: false, error: "Unable to update status." };

    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
}

export async function updateInquiryNotesAction(_: InquiryActionState, formData: FormData): Promise<InquiryActionState> {
    const session = await getSupabaseSession();
    if (!isAuthorized(session?.user?.email)) return { success: false, error: "Unauthorized." };

    const id = String(formData.get("id") ?? "").trim();
    const notes = String(formData.get("notes") ?? "").trim();

    const supabase = getSupabaseServiceClient();
    const { error } = await supabase.from("inquiries").update({ notes }).eq("id", id);
    if (error) return { success: false, error: "Unable to save notes." };

    revalidatePath("/admin/inquiries");
    return { success: true };
}

export async function deleteInquiryAction(_: InquiryActionState, formData: FormData): Promise<InquiryActionState> {
    const session = await getSupabaseSession();
    if (!isAuthorized(session?.user?.email)) return { success: false, error: "Unauthorized." };

    const id = String(formData.get("id") ?? "").trim();
    const supabase = getSupabaseServiceClient();
    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    if (error) return { success: false, error: "Unable to delete." };

    revalidatePath("/admin/inquiries");
    return { success: true };
}
