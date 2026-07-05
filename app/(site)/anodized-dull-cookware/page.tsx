import type { Metadata } from "next";
import Link from "next/link";

const FAQS = [
    {
        question: "What is anodized or dull cookware?",
        answer:
            "Anodized or dull cookware is a matte-finish aluminium range designed for durability, even heating, and a more restrained appearance."
    },
    {
        question: "Do you supply anodized and dull cooking sets wholesale?",
        answer:
            "Yes. We supply anodized and dull cooking sets for wholesale buyers, retailers, and export orders.",
    },
    {
        question: "Can anodized cookware be used for heavy-duty kitchens?",
        answer:
            "Yes. The finish is popular with buyers who want a tougher-looking cookware set for repeated kitchen use."
    }
];

export const metadata: Metadata = {
    title: "Anodized and Dull Cooking Sets Wholesale",
    description:
        "Wholesale anodized and dull cooking sets direct from the manufacturer. Built for matte finish presentation and durable performance.",
    keywords: [
        "anodized cookware",
        "anodised cookware",
        "dull cooking set",
        "hard anodized cookware",
        "aluminium cookware manufacturer",
        "cookware wholesale Pakistan"
    ],
    alternates: {
        canonical: "https://www.artisancookware.co/anodized-dull-cookware",
    },
    openGraph: {
        title: "Anodized and Dull Cooking Sets Wholesale | Artisan Cookware",
        description:
            "Wholesale anodized and dull cooking sets for matte-finish cookware buyers.",
        url: "https://www.artisancookware.co/anodized-dull-cookware",
    },
};

export default function AnodizedDullCookwarePage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <div className="bg-white pt-[68px]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <header className="border-b border-ink-20 bg-parchment">
                <div className="container-site py-14 sm:py-16">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Wholesale landing page</p>
                    <h1 className="font-heading mt-3 text-display font-light text-ink">Anodized and dull cooking sets</h1>
                    <p className="mt-6 max-w-3xl text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.6)]">
                        Buyers searching for anodized cookware or dull cooking sets are usually looking for a matte-finish aluminium range with a
                        durable feel and clear wholesale supply.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/contact" className="btn-primary">
                            Request Quote
                        </Link>
                        <Link href="/aluminium-cookware" className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink underline underline-offset-4 transition hover:text-gold">
                            Back to guide
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <section className="container-site py-14 sm:py-16">
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="rounded-[4px] border border-ink-20 bg-white p-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Common use cases</p>
                            <ul className="mt-4 space-y-3 text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.7)]">
                                <li>Heavy-duty household cookware</li>
                                <li>Wholesale export orders</li>
                                <li>Retail catalogue supply</li>
                                <li>Value-focused gift sets</li>
                            </ul>
                        </div>
                        <div className="rounded-[4px] border border-ink-20 bg-white p-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Buyer benefits</p>
                            <ul className="mt-4 space-y-3 text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.7)]">
                                <li>Matte finish presentation</li>
                                <li>Stable manufacturing specs</li>
                                <li>Direct factory supply</li>
                                <li>OEM packaging support</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="bg-parchment/30 border-y border-ink-20">
                    <div className="container-site py-14 sm:py-16">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">FAQ</p>
                        <div className="mt-8 divide-y divide-ink-20 rounded-[4px] border border-ink-20 bg-white">
                            {FAQS.map((faq) => (
                                <div key={faq.question} className="px-6 py-5">
                                    <h2 className="text-[16px] font-medium text-ink">{faq.question}</h2>
                                    <p className="mt-2 text-[14px] font-light leading-relaxed text-[color:rgba(13,13,13,0.68)]">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
