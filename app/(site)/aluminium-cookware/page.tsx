import type { Metadata } from "next";
import Link from "next/link";

const CATEGORY_LINKS = [
    {
        href: "/anodized-dull-cookware",
        label: "Anodized / dull cooking sets",
        description: "Hard-anodised cookware with a matte finish for heavy-duty kitchens and export orders."
    },
    {
        href: "/metal-finish-gift-sets",
        label: "Metal finish gift sets",
        description: "Polished metal finish cookware and gift sets for wedding, retail, and wholesale buyers."
    },
    {
        href: "/non-stick-gift-sets",
        label: "Non-stick cookware and gift sets",
        description: "Modern non-stick cookware sets for everyday cooking and private-label programs."
    },
    {
        href: "/products",
        label: "Full wholesale catalogue",
        description: "Browse the complete range of aluminium cookware sets, gift sets, and factory-direct products."
    }
];

const FAQS = [
    {
        question: "Do you manufacture aluminium cookware?",
        answer:
            "Yes. Artisan Cookware manufactures aluminium cookware for wholesale buyers, retailers, and export customers in Pakistan."
    },
    {
        question: "Do you supply anodized and dull cooking sets?",
        answer:
            "Yes. We produce anodized and dull cooking sets for buyers who need a durable matte finish and repeatable specs."
    },
    {
        question: "Do you offer non-stick cookware and non-stick gift sets?",
        answer:
            "Yes. Our non-stick cookware and non-stick gift sets are designed for everyday cooking, wholesale distribution, and private label programs."
    }
];

export const metadata: Metadata = {
    title: "Aluminium Cookware, Gift Sets & Wholesale Catalogue",
    description:
        "Find aluminium cookware, metal finish gift sets, anodized and dull cooking sets, non-stick cookware, non-stick gift sets, and wholesale catalogue products direct from the manufacturer.",
    keywords: [
        "aluminium cookware",
        "metal finish gift sets",
        "anodized cooking set",
        "dull cooking set",
        "nonstick cookware",
        "nonstick gift sets",
        "aluminium cookware manufacturer",
        "cookware wholesale Pakistan"
    ],
    alternates: {
        canonical: "https://www.artisancookware.co/aluminium-cookware",
    },
    openGraph: {
        title: "Aluminium Cookware, Gift Sets & Wholesale Catalogue | Artisan Cookware",
        description:
            "Wholesale aluminium cookware manufacturer for metal finish gift sets, anodized and dull cooking sets, non-stick cookware, and non-stick gift sets.",
        url: "https://www.artisancookware.co/aluminium-cookware",
    },
};

export default function AluminiumCookwareSeoPage() {
    const pageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Aluminium Cookware, Gift Sets & Wholesale Catalogue",
        url: "https://www.artisancookware.co/aluminium-cookware",
        description:
            "Wholesale aluminium cookware manufacturer for metal finish gift sets, anodized and dull cooking sets, non-stick cookware, and non-stick gift sets.",
    };

    const faqSchema = {
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
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <header className="border-b border-ink-20 bg-parchment">
                <div className="container-site py-14 sm:py-16">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">SEO landing page</p>
                    <h1 className="font-heading mt-3 text-display font-light text-ink">
                        Aluminium cookware for metal finish gift sets, non-stick ranges, and wholesale buyers
                    </h1>
                    <p className="mt-6 max-w-3xl text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.6)]">
                        If someone searches for aluminium cookware, metal finish gift sets, anodized or dull cooking sets, non-stick cookware,
                        or non-stick gift sets, this page gives them a direct path to our wholesale catalogue and factory team.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/contact" className="btn-primary">
                            Request Wholesale Quote
                        </Link>
                        <Link href="/products" className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink underline underline-offset-4 transition hover:text-gold">
                            View Catalogue
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <section className="container-site py-14 sm:py-16">
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="rounded-[4px] border border-ink-20 bg-white p-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Core search terms</p>
                            <ul className="mt-4 space-y-3 text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.7)]">
                                <li>Aluminium cookware manufacturer in Pakistan</li>
                                <li>Metal finish gift sets for wholesale buyers</li>
                                <li>Anodized and dull cooking sets</li>
                                <li>Non-stick cookware and non-stick gift sets</li>
                                <li>Wholesale catalogue products and gift sets</li>
                            </ul>
                        </div>
                        <div className="rounded-[4px] border border-ink-20 bg-white p-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Why buyers contact us</p>
                            <ul className="mt-4 space-y-3 text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.7)]">
                                <li>Factory-direct wholesale pricing</li>
                                <li>MOQ-friendly gift set production</li>
                                <li>Batch inspection and export-ready packing</li>
                                <li>OEM / private label options</li>
                                <li>Consistent finishes across large orders</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="bg-parchment/50 border-y border-ink-20">
                    <div className="container-site py-14 sm:py-16">
                        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Shop by finish</p>
                                <h2 className="font-heading mt-3 text-2xl font-light text-ink">Direct links to the ranges people search for</h2>
                            </div>
                            <Link href="/categories" className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink underline underline-offset-4">
                                Browse all categories →
                            </Link>
                        </div>

                        <div className="mt-10 grid gap-6 lg:grid-cols-2">
                            {CATEGORY_LINKS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group rounded-[4px] border border-ink-20 bg-white p-6 transition-transform duration-300 hover:-translate-y-0.5 hover:border-gold/40"
                                >
                                    <p className="text-[15px] font-semibold text-ink group-hover:text-gold">{item.label}</p>
                                    <p className="mt-2 text-[14px] font-light leading-relaxed text-[color:rgba(13,13,13,0.65)]">{item.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="container-site py-14 sm:py-16">
                    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">What this page covers</p>
                            <h2 className="font-heading mt-3 text-2xl font-light text-ink">Search intent matched to product reality</h2>
                            <div className="mt-6 space-y-5 text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.68)]">
                                <p>
                                    Some buyers search for <strong>aluminium cookware</strong>, while others search for more specific phrases like
                                    <strong> metal finish gift sets</strong>, <strong>anodized cookware</strong>, <strong>dull cooking set</strong>, or
                                    <strong> non-stick gift sets</strong>. This page ties those terms back to the actual ranges we manufacture.
                                </p>
                                <p>
                                    The same catalogue can be used for retail bundles, export supply, or private label programs. That is why the page uses
                                    the language customers already type into Google, without forcing them to hunt for the right category.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-[4px] border border-ink-20 bg-ink px-6 py-7 text-white">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Best fit for</p>
                            <ul className="mt-5 space-y-4 text-[15px] font-light leading-relaxed text-[rgba(255,255,255,0.72)]">
                                <li>Wholesale importers comparing aluminium cookware suppliers</li>
                                <li>Retailers sourcing metal finish or non-stick gift sets</li>
                                <li>Buyers looking for anodized / dull cooking sets for export markets</li>
                                <li>Wholesale buyers and gifting distributors in Pakistan and abroad</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="bg-parchment/30 border-y border-ink-20">
                    <div className="container-site py-14 sm:py-16">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">FAQ</p>
                        <h2 className="font-heading mt-3 text-2xl font-light text-ink">Questions buyers ask before sending an inquiry</h2>
                        <div className="mt-8 divide-y divide-ink-20 rounded-[4px] border border-ink-20 bg-white">
                            {FAQS.map((faq) => (
                                <div key={faq.question} className="px-6 py-5">
                                    <h3 className="text-[16px] font-medium text-ink">{faq.question}</h3>
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
