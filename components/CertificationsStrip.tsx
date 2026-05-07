function Shield() {
    return (
        <svg className="h-7 w-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.273-3.286zm0 13.036h.008v.008h-.008v-.008z" />
        </svg>
    );
}

function Globe() {
    return (
        <svg className="h-7 w-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
    );
}

function Star() {
    return (
        <svg className="h-7 w-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.874a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
    );
}

function Card() {
    return (
        <svg className="h-7 w-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H5.25a2.25 2.25 0 00-2.25 2.25v13.5a2.25 2.25 0 002.25 2.25z" />
        </svg>
    );
}

const ITEMS = [
    { icon: <Shield />, name: "ISO 9001:2015", desc: "Quality Management System" },
    { icon: <Globe />, name: "Export Registered", desc: "TDAP & PRGMEA Registered" },
    { icon: <Star />, name: "Premium Grade", desc: "Food-Safe Materials Certified" },
    { icon: <Card />, name: "Secure Payments", desc: "L/C, T/T, Western Union" }
];

export function CertificationsStrip() {
    return (
        <section className="bg-gold-pale py-10 sm:py-12">
            <div className="container-site">
                <div className="flex flex-wrap items-start justify-center gap-10 lg:gap-16">
                    {ITEMS.map((item, i) => (
                        <div key={item.name} className="flex max-w-[240px] items-start gap-4">
                            {i > 0 ? (
                                <span className="hidden h-16 w-px shrink-0 bg-[rgba(184,150,60,0.35)] xl:block" aria-hidden />
                            ) : null}
                            <span className="grid h-12 w-12 shrink-0 place-items-center border border-gold">{item.icon}</span>
                            <div>
                                <p className="font-heading text-lg text-ink">{item.name}</p>
                                <p className="mt-1 text-[11px] leading-snug text-[color:rgba(13,13,13,0.6)]">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
