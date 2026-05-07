import Link from "next/link";

type Crumb = {
    label: string;
    href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
    if (!items.length) return null;
    return (
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-2">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                            {item.href && !isLast ? (
                                <Link href={item.href} className="hover:text-brand-primary">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={isLast ? "text-slate-700" : ""}>{item.label}</span>
                            )}
                            {!isLast ? <span className="text-slate-400">/</span> : null}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
