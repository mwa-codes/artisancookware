import Link from "next/link";
import Image from "next/image";

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
    const emailAddress = "info@artisancookware.co";
    const googleProfileUrl = "https://share.google/M9iabBk3snLTJa7Lk";
    const year = new Date().getFullYear();

    return (
        <footer className="bg-ink text-white">
            <div className="container-site py-20 sm:py-24">
                {/* Balanced grid: 2×2 on tablet, 4 cols on xl — avoids one lonely column */}
                <div className="grid grid-cols-1 gap-14 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-16 xl:gap-y-12">
                    <div className="flex flex-col gap-6">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="h-[40px] w-[40px] shrink-0 overflow-hidden rounded-[3px]">
                                <Image src="/Artisan-logo.jpg" alt="" width={40} height={40} className="h-full w-full object-cover" />
                            </div>
                            <span className="font-heading text-[20px] font-normal text-white">Artisan Cookware</span>
                        </div>
                        <p className="max-w-md text-[15px] leading-relaxed text-[rgba(255,255,255,0.55)]">
                            Premium aluminium cookware manufactured in Gujranwala since 1998. Hand-finished, batch-inspected production for international
                            wholesalers and hospitality supply chains.
                        </p>
                        <div className="space-y-4 text-sm">
                            <p className="flex gap-3">
                                <IconPin />
                                <span className="text-[rgba(255,255,255,0.55)]">
                                    Artisan Cookware, Mian Sansi Rd Street Number 10, Muhala Islampura, Gujranwala, Punjab, Pakistan{" "}
                                    <a
                                        href={googleProfileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-1 underline underline-offset-2 transition-colors hover:text-[rgba(255,255,255,0.9)]"
                                    >
                                        (View on Google)
                                    </a>
                                </span>
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

                    <div className="space-y-5">
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Products</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { href: "/aluminium-cookware", label: "Aluminium Cookware Guide" },
                                { href: "/metal-finish-gift-sets", label: "Metal Finish Gift Sets" },
                                { href: "/non-stick-gift-sets", label: "Non-Stick Gift Sets" },
                                { href: "/anodized-dull-cookware", label: "Anodized / Dull Cookware" },
                                { href: "/categories/non-stick", label: "Non-Stick Category" },
                                { href: "/categories/anodised-dull", label: "Hard Anodised Category" },
                                { href: "/categories/metal-finish", label: "Metal Finish Category" },
                                { href: "/categories/soda-finish", label: "Soda Finish Category" },
                                { href: "/products", label: "Full Catalogue" }
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} className={linkClass}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-5">
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Company</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { href: "/about", label: "About Us" },
                                { href: "/about#manufacturing", label: "Manufacturing" },
                                { href: "/about#quality", label: "Quality Process" },
                                { href: "/contact", label: "Contact" }
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} className={linkClass}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-5">
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Trade Info</h3>
                        <ul className="space-y-3 text-sm">
                            {[
                                { href: "/contact#moq", label: "MOQ & Pricing" },
                                { href: "/contact#shipping", label: "Shipping Terms" },
                                { href: "/contact#oem", label: "OEM / Private Label" },
                                { href: "/contact#faq", label: "B2B FAQ" },
                                { href: "/contact", label: "Request Quote" }
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} className={linkClass}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="container-site flex flex-col gap-5 pt-8 pb-[calc(3rem+env(safe-area-inset-bottom,0px))] text-[12px] text-[rgba(255,255,255,0.35)] sm:flex-row sm:items-center sm:justify-between sm:pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))]">
                    <p className="leading-relaxed">
                        © {year} Artisan Cookware. All rights reserved.{" "}
                        <a
                            href="https://mwadev.me"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2 transition-colors hover:text-white/70"
                        >
                            Built by MWA
                        </a>
                        .
                    </p>
                    <div className="flex flex-wrap gap-6 sm:gap-8">
                        <Link href="/privacy" className="transition-colors hover:text-white/70">
                            Privacy Policy
                        </Link>
                        <Link href="/return-policy" className="transition-colors hover:text-white/70">
                            Return Policy
                        </Link>
                        <Link href="/terms" className="transition-colors hover:text-white/70">
                            Terms of Trade
                        </Link>
                        <Link href="/sitemap.xml" className="transition-colors hover:text-white/70">
                            Sitemap
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
