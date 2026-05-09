import { slugify } from "@/lib/utils";
import type { Category, ProductSpecification, ProductVariant, ProductWithRelations } from "@/lib/types";

/** Fallback when USD columns are empty — aligns with typical PKR/USD for catalogue display */
const PKR_PER_USD_FALLBACK = 278;

export type SupabaseCategoryRow = Record<string, unknown> & {
    id: string;
    name: string;
    description?: string | null;
    slug?: string | null;
    image_url?: string | null;
    display_order?: number | null;
    is_featured?: boolean | null;
};

export type SupabaseProductRow = Record<string, unknown> & {
    id: string;
    category_id: string;
    name: string;
    description?: string | null;
    sizes?: string | null;
    features?: unknown;
    specifications?: unknown;
    image_url?: string | null;
    price_type?: string | null;
    price_value?: number | null;
    factory_price_value?: number | null;
    fob_price_value?: number | null;
    factory_price_usd?: number | null;
    fob_price_usd?: number | null;
    is_featured?: boolean | null;
    slug?: string | null;
    moq?: number | null;
    oem_available?: boolean | null;
    lead_time_weeks?: number | null;
    status?: string | null;
};

export type SupabaseVariantRow = {
    id: string;
    product_id: string;
    color_name: string;
    image_url: string | null;
};

export function normaliseFeatures(features: unknown): string[] {
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

export function normaliseSpecifications(specifications: unknown): ProductSpecification[] {
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

function deriveUsdFromPkr(pkr: number | null | undefined): number | null {
    if (pkr == null || !Number.isFinite(pkr)) return null;
    return Math.round((pkr / PKR_PER_USD_FALLBACK) * 100) / 100;
}

export function mapCategoryRow(row: SupabaseCategoryRow): Category {
    const slug =
        (typeof row.slug === "string" && row.slug.trim()) ? row.slug.trim() : slugify(row.name);

    const rawDesc = row.description;
    const description =
        typeof rawDesc === "string" && rawDesc.trim() ? rawDesc.trim() : null;

    return {
        id: row.id,
        name: row.name,
        slug,
        description,
        imageUrl: typeof row.image_url === "string" ? row.image_url : null,
        displayOrder: typeof row.display_order === "number" ? row.display_order : 0,
        isFeatured: Boolean(row.is_featured)
    };
}

export function mapProductSlug(row: SupabaseProductRow): string {
    if (typeof row.slug === "string" && row.slug.trim()) {
        return row.slug.trim().replace(/\s+/g, "-");
    }
    const base = slugify(row.name);
    const suffix = String(row.id).replace(/-/g, "").slice(0, 6);
    return `${base}-${suffix}`.toLowerCase();
}

export function mapProductRow(row: SupabaseProductRow): Omit<ProductWithRelations, "variants" | "category"> {
    const specifications = normaliseSpecifications(row.specifications);
    const priceType = (row.price_type as ProductWithRelations["priceType"]) ?? null;
    const factoryPkr =
        row.factory_price_value ?? (priceType === "Factory" ? row.price_value ?? null : null);
    const fobPkr = row.fob_price_value ?? (priceType === "FOB" ? row.price_value ?? null : null);

    const factoryUsd =
        typeof row.factory_price_usd === "number" && Number.isFinite(row.factory_price_usd)
            ? row.factory_price_usd
            : deriveUsdFromPkr(factoryPkr ?? null);
    const fobUsd =
        typeof row.fob_price_usd === "number" && Number.isFinite(row.fob_price_usd)
            ? row.fob_price_usd
            : deriveUsdFromPkr(fobPkr ?? null);

    const statusRaw = typeof row.status === "string" ? row.status : "active";
    const status =
        statusRaw === "draft" || statusRaw === "discontinued" || statusRaw === "active"
            ? statusRaw
            : "active";

    return {
        id: row.id,
        categoryId: row.category_id,
        name: row.name,
        slug: mapProductSlug(row),
        description: row.description ?? null,
        sizes: row.sizes ?? null,
        features: normaliseFeatures(row.features),
        imageUrl: typeof row.image_url === "string" ? row.image_url : null,
        specifications: specifications.length ? specifications : null,
        priceType,
        priceValue: row.price_value ?? null,
        factoryPriceValue: factoryPkr,
        fobPriceValue: fobPkr,
        factoryPriceUsd: factoryUsd,
        fobPriceUsd: fobUsd,
        moq: typeof row.moq === "number" && row.moq > 0 ? Math.floor(row.moq) : 50,
        oemAvailable: Boolean(row.oem_available),
        leadTimeWeeks: typeof row.lead_time_weeks === "number" && row.lead_time_weeks > 0 ? row.lead_time_weeks : 4,
        status,
        isFeatured: Boolean(row.is_featured)
    };
}

export function attachVariants(
    product: ProductWithRelations,
    variantPool: ProductVariant[]
): ProductWithRelations {
    return {
        ...product,
        variants: variantPool.filter((variant) => variant.productId === product.id)
    };
}

export function mapVariantRow(row: SupabaseVariantRow): ProductVariant {
    return {
        id: row.id,
        productId: row.product_id,
        colorName: row.color_name,
        imageUrl: row.image_url
    };
}
