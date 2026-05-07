import Link from "next/link";

export function AboutSnippet() {
    return (
        <div className="relative overflow-hidden rounded-[3rem] border border-white/60 bg-gradient-to-br from-white/90 via-white/80 to-gray-50/80 p-12 shadow-2xl backdrop-blur-sm lg:p-16">
            {/* Background decoration */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-brand-gold/10 to-transparent blur-2xl" />
            <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-gradient-to-tr from-brand-red/10 to-transparent blur-2xl" />

            <div className="relative">
                <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-brand-red/20 bg-brand-red/5 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-brand-red backdrop-blur">
                    <div className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
                    Our Heritage
                </div>

                <h3 className="mb-8 text-4xl font-black leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                    Crafted in
                    <span className="block bg-gradient-to-r from-brand-red to-brand-gold bg-clip-text text-transparent">
                        Gujranwala
                    </span>
                </h3>

                <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-center">
                    <div className="space-y-6">
                        <p className="text-xl leading-relaxed text-gray-600">
                            ArtisanCookware represents over <strong className="text-brand-red">25 years of excellence</strong> in premium kitchenware manufacturing. From our heritage workshops in Gujranwala to international markets, we deliver durable, elegant, and performance-driven cookware.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-600">
                            Our mission unites tradition with innovation — ensuring every piece meets the highest standards of quality, functionality, and long-lasting performance that discerning chefs demand.
                        </p>

                        {/* Key highlights */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
                                <div className="h-2 w-2 rounded-full bg-brand-red"></div>
                                <span className="text-sm font-semibold text-gray-700">ISO Certified</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
                                <div className="h-2 w-2 rounded-full bg-brand-gold"></div>
                                <span className="text-sm font-semibold text-gray-700">Export Quality</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
                                <div className="h-2 w-2 rounded-full bg-brand-red"></div>
                                <span className="text-sm font-semibold text-gray-700">Global Trust</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center lg:text-right">
                        <Link
                            href="/about"
                            className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-brand-red to-brand-red-hover px-8 py-4 text-lg font-bold text-white shadow-xl shadow-brand-red/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-brand-red/40"
                        >
                            <span>Discover Our Story</span>
                            <div className="rounded-full bg-white/20 p-2">
                                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </Link>

                        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                            <div className="rounded-2xl border border-white/50 bg-gradient-to-br from-brand-red/5 to-brand-red/10 p-4 backdrop-blur">
                                <div className="text-2xl font-bold text-brand-red">25+</div>
                                <div className="text-xs font-semibold uppercase tracking-wider text-gray-600">Years Heritage</div>
                            </div>
                            <div className="rounded-2xl border border-white/50 bg-gradient-to-br from-brand-gold/5 to-brand-gold/10 p-4 backdrop-blur">
                                <div className="text-2xl font-bold text-brand-gold">Global</div>
                                <div className="text-xs font-semibold uppercase tracking-wider text-gray-600">Reach</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
