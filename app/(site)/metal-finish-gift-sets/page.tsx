import type { Metadata } from "next";
import Link from "next/link";

const FAQS = [
    {
        question: "Are metal finish gift sets available wholesale?",
        answer:
            "Yes. Artisan Cookware supplies metal finish gift sets for wholesale buyers, retailers, and wedding-season orders."
    },
    {
        question: "Do you offer OEM or private label packaging?",
        answer:
            "Yes. We support OEM branding, private label packaging, and bulk packing specifications for export and local orders."
    }
];

export const metadata: Metadata = {
    title: "Metal Finish Gift Sets Wholesale",
    description:
        "Wholesale metal finish gift sets direct from the manufacturer. Ideal for retail gifting and wedding cookware sets.",
    keywords: [
        "metal finish gift sets",
        "metal finish cookware",
        "wedding cookware set",
        "aluminium cookware manufacturer",
        "cookware wholesale Pakistan"
    ],
    alternates: {
        canonical: "https://www.artisancookware.co/metal-finish-gift-sets",
    },
    openGraph: {
        title: "Metal Finish Gift Sets Wholesale | Artisan Cookware",
        description:
            "Wholesale metal finish gift sets for wedding cookware bundles and retail gifting.",
        url: "https://www.artisancookware.co/metal-finish-gift-sets",
    },
};

export default function MetalFinishGiftSetsPage() {
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
                    <h1 className="font-heading mt-3 text-display font-light text-ink">Metal finish gift sets for wholesale buyers</h1>
                    <p className="mt-6 max-w-3xl text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.6)]">
                        Metal finish gift sets work well for retail gifting and wedding cookware bundles because they combine a premium
                        presentation with practical aluminium cookware manufacturing.
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
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Use cases</p>
                            <ul className="mt-4 space-y-3 text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.7)]">
                                <li>Retail gift bundles</li>
                                <li>Wholesale promotional sets</li>
                                <li>Export-ready cookware programs</li>
                                <li>Wedding cookware sets</li>
                            </ul>
                        </div>
                        <div className="rounded-[4px] border border-ink-20 bg-white p-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">What buyers usually ask</p>
                            <ul className="mt-4 space-y-3 text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.7)]">
                                <li>MOQ for gift sets</li>
                                <li>Custom packaging options</li>
                                <li>Private label branding</li>
                                <li>Bulk order lead times</li>
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
