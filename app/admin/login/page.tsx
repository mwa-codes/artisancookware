import { LoginForm } from "./LoginForm";
import { ADMIN_EMAIL } from "@/lib/constants";
import { getSupabaseSession } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

interface LoginPageProps {
    searchParams: Record<string, string | string[] | undefined>;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
    const session = await getSupabaseSession();
    const redirectToParam = typeof searchParams.redirect === "string" ? searchParams.redirect : undefined;

    if (session?.user?.email === ADMIN_EMAIL) {
        redirect(redirectToParam ?? "/admin");
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-surface via-background-soft to-brand-light/70 px-6 py-16">
            <LoginForm redirectTo={redirectToParam} />
        </div>
    );
}
