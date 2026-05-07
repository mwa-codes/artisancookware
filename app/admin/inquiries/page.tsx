import { InquiriesClient } from "@/components/admin/InquiriesClient";
import { requireAdminSession } from "@/lib/adminAuth";
import { getSupabaseServiceClient } from "@/lib/supabase";

export default async function AdminInquiriesPage() {
    await requireAdminSession();

    const supabase = getSupabaseServiceClient();
    const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(200);

    if (error) {
        console.error("Admin inquiries load error", error);
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-heading text-3xl font-light text-ink">Inquiries</h1>
                <p className="mt-2 text-sm text-ink-60">Wholesale enquiries submitted from the public site.</p>
            </div>
            <InquiriesClient rows={data ?? []} />
        </div>
    );
}
