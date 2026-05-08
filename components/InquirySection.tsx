"use client";

import { useMemo, useState, useTransition } from "react";
import { COUNTRY_OPTIONS } from "@/lib/countries";
import type { BuyerType } from "@/lib/types";

const BUYER_TYPES: { value: BuyerType; label: string }[] = [
    { value: "wholesaler", label: "Wholesaler" },
    { value: "retailer", label: "Retailer" },
    { value: "hotel", label: "Hotel / Hospitality" },
    { value: "importer", label: "Importer" },
    { value: "oem", label: "OEM / Private Label" },
    { value: "other", label: "Other" }
];

type InquirySectionProps = {
    productOptions?: { id: string; label: string }[];
    defaultProductLabel?: string;
};

export function InquirySection({ productOptions = [], defaultProductLabel }: InquirySectionProps) {
    const [feedback, setFeedback] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const options = useMemo(() => {
        const base = [...productOptions];
        if (defaultProductLabel && !base.some((p) => p.label === defaultProductLabel)) {
            base.unshift({ id: "", label: defaultProductLabel });
        }
        base.push({ id: "", label: "General enquiry" });
        return base;
    }, [productOptions, defaultProductLabel]);

    const [values, setValues] = useState({
        name: "",
        company: "",
        email: "",
        country: COUNTRY_OPTIONS[0],
        productLabel: defaultProductLabel ?? "General enquiry",
        quantity: "",
        buyerType: "wholesaler" as BuyerType,
        message: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFeedback(null);
        setError(null);

        if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
            setError("Please complete name, email, and message.");
            return;
        }

        startTransition(async () => {
            try {
                const selected = options.find((p) => p.label === values.productLabel);
                const response = await fetch("/api/inquiries", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: values.name.trim(),
                        company: values.company.trim() || null,
                        email: values.email.trim(),
                        country: values.country,
                        message: values.message.trim(),
                        productId: selected?.id || null,
                        productInterest: values.productLabel,
                        buyer_type: values.buyerType,
                        quantity_requested: values.quantity.trim() || null
                    })
                });

                if (!response.ok) {
                    const payload = await response.json().catch(() => ({ message: "Unable to submit." }));
                    throw new Error(payload.message ?? "Unable to submit inquiry.");
                }

                setFeedback("Thanks — our export desk will reply within one business day.");
                setValues({
                    name: "",
                    company: "",
                    email: "",
                    country: COUNTRY_OPTIONS[0],
                    productLabel: defaultProductLabel ?? "General enquiry",
                    quantity: "",
                    buyerType: "wholesaler",
                    message: ""
                });
            } catch (e) {
                setError(e instanceof Error ? e.message : "Something went wrong.");
            }
        });
    };

    const inputClass = "admin-input mt-1";

    return (
        <section id="inquiry" className="bg-white py-20 sm:py-24">
            <div className="container-site grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
                <div>
                    <div className="eyebrow">
                        <span className="eyebrow-line" />
                        <span className="eyebrow-text">Get a Quote</span>
                    </div>
                    <h2 className="font-heading text-section font-light text-ink">Start Your Wholesale Order</h2>
                    <p className="mt-6 max-w-md text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.6)]">
                        Share volumes, destination port, and labelling needs — we respond with pricing bands, sampling timelines, and shipping options.
                    </p>

                    <div className="mt-10 grid grid-cols-2 gap-[2px]">
                        {[
                            { k: "50", v: "Units Minimum Order" },
                            { k: "48h", v: "Sample Dispatch Time" },
                            { k: "3–4w", v: "Production Lead Time" },
                            { k: "FOB", v: "Karachi Shipping Terms" }
                        ].map((card) => (
                            <div key={card.k} className="border-t-2 border-gold bg-parchment p-5">
                                <p className="font-heading text-3xl font-light text-ink">{card.k}</p>
                                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:rgba(13,13,13,0.55)]">{card.v}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 space-y-3 text-sm">
                        <a
                            href="https://wa.me/923016636557"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-ink transition hover:text-gold"
                        >
                            <span className="text-gold">●</span>
                            WhatsApp: +92 301 6636557
                        </a>
                        <a href="mailto:m.waqar.ahmed@gmail.com" className="flex items-center gap-3 text-ink transition hover:text-gold">
                            <span className="text-gold">●</span>
                            m.waqar.ahmed@gmail.com
                        </a>
                    </div>
                </div>

                <div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-60" htmlFor="inq-name">
                                    Full name
                                </label>
                                <input id="inq-name" name="name" required value={values.name} onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-60" htmlFor="inq-company">
                                    Company
                                </label>
                                <input id="inq-company" name="company" value={values.company} onChange={handleChange} className={inputClass} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-60" htmlFor="inq-email">
                                    Email
                                </label>
                                <input
                                    id="inq-email"
                                    name="email"
                                    type="email"
                                    required
                                    value={values.email}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-60" htmlFor="inq-country">
                                    Country
                                </label>
                                <select
                                    id="inq-country"
                                    name="country"
                                    value={values.country}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    {COUNTRY_OPTIONS.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-60" htmlFor="inq-product">
                                Product / Collection
                            </label>
                            <select
                                id="inq-product"
                                name="productLabel"
                                value={values.productLabel}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                {options.map((p) => (
                                    <option key={`${p.id}-${p.label}`} value={p.label}>
                                        {p.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-60" htmlFor="inq-qty">
                                    Quantity
                                </label>
                                <input id="inq-qty" name="quantity" value={values.quantity} onChange={handleChange} className={inputClass} placeholder="e.g. 200 sets" />
                            </div>
                            <div>
                                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-60" htmlFor="inq-buyer">
                                    Buyer type
                                </label>
                                <select
                                    id="inq-buyer"
                                    name="buyerType"
                                    value={values.buyerType}
                                    onChange={(e) =>
                                        setValues((prev) => ({ ...prev, buyerType: e.target.value as BuyerType }))
                                    }
                                    className={inputClass}
                                >
                                    {BUYER_TYPES.map((b) => (
                                        <option key={b.value} value={b.value}>
                                            {b.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-60" htmlFor="inq-msg">
                                Message
                            </label>
                            <textarea
                                id="inq-msg"
                                name="message"
                                rows={5}
                                required
                                value={values.message}
                                onChange={handleChange}
                                className={`${inputClass} resize-y`}
                                placeholder="Tell us about packaging, certifications needed for your market, and target pricing band."
                            />
                        </div>

                        {error ? <p className="text-sm text-red-600">{error}</p> : null}
                        {feedback ? <p className="text-sm text-ink">{feedback}</p> : null}

                        <button type="submit" disabled={isPending} className="btn-primary w-full justify-center sm:w-auto disabled:opacity-60">
                            {isPending ? "Sending…" : "Send Inquiry →"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
