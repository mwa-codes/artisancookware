export const metadata = {
    title: "Return Policy | Artisan Cookware",
    description: "Return and claims policy for Artisan Cookware customers and trade buyers."
};

export default function ReturnPolicyPage() {
    return (
        <div className="bg-white pt-[68px]">
            <section className="relative overflow-hidden bg-ink">
                <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 60% at 80% 20%, rgba(196,163,90,0.35) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 10% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)"
                    }}
                    aria-hidden
                />
                <div className="relative container-site py-16 sm:py-20">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Legal</p>
                    <h1 className="font-heading text-display font-light text-white">Return Policy</h1>
                    <p className="mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-[rgba(255,255,255,0.65)]">Last updated: June 2026</p>
                </div>
            </section>

            <section className="bg-white">
                <div className="container-site max-w-3xl py-20">
                    <p className="mb-4 text-[15px] font-light leading-relaxed text-ink-60">
                        This return policy applies to Artisan Cookware purchases and matches the return settings we use for Google Merchant Center.
                        Returns are accepted for both defective and non-defective products, and exchanges are accepted within the policy window below.
                    </p>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Return Window</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>Returns are accepted within 100 days of delivery.</li>
                        <li>Product condition must be new only.</li>
                        <li>Returns and exchanges must be requested within the 100-day window.</li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Accepted Returns</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>Defective products.</li>
                        <li>Non-defective products.</li>
                        <li>Exchanges for eligible items.</li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Method &amp; Fees</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>Return method: in store at our Gujranwala location, arranged after you contact us.</li>
                        <li>Restocking fee: no cost.</li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Refund Processing</h2>
                    <p className="mb-4 text-[15px] font-light leading-relaxed text-ink-60">
                        Once a return is received and approved, refunds are processed within 30 days.
                    </p>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">How to Request a Return</h2>
                    <p className="mb-4 text-[15px] font-light leading-relaxed text-ink-60">
                        Email{" "}
                        <a href="mailto:info@artisancookware.co" className="underline underline-offset-2">
                            info@artisancookware.co
                        </a>
                        {" "}or WhatsApp us at{" "}
                        <a href="https://wa.me/923016636557" className="underline underline-offset-2">
                            +92 301 6636557
                        </a>
                        {" "}with your order details so we can arrange the return or exchange.
                    </p>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Contact</h2>
                    <p className="mb-4 text-[15px] font-light leading-relaxed text-ink-60">
                        Artisan Cookware
                        <br />
                        Gujranwala, Punjab, Pakistan
                        <br />
                        Email:{" "}
                        <a href="mailto:info@artisancookware.co" className="underline underline-offset-2">
                            info@artisancookware.co
                        </a>
                        <br />
                        WhatsApp:{" "}
                        <a href="https://wa.me/923016636557" className="underline underline-offset-2">
                            +92 301 6636557
                        </a>
                    </p>
                </div>
            </section>
        </div>
    );
}