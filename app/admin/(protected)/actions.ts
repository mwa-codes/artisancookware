"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerActionClient } from "@/lib/supabaseServer";

export async function logoutAction() {
    const supabase = createSupabaseServerActionClient();
    await supabase.auth.signOut();
    redirect("/admin/login");
}
