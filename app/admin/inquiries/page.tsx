import { InquiriesClient } from "@/components/admin/InquiriesClient";
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
        <div className="space-y-6">
            <div>
                <h1 className="font-heading text-3xl font-light text-ink">Inquiries</h1>
                <p className="mt-2 text-sm text-ink-60">Wholesale enquiries submitted from the public site.</p>
            </div>
            <InquiriesClient rows={rows} />
        </div>
    );
}
