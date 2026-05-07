import { redirect } from "next/navigation";
import { ADMIN_EMAIL } from "./constants";
import { getSupabaseSession } from "./supabaseServer";

export async function requireAdminSession() {
    const session = await getSupabaseSession();

    if (!session || session.user.email !== ADMIN_EMAIL) {
        redirect("/admin/login");
    }

    return session;
}
