function Icon({
    children,
    title
}: {
    children: React.ReactNode;
    title: string;
}) {
    return (
        <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-[2px] border border-gold text-gold"
            title={title}
            aria-hidden
        >
            {children}
        </span>
    );
}

const items = [
    {
        title: "Quality",
        label: "Quality",
        value: "ISO 9001:2015 Certified",
        icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.273-3.286zm0 13.036h.008v.008h-.008v-.008z" />
            </svg>
        )
    },
    {
        title: "Sampling",
        label: "Sampling",
        value: "48-Hour Sample Dispatch",
        icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: "MOQ",
        label: "MOQ",
        value: "From 50 Units / SKU",
        icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
        )
    },
    {
        title: "Reach",
        label: "Reach",
        value: "Exported to 40+ Countries",
        icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
        )
    },
    {
        title: "OEM/ODM",
        label: "OEM/ODM",
        value: "Custom Branding Available",
        icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0v9l-9 5.25m9-14.25v9m0-9L12 12m0 0 9-5.25M12 12 9-10.5m3 10.5L3 7.5m0 9 9 5.25M3 7.5v9l9 5.25" />
            </svg>
        )
    },
    {
        title: "Shipping",
        label: "Shipping",
        value: "FOB Karachi / CIF Available",
        icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
        )
    }
];

export function TrustBar() {
    return (
        <div className="border-t border-[rgba(255,255,255,0.06)] bg-ink">
            <div className="container-site flex flex-nowrap gap-0 overflow-x-auto px-5 py-7 sm:px-10 lg:justify-between lg:px-20 lg:py-7">
                {items.map((item, i) => (
                    <div key={item.title} className="flex min-w-[200px] shrink-0 items-center gap-4 lg:min-w-0">
                        {i > 0 ? (
                            <span className="mr-4 hidden h-10 w-px shrink-0 bg-[rgba(255,255,255,0.1)] lg:block" aria-hidden />
                        ) : null}
                        <Icon title={item.title}>{item.icon}</Icon>
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">{item.label}</p>
                            <p className="mt-1 text-[13px] font-medium leading-snug text-white">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
