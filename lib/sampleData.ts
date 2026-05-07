import { slugify } from "@/lib/utils";
import type { Category, Product, ProductVariant } from "@/lib/types";

export const categories: Category[] = [
    {
        id: "9ab4f474-3f19-4bf6-8465-63683bcab9d1",
        name: "Anodised/Dull",
        description: "Durable anodised cookware with a timeless matte finish, ideal for heavy duty kitchens.",
        slug: "anodised-dull"
    },
    {
        id: "0d83e4cf-5014-4909-9e66-7bda83ed17f7",
        name: "Metal Finish",
        description: "Polished metal cookware that shines in presentation and performance.",
        slug: "metal-finish"
    },
    {
        id: "ad21925e-7b3d-4c28-8c4f-cc6f4ef67663",
        name: "Non-Stick",
        description: "Modern non-stick collections designed for low-fat, effortless cooking.",
        slug: "non-stick"
    },
    {
        id: "2e89714d-0bf4-4e37-8f9e-dd2a44596c11",
        name: "Soda Finish",
        description: "Classic soda-finish cookware celebrated for its distinctive texture.",
        slug: "soda-finish"
    }
];

export const products: Product[] = [
    {
        id: "8c4c668c-0be3-47c5-9453-51f63f923c2a",
        categoryId: categories[1].id,
        name: "15-Piece Metal Finish Gift Set",
        description:
            "Complete cookware bundle with polished metal finish, ideal for gifting and outfitting kitchens in one go.",
        sizes:
            "Frying Pan (23 cm), Saucepan (20 cm), Karahi/Wok (28 cm), Baking Tawa (13 inch), Pots (20/23/25.5 cm), Wooden spoon set (3 pcs)",
        features: [
            "Elegant metal finish for timeless presentation",
            "Complete cooking range for everyday needs",
            "Durable aluminium lids for heat retention"
        ],
        specifications: [
            { label: "Gauge", value: "3.0 mm" },
            { label: "Material", value: "Food-grade aluminium" },
            { label: "Finish", value: "High-gloss metal" },
            { label: "Weight", value: "11.5 kg (complete set)" }
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1589307004390-97eb644ed3f2?auto=format&fit=crop&w=800&q=80",
        priceType: "Factory",
        priceValue: 5400,
        factoryPriceValue: 5400,
        fobPriceValue: 6100
    },
    {
        id: "0f735b0b-d93c-4c56-8a16-1dc2812f6a0a",
        categoryId: categories[2].id,
        name: "18-Piece Non-Stick Gift Set",
        description:
            "Versatile non-stick set tailored for modern kitchens with multiple colorways to match your style.",
        sizes:
            "Casseroles (20/24/28 cm), Frying Pan (24 cm), Saucepan (18 cm), Karahi/Wok (28 cm), Baking Tawa (12 inch), Plastic spoon set (6 pcs)",
        features: [
            "Healthy cooking with premium non-stick coating",
            "Full kitchen solution in a single collection",
            "Smart choice for modern kitchens"
        ],
        specifications: [
            { label: "Gauge", value: "2.5 mm" },
            { label: "Material", value: "Heavy-gauge aluminium" },
            { label: "Coating", value: "Triple-layer non-stick" },
            { label: "Weight", value: "12.2 kg (gross)" }
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=800&q=80",
        priceType: "Factory",
        priceValue: 6200,
        factoryPriceValue: 6200,
        fobPriceValue: 6900
    },
    {
        id: "8dc1d98f-9168-4a5b-8fd7-b9cd680b7f7c",
        categoryId: categories[0].id,
        name: "Dull/Anodised Cooking Set",
        description:
            "Hard-anodised cookware built to endure intensive commercial and home kitchen use.",
        sizes: "Sizes available from 18 cm up to 47 cm",
        features: [
            "Hard-anodised construction with even heating",
            "Heavy lids for moisture retention",
            "Exceptional value for professional kitchens"
        ],
        specifications: [
            { label: "Gauge", value: "3.2 mm" },
            { label: "Material", value: "Hard-anodised aluminium" },
            { label: "Finish", value: "Matte dull" },
            { label: "Weight", value: "14.0 kg (full set)" }
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=800&q=80",
        priceType: "Factory",
        priceValue: 4800,
        factoryPriceValue: 4800,
        fobPriceValue: 5400
    },
    {
        id: "aba9a069-7938-4b82-9d14-d58a1d8f5c31",
        categoryId: categories[1].id,
        name: "Metal Finish Wok Set",
        description:
            "Heavy-duty wok series crafted for traditional Pakistani recipes and high-heat cooking.",
        sizes: null,
        features: [
            "Heavy-duty construction with reinforced base",
            "Perfectly balanced for stir-fries and curries",
            "Resilient finish for long-term commercial use"
        ],
        specifications: [
            { label: "Gauge", value: "3.5 mm" },
            { label: "Material", value: "Aluminium with metal finish" },
            { label: "Set Weight", value: "8.3 kg" }
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        priceType: "Factory",
        priceValue: 5100,
        factoryPriceValue: 5100,
        fobPriceValue: 5800
    }
];

export const variants: ProductVariant[] = [
    {
        id: "8b438b57-6d0b-4b78-b8ba-97ed9869965b",
        productId: products[1].id,
        colorName: "Antique Silver",
        imageUrl:
            "https://images.unsplash.com/photo-1522747776116-64ee0d07f6b6?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "86ad0dd8-3b71-4681-bad1-c116d0fb89e1",
        productId: products[1].id,
        colorName: "Black",
        imageUrl:
            "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "1e0dfc52-9728-4d90-bd02-1b047953afcf",
        productId: products[1].id,
        colorName: "Red",
        imageUrl:
            "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "2c17fed2-45d2-4f5a-8dd5-3ae675b89b75",
        productId: products[1].id,
        colorName: "Maroon",
        imageUrl:
            "https://images.unsplash.com/photo-1542718610-a1d656d189f4?auto=format&fit=crop&w=800&q=80"
    }
];

export function getCategoryBySlug(slug: string) {
    return categories.find((category) => category.slug === slug || slugify(category.name) === slug);
}
