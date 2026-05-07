import { Award, Globe, Shield, Zap, Building2, Heart } from "lucide-react";

export function CompanyHighlights() {
    const highlights = [
        {
            icon: <Award className="h-8 w-8" />,
            title: "Heritage Since 1998",
            description: "25+ years of crafting premium cookware in Gujranwala, Pakistan's metalwork capital",
            gradient: "from-brand-red/10 to-brand-red/5",
            iconBg: "bg-brand-red/10 text-brand-red"
        },
        {
            icon: <Globe className="h-8 w-8" />,
            title: "Global Excellence",
            description: "Trusted by international hotels, restaurants, and culinary professionals worldwide",
            gradient: "from-brand-gold/10 to-brand-gold/5",
            iconBg: "bg-brand-gold/10 text-brand-gold"
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: "ISO Certified Quality",
            description: "Rigorous quality standards ensuring every piece meets international specifications",
            gradient: "from-brand-red/10 to-brand-gold/5",
            iconBg: "bg-brand-red/10 text-brand-red"
        },
        {
            icon: <Zap className="h-8 w-8" />,
            title: "Lightning Fast Delivery",
            description: "48-hour sampling and efficient production cycles for time-sensitive orders",
            gradient: "from-brand-gold/10 to-brand-red/5",
            iconBg: "bg-brand-gold/10 text-brand-gold"
        },
        {
            icon: <Building2 className="h-8 w-8" />,
            title: "B2B & Retail Ready",
            description: "Flexible solutions for wholesalers, retailers, hotels, and restaurants globally",
            gradient: "from-brand-red/10 to-brand-red/5",
            iconBg: "bg-brand-red/10 text-brand-red"
        },
        {
            icon: <Heart className="h-8 w-8" />,
            title: "Crafted with Passion",
            description: "Every piece reflects our dedication to culinary excellence and traditional craftsmanship",
            gradient: "from-brand-gold/10 to-brand-gold/5",
            iconBg: "bg-brand-gold/10 text-brand-gold"
        }
    ];

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 py-24">
            {/* Background Elements */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute left-1/4 top-0 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-gradient-radial from-brand-red/5 to-transparent blur-3xl" />
                <div className="absolute right-1/4 bottom-0 h-[300px] w-[300px] translate-y-1/2 rounded-full bg-gradient-radial from-brand-gold/8 to-transparent blur-3xl" />
            </div>

            <div className="container-grid relative">
                {/* Section Header */}
                <div className="mx-auto mb-20 max-w-3xl text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-6 py-2 text-sm font-bold uppercase tracking-[0.1em] text-brand-red backdrop-blur">
                        <Award className="h-4 w-4" />
                        Why Choose ArtisanCookware
                    </div>
                    <h2 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                        Excellence in Every
                        <span className="block bg-gradient-to-r from-brand-red to-brand-gold bg-clip-text text-transparent">
                            Detail
                        </span>
                    </h2>
                    <p className="mt-6 text-xl leading-relaxed text-gray-600">
                        From our workshops in Gujranwala to kitchens around the world, we deliver uncompromising quality and craftsmanship.
                    </p>
                </div>

                {/* Highlights Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {highlights.map((highlight, index) => (
                        <div
                            key={highlight.title}
                            className={`group relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br ${highlight.gradient} p-8 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="relative">
                                {/* Icon */}
                                <div className={`mb-6 inline-flex rounded-2xl p-4 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${highlight.iconBg}`}>
                                    {highlight.icon}
                                </div>

                                {/* Content */}
                                <h3 className="mb-4 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-brand-red">
                                    {highlight.title}
                                </h3>
                                <p className="leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                                    {highlight.description}
                                </p>

                                {/* Decorative element */}
                                <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-tr from-brand-gold/10 to-transparent blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-20 text-center">
                    <div className="inline-flex flex-col items-center gap-6 rounded-3xl border border-white/60 bg-gradient-to-br from-white/80 to-white/60 p-12 shadow-xl backdrop-blur-sm">
                        <h3 className="text-3xl font-bold text-gray-900">
                            Ready to Experience the Difference?
                        </h3>
                        <p className="max-w-lg text-lg text-gray-600">
                            Join thousands of satisfied customers worldwide who trust ArtisanCookware for their culinary needs.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="/categories"
                                className="group rounded-2xl bg-gradient-to-r from-brand-red to-brand-red-hover px-8 py-4 font-bold text-white shadow-xl shadow-brand-red/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-brand-red/40"
                            >
                                <span className="flex items-center gap-2">
                                    Browse Collections
                                    <Award className="h-5 w-5 transition-transform group-hover:rotate-12" />
                                </span>
                            </a>
                            <a
                                href="/contact"
                                className="rounded-2xl border-2 border-gray-300 bg-white/90 px-8 py-4 font-bold text-gray-700 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-red hover:text-brand-red hover:shadow-xl"
                            >
                                Get In Touch
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}