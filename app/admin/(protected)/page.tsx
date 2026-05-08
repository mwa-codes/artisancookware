import Link from "next/link";
import { Package, FolderOpen, Layers, Mail } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getSupabaseServiceClient } from "@/lib/supabase";

type RecentInquiry = {
    id: string;
    customer_name: string;
    email: string;
    message: string;
    created_at: string;
    product: { id: string; name: string } | null;
};

type DashboardData = {
    categories: number;
    products: number;
    variants: number;
    inquiries: number;
    recentInquiries: RecentInquiry[];
};

async function getDashboardData(): Promise<DashboardData> {
    const supabase = getSupabaseServiceClient();

    const [categoriesCount, productsCount, variantsCount, inquiriesCount, recentInquiries] = await Promise.all([
        supabase.from("categories").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("product_variants").select("id", { count: "exact", head: true }),
        supabase.from("inquiries").select("id", { count: "exact", head: true }),
        supabase
            .from("inquiries")
            .select("id, customer_name, email, message, created_at, products(id, name)")
            .order("created_at", { ascending: false })
            .limit(5)
    ]);

    const recentInquiriesData: RecentInquiry[] = (recentInquiries.data ?? []).map((item: any) => {
        const productRelation = item.products;
        const product = Array.isArray(productRelation) ? productRelation[0] ?? null : productRelation ?? null;

        return {
            id: item.id,
            customer_name: item.customer_name,
            email: item.email,
            message: item.message,
            created_at: item.created_at,
            product: product ? { id: product.id, name: product.name } : null
        } satisfies RecentInquiry;
    });

    return {
        categories: categoriesCount.count ?? 0,
        products: productsCount.count ?? 0,
        variants: variantsCount.count ?? 0,
        inquiries: inquiriesCount.count ?? 0,
        recentInquiries: recentInquiriesData
    };
}

export default async function AdminDashboardPage() {
    const data = await getDashboardData();

    const statCards = [
        { label: "Products", value: data.products, href: "/admin/products", icon: Package },
        { label: "Categories", value: data.categories, href: "/admin/categories", icon: FolderOpen },
        { label: "Variants", value: data.variants, href: "/admin/variants", icon: Layers },
        { label: "Inquiries", value: data.inquiries, href: "/admin/inquiries", icon: Mail }
    ];

    return (
        <div className="space-y-8">
            <AdminPageHeader title="Dashboard" description="Monitor your catalogue and incoming inquiries." />

            <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
                {statCards.map(({ label, value, href, icon: Icon }) => (
                    <Link key={href} href={href} className="stat-card group">
                        <div className="flex items-center justify-between mb-4">
                            <span className="admin-label mb-0">{label}</span>
                            <Icon className="h-4 w-4 text-gold" />
                        </div>
                        <div className="font-heading text-4xl font-light text-ink">{value}</div>
                        <div className="mt-2 text-[11px] uppercase tracking-[0.08em] text-ink-60 group-hover:text-gold transition-colors">
                            View all →
                        </div>
                    </Link>
                ))}
            </div>

            <div className="flex gap-3 flex-wrap">
                <Link href="/admin/products?action=new" className="admin-btn-primary">
                    + Add Product
                </Link>
                <Link href="/admin/categories?action=new" className="admin-btn-outline">
                    + Add Category
                </Link>
                <Link href="/admin/inquiries" className="admin-btn-outline">
                    View Inquiries
                </Link>
            </div>

            <div className="bg-white border border-ink-20 rounded-[2px]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-ink-20">
                    <h2 className="font-heading text-xl font-light text-ink">Recent Inquiries</h2>
                    <Link
                        href="/admin/inquiries"
                        className="text-[12px] font-semibold uppercase tracking-[0.08em] text-gold hover:text-ink transition-colors"
                    >
                        View All →
                    </Link>
                </div>
                {data.recentInquiries.length === 0 ? (
                    <div className="px-6 py-12 text-center text-sm text-ink-60">No inquiries yet.</div>
                ) : (
                    <div className="divide-y divide-ink-20">
                        {data.recentInquiries.map((inquiry) => (
                            <div key={inquiry.id} className="px-6 py-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="grid h-9 w-9 shrink-0 place-items-center bg-parchment text-sm font-semibold text-ink rounded-[2px]">
                                            {inquiry.customer_name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-ink">{inquiry.customer_name}</div>
                                            <div className="text-xs text-ink-60">{inquiry.email}</div>
                                        </div>
                                    </div>
                                    <time className="shrink-0 text-xs text-ink-60">
                                        {new Date(inquiry.created_at).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </time>
                                </div>
                                <p className="mt-3 text-sm text-ink-60 line-clamp-2">{inquiry.message}</p>
                                {inquiry.product && (
                                    <div className="mt-2 inline-flex items-center gap-1.5 border border-gold/30 bg-gold-pale px-2 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-gold rounded-[2px]">
                                        {inquiry.product.name}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
