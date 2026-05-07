import Link from "next/link";
import { getSupabaseServiceClient } from "@/lib/supabase";

const metrics = [
    { key: "categories", name: "Categories", href: "/admin/categories" },
    { key: "products", name: "Products", href: "/admin/products" },
    { key: "variants", name: "Variants", href: "/admin/variants" },
    { key: "inquiries", name: "Inquiries", href: "/admin/inquiries" }
] as const;

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
            .select("id, customer_name, email, message, created_at, product:products!inquiries_product_id_fkey(id, name)")
            .order("created_at", { ascending: false })
            .limit(5)
    ]);

    const recentInquiriesData: RecentInquiry[] = (recentInquiries.data ?? []).map((item: any) => {
        const productRelation = item.product;
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

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="rounded-4xl border border-brand-primary/10 bg-gradient-to-br from-white via-brand-surface/30 to-brand-light/20 p-8 shadow-premium">
                <h1 className="font-heading text-3xl font-bold text-brand-slate">Dashboard Overview</h1>
                <p className="mt-2 text-slate-600">Monitor your cookware catalogue and customer inquiries in real-time.</p>
            </div>

            {/* Stats Grid */}
            <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((metric) => {
                    const value = data[metric.key];
                    return (
                        <Link
                            key={metric.name}
                            href={metric.href}
                            className="stat-card group"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{metric.name}</p>
                                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-surface transition-colors group-hover:bg-brand-primary/10">
                                    <span className="text-brand-primary">→</span>
                                </div>
                            </div>
                            <p className="mt-4 font-heading text-4xl font-bold text-brand-slate">{value}</p>
                            <span className="mt-2 text-sm font-medium text-slate-500 transition-colors group-hover:text-brand-primary">
                                View all {metric.name.toLowerCase()}
                            </span>
                        </Link>
                    );
                })}
            </section>

            {/* Recent Inquiries */}
            <section className="rounded-4xl border border-brand-primary/10 bg-white p-8 shadow-card">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
                    <div>
                        <h2 className="font-heading text-2xl font-bold text-brand-slate">Recent Inquiries</h2>
                        <p className="mt-1 text-sm text-slate-600">Latest messages from potential partners and customers.</p>
                    </div>
                    <Link
                        href="/admin/inquiries"
                        className="btn-secondary text-sm"
                    >
                        View All
                    </Link>
                </div>

                <div className="mt-6 space-y-4">
                    {data.recentInquiries.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 p-12 text-center">
                            <p className="text-sm text-slate-500">No inquiries received yet.</p>
                        </div>
                    ) : (
                        data.recentInquiries.map((inquiry) => (
                            <article
                                key={inquiry.id}
                                className="rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/30 p-6 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-primary/10 font-semibold text-brand-primary">
                                                {inquiry.customer_name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-brand-slate">{inquiry.customer_name}</p>
                                                <p className="text-xs text-slate-500">{inquiry.email}</p>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-sm leading-relaxed text-slate-700">{inquiry.message}</p>
                                        {inquiry.product && (
                                            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-surface px-3 py-1 text-xs font-medium text-brand-primary">
                                                Product: {inquiry.product.name}
                                            </div>
                                        )}
                                    </div>
                                    <time className="text-xs font-medium text-slate-400">
                                        {new Date(inquiry.created_at).toLocaleDateString("en-PK", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric"
                                        })}
                                    </time>
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}
