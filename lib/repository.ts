import { cache } from "react";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { categories as sampleCategories, products as sampleProducts, variants as sampleVariants } from "@/lib/sampleData";
import { slugify } from "@/lib/utils";
import type { Category, ProductSpecification, ProductWithRelations, ProductVariant } from "@/lib/types";

type SupabaseCategoryRow = {
    id: string;
    name: string;
    description: string | null;
};

type SupabaseProductRow = {
    id: string;
    category_id: string;
    name: string;
    description: string | null;
    sizes: string | null;
    features: string | string[] | null;
    image_url: string | null;
    specifications?: unknown;
    price_type: "Factory" | "FOB" | null;
    price_value: number | null;
    factory_price_value?: number | null;
    fob_price_value?: number | null;
    is_featured?: boolean | null;
};

type SupabaseVariantRow = {
    id: string;
    product_id: string;
    color_name: string;
    image_url: string | null;
};

function normaliseFeatures(features: unknown): string[] {
    if (!features) return [];
    if (Array.isArray(features)) {
        return features.map((item) => String(item).trim()).filter(Boolean);
    }
    if (typeof features === "string") {
        return features
            .split(/\r?\n|,|;|\|/)
            .map((item) => item.trim())
            .filter(Boolean);
    }
    return [];
}

function normaliseSpecifications(specifications: unknown): ProductSpecification[] {
    if (!specifications) return [];

    if (Array.isArray(specifications)) {
        return specifications
            .map((spec) => {
                if (spec && typeof spec === "object") {
                    const label = "label" in spec ? String((spec as Record<string, unknown>).label ?? "").trim() : "";
                    const value = "value" in spec ? String((spec as Record<string, unknown>).value ?? "").trim() : "";
                    if (label && value) {
                        return { label, value };
                    }
                }

                if (typeof spec === "string") {
                    const [label, ...valueParts] = spec.split(":");
                    const cleanLabel = label?.trim() ?? "";
                    const cleanValue = valueParts.join(":").trim();
                    if (cleanLabel && cleanValue) {
                        return { label: cleanLabel, value: cleanValue };
                    }
                }

                return null;
            })
            .filter((spec): spec is ProductSpecification => Boolean(spec));
    }

    if (typeof specifications === "object") {
        return Object.entries(specifications as Record<string, unknown>)
            .map(([rawLabel, rawValue]) => {
                const label = String(rawLabel).replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()).trim();
                const value = typeof rawValue === "string" ? rawValue : rawValue != null ? String(rawValue) : "";
                if (label && value) {
                    return { label, value };
                }
                return null;
            })
            .filter((spec): spec is ProductSpecification => Boolean(spec));
    }

    if (typeof specifications === "string") {
        return specifications
            .split(/\r?\n|,/)
            .map((line) => {
                const [label, ...valueParts] = line.split(":");
                const cleanLabel = label?.trim() ?? "";
                const cleanValue = valueParts.join(":").trim();
                if (cleanLabel && cleanValue) {
                    return { label: cleanLabel, value: cleanValue };
                }
                return null;
            })
            .filter((spec): spec is ProductSpecification => Boolean(spec));
    }

    return [];
}

function attachVariants(
    product: ProductWithRelations,
    variantPool: ProductVariant[]
): ProductWithRelations {
    return {
        ...product,
        variants: variantPool.filter((variant) => variant.productId === product.id)
    };
}

export const getCategories = cache(async (): Promise<Category[]> => {
    if (!isSupabaseConfigured()) {
        return sampleCategories;
    }

    try {
        const client = getSupabaseClient();
        const { data, error } = await client.from("categories").select("id, name, description").order("name");

        if (error) {
            console.error("Failed to load categories from Supabase", error);
            return sampleCategories;
        }

        return (
            data?.map((category: SupabaseCategoryRow) => ({
                id: category.id,
                name: category.name,
                description: category.description ?? null,
                slug: slugify(category.name)
            })) ?? sampleCategories
        );
    } catch (error) {
        console.error("Supabase categories fetch error", error);
        return sampleCategories;
    }
});

export const getCategoryBySlug = cache(async (slug: string) => {
    const allCategories = await getCategories();
    return allCategories.find((category) => category.slug === slug || slugify(category.name) === slug) ?? null;
});

export const getFeaturedCategories = cache(async () => {
    const list = await getCategories();
    return list.slice(0, 4);
});

