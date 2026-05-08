export const metadata = {
    title: "Privacy Policy | Artisan Cookware",
    description: "How Artisan Cookware collects, uses, and protects your personal information."
};

export default function PrivacyPage() {
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
                    <h1 className="font-heading text-display font-light text-white">Privacy Policy</h1>
                    <p className="mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-[rgba(255,255,255,0.65)]">Last updated: June 2026</p>
                </div>
            </section>

            <section className="bg-white">
                <div className="container-site max-w-3xl py-20">
                    <h2 className="mb-4 font-heading text-2xl font-light text-ink">Information We Collect</h2>
                    <p className="mb-4 text-[15px] font-light leading-relaxed text-ink-60">
                        We collect business contact details you submit through our forms, including your name, email address, company name, country, and
                        phone number.
                    </p>
                    <p className="mb-4 text-[15px] font-light leading-relaxed text-ink-60">
                        We also collect inquiry details relevant to wholesale trade, such as the products you are interested in, expected order quantities,
                        and whether you are a distributor, retailer, or hospitality buyer.
                    </p>
                    <p className="mb-4 text-[15px] font-light leading-relaxed text-ink-60">
                        If enabled, basic website usage data (for example pages visited and browser type) may be collected through Vercel Analytics to help
                        us improve site performance and content clarity.
                    </p>
                    <p className="mb-4 text-[15px] font-light leading-relaxed text-ink-60">
                        We do not provide online checkout and we do not collect or store card or payment credential information on this website.
                    </p>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">How We Use Your Information</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>To respond to wholesale inquiries and quotation requests.</li>
                        <li>To send product catalogues and pricing details you specifically request.</li>
                        <li>To process and fulfil sample requests for qualified buyers.</li>
                        <li>We do not sell, rent, or share your data with third parties for commercial gain.</li>
                        <li>We do not send unsolicited marketing emails.</li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Data Storage &amp; Security</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>Inquiry records are stored securely in Supabase infrastructure hosted in EU and US regions.</li>
                        <li>Email communications are handled through Google Workspace.</li>
                        <li>We retain inquiry records for up to 3 years for business documentation and follow-up continuity.</li>
                        <li>
                            You may request deletion of your information at any time by emailing{" "}
                            <a href="mailto:info@artisancookware.co" className="underline underline-offset-2">
                                info@artisancookware.co
                            </a>
                            .
                        </li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Cookies</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>We use essential cookies only, primarily for session management and basic site functionality.</li>
                        <li>We do not use advertising or behavioral tracking cookies.</li>
                        <li>We do not enable third-party analytics cookies without required consent.</li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Third-Party Services</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>
                            Vercel (website hosting) —{" "}
                            <a href="https://vercel.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                                vercel.com/privacy
                            </a>
                        </li>
                        <li>
                            Supabase (database) —{" "}
                            <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                                supabase.com/privacy
                            </a>
                        </li>
                        <li>
                            Google Workspace (email) —{" "}
                            <a
                                href="https://workspace.google.com/intl/en_pk/terms/privacy/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-2"
                            >
                                workspace.google.com/privacy
                            </a>
                        </li>
                        <li>
                            WhatsApp Business (messaging) —{" "}
                            <a
                                href="https://www.whatsapp.com/legal/privacy-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-2"
                            >
                                whatsapp.com/legal/privacy-policy
                            </a>
                        </li>
                    </ul>

                    <h2 className="mb-4 mt-12 font-heading text-2xl font-light text-ink">Your Rights</h2>
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] font-light text-ink-60">
                        <li>Right to access the personal data we hold about you.</li>
                        <li>Right to request correction of inaccurate or incomplete data.</li>
                        <li>Right to request deletion of your personal data (right to be forgotten).</li>
                        <li>
                            To exercise these rights, contact{" "}
                            <a href="mailto:info@artisancookware.co" className="underline underline-offset-2">
                                info@artisancookware.co
                            </a>
                            .
                        </li>
                    </ul>

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
