export type Category = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    displayOrder: number;
    isFeatured: boolean;
};

export type Product = {
    id: string;
    categoryId: string;
    name: string;
    slug: string;
    description: string | null;
    sizes: string | null;
    features: string[];
    imageUrl: string | null;
    specifications?: ProductSpecification[] | null;
    priceType: "Factory" | "FOB" | null;
    priceValue: number | null;
    factoryPriceValue?: number | null;
    fobPriceValue?: number | null;
    /** Factory price in USD (DB or derived) */
    factoryPriceUsd: number | null;
    fobPriceUsd: number | null;
    moq: number;
    oemAvailable: boolean;
    leadTimeWeeks: number;
    status: "active" | "draft" | "discontinued";
    isFeatured?: boolean;
};

export type ProductSpecification = {
    label: string;
    value: string;
};

export type ProductVariant = {
    id: string;
    productId: string;
    colorName: string;
    imageUrl: string | null;
};

export type ProductWithRelations = Product & {
    category?: Category;
    variants?: ProductVariant[];
};

export type InquiryStatus = "unread" | "read" | "replied" | "closed";

export type BuyerType = "wholesaler" | "retailer" | "hotel" | "importer" | "oem" | "other";
