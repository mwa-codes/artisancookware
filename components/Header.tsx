"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Collections" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" }
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 border-b transition-all duration-300",
                scrolled
                    ? "border-gray-700/30 bg-brand-black/95 shadow-xl shadow-brand-red/10 backdrop-blur-xl"
                    : "border-gray-700/20 bg-brand-black/90 backdrop-blur-md"
            )}
        >
            <div className="container-grid">
                <div className="flex h-24 items-center justify-between">
                    {/* Enhanced Logo with Slogan */}
                    <Link href="/" className="group flex items-center transition-all duration-300 hover:scale-105">
                        <div className="flex items-center gap-4">
                            {/* Logo Image */}
                            <div className="relative">
                                <Image
                                    src="/Artisan-logo.jpg"
                                    alt="ArtisanCookware - Your Kitchen Needs"
                                    width={240}
                                    height={56}
                                    priority
                                    className="h-12 w-auto brightness-110 transition-all duration-300 group-hover:brightness-125"
                                />
                                {/* Glow effect */}
                                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-red/20 to-brand-gold/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>

                            {/* Slogan - visible on desktop */}
                            <div className="hidden flex-col lg:flex">
                                <span className="text-xs font-bold uppercase tracking-[0.15em] text-brand-gold">
                                    Your Kitchen Needs
                                </span>
                                <span className="text-[10px] font-medium text-gray-400">
                                    Premium Pakistani Craftsmanship
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation and CTA */}
                    <div className="hidden lg:flex lg:items-center lg:gap-8">
                        <nav>
                            <ul className="flex items-center gap-8">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "group relative px-3 py-2 text-sm font-bold uppercase tracking-[0.1em] transition-all duration-300",
                                                    isActive
                                                        ? "text-brand-gold"
                                                        : "text-gray-300 hover:text-brand-red"
                                                )}
                                            >
                                                {item.label}
                                                {isActive && (
                                                    <span className="absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-red to-brand-gold" />
                                                )}
                                                {!isActive && (
                                                    <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-red to-brand-gold transition-all duration-300 group-hover:w-6" />
                                                )}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* CTA Button */}
                        <Link
                            href="/contact"
                            className="rounded-xl bg-gradient-to-r from-brand-red to-brand-red-hover px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-red/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl hover:shadow-brand-red/40"
                        >
                            Get Quote
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="inline-flex items-center justify-center rounded-2xl border border-gray-600 bg-gray-800 p-3 text-gray-300 transition-all duration-300 hover:border-brand-red hover:bg-brand-red hover:text-white lg:hidden"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Enhanced Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="border-t border-gray-700/30 bg-gradient-to-b from-brand-black to-gray-900 py-6 lg:hidden">
                        <ul className="space-y-3">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "block rounded-2xl px-6 py-4 text-base font-bold uppercase tracking-[0.1em] transition-all duration-300",
                                                isActive
                                                    ? "bg-gradient-to-r from-brand-red to-brand-red-hover text-white shadow-lg"
                                                    : "text-gray-300 hover:bg-gray-800 hover:text-brand-gold"
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                            <li className="pt-4">
                                <Link
                                    href="/contact"
                                    className="block w-full rounded-2xl bg-gradient-to-r from-brand-gold to-brand-gold-hover px-6 py-4 text-center text-base font-bold text-black shadow-xl shadow-brand-gold/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                >
                                    Get Quote
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}
