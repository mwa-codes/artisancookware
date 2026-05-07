"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
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
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
                {/* Left: Logo & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white p-2 text-text-heading shadow-sm transition hover:border-brand-red hover:bg-gray-50 lg:hidden"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        aria-label="Toggle navigation"
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                    <Link href="/admin" className="flex items-center gap-3">
                        {/* Mobile: Logo icon only */}
                        <div className="relative h-9 w-9 overflow-hidden rounded-lg sm:hidden">
                            <Image src="/a-logo.jpeg" alt="ArtisanCookware" fill className="object-cover" />
                        </div>
                        {/* Desktop: Full logo with slogan */}
                        <Image
                            src="/Artisan-logo.jpg"
                            alt="ArtisanCookware - Your Kitchen Needs"
                            width={180}
                            height={42}
                            className="hidden h-10 w-auto sm:block"
                        />
                        <div className="hidden flex-col sm:flex">
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-red">Admin Dashboard</span>
                            <span className="font-heading text-base font-bold text-text-heading">Control Panel</span>
                        </div>
                    </Link>
                </div>

                {/* Right: Logout & User Info */}
                <div className="flex items-center gap-3">
                    <form action={logoutAction} className="hidden lg:block">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-semibold text-text-heading transition hover:border-brand-red hover:bg-gray-50"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </form>
                    <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 shadow-sm">
                        <div className="grid h-8 w-8 place-items-center rounded-full bg-brand-red text-sm font-bold text-white">
                            AC
                        </div>
                        <div className="hidden text-left leading-tight sm:block">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">Admin</p>
                            <p className="text-sm font-semibold text-text-heading">ArtisanCookware</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {mobileOpen ? (
                <div className="border-t border-gray-200 bg-white px-4 py-4 shadow-lg lg:hidden">
                    <nav className="space-y-2">
                        {adminNavigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition",
                                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                                        ? "bg-brand-red text-white shadow-md shadow-brand-red/20"
                                        : "text-text-body hover:bg-gray-100 hover:text-brand-red"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                    <form action={logoutAction} className="mt-4">
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-text-heading transition hover:border-brand-red hover:bg-gray-50"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </form>
                </div>
            ) : null}
        </header>
    );
}
