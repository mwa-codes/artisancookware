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
                        Artisan Cookware is a wholesale manufacturer and does not operate a standard consumer checkout on this website. Returns are
                        handled on a case-by-case basis for verified manufacturing issues, shipment damage, or order discrepancies.
                    </p>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Eligibility</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>Claims must be reported within 14 days of receiving the shipment.</li>
                        <li>Requests must include clear photos, order details, and a short description of the issue.</li>
                        <li>Items must remain unused and in their original condition unless the issue was discovered after opening.</li>
                        <li>Custom OEM or private-label orders may have separate return terms agreed in writing.</li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Non-Returnable Cases</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>Normal wear, misuse, improper storage, or damage after delivery.</li>
                        <li>Minor cosmetic variation that does not affect product function.</li>
                        <li>Orders approved with custom branding, artwork, or specifications unless otherwise agreed.</li>
                        <li>Claims submitted after the 14-day reporting period.</li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Resolution Options</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>Replacement of affected goods.</li>
                        <li>Credit note toward a future wholesale order.</li>
                        <li>Partial or full refund only when agreed in writing after inspection.</li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Shipping Costs</h2>
                    <p className="mb-4 text-[15px] font-light leading-relaxed text-ink-60">
                        If a return or replacement is approved, the method of return shipping and cost responsibility will be confirmed in writing based on
                        the cause of the issue and the destination country.
                    </p>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">How to Request a Return</h2>
                    <p className="mb-4 text-[15px] font-light leading-relaxed text-ink-60">
                        Email{" "}
                        <a href="mailto:info@artisancookware.co" className="underline underline-offset-2">
                            info@artisancookware.co
                        </a>
                        {" "}with your order details and supporting photos. You can also contact us by WhatsApp at{" "}
                        <a href="https://wa.me/923016636557" className="underline underline-offset-2">
                            +92 301 6636557
                        </a>
                        . We will review the request and respond with next steps.
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