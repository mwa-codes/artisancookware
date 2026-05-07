function IconMail() {
    return (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
    );
}

function IconBox() {
    return (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0v9l-9 5.25m9-14.25v9m0-9L12 12m0 0 9-5.25M12 12 9-10.5m3 10.5L3 7.5m0 9 9 5.25M3 7.5v9l9 5.25" />
        </svg>
    );
}

function IconDoc() {
    return (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
    );
}

function IconTruck() {
    return (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.25">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
    );
}

const STEPS = [
    {
        step: "Step 01",
        title: "Submit Inquiry",
        icon: <IconMail />,
        body: "Fill in our wholesale form. Tell us your market, price range, quantities.",
        badge: "Response within 24h"
    },
    {
        step: "Step 02",
        title: "Receive Samples",
        icon: <IconBox />,
        body: "We dispatch physical samples within 48 hours.",
        badge: "⟶ 48h sample dispatch"
    },
    {
        step: "Step 03",
        title: "Confirm Order",
        icon: <IconDoc />,
        body: "Approve samples, finalise specs, confirm PO.",
        badge: "PI issued same day"
    },
    {
        step: "Step 04",
        title: "Production & Ship",
        icon: <IconTruck />,
        body: "Produce with full QC, pack to spec, ship FOB Karachi or CIF.",
        badge: "3–4 weeks production"
    }
];

export function ProcessSection() {
    return (
        <section className="bg-ink py-20 sm:py-24">
            <div className="container-site">
                <div className="max-w-3xl">
                    <div className="eyebrow">
                        <span className="eyebrow-line" />
                        <span className="eyebrow-text text-gold">How We Work</span>
                    </div>
                    <h2 className="font-heading text-section font-light text-white">Simple B2B Process</h2>
                    <p className="mt-6 text-[15px] font-light leading-relaxed text-[rgba(255,255,255,0.55)]">
                        From first inquiry to delivery at your port — transparent, efficient, built for international trade.
                    </p>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-[2px] md:grid-cols-2 xl:grid-cols-4">
                    {STEPS.map((s) => (
                        <div key={s.step} className="border-t border-gold bg-[rgba(255,255,255,0.04)] p-6 md:p-8">
                            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{s.step}</p>
                            <div className="mt-5 grid h-11 w-11 place-items-center border border-[rgba(255,255,255,0.12)]">{s.icon}</div>
                            <h3 className="font-heading mt-6 text-[22px] text-white">{s.title}</h3>
                            <p className="mt-3 text-[13px] font-light leading-relaxed text-[rgba(255,255,255,0.5)]">{s.body}</p>
                            <p className="mt-6 inline-block rounded-[2px] border border-[rgba(184,150,60,0.35)] px-3 py-1.5 text-[11px] font-medium text-gold">
                                {s.badge}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
