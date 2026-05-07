import { redirect } from "next/navigation";

import { VariantsClient } from "@/components/admin/VariantsClient";
import { createSupabaseServerComponentClient } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

type VariantRow = {
    id: string;
    product_id: string;
    color_name: string;
    image_url: string | null;
    created_at: string;
    products: { id: string; name: string }[] | null;
};

type ProductRow = {
    id: string;
    name: string;
};

export default async function VariantsPage() {
    const supabase = createSupabaseServerComponentClient();
    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
        redirect("/admin/login");
    }

    const { data: variantsData } = await supabase
        .from("product_variants")
        .select(
            `id, product_id, color_name, image_url, created_at, products:products(id, name)`
        )
        .order("created_at", { ascending: false });

    const { data: productsData } = await supabase
        .from("products")
        .select("id, name")
        .order("name");

    const variants = (variantsData ?? []).map((variant: VariantRow) => ({
        id: variant.id,
        product_id: variant.product_id,
        product_name: variant.products?.[0]?.name ?? "Unknown product",
        color_name: variant.color_name,
        image_url: variant.image_url,
        created_at: variant.created_at
    }));

    const products = (productsData ?? []).map((product: ProductRow) => ({
        id: product.id,
        name: product.name
    }));

    return <VariantsClient variants={variants} products={products} />;
}
