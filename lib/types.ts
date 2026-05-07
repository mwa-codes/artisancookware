export type Category = {
    id: string;
    name: string;
    description: string | null;
    slug: string;
};

export type Product = {
    id: string;
    categoryId: string;
    name: string;
    description: string | null;
    sizes: string | null;
    features: string[];
    imageUrl: string | null;
    specifications?: ProductSpecification[] | null;
    priceType: "Factory" | "FOB" | null;
    priceValue: number | null;
    factoryPriceValue?: number | null;
    fobPriceValue?: number | null;
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
