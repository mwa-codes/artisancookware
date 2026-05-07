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
        <aside className="hidden w-72 flex-shrink-0 flex-col border-r border-gray-800/20 bg-brand-black text-white backdrop-blur-xl lg:flex">
            {/* Header Section */}
            <div className="border-b border-white/10 px-6 py-8">
                <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                        <Image
                            src="/a-logo.jpeg"
                            alt="ArtisanCookware"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display text-lg font-bold text-white">ArtisanCookware</span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-gold">Your Kitchen Needs</span>
                    </div>
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-brand-red">Admin Console</p>
                <p className="mt-1 text-sm text-gray-400">Manage your catalogue, variants, and business inquiries.</p>
            </div>

            {/* Navigation & Logout */}
            <div className="flex flex-1 flex-col justify-between overflow-y-auto px-4 py-6">
                <ul className="space-y-2">
                    {adminNavigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={clsx(
                                        "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all",
                                        isActive
                                            ? "bg-brand-red text-white shadow-lg shadow-brand-red/20"
                                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                    )}
                                >
                                    <span
                                        className={clsx(
                                            "grid h-8 w-8 place-items-center rounded-lg border text-sm transition",
                                            isActive
                                                ? "border-white/20 bg-white/10 text-white"
                                                : "border-gray-700 bg-gray-800/50 text-brand-red group-hover:border-brand-red group-hover:bg-brand-red/10"
                                        )}
                                    >
                                        <Icon className="h-[18px] w-[18px]" />
                                    </span>
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Logout Button */}
                <form action={logoutAction} className="px-2">
                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-sm font-semibold text-gray-300 transition hover:border-brand-red hover:bg-gray-800 hover:text-white"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </form>
            </div>
        </aside>
    );
}
