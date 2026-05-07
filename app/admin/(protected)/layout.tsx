import type { ReactNode } from "react";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { requireAdminSession } from "@/lib/adminAuth";

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
    await requireAdminSession();

    return (
        <div className="relative flex min-h-screen bg-slate-50">
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 rounded-l-[4rem] bg-gradient-to-b from-brand-light/60 via-white/50 to-brand-primary/10 blur-3xl lg:block" />
            <AdminSidebar />
            <div className="relative flex min-h-screen flex-1 flex-col">
                <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-br from-brand-light/40 via-white to-transparent" />
                <AdminTopbar />
                <main className="flex-1 px-4 pb-16 pt-8 sm:px-6 lg:px-12">
                    <div className="mx-auto w-full max-w-7xl space-y-8">{children}</div>
                </main>
            </div>
        </div>
    );
}
