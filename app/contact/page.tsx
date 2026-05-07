import { InquirySection } from "@/components/InquirySection";
import { getAllProductsForListing } from "@/lib/repository";

export const metadata = {
    title: "Contact | Artisan Cookware",
    description: "Reach our export desk for wholesale pricing, sampling, and shipping terms."
};

export default async function ContactPage() {
    const catalogue = await getAllProductsForListing();
    const productOptions = catalogue.map((p) => ({ id: p.id, label: p.name }));

    return (
        <div className="bg-white">
            <header className="border-b border-ink-20 bg-parchment">
                <div className="container-site py-14 sm:py-16">
                    <h1 className="font-heading text-display font-light text-ink">Contact</h1>
                    <p className="mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.6)]">
                        WhatsApp, email, or the wholesale form — choose what&apos;s fastest for your team.
                    </p>
                </div>
            </header>

            <section className="container-site py-14 lg:py-20">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
                    <div className="space-y-6">
                        <div className="rounded-[4px] border border-ink-20 bg-white p-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">WhatsApp</p>
                            <a href="https://wa.me/923016636557" className="mt-2 block text-lg text-ink hover:text-brand-red">
                                +92 301 6636557
                            </a>
                        </div>
                        <div className="rounded-[4px] border border-ink-20 bg-white p-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Email</p>
                            <a href="mailto:m.waqar.ahmed@gmail.com" className="mt-2 block text-lg text-ink hover:text-brand-red">
                                m.waqar.ahmed@gmail.com
                            </a>
                        </div>
                        <div className="rounded-[4px] border border-ink-20 bg-white p-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Address</p>
                            <p className="mt-2 text-[15px] font-light leading-relaxed text-[color:rgba(13,13,13,0.65)]">
                                Industrial Estate, Gujranwala, Punjab, Pakistan
                            </p>
                        </div>
                        <div className="relative aspect-video overflow-hidden rounded-[4px] border border-ink-20">
                            <iframe
                                title="Gujranwala map"
                                className="absolute inset-0 h-full w-full"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                src="https://www.google.com/maps?q=Gujranwala%20Pakistan&output=embed"
                            />
                        </div>
                    </div>

                    <div>
                        <p className="rounded-[4px] border border-ink-20 bg-parchment px-4 py-3 text-[13px] text-ink-60">
                            Export inquiry? Use our wholesale form — include quantities, destination port, and packaging needs.
                        </p>
                    </div>
                </div>
            </section>

            <InquirySection productOptions={productOptions} />
        </div>
    );
}
