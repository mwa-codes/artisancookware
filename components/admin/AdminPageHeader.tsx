import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { adminNavigation } from "@/components/admin/navigation";
import { logoutAction } from "@/app/admin/(protected)/actions";

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
    const quickLinks = adminNavigation.filter((item) => item.href !== "/admin");
    const isDashboardPage = title.trim().toLowerCase() === "dashboard";
    const resolvedBackHref = backHref ?? (!isDashboardPage ? "/admin" : undefined);
    const resolvedBackLabel = backLabel ?? "Back to Dashboard";

    return (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
                <nav aria-label="Breadcrumb">
                    <ol className="flex flex-wrap items-center gap-1 text-[12px] text-ink-60">
                        <li>
                            <Link
                                href="/admin"
                                className="inline-flex items-center rounded-[2px] border border-transparent px-2 py-1 font-medium transition-colors hover:border-ink-20 hover:bg-white hover:text-ink"
                            >
                                Dashboard
                            </Link>
                        </li>
                        {crumbs.map((crumb, i) => (
                            <li key={i} className="flex items-center gap-1">
                                <ChevronRight className="h-3 w-3 text-ink-20" />
                                {crumb.href ? (
                                    <Link
                                        href={crumb.href}
                                        className="inline-flex items-center rounded-[2px] border border-transparent px-2 py-1 font-medium transition-colors hover:border-ink-20 hover:bg-white hover:text-ink"
                                    >
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className="inline-flex items-center rounded-[2px] border border-gold/25 bg-gold-pale px-2 py-1 text-ink font-medium">
                                        {crumb.label}
                                    </span>
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
                <div className="flex flex-wrap items-center gap-2 pt-1">
                    {quickLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="inline-flex items-center gap-1.5 rounded-[2px] border border-ink-20 bg-white px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-60 transition-colors hover:border-gold hover:text-ink"
                        >
                            <item.icon className="h-3.5 w-3.5 text-gold" />
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
                {resolvedBackHref ? (
                    <Link
                        href={resolvedBackHref}
                        className="inline-flex items-center gap-1.5 rounded-[2px] border border-ink-20 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-60 transition-colors hover:border-gold hover:text-ink"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        {resolvedBackLabel}
                    </Link>
                ) : null}
                <form action={logoutAction}>
                    <button type="submit" className="admin-btn-outline py-2">
                        Logout
                    </button>
                </form>
                {actions}
            </div>
        </div>
    );
}
