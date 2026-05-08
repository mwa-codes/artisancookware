import { InquiriesClient } from "@/components/admin/InquiriesClient";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { requireAdminSession } from "@/lib/adminAuth";
import { getSupabaseServiceClient } from "@/lib/supabase";

export default async function AdminInquiriesPage() {
    await requireAdminSession();

    const supabase = getSupabaseServiceClient();
    const { data, error } = await supabase
        .from("inquiries")
        .select(
            `
        id, customer_name, email, message, created_at,
        company_name, country, buyer_type, quantity_requested,
        status, notes, replied_at,
        products ( name )
    `
        )
        .order("created_at", { ascending: false })
        .limit(200);

    if (error) {
        console.error("Admin inquiries load error", error);
    }

    const rows = (data ?? []).map((r: Record<string, unknown> & { products?: unknown }) => {
        const rel = r.products;
        const product_name = Array.isArray(rel)
            ? (rel[0] as { name?: string } | undefined)?.name ?? null
            : (rel as { name?: string } | null)?.name ?? null;
        const { products: _p, ...rest } = r;
        return { ...rest, product_name };
    });

    return (
        <div className="w-full space-y-6">
            <AdminPageHeader
                title="Inquiries"
                description="View and manage wholesale inquiries. Click any row to open the detail drawer."
                crumbs={[{ label: "Inquiries" }]}
            />
            <InquiriesClient rows={rows} />
        </div>
    );
}
