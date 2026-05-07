import type { ReactNode } from "react";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { requireAdminSession } from "@/lib/adminAuth";

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
    await requireAdminSession();

    return (
        <div className="relative flex min-h-screen bg-parchment">
            <AdminSidebar />
            <div className="relative flex min-h-screen flex-1 flex-col bg-parchment">
                <AdminTopbar />
                <main className="flex-1 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-7xl space-y-8">{children}</div>
                </main>
            </div>
        </div>
    );
}