export const getFeaturedProducts = cache(async (limit: number = 3): Promise<ProductWithRelations[]> => {
    const take = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 3;
    const allCategories = await getCategories();

    if (!isSupabaseConfigured()) {
        return sampleProducts.slice(0, take).map((product) => {
            const category = allCategories.find((item) => item.id === product.categoryId) ?? null;
            return attachVariants(
                {
                    ...product,
                    category: category ?? undefined,
                    specifications: product.specifications ?? null
                },
                sampleVariants
            );
        });
    }

    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("products")
            .select(
                "id, category_id, name, description, sizes, features, specifications, image_url, price_type, price_value, factory_price_value, fob_price_value, is_featured"
            )
            .order("is_featured", { ascending: false })
            .order("created_at", { ascending: false })
            .limit(take);

        if (error || !data?.length) {
            if (error) {
                console.error("Failed to fetch featured products", error);
            }
            return sampleProducts.slice(0, take).map((product) => {
                const category = allCategories.find((item) => item.id === product.categoryId) ?? null;
                return attachVariants(
                    {
                        ...product,
                        category: category ?? undefined,
                        specifications: product.specifications ?? null
                    },
                    sampleVariants
                );
            });
        }

        const variantIds = data.map((product: SupabaseProductRow) => product.id);
        const { data: variantData } = await client
            .from("product_variants")
            .select("id, product_id, color_name, image_url")
            .in("product_id", variantIds);

        const variantPool: ProductVariant[] = (variantData ?? []).map((variant: SupabaseVariantRow) => ({
            id: variant.id,
            productId: variant.product_id,
            colorName: variant.color_name,
            imageUrl: variant.image_url
        }));

        return data.map((product: SupabaseProductRow) => {
            const category = allCategories.find((item) => item.id === product.category_id) ?? null;
            const specifications = normaliseSpecifications(product.specifications);
            return attachVariants(
                {
                    id: product.id,
                    categoryId: product.category_id,
                    name: product.name,
                    description: product.description ?? null,
                    sizes: product.sizes ?? null,
                    features: normaliseFeatures(product.features),
                    imageUrl: product.image_url ?? null,
                    specifications: specifications.length ? specifications : null,
                    priceType: (product.price_type as ProductWithRelations["priceType"]) ?? null,
                    priceValue: product.price_value ?? null,
                    factoryPriceValue:
                        product.factory_price_value ?? (product.price_type === "Factory" ? product.price_value ?? null : null),
                    fobPriceValue:
                        product.fob_price_value ?? (product.price_type === "FOB" ? product.price_value ?? null : null),
                    isFeatured: Boolean(product.is_featured),
                    category: category ?? undefined
                },
                variantPool
            );
        });
    } catch (error) {
        console.error("Supabase featured products fetch error", error);
        return sampleProducts.slice(0, take).map((product) => {
            const category = allCategories.find((item) => item.id === product.categoryId) ?? null;
            return attachVariants(
                {
                    ...product,
                    category: category ?? undefined,
                    specifications: product.specifications ?? null
                },
                sampleVariants
            );
        });
    }
});

