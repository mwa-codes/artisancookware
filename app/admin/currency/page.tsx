import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { requireAdminSession } from "@/lib/adminAuth";
import { getSupabaseServiceClient } from "@/lib/supabase";

export default async function AdminCurrencyPage() {
    await requireAdminSession();

    let fetchedAt: string | null = null;
    let rates: Record<string, unknown> | null = null;

    try {
        const supabase = getSupabaseServiceClient();
        const { data } = await supabase.from("currency_rates").select("rates, fetched_at").eq("base_currency", "USD").maybeSingle();
        fetchedAt = data?.fetched_at ? String(data.fetched_at) : null;
        rates = (data?.rates as Record<string, unknown>) ?? null;
    } catch {
        rates = null;
    }

    const entries = rates ? Object.entries(rates).sort(([a], [b]) => a.localeCompare(b)) : [];

    return (
        <div className="space-y-10 w-full">
            <AdminPageHeader
                title="Currency & Exchange Rates"
                description="View cached exchange rates. Rates update automatically every hour via the API."
                crumbs={[{ label: "Currency" }]}
            />

            <section className="rounded-[4px] border border-ink-20 bg-white p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">Exchange rates</p>
                        <p className="mt-2 text-sm text-ink-60">
                            Last updated: {fetchedAt ? new Date(fetchedAt).toLocaleString() : "Not cached yet"}
                        </p>
                    </div>
                    <a
                        href="/api/currency?force=true"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-btn-outline"
                    >
                        Force refresh rates
                    </a>
                </div>

                <div className="mt-6 overflow-hidden rounded-[4px] border border-ink-20">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-ink-20 text-sm">
                        <thead className="bg-parchment">
                            <tr>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-60">Currency</th>
                                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-60">Units per 1 USD</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-ink-20">
                            {entries.length === 0 ? (
                                <tr>
                                    <td className="px-4 py-8 text-ink-60" colSpan={2}>
                                        No cached rates yet — configure <code className="font-mono text-xs">EXCHANGE_RATE_API_KEY</code> and load the public site (or force refresh).
                                    </td>
                                </tr>
                            ) : (
                                entries.map(([code, value]) => (
                                    <tr key={code}>
                                        <td className="px-4 py-3 font-mono text-sm">{code}</td>
                                        <td className="px-4 py-3 text-ink-60">{String(value)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    </div>
                </div>
            </section>

            <section className="rounded-[4px] border border-ink-20 bg-white p-6">
                <p className="text-sm text-ink-60">
                    Default visitor currency is controlled client-side (USD default) with optional geo hints. Update USD product pricing in{" "}
                    <Link
                        href="/admin/products"
                        className="inline-flex items-center rounded-[2px] border border-ink-20 bg-parchment px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:border-gold"
                    >
                        Products
                    </Link>
                    .
                </p>
            </section>
        </div>
    );
}
