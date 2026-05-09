import { CategoriesClient, type AdminCategory } from "@/components/admin/CategoriesClient";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getSupabaseServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
    const supabase = getSupabaseServiceClient();
    const { data } = await supabase
        .from("categories")
        .select("id, name, slug, description, image_url, display_order, is_featured, created_at")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });

    return (
        <div className="w-full space-y-6">
            <AdminPageHeader
                title="Categories"
                description="Manage product categories — add images, set display order, control homepage visibility."
                crumbs={[{ label: "Categories" }]}
            />
            <CategoriesClient categories={(data ?? []) as AdminCategory[]} />
        </div>
    );
}
