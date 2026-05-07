import { CategoriesClient } from "@/components/admin/CategoriesClient";
import { getSupabaseServiceClient } from "@/lib/supabase";

export default async function AdminCategoriesPage() {
    const supabase = getSupabaseServiceClient();
    const { data } = await supabase.from("categories").select("id, name, description, created_at").order("created_at", { ascending: false });

    return <CategoriesClient categories={(data ?? []) as Array<{ id: string; name: string; description: string | null; created_at: string }>} />;
}
