import { ProductsClient, type AdminCategoryOption, type AdminProduct } from "@/components/admin/ProductsClient";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getSupabaseServiceClient } from "@/lib/supabase";

function serialiseFeatures(features: unknown): string | null {
    if (!features) return null;
    if (Array.isArray(features)) {
        return features.map((item) => String(item).trim()).filter(Boolean).join("\n");
    }
    if (typeof features === "string") {
        return features;
    }
    return null;
}

export default async function AdminProductsPage() {
    const supabase = getSupabaseServiceClient();

    const [{ data: categoriesData }, { data: productsData }] = await Promise.all([
        supabase.from("categories").select("id, name").order("name"),
        supabase
            .from("products")
            .select(
                "id, name, slug, description, sizes, features, category_id, price_type, price_value, factory_price_value, fob_price_value, factory_price_usd, fob_price_usd, moq, oem_available, lead_time_weeks, status, is_featured, image_url, created_at, category:categories(id, name)"
            )
            .order("is_featured", { ascending: false })
            .order("created_at", { ascending: false })
    ]);

    const categories: AdminCategoryOption[] = (categoriesData ?? []).map((category) => ({
        id: category.id,
        name: category.name
    }));

    const products: AdminProduct[] = (productsData ?? []).map((product: any) => ({
        id: product.id,
        name: product.name,
        slug: product.slug ?? "",
        description: product.description,
        sizes: product.sizes,
        features: serialiseFeatures(product.features),
        category_id: product.category_id,
        category_name: product.category?.name ?? "Unassigned",
        price_type: product.price_type,
        price_value: product.price_value,
        factory_price_value: product.factory_price_value,
        fob_price_value: product.fob_price_value,
        factory_price_usd: product.factory_price_usd,
        fob_price_usd: product.fob_price_usd,
        moq: typeof product.moq === "number" ? product.moq : 50,
        oem_available: Boolean(product.oem_available),
        lead_time_weeks: typeof product.lead_time_weeks === "number" ? product.lead_time_weeks : 4,
        status: (product.status as AdminProduct["status"]) ?? "active",
        is_featured: Boolean(product.is_featured),
        image_url: product.image_url,
        created_at: product.created_at
    }));

    return (
        <div className="space-y-6 w-full">
            <AdminPageHeader
                title="Products"
                description="Manage your product catalogue — add, edit, or remove products."
                crumbs={[{ label: "Products" }]}
            />
            <ProductsClient categories={categories} products={products} />
        </div>
    );
}
