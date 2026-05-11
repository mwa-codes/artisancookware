import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About — Aluminium Cookware Manufacturer Since 1998",
    description:
        "Learn about Artisan Cookware, an aluminium cookware manufacturer in Gujranwala, Pakistan, serving wholesale buyers with export-ready production since 1998.",
    openGraph: {
        title: "About — Aluminium Cookware Manufacturer Since 1998 | Artisan Cookware",
        description:
            "Discover our manufacturing story, quality systems, and export capability for wholesale aluminium cookware from Gujranwala, Pakistan.",
    },
    alternates: {
        canonical: "https://www.artisancookware.co/about",
    },
};

const TIMELINE = [
    { year: "1998", title: "Founding", body: "Artisan Cookware begins aluminium forming for local distribution." },
    { year: "2005", title: "Export readiness", body: "Production scales with finishing lines aligned to export packing standards." },
    { year: "2015", title: "Quality systems", body: "In-house inspection and batch traceability formalised across the production line." },
    { year: "2024", title: "Wholesale focus", body: "Catalogue and packing standards refined for international wholesale buyers." }
];

const FACTORY_GALLERY = [
    { src: "/factoryImages/factoryfloor2.jpg", alt: "Artisan Cookware production activity on factory floor" },
    { src: "/factoryImages/factoryfloor3.jpg", alt: "Cookware units arranged during in-house quality checks" },
    { src: "/factoryImages/factoryfloor4.jpg", alt: "Manufacturing workflow inside Artisan Cookware facility" },
    { src: "/factoryImages/factoryfloor5.jpg", alt: "Export-focused cookware production environment at Artisan Cookware" },
];

export default function AboutPage() {
    return (
        <div className="bg-white pt-[68px]">
            <section className="relative min-h-[320px] overflow-hidden bg-ink md:min-h-[360px]">
                <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 60% at 80% 20%, rgba(196,163,90,0.35) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 10% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)"
                    }}
                    aria-hidden
                />
                <div className="relative container-site flex min-h-[320px] flex-col justify-center py-12 md:min-h-[360px] md:py-16">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">About</p>
                    <h1 className="font-heading text-display font-light text-white">25 Years of Craft</h1>
                    <p className="mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-[rgba(255,255,255,0.65)]">
                        From Gujranwala&apos;s industrial corridor — precision-formed aluminium cookware built for demanding kitchens worldwide.
                    </p>
                </div>
            </section>

            <section className="container-site grid gap-10 py-14 md:py-16 lg:grid-cols-2 lg:items-center">
                <div>
                    <div className="eyebrow">
                        <span className="eyebrow-line" />
                        <span className="eyebrow-text">Story</span>
                    </div>
                    <h2 className="font-heading text-section font-light text-ink">Built for export consistency</h2>
                    <p className="mt-6 text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.6)]">
                        Our factory couples traditional metalworking judgement with repeatable QC checkpoints — so every shipment matches the samples you approved.
                    </p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] border border-ink-20 bg-parchment">
                    <Image
                        src="/factoryImages/factoryfloor1.jpg"
                        alt="Artisan Cookware team and production area in Gujranwala facility"
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover"
                        priority
                    />
                </div>
            </section>

            <section className="border-y border-ink-20 bg-parchment py-14 md:py-16">
                <div className="container-site">
                    <h2 className="font-heading text-section font-light text-ink">Milestones</h2>
                    <div className="mt-10 grid gap-8 md:grid-cols-2">
                        {TIMELINE.map((t) => (
                            <div key={t.year} className="border-t-2 border-gold pt-6">
                                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{t.year}</p>
                                <p className="font-heading mt-2 text-xl text-ink">{t.title}</p>
                                <p className="mt-2 text-[13px] font-light text-[color:rgba(13,13,13,0.6)]">{t.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container-site py-14 md:py-16">
                <h2 className="font-heading text-section font-light text-ink">Manufacturing</h2>
                <div className="mt-10 grid gap-[2px] md:grid-cols-3">
                    {[
                        { t: "QC process", d: "Documented in-house checks from incoming aluminium to final packing." },
                        { t: "Capacity", d: "Year-round container-ready production with staged QC gates." },
                        { t: "Inspection", d: "Batch checks before sealing — optional third-party verification." }
                    ].map((x) => (
                        <div key={x.t} className="border-t border-gold bg-white p-8">
                            <p className="font-heading text-xl text-ink">{x.t}</p>
                            <p className="mt-3 text-[13px] font-light text-[color:rgba(13,13,13,0.6)]">{x.d}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {FACTORY_GALLERY.map((img) => (
                        <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-[2px] border border-ink-20 bg-parchment">
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </section>

            <section id="quality" className="border-t border-ink-20 bg-parchment py-14 md:py-16">
                <div className="container-site grid gap-10 lg:grid-cols-2">
                    <div>
                        <h2 className="font-heading text-section font-light text-ink">Values</h2>
                        <p className="mt-6 text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.6)]">
                            Transparency with wholesale buyers — clear timelines, documented specs, and packaging that survives long ocean legs.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-heading text-section font-light text-ink">Export capability</h2>
                        <p className="mt-6 text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.6)]">
                            Packing, documentation, and finishing lines prepared for international shipment — FOB Karachi and CIF where needed.
                        </p>
                    </div>
                </div>
            </section>

            <section id="manufacturing" className="bg-ink py-14 md:py-16 text-white">
                <div className="container-site flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="font-heading text-3xl font-light">Partner with us</h2>
                        <p className="mt-3 max-w-xl text-[15px] font-light text-[rgba(255,255,255,0.55)]">
                            Share your catalogue needs — we&apos;ll respond with sampling timelines and pricing bands.
                        </p>
                    </div>
                    <Link href="/contact" className="btn-primary">
                        Start a conversation
                    </Link>
                </div>
            </section>
        </div>
    );
}
