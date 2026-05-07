"use client";

type Row = Record<string, unknown> & {
    id: string;
    customer_name?: string | null;
    email?: string | null;
    message?: string | null;
    created_at?: string | null;
    company_name?: string | null;
    country?: string | null;
    buyer_type?: string | null;
    quantity_requested?: string | null;
    status?: string | null;
};

export function InquiriesClient({ rows }: { rows: unknown[] }) {
    const safeRows = rows as Row[];
    return (
        <div className="overflow-hidden rounded-[4px] border border-ink-20 bg-white">
            <table className="min-w-full divide-y divide-ink-20 text-sm">
                <thead className="bg-parchment">
                    <tr>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-60">Date</th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-60">Name</th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-60">Company</th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-60">Country</th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-60">Buyer</th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-60">Qty</th>
                        <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-60">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-ink-20">
                    {safeRows.length === 0 ? (
                        <tr>
                            <td className="px-4 py-10 text-center text-ink-60" colSpan={7}>
                                No inquiries yet.
                            </td>
                        </tr>
                    ) : (
                        safeRows.map((row) => (
                            <tr key={row.id} className="align-top">
                                <td className="px-4 py-3 text-ink-60 whitespace-nowrap">
                                    {row.created_at ? new Date(String(row.created_at)).toLocaleString() : "—"}
                                </td>
                                <td className="px-4 py-3 font-medium text-ink">{row.customer_name ?? "—"}</td>
                                <td className="px-4 py-3 text-ink-60">{row.company_name ?? "—"}</td>
                                <td className="px-4 py-3 text-ink-60">{row.country ?? "—"}</td>
                                <td className="px-4 py-3 text-ink-60">{row.buyer_type ?? "—"}</td>
                                <td className="px-4 py-3 text-ink-60">{row.quantity_requested ?? "—"}</td>
                                <td className="px-4 py-3">
                                    <span className="rounded-[2px] bg-parchment px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink">
                                        {String(row.status ?? "unread")}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="border-t border-ink-20 bg-white px-4 py-4 text-xs text-ink-60">
                Full workflow (filters, detail drawer, status actions) can extend this table once migrations are applied.
            </div>
        </div>
    );
}
