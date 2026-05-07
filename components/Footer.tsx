import Link from "next/link";

function IconMail() {
    return (
        <svg className="h-4 w-4 shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
    );
}

function IconPhone() {
    return (
        <svg className="h-4 w-4 shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.608-1.288.63-.934.034-1.832-.178-2.63-.525a15.66 15.66 0 01-4.829-3.324 15.65 15.65 0 01-3.324-4.829c-.347-.798-.559-1.696-.525-2.63.023-.519.254-1.006.63-1.288l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
    );
}

function IconPin() {
    return (
        <svg className="h-4 w-4 shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
    );
}

const linkClass =
    "text-[color:rgba(255,255,255,0.5)] transition-colors hover:text-[color:rgba(255,255,255,0.9)]";

export function Footer() {
    const emailAddress = "m.waqar.ahmed@gmail.com";
    const year = new Date().getFullYear();

    return (
        <footer className="bg-ink text-white">
            <div className="container-site grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4 space-y-6">
                    <p className="font-heading text-2xl">Artisan Cookware</p>
                    <p className="max-w-md text-sm leading-relaxed text-[color:rgba(255,255,255,0.55)]">
                        Premium aluminium cookware manufactured in Gujranwala since 1998. ISO-certified production for international wholesalers,
                        retailers, and hospitality supply chains.
                    </p>
                    <div className="space-y-3 text-sm">
                        <p className="flex items-start gap-3">
                            <IconPin />
                            <span className="text-[color:rgba(255,255,255,0.55)]">Industrial Estate, Gujranwala, Punjab, Pakistan</span>
                        </p>
                        <p className="flex items-center gap-3">
                            <IconPhone />
                            <a href="tel:+923016636557" className={linkClass}>
                                +92 301 6636557
                            </a>
                        </p>
                        <p className="flex items-center gap-3">
                            <IconMail />
                            <a href={`mailto:${emailAddress}`} className={linkClass}>
                                {emailAddress}
                            </a>
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Products</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/categories/non-stick" className={linkClass}>
                                Non-Stick Collection
                            </Link>
                        </li>
                        <li>
                            <Link href="/categories/anodised-dull" className={linkClass}>
                                Hard Anodised
                            </Link>
                        </li>
                        <li>
                            <Link href="/categories/metal-finish" className={linkClass}>
                                Metal Finish
                            </Link>
                        </li>
                        <li>
                            <Link href="/categories/soda-finish" className={linkClass}>
                                Prestige Range
                            </Link>
                        </li>
                        <li>
                            <Link href="/products" className={linkClass}>
                                Full Catalogue
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="lg:col-span-2">
                    <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/about" className={linkClass}>
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/about#manufacturing" className={linkClass}>
                                Manufacturing
                            </Link>
                        </li>
                        <li>
                            <Link href="/about#certifications" className={linkClass}>
                                Certifications
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className={linkClass}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="lg:col-span-2">
                    <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Trade Info</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/contact#moq" className={linkClass}>
                                MOQ &amp; Pricing
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact#shipping" className={linkClass}>
                                Shipping Terms
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact#oem" className={linkClass}>
                                OEM / Private Label
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact#faq" className={linkClass}>
                                B2B FAQ
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className={linkClass}>
                                Request Quote
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="container-site flex flex-col gap-4 py-6 text-[12px] text-[color:rgba(255,255,255,0.3)] md:flex-row md:items-center md:justify-between">
                    <p>© {year} Artisan Cookware. All rights reserved.</p>
                    <div className="flex flex-wrap gap-6">
                        <Link href="/privacy" className="transition-colors hover:text-white/50">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="transition-colors hover:text-white/50">
                            Terms of Trade
                        </Link>
                        <Link href="/sitemap.xml" className="transition-colors hover:text-white/50">
                            Sitemap
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
