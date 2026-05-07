import { ProductsClient, type AdminCategoryOption, type AdminProduct } from "@/components/admin/ProductsClient";
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
                "id, name, description, sizes, features, category_id, price_type, price_value, factory_price_value, fob_price_value, image_url, created_at, category:categories(id, name)"
            )
            .order("created_at", { ascending: false })
    ]);

    const categories: AdminCategoryOption[] = (categoriesData ?? []).map((category) => ({
        id: category.id,
        name: category.name
    }));

    const products: AdminProduct[] = (productsData ?? []).map((product: any) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        sizes: product.sizes,
        features: serialiseFeatures(product.features),
        category_id: product.category_id,
        category_name: product.category?.name ?? "Unassigned",
        price_type: product.price_type,
        price_value: product.price_value,
        factory_price_value: product.factory_price_value,
        fob_price_value: product.fob_price_value,
        image_url: product.image_url,
        created_at: product.created_at
    }));

    return <ProductsClient categories={categories} products={products} />;
}
