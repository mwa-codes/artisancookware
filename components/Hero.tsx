import Link from "next/link";
import { ArrowRight, Award, Clock, Users } from "lucide-react";
import type { ProductWithRelations } from "@/lib/types";
import { HeroProductSlider } from "@/components/HeroProductSlider";

type HeroProps = {
    products: ProductWithRelations[];
};

export function Hero({ products }: HeroProps) {
    const featuredProducts = products ?? [];

    return (
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-brand-black via-gray-900 to-brand-black py-32 lg:py-40">
            {/* Vibrant Premium Background Elements */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                {/* Main vibrant gradient orbs */}
                <div className="absolute -top-40 left-1/3 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-radial from-brand-red/25 via-brand-red/10 to-transparent blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 right-1/3 h-[900px] w-[900px] translate-x-1/2 rounded-full bg-gradient-radial from-brand-gold/30 via-brand-gold/15 to-transparent blur-3xl animate-pulse animation-delay-1000" />

                {/* Dynamic accent orbs */}
                <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-brand-red/15 to-transparent blur-2xl animate-bounce-slow" />
                <div className="absolute right-0 top-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-gradient-to-l from-brand-gold/20 to-transparent blur-2xl animate-bounce-slow animation-delay-500" />

                {/* Animated geometric patterns */}
                <div className="absolute right-20 top-32 h-40 w-40 rotate-45 border-2 border-brand-gold/20 bg-gradient-to-br from-brand-gold/10 to-transparent animate-spin-slow" />
                <div className="absolute bottom-40 left-20 h-32 w-32 rotate-12 border-2 border-brand-red/20 bg-gradient-to-tr from-brand-red/10 to-transparent animate-pulse" />

                {/* Moving light streaks */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/5 to-transparent rotate-12 animate-slide-right" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-brand-red/5 to-transparent -rotate-12 animate-slide-left" />
            </div>

            <div className="container-grid relative">
                <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-24">
                    {/* Left Content */}
                    <div className="flex flex-col space-y-8">
                        {/* Trust Badge */}
                        <div className="animate-fade-in">
                            <span className="inline-flex items-center gap-3 rounded-full border border-brand-gold/40 bg-gradient-to-r from-brand-red/10 via-brand-gold/10 to-brand-red/10 px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-brand-gold shadow-lg backdrop-blur-sm">
                                <Award className="h-5 w-5 text-brand-gold" />
                                Premium Pakistani Craftsmanship
                            </span>
                        </div>

                        {/* Main Headline */}
                        <div className="space-y-6">
                            <h1 className="text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
                                <span className="block">ARTISAN</span>
                                <span className="block bg-gradient-to-r from-brand-red via-brand-gold to-brand-red bg-clip-text text-transparent">
                                    COOKWARE
                                </span>
                                <span className="block text-3xl text-brand-gold sm:text-4xl lg:text-5xl">
                                    Excellence
                                </span>
                            </h1>

                            <p className="max-w-2xl text-xl leading-relaxed text-gray-300 sm:text-2xl">
                                <span className="text-brand-gold font-bold">25+ Years</span> of Premium Pakistani Craftsmanship.
                                Trusted by <span className="text-brand-red font-bold">World-Class Hotels</span> &
                                <span className="text-brand-gold font-bold">Michelin-Starred Restaurants</span> Globally.
                            </p>
                        </div>

                        {/* Key Benefits */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 rounded-xl border border-brand-red/30 bg-gradient-to-r from-brand-red/10 to-brand-red/5 px-4 py-2 backdrop-blur-sm">
                                <div className="h-3 w-3 rounded-full bg-brand-red"></div>
                                <span className="text-sm font-bold text-white">25+ Years Heritage</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-xl border border-brand-gold/30 bg-gradient-to-r from-brand-gold/10 to-brand-gold/5 px-4 py-2 backdrop-blur-sm">
                                <div className="h-3 w-3 rounded-full bg-brand-gold"></div>
                                <span className="text-sm font-bold text-white">Export Quality</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-xl border border-brand-gold/30 bg-gradient-to-r from-brand-gold/10 to-brand-red/5 px-4 py-2 backdrop-blur-sm">
                                <div className="h-3 w-3 rounded-full bg-brand-gold"></div>
                                <span className="text-sm font-bold text-white">ISO Certified</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-6">
                            <Link href="/categories" className="group rounded-2xl bg-gradient-to-r from-brand-red to-brand-red-hover px-8 py-4 text-lg font-bold text-white shadow-xl shadow-brand-red/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-brand-red/40">
                                <span className="flex items-center gap-3">
                                    Explore Collections
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>

                            <Link href="/contact" className="group rounded-2xl border-2 border-brand-gold bg-transparent px-8 py-4 text-lg font-bold text-brand-gold backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white hover:text-white hover:shadow-xl hover:shadow-brand-gold/30">
                                <span className="flex items-center gap-3">
                                    Request Quote
                                    <Clock className="h-5 w-5" />
                                </span>
                            </Link>
                        </div>

                        {/* Trust Features */}
                        <div className="grid gap-4 border-t border-gray-700/30 pt-8 sm:grid-cols-3">
                            {[
                                {
                                    label: "Lightning Fast",
                                    sublabel: "48H Sampling",
                                    icon: <Clock className="h-6 w-6 text-brand-red" />,
                                    gradient: "from-brand-red/15 to-brand-red/5",
                                    border: "border-brand-red/30"
                                },
                                {
                                    label: "Global Reach",
                                    sublabel: "B2B & Retail",
                                    icon: <Users className="h-6 w-6 text-brand-gold" />,
                                    gradient: "from-brand-gold/15 to-brand-gold/5",
                                    border: "border-brand-gold/30"
                                },
                                {
                                    label: "Premium Grade",
                                    sublabel: "ISO Certified",
                                    icon: <Award className="h-6 w-6 text-brand-red" />,
                                    gradient: "from-brand-red/15 to-brand-gold/5",
                                    border: "border-brand-gold/30"
                                }
                            ].map((item, index) => (
                                <div key={item.label} className={`group relative overflow-hidden rounded-2xl border ${item.border} bg-gradient-to-br ${item.gradient} p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl`}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                    <div className="relative flex flex-col items-center text-center">
                                        <div className="mb-3 rounded-xl bg-black/30 p-2 shadow-md">
                                            {item.icon}
                                        </div>
                                        <span className="text-base font-bold text-white">{item.label}</span>
                                        <span className="mt-1 text-xs font-medium text-gray-300">{item.sublabel}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Vibrant Right Image Showcase */}
                    <div className="relative animate-fade-in-up animation-delay-1200">
                        {/* Subtle decorative elements */}
                        <div className="absolute -top-16 right-8 hidden h-40 w-40 rounded-full bg-gradient-to-br from-brand-gold/20 to-transparent blur-2xl lg:block" />
                        <div className="absolute -bottom-8 -left-8 hidden h-32 w-32 rounded-full bg-gradient-to-tr from-brand-red/15 to-transparent blur-2xl lg:block" />

                        <HeroProductSlider products={featuredProducts} />

                        <div className="mt-6 grid gap-4 sm:grid-cols-3">
                            {[
                                { metric: "25+", label: "Years Heritage", color: "text-brand-red", bg: "from-brand-red/20 to-brand-red/10", border: "border-brand-red/30" },
                                { metric: "48H", label: "Quick Sampling", color: "text-brand-gold", bg: "from-brand-gold/20 to-brand-gold/10", border: "border-brand-gold/30" },
                                { metric: "100%", label: "Export Grade", color: "text-brand-gold", bg: "from-brand-gold/20 to-brand-red/10", border: "border-brand-gold/30" }
                            ].map((stat) => (
                                <div key={stat.label} className={`group relative overflow-hidden rounded-2xl border ${stat.border} bg-gradient-to-br ${stat.bg} px-4 py-4 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl`}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <span className={`relative block text-2xl font-black ${stat.color} transition-transform duration-300 group-hover:scale-110`}>{stat.metric}</span>
                                    <span className="relative mt-1 block text-xs font-bold uppercase tracking-[0.1em] text-white">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
