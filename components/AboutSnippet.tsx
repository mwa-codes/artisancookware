import Image from "next/image";

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

const FACTORY_IMAGES = [
    "/factoryImages/factory-image-1.png",
    "/factoryImages/factory-image-2.jpeg",
    "/factoryImages/factory-image-3.jpeg",
    "/factoryImages/factory-image-4.jpeg",
    "/factoryImages/factory-image-5.jpeg",
    "/factoryImages/factory-image-6.jpeg",
    "/factoryImages/factory-image-7.jpeg",
    "/factoryImages/factory-image-8.jpeg"
];

export function AboutSnippet() {
    return (
        <section className="grid lg:grid-cols-2">
            <div className="relative min-h-[420px] overflow-hidden bg-ink p-3 lg:min-h-[640px] lg:p-4">
                <div className="grid h-full grid-cols-2 grid-rows-4 gap-2 lg:gap-3">
                    {FACTORY_IMAGES.map((src, index) => (
                        <div key={src} className="group relative overflow-hidden rounded-[2px]">
                            <Image
                                src={src}
                                alt={`Artisan Cookware factory view ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                                sizes="(min-width: 1024px) 25vw, 50vw"
                            />
                        </div>
                    ))}
                </div>
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
