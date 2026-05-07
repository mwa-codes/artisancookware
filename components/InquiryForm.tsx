"use client";

import { useEffect, useState, useTransition } from "react";

export type InquiryFormValues = {
    name: string;
    email: string;
    message: string;
    productId?: string;
};

type InquiryFormProps = {
    productId?: string;
    productName?: string;
};

export function InquiryForm({ productId, productName }: InquiryFormProps) {
    const [values, setValues] = useState<InquiryFormValues>({ name: "", email: "", message: "", productId });
    const [feedback, setFeedback] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setValues((prev) => ({ ...prev, productId }));
    }, [productId]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFeedback(null);
        setError(null);

        if (!values.name || !values.email || !values.message) {
            setError("Please complete all fields before submitting.");
            return;
        }

        startTransition(async () => {
            try {
                const response = await fetch("/api/inquiries", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: values.name,
                        email: values.email,
                        message: values.message,
                        productId: values.productId
                    })
                });

                if (!response.ok) {
                    const payload = await response.json().catch(() => ({ message: "Unable to send inquiry." }));
                    throw new Error(payload.message ?? "Unable to send inquiry.");
                }

                setFeedback(
                    productName
                        ? "Thanks! Our team will get back to you soon about this product."
                        : "Thanks! We will reach out via email with next steps."
                );
                setValues({ name: "", email: "", message: "", productId });
            } catch (error) {
                console.error(error);
                setError(error instanceof Error ? error.message : "Something went wrong. Please try again later.");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="text-sm font-medium text-slate-700">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    required
                />
            </div>
            <div>
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    required
                />
            </div>
            <div>
                <label htmlFor="message" className="text-sm font-medium text-slate-700">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={handleChange}
                    placeholder={productName ? `Tell us about your interest in the ${productName}...` : "Share your requirements and order quantities..."}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    required
                />
            </div>
            {error ? <p className="text-sm text-rose-500">{error}</p> : null}
            {feedback ? <p className="text-sm text-emerald-600">{feedback}</p> : null}
            <button
                type="submit"
                disabled={isPending}
                className="inline-flex w-full items-center justify-center rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isPending ? "Sending..." : "Send Inquiry"}
            </button>
        </form>
    );
}
