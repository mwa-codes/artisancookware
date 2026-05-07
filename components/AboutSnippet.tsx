import Image from "next/image";

const FACTORY_IMG =
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=80";

const ITEMS = [
    {
        title: "ISO 9001:2015 Certified Factory",
        body: "Full QMS. Every batch inspected pre-shipment. Third-party verification available."
    },
    {
        title: "OEM & Private Label",
        body: "Custom embossing, handle colours, packaging, label printing."
    },
    {
        title: "Competitive FOB Pricing",
        body: "Direct-from-factory. No middlemen. FOB Karachi and CIF available."
    },
    {
        title: "Consistent Production Capacity",
        body: "Container-load orders year-round. 3–4 week lead times."
    }
];

export function AboutSnippet() {
    return (
        <section className="grid lg:grid-cols-2">
            <div className="relative min-h-[420px] lg:min-h-[640px]">
                <Image
                    src={FACTORY_IMG}
                    alt="Artisan Cookware manufacturing"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    unoptimized
                    priority={false}
                />
            </div>
            <div className="flex flex-col justify-center bg-parchment px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
                <div className="eyebrow">
                    <span className="eyebrow-line" />
                    <span className="eyebrow-text">Heritage</span>
                </div>
                <h2 className="font-heading text-section font-light text-ink">Crafted in Gujranwala</h2>
                <p className="mt-6 max-w-xl text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.6)]">
                    Three decades of aluminium forming, finishing, and export logistics — built for buyers who need repeatable specifications and
                    dependable fulfilment.
                </p>

                <ul className="mt-12 divide-y divide-[rgba(13,13,13,0.12)] border-t border-[rgba(13,13,13,0.12)]">
                    {ITEMS.map((item, i) => (
                        <li key={item.title} className="py-6">
                            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold">
                                {String(i + 1).padStart(2, "0")}
                            </p>
                            <p className="font-heading mt-2 text-xl text-ink">{item.title}</p>
                            <p className="mt-2 text-[13px] font-light leading-relaxed text-[color:rgba(13,13,13,0.6)]">{item.body}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