export const getProductsByCategorySlug = cache(async (slug: string): Promise<ProductWithRelations[]> => {
    const category = await getCategoryBySlug(slug);
    if (!category) return [];

    if (!isSupabaseConfigured()) {
        return sampleProducts
            .filter((product) => product.categoryId === category.id)
            .map((product) =>
                attachVariants(
                    {
                        ...product,
                        category,
                        specifications: product.specifications ?? null
                    },
                    sampleVariants
                )
            );
    }

    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("products")
            .select(
                "id, category_id, name, description, sizes, features, specifications, image_url, price_type, price_value, factory_price_value, fob_price_value, is_featured"
            )
            .eq("category_id", category.id)
            .order("is_featured", { ascending: false })
            .order("name");

        if (error) {
            console.error("Failed to fetch products by category", error);
            return sampleProducts
                .filter((product) => product.categoryId === category.id)
                .map((product) =>
                    attachVariants(
                        {
                            ...product,
                            category
                        },
                        sampleVariants
                    )
                );
        }

        const productIds = data?.map((product: SupabaseProductRow) => product.id) ?? [];
        let variantPool: ProductVariant[] = [];

        if (productIds.length) {
            const { data: variantData, error: variantError } = await client
                .from("product_variants")
                .select("id, product_id, color_name, image_url")
                .in("product_id", productIds);

            if (variantError) {
                console.error("Failed to load product variants", variantError);
            } else {
                variantPool = (variantData ?? []).map((variant: SupabaseVariantRow) => ({
                    id: variant.id,
                    productId: variant.product_id,
                    colorName: variant.color_name,
                    imageUrl: variant.image_url
                }));
            }
        }

        return (data ?? []).map((product: SupabaseProductRow) =>
            attachVariants(
                {
                    id: product.id,
                    categoryId: product.category_id,
                    name: product.name,
                    description: product.description ?? null,
                    sizes: product.sizes ?? null,
                    features: normaliseFeatures(product.features),
                    imageUrl: product.image_url ?? null,
                    specifications: (() => {
                        const specs = normaliseSpecifications(product.specifications);
                        return specs.length ? specs : null;
                    })(),
                    priceType: (product.price_type as ProductWithRelations["priceType"]) ?? null,
                    priceValue: product.price_value ?? null,
                    factoryPriceValue:
                        product.factory_price_value ?? (product.price_type === "Factory" ? product.price_value ?? null : null),
                    fobPriceValue:
                        product.fob_price_value ?? (product.price_type === "FOB" ? product.price_value ?? null : null),
                    isFeatured: Boolean(product.is_featured),
                    category
                },
                variantPool
            )
        );
    } catch (error) {
        console.error("Supabase products by category fetch error", error);
        return sampleProducts
            .filter((product) => product.categoryId === category.id)
            .map((product) =>
                attachVariants(
                    {
                        ...product,
                        category,
                        specifications: product.specifications ?? null
                    },
                    sampleVariants
                )
            );
    }
});

export const getProductById = cache(async (id: string): Promise<ProductWithRelations | null> => {
    if (!id) return null;

    if (!isSupabaseConfigured()) {
        const product = sampleProducts.find((item) => item.id === id);
        if (!product) return null;
        const category = sampleCategories.find((item) => item.id === product.categoryId);
        return attachVariants(
            {
                ...product,
                category: category ?? undefined,
                specifications: product.specifications ?? null
            },
            sampleVariants
        );
    }

    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("products")
            .select(
                "id, category_id, name, description, sizes, features, specifications, image_url, price_type, price_value, factory_price_value, fob_price_value, is_featured"
            )
            .eq("id", id)
            .maybeSingle();

        if (error || !data) {
            if (error) {
                console.error("Failed to fetch product", error);
            }
            return null;
        }

        const { data: categoryData } = await client
            .from("categories")
            .select("id, name, description")
            .eq("id", data.category_id)
            .maybeSingle();

        const category: Category | undefined = categoryData
            ? {
                id: categoryData.id,
                name: categoryData.name,
                description: categoryData.description ?? null,
                slug: slugify(categoryData.name)
            }
            : undefined;

        const { data: variantData, error: variantError } = await client
            .from("product_variants")
            .select("id, product_id, color_name, image_url")
            .eq("product_id", data.id);

        if (variantError) {
            console.error("Product variant fetch error", variantError);
        }

        const variantPool: ProductVariant[] = (variantData ?? []).map((variant: SupabaseVariantRow) => ({
            id: variant.id,
            productId: variant.product_id,
            colorName: variant.color_name,
            imageUrl: variant.image_url
        }));

        return attachVariants(
            {
                id: data.id,
                categoryId: data.category_id,
                name: data.name,
                description: data.description ?? null,
                sizes: data.sizes ?? null,
                features: normaliseFeatures(data.features),
                imageUrl: data.image_url ?? null,
                specifications: (() => {
                    const specs = normaliseSpecifications(data.specifications);
                    return specs.length ? specs : null;
                })(),
                priceType: (data.price_type as ProductWithRelations["priceType"]) ?? null,
                priceValue: data.price_value ?? null,
                factoryPriceValue: data.factory_price_value ?? (data.price_type === "Factory" ? data.price_value ?? null : null),
                fobPriceValue: data.fob_price_value ?? (data.price_type === "FOB" ? data.price_value ?? null : null),
                isFeatured: Boolean(data.is_featured),
                category
            },
            variantPool
        );
    } catch (error) {
        console.error("Supabase product fetch error", error);
        return null;
    }
});
