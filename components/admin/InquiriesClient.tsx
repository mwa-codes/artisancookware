"use client";

import { useState, useMemo } from "react";
import { useFormState } from "react-dom";
import { X, Mail, MessageSquare, Trash2 } from "lucide-react";
import {
    updateInquiryStatusAction,
    updateInquiryNotesAction,
    deleteInquiryAction,
    type InquiryActionState
} from "@/app/admin/inquiries/actions";

type Inquiry = {
    id: string;
    customer_name: string;
    email: string;
    message: string;
    created_at: string;
    company_name: string | null;
    country: string | null;
    buyer_type: string | null;
    quantity_requested: string | null;
    status: "unread" | "read" | "replied" | "closed";
    notes: string | null;
    replied_at: string | null;
    product_name?: string | null;
};

const STATUS_STYLES: Record<string, string> = {
    unread: "bg-gold-pale text-gold border border-gold/30",
    read: "bg-parchment text-ink-60 border border-ink-20",
    replied: "bg-green-50 text-green-700 border border-green-200",
    closed: "bg-ink text-white border border-ink"
};

function StatusBadge({ status }: { status: string }) {
    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] rounded-[2px] ${STATUS_STYLES[status] ?? STATUS_STYLES.unread}`}
        >
            {status}
        </span>
    );
}

function InquiryDrawer({ inquiry, onClose }: { inquiry: Inquiry; onClose: () => void }) {
    const initState: InquiryActionState = { success: false };
    const [statusState, statusAction] = useFormState(updateInquiryStatusAction, initState);
    const [notesState, notesAction] = useFormState(updateInquiryNotesAction, initState);
    const [deleteState, deleteAction] = useFormState(deleteInquiryAction, initState);

    const waMessage = encodeURIComponent(
        `Hi ${inquiry.customer_name}, thank you for your inquiry about ${inquiry.product_name ?? "our products"}. We'd be happy to discuss your requirements. Please let us know a convenient time to connect.`
    );

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-ink/40 backdrop-blur-sm" onClick={onClose}>
            <div className="relative h-full w-full max-w-lg bg-white overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-white border-b border-ink-20 px-6 py-4 flex items-center justify-between z-10">
                    <div>
                        <h3 className="font-heading text-lg font-light text-ink">{inquiry.customer_name}</h3>
                        <p className="text-xs text-ink-60">{inquiry.email}</p>
                    </div>
                    <button type="button" onClick={onClose} className="text-ink-60 hover:text-ink">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="px-6 py-5 space-y-6">
                    <div className="flex items-center justify-between">
                        <StatusBadge status={inquiry.status} />
                        <time className="text-xs text-ink-60">
                            {new Date(inquiry.created_at).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </time>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { label: "Company", value: inquiry.company_name },
                            { label: "Country", value: inquiry.country },
                            { label: "Buyer Type", value: inquiry.buyer_type },
                            { label: "Quantity", value: inquiry.quantity_requested },
                            { label: "Product", value: inquiry.product_name }
                        ]
                            .filter((d) => d.value)
                            .map(({ label, value }) => (
                                <div key={label} className="bg-parchment p-3 rounded-[2px]">
                                    <div className="admin-label mb-1">{label}</div>
                                    <div className="text-sm text-ink capitalize">{value}</div>
                                </div>
                            ))}
                    </div>

                    <div>
                        <div className="admin-label mb-2">Message</div>
                        <div className="bg-parchment p-4 text-sm text-ink leading-relaxed whitespace-pre-wrap rounded-[2px]">
                            {inquiry.message}
                        </div>
                    </div>

                    <div>
                        <div className="admin-label mb-2">Quick Reply</div>
                        <div className="flex gap-2 flex-wrap">
                            <a
                                href={`mailto:${inquiry.email}?subject=Re: Your Inquiry — Artisan Cookware&body=Dear ${inquiry.customer_name},%0A%0AThank you for your inquiry.%0A%0ABest regards,%0AArtisan Cookware Team`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="admin-btn-outline flex items-center gap-2"
                            >
                                <Mail className="h-3.5 w-3.5" />
                                Email Reply
                            </a>
                            <a
                                href={`https://wa.me/?text=${waMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 border border-green-200 bg-green-50 text-green-700 text-[12px] font-semibold uppercase tracking-[0.08em] px-4 py-2.5 hover:bg-green-100 transition-colors rounded-[2px]"
                            >
                                <MessageSquare className="h-3.5 w-3.5" />
                                WhatsApp
                            </a>
                        </div>
                    </div>

                    <form action={statusAction}>
                        <input type="hidden" name="id" value={inquiry.id} />
                        <div className="admin-label mb-2">Update Status</div>
                        <div className="flex gap-2 flex-wrap">
                            {(["unread", "read", "replied", "closed"] as const).map((s) => (
                                <button
                                    key={s}
                                    type="submit"
                                    name="status"
                                    value={s}
                                    disabled={inquiry.status === s}
                                    className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] border transition-colors rounded-[2px] disabled:opacity-40 disabled:cursor-not-allowed
                                        ${
                                            s === "replied"
                                                ? "border-green-200 text-green-700 hover:bg-green-50"
                                                : s === "closed"
                                                  ? "border-ink-20 text-ink hover:bg-parchment"
                                                  : "border-ink-20 text-ink-60 hover:text-ink hover:border-ink"
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                        {statusState.error && <p className="text-xs text-red-600 mt-1">{statusState.error}</p>}
                    </form>

                    <form action={notesAction} className="space-y-2">
                        <input type="hidden" name="id" value={inquiry.id} />
                        <label className="admin-label" htmlFor="inquiry-notes">
                            Internal Notes
                        </label>
                        <textarea
                            id="inquiry-notes"
                            name="notes"
                            rows={3}
                            defaultValue={inquiry.notes ?? ""}
                            placeholder="Add private notes about this inquiry..."
                            className="admin-input"
                        />
                        <button type="submit" className="admin-btn-outline">
                            Save Notes
                        </button>
                        {notesState.error && <p className="text-xs text-red-600">{notesState.error}</p>}
                    </form>

                    <form
                        action={deleteAction}
                        onSubmit={(e) => {
                            if (!confirm("Delete this inquiry permanently?")) e.preventDefault();
                        }}
                    >
                        <input type="hidden" name="id" value={inquiry.id} />
                        <button type="submit" className="admin-btn-danger w-full justify-center">
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete Inquiry
                        </button>
                        {deleteState.error && <p className="text-xs text-red-600 mt-1">{deleteState.error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export function InquiriesClient({ rows }: { rows: unknown[] }) {
    const inquiries = rows as Inquiry[];
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [countryFilter, setCountryFilter] = useState<string>("all");
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

    const countries = useMemo(() => {
        const unique = [...new Set(inquiries.map((i) => i.country).filter(Boolean))] as string[];
        return unique.sort();
    }, [inquiries]);

    const filtered = useMemo(() => {
        return inquiries.filter((i) => {
            const matchStatus = statusFilter === "all" || i.status === statusFilter;
            const matchCountry = countryFilter === "all" || i.country === countryFilter;
            return matchStatus && matchCountry;
        });
    }, [inquiries, statusFilter, countryFilter]);

    const unreadCount = inquiries.filter((i) => i.status === "unread").length;

    return (
        <div className="space-y-6 w-full">
            <div className="grid grid-cols-4 gap-2">
                {[
                    { label: "Total", value: inquiries.length },
                    { label: "Unread", value: unreadCount, highlight: unreadCount > 0 },
                    { label: "Replied", value: inquiries.filter((i) => i.status === "replied").length },
                    { label: "Closed", value: inquiries.filter((i) => i.status === "closed").length }
                ].map(({ label, value, highlight }) => (
                    <div
                        key={label}
                        className={`border p-4 rounded-[2px] ${highlight ? "border-gold/40 bg-gold-pale" : "border-ink-20 bg-white"}`}
                    >
                        <div className="admin-label mb-1">{label}</div>
                        <div className={`font-heading text-3xl font-light ${highlight ? "text-gold" : "text-ink"}`}>{value}</div>
                    </div>
                ))}
            </div>

            <div className="flex gap-3 flex-wrap">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="admin-select max-w-[160px]"
                >
                    <option value="all">All Statuses</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="closed">Closed</option>
                </select>
                {countries.length > 0 && (
                    <select
                        value={countryFilter}
                        onChange={(e) => setCountryFilter(e.target.value)}
                        className="admin-select max-w-[160px]"
                    >
                        <option value="all">All Countries</option>
                        {countries.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                )}
                <span className="text-sm text-ink-60 self-center">
                    Showing {filtered.length} of {inquiries.length}
                </span>
            </div>

            <div className="overflow-hidden border border-ink-20 bg-white rounded-[2px]">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-ink-20 text-sm">
                    <thead className="bg-parchment">
                        <tr>
                            {["Date", "Name", "Company", "Country", "Buyer Type", "Qty", "Product", "Status", ""].map((h) => (
                                <th
                                    key={h}
                                    className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-60 whitespace-nowrap"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-20">
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="px-4 py-12 text-center text-sm text-ink-60">
                                    No inquiries match the current filters.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((row) => (
                                <tr
                                    key={row.id}
                                    className={`align-top hover:bg-parchment cursor-pointer transition-colors ${row.status === "unread" ? "font-medium" : ""}`}
                                    onClick={() => setSelectedInquiry(row)}
                                >
                                    <td className="px-4 py-3 text-xs text-ink-60 whitespace-nowrap">
                                        {new Date(row.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                                    </td>
                                    <td className="px-4 py-3 text-ink">{row.customer_name}</td>
                                    <td className="px-4 py-3 text-ink-60">{row.company_name ?? "—"}</td>
                                    <td className="px-4 py-3 text-ink-60">{row.country ?? "—"}</td>
                                    <td className="px-4 py-3 text-ink-60 capitalize">{row.buyer_type ?? "—"}</td>
                                    <td className="px-4 py-3 text-ink-60">{row.quantity_requested ?? "—"}</td>
                                    <td className="px-4 py-3 text-ink-60">{row.product_name ?? "—"}</td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={row.status} />
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <span className="text-xs text-gold hover:underline">View →</span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                </div>
            </div>

            {selectedInquiry && <InquiryDrawer inquiry={selectedInquiry} onClose={() => setSelectedInquiry(null)} />}
        </div>
    );
}
