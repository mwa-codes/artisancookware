import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";

type Crumb = {
    label: string;
    href?: string;
};

type AdminPageHeaderProps = {
    title: string;
    description?: string;
    crumbs?: Crumb[];
    backHref?: string;
    backLabel?: string;
    actions?: ReactNode;
};

export function AdminPageHeader({
    title,
    description,
    crumbs = [],
    backHref,
    backLabel = "Back",
    actions
}: AdminPageHeaderProps) {
    return (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
                <nav aria-label="Breadcrumb">
                    <ol className="flex flex-wrap items-center gap-1 text-[12px] text-ink-60">
                        <li>
                            <Link href="/admin" className="transition-colors hover:text-ink">
                                Dashboard
                            </Link>
                        </li>
                        {crumbs.map((crumb, i) => (
                            <li key={i} className="flex items-center gap-1">
                                <ChevronRight className="h-3 w-3 text-ink-20" />
                                {crumb.href ? (
                                    <Link href={crumb.href} className="transition-colors hover:text-ink">
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className="text-ink font-medium">{crumb.label}</span>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>

                {backHref ? (
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-60 transition-colors hover:text-ink"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        {backLabel}
                    </Link>
                ) : null}

                <h1 className="font-heading text-2xl font-light text-ink sm:text-3xl">{title}</h1>
                {description ? <p className="text-sm text-ink-60">{description}</p> : null}
            </div>

            {actions ? <div className="flex shrink-0 items-center gap-3">{actions}</div> : null}
        </div>
    );
}
