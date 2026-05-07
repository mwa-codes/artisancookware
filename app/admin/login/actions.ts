"use server";

import { redirect } from "next/navigation";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/constants";
import { createSupabaseServerActionClient } from "@/lib/supabaseServer";
import { getSupabaseServiceClient } from "@/lib/supabase";

export type LoginFormState = {
    error?: string;
};

export async function loginAction(prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    const redirectPath = String(formData.get("redirectTo") ?? "") || "/admin";

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        return { error: "Invalid credentials." };
    }

    try {
        const serviceClient = getSupabaseServiceClient();
        const { error: ensureError } = await serviceClient.auth.admin.createUser({
            email,
            password,
            email_confirm: true
        });

        if (ensureError) {
            const message = ensureError.message?.toLowerCase?.() ?? "";
            const status = "status" in ensureError ? (ensureError as { status?: number }).status : undefined;

            const alreadyExists = message.includes("already been registered") || message.includes("already registered") || status === 422;

            if (!alreadyExists) {
                console.error("Failed to ensure admin user", ensureError);
                return { error: "Supabase admin provisioning failed. Check the server logs for details." };
            }
        }
    } catch (error) {
        console.warn("Supabase service client unavailable; proceeding without ensure step.", error);
    }

    const supabase = createSupabaseServerActionClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        const reason = error.message?.toLowerCase?.() ?? "";

        if (reason.includes("email not confirmed")) {
            return { error: "Please confirm the admin email in Supabase Auth before signing in." };
        }

        if (reason.includes("invalid login credentials")) {
            return { error: "Supabase rejected the credentials. Double-check the password in Auth → Users." };
        }

        console.error("Supabase sign-in failed", error);
        return { error: `Supabase sign-in failed: ${error.message}` };
    }

    redirect(redirectPath);
}
