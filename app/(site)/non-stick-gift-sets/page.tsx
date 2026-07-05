import type { Metadata } from "next";
import Link from "next/link";

const FAQS = [
    {
        question: "Do you manufacture non-stick gift sets?",
        answer:
            "Yes. We produce non-stick gift sets for wholesale buyers, retailers, and export orders that need practical everyday cookware."
    },
    {
        question: "Are non-stick sets suitable for private label?",
        answer:
            "Yes. Non-stick gift sets are a strong fit for private label programs, custom packaging, and retailer-specific branding."
    },
    {
        question: "Can non-stick gift sets be ordered in bulk?",
        answer:
            "Yes. We handle bulk non-stick gift set production with factory-direct pricing and shipment planning for larger orders."
    }
];

export const metadata: Metadata = {
    title: "Non-Stick Gift Sets Wholesale",
    description:
        "Wholesale non-stick gift sets direct from the manufacturer. Ideal for retail, private label, and export cookware programs.",
    keywords: [
        "nonstick gift sets",
        "non stick cookware",
        "nonstick cookware",
        "gift sets cookware",
        "aluminium cookware manufacturer",
        "cookware wholesale Pakistan"
    ],
    alternates: {
        canonical: "https://www.artisancookware.co/non-stick-gift-sets",
    },
    openGraph: {
        title: "Non-Stick Gift Sets Wholesale | Artisan Cookware",
        description:
            "Wholesale non-stick gift sets for retail, private label, and export cookware buyers.",
        url: "https://www.artisancookware.co/non-stick-gift-sets",
    },
};

export default function NonStickGiftSetsPage() {
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
                    <h1 className="font-heading mt-3 text-display font-light text-ink">Non-stick cookware and gift sets</h1>
                    <p className="mt-6 max-w-3xl text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.6)]">
                        Non-stick gift sets are a common wholesale search because buyers want an easy-to-sell range that works for retail shelves,
                        promotions, and private label cookware programs.
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
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Buyer intent</p>
                            <ul className="mt-4 space-y-3 text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.7)]">
                                <li>Household cookware retail</li>
                                <li>Promotional gift bundles</li>
                                <li>Private label catalogue building</li>
                                <li>Export order fulfilment</li>
                            </ul>
                        </div>
                        <div className="rounded-[4px] border border-ink-20 bg-white p-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Why it ranks</p>
                            <ul className="mt-4 space-y-3 text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.7)]">
                                <li>Matches the exact search phrase</li>
                                <li>Links to the full catalogue</li>
                                <li>Gives a clear contact path</li>
                                <li>Supports the category pages</li>
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
