export const metadata = {
    title: "Terms of Trade | Artisan Cookware",
    description: "Terms and conditions for wholesale orders, sampling, and trade with Artisan Cookware."
};

export default function TermsPage() {
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
                    <h1 className="font-heading text-display font-light text-white">Terms of Trade</h1>
                    <p className="mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-[rgba(255,255,255,0.65)]">Last updated: June 2026</p>
                </div>
            </section>

            <section className="bg-white">
                <div className="container-site max-w-3xl py-20">
                    <h2 className="mb-4 font-heading text-2xl font-light text-ink">Acceptance</h2>
                    <p className="mb-4 text-[15px] font-light leading-relaxed text-ink-60">
                        By submitting a wholesale inquiry or placing an order with Artisan Cookware, you agree to these terms. These terms govern all B2B
                        transactions between Artisan Cookware, Gujranwala, Pakistan, and the buyer.
                    </p>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Minimum Order Quantity (MOQ)</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>Standard MOQ is 50 units per SKU.</li>
                        <li>Custom or OEM order MOQ is discussed case by case based on tooling and finishing requirements.</li>
                        <li>Sample orders are available below MOQ; please contact us for sample pricing.</li>
                        <li>MOQ may vary by product line and is confirmed in your formal quotation.</li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Pricing &amp; Quotations</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>All prices are quoted in USD unless otherwise agreed in writing.</li>
                        <li>Quoted shipping terms are FOB Karachi unless CIF or another Incoterm is specified.</li>
                        <li>Quotations are valid for 30 days from date of issue.</li>
                        <li>
                            Due to aluminium and energy market fluctuations, prices may change; confirmed pricing is locked upon purchase order and receipt of
                            deposit.
                        </li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Payment Terms</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>30% deposit on order confirmation and 70% balance before shipment.</li>
                        <li>Accepted payment methods: T/T (bank transfer) and Letter of Credit (L/C).</li>
                        <li>Payment in USD is preferred; GBP, EUR, and AED are also accepted.</li>
                        <li>Orders do not move into production until the agreed deposit is received.</li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Sampling</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>Sample dispatch is typically within 48 hours of request confirmation.</li>
                        <li>Samples are charged at standard unit price plus shipping costs.</li>
                        <li>Sample cost is credited against the first bulk order that meets MOQ.</li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Production &amp; Lead Times</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>Standard production lead time is 3 to 4 weeks after order confirmation and deposit.</li>
                        <li>Custom or OEM lead time is generally 4 to 6 weeks, depending on specification complexity.</li>
                        <li>Lead times are estimates, and we notify buyers promptly if delays arise.</li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Quality &amp; Inspection</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>All products are inspected against ISO 9001:2015 quality system requirements before shipment.</li>
                        <li>Third-party pre-shipment inspection can be arranged on request at buyer&apos;s cost.</li>
                        <li>Artisan Cookware is not liable for damage caused by misuse or improper storage after delivery.</li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Shipping &amp; Delivery</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>Default shipping terms are FOB Karachi Port.</li>
                        <li>CIF shipment to major global ports is available on request in your inquiry.</li>
                        <li>Buyer is responsible for import duties, taxes, and customs clearance in destination country.</li>
                        <li>Artisan Cookware can recommend freight forwarders on request.</li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Claims &amp; Returns</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>Any quality claim must be reported within 14 days of receipt with photos and shipment details.</li>
                        <li>Validated claims are resolved through replacement shipment or credit note.</li>
                        <li>No returns are accepted without prior written authorisation.</li>
                        <li>Artisan Cookware&apos;s liability is limited to the value of the affected goods.</li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Intellectual Property &amp; OEM</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>Custom designs, buyer logos, and branding produced for OEM orders remain property of the buyer.</li>
                        <li>
                            Artisan Cookware retains the right to display produced items in catalogue or portfolio materials unless otherwise agreed in
                            writing.
                        </li>
                        <li>Artisan Cookware brand marks and identity assets may not be used without written permission.</li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Governing Law</h2>
                    <p className="mb-4 text-[15px] font-light leading-relaxed text-ink-60">
                        These terms are governed by the laws of Pakistan. Disputes will be resolved by negotiation first and, if unresolved, through
                        arbitration in Lahore, Pakistan.
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
