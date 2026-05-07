import { SectionHeading } from "@/components/SectionHeading";
import { CategoryCard } from "@/components/CategoryCard";
import { getCategories } from "@/lib/repository";

export const metadata = {
    title: "Cookware Categories | Artisan Cookware",
    description: "Browse anodised, metal finish, non-stick, and soda finish cookware crafted in Pakistan."
};

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <div className="container-grid space-y-14 py-16 sm:py-20">
            <SectionHeading
                eyebrow="Categories"
                title="Cookware Crafted for Every Kitchen"
                description="Select from our four signature finishes. Each collection is engineered for durability, aesthetics, and performance across Pakistan."
                align="center"
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
}
