import Link from "next/link";
import Image from "next/image";

export function Footer() {
    const googleProfileUrl = process.env.NEXT_PUBLIC_GOOGLE_PROFILE_URL ?? "https://share.google/jRINLyBqArGppOdzX";
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923016636557";
    const whatsappLink = `https://wa.me/${whatsappNumber}`;
    const emailAddress = "m.waqar.ahmed@gmail.com";

    return (
        <footer className="mt-20 border-t border-gray-800 bg-brand-black text-white">
            <div className="container-grid grid grid-cols-1 gap-10 py-16 text-sm md:grid-cols-3 lg:gap-16">
                {/* Brand Section */}
                <div className="space-y-5">
                    <div className="flex items-center">
                        <div className="relative">
                            <Image
                                src="/Artisan-logo.jpg"
                                alt="ArtisanCookware - Your Kitchen Needs"
                                width={200}
                                height={48}
                                className="h-12 w-auto object-contain"
                            />
                        </div>
                    </div>
                    <p className="max-w-xs leading-relaxed text-gray-300">
                        Premium Pakistani cookware crafted in Gujranwala — trusted by international hotels, restaurants, and discerning home chefs since 1998.
                    </p>
                    <div className="flex gap-2">
                        <span className="badge-red">ISO Certified</span>
                        <span className="badge-gold">Export Quality</span>
                    </div>
                </div>

                {/* Location Section */}
                <div className="space-y-4">
                    <h5 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">Visit Us</h5>
                    <div className="space-y-3 text-gray-300">
                        <p className="leading-relaxed">
                            Gujranwala, Punjab<br />
                            Pakistan
                        </p>
                        <Link
                            href={googleProfileUrl}
                            className="inline-flex items-center gap-2 text-white transition hover:text-brand-gold"
                            target="_blank"
                        >
                            View on Google Maps ↗
                        </Link>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="space-y-4">
                    <h5 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">Contact</h5>
                    <div className="space-y-3 text-gray-300">
                        <p>
                            <span className="font-semibold text-white">WhatsApp:</span>{" "}
                            <Link href={whatsappLink} target="_blank" className="text-brand-red transition hover:text-brand-gold">
                                Chat Now
                            </Link>
                        </p>
                        <p>
                            <span className="font-semibold text-white">Email:</span>{" "}
                            <Link href={`mailto:${emailAddress}`} className="text-brand-red transition hover:text-brand-gold">
                                {emailAddress}
                            </Link>
                        </p>
                        <p>
                            <span className="font-semibold text-white">Phone:</span> +92 301 6636557
                        </p>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-gray-800 py-6">
                <div className="container-grid">
                    <p className="text-center text-xs text-gray-500">
                        © {new Date().getFullYear()} ArtisanCookware. All rights reserved. | Designed for excellence.
                    </p>
                </div>
            </div>
        </footer>
    );
}
