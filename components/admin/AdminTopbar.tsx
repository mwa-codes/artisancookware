"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { adminNavigation } from "./navigation";
import { logoutAction } from "@/app/admin/(protected)/actions";

export function AdminTopbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    return (
        <header className="sticky top-0 z-40 border-b border-ink-20 bg-white shadow-card">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-[2px] border border-ink-20 bg-white p-2 text-ink transition hover:border-gold lg:hidden"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        aria-label="Toggle navigation"
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                    <Link href="/admin" className="flex items-center gap-2">
                        <Image
                            src="/Artisan-logo.jpg"
                            alt="Artisan Cookware"
                            width={100}
                            height={28}
                            className="h-[28px] w-auto object-contain"
                        />
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <form action={logoutAction} className="hidden lg:block">
                        <button type="submit" className="admin-btn-outline gap-2 py-2">
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </form>
                    <div className="flex items-center gap-3 rounded-[2px] border border-ink-20 bg-parchment px-3 py-1.5">
                        <div className="grid h-8 w-8 place-items-center rounded-[2px] bg-ink text-xs font-bold text-gold-light">AC</div>
                        <div className="hidden text-left leading-tight sm:block">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-60">Admin</p>
                            <p className="text-sm font-semibold text-ink">Artisan Cookware</p>
                        </div>
                    </div>
                </div>
            </div>
            {mobileOpen ? (
                <div className="border-t border-ink-20 bg-white px-4 py-4 shadow-lg lg:hidden">
                    <nav className="space-y-2">
                        {adminNavigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    "flex items-center gap-3 rounded-[2px] px-4 py-3 text-sm font-semibold transition",
                                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                                        ? "bg-ink text-gold-light"
                                        : "text-ink-60 hover:bg-parchment hover:text-ink"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                    <form action={logoutAction} className="mt-4">
                        <button type="submit" className="admin-btn-outline flex w-full justify-center gap-2 py-3">
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </form>
                </div>
            ) : null}
        </header>
    );
}
