"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CurrencySelector } from "@/components/CurrencySelector";

const navItems = [
    { href: "/categories", label: "Collections" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className="fixed left-0 right-0 top-0 z-[100] h-[68px] border-b border-[rgba(13,13,13,0.1)] bg-[rgba(254,254,254,0.96)] backdrop-blur-[12px]"
        >
            <div className="container-site flex h-full items-center justify-between gap-6">
                <Link href="/" className="flex items-center gap-3 shrink-0">
                    <div className="h-[38px] w-[38px] shrink-0 overflow-hidden rounded-[3px]">
                        <Image
                            src="/Artisan-logo.jpg"
                            alt="Artisan Cookware"
                            width={38}
                            height={38}
                            priority
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <span className="hidden font-heading text-[19px] font-normal leading-none text-ink sm:block">
                        Artisan Cookware
                    </span>
                </Link>

                <nav className="hidden md:flex flex-1 justify-center">
                    <ul className="flex items-center gap-10">
                        {navItems.map((item) => {
                            const isActive =
                                pathname === item.href ||
                                (item.href !== "/" && pathname.startsWith(item.href));
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "relative py-2 text-[13px] font-medium uppercase tracking-[0.06em] transition-colors",
                                            isActive ? "text-ink" : "text-[color:rgba(13,13,13,0.6)] hover:text-ink"
                                        )}
                                    >
                                        {item.label}
                                        {isActive ? (
                                            <span className="absolute bottom-0 left-0 right-0 h-px bg-gold" />
                                        ) : null}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="hidden md:flex items-center gap-4 shrink-0">
                    <CurrencySelector />
                    <Link href="/contact" className="btn-primary">
                        Request Quote
                    </Link>
                </div>

                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-ink-20 text-ink md:hidden"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {mobileMenuOpen ? (
                <div className="border-t border-[rgba(13,13,13,0.08)] bg-[rgba(254,254,254,0.98)] px-5 py-4 md:hidden">
                    <nav aria-label="Mobile">
                        <ul className="flex flex-col gap-1">
                            {navItems.map((item) => {
                                const isActive =
                                    pathname === item.href ||
                                    (item.href !== "/" && pathname.startsWith(item.href));
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "block rounded-[2px] px-3 py-3 text-[13px] font-medium uppercase tracking-[0.06em]",
                                                isActive
                                                    ? "bg-parchment text-ink"
                                                    : "text-[color:rgba(13,13,13,0.6)]"
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="mt-4 flex flex-col gap-3 border-t border-ink-20 pt-4">
                            <CurrencySelector />
                            <Link href="/contact" className="btn-primary justify-center">
                                Request Quote
                            </Link>
                        </div>
                    </nav>
                </div>
            ) : null}
        </header>
    );
}
