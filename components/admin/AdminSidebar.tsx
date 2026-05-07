"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/admin/(protected)/actions";
import { adminNavigation } from "./navigation";

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden w-[240px] shrink-0 flex-col border-r border-white/10 bg-ink text-white lg:flex">
            <div className="border-b border-white/10 px-6 py-8">
                <Link href="/admin" className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center bg-white text-[11px] font-bold uppercase tracking-tight text-ink">
                        AC
                    </span>
                    <span className="font-heading text-lg text-white">Artisan Cookware</span>
                </Link>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Admin</p>
            </div>

            <div className="flex flex-1 flex-col justify-between overflow-y-auto px-3 py-6">
                <ul className="space-y-1">
                    {adminNavigation.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        const highlighted = item.href === "/admin" ? pathname === "/admin" : active;

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={clsx(
                                        "flex items-center gap-3 px-3 py-3 text-sm font-medium transition",
                                        highlighted ? "border-l-[3px] border-gold bg-white/5 text-white" : "border-l-[3px] border-transparent text-[rgba(255,255,255,0.55)] hover:text-white"
                                    )}
                                >
                                    <Icon className="h-4 w-4 text-gold" />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <form action={logoutAction} className="px-2 pt-6">
                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-[2px] border border-white/15 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-gold hover:text-white"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </form>
            </div>
        </aside>
    );
}
