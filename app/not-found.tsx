import Link from "next/link";

export default function NotFound() {
    return (
        <div className="container-grid py-24 text-center">
            <div className="mx-auto max-w-lg space-y-6 rounded-3xl border border-slate-200 bg-white p-12 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-primary">Unavailable</p>
                <h1 className="font-heading text-3xl font-semibold text-slate-900">We couldn’t find that page.</h1>
                <p className="text-sm text-slate-600">
                    The cookware range you’re looking for may be in development. Explore our featured collections or contact us for a
                    tailored quote.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link href="/" className="rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark">
                        Back to Home
                    </Link>
                    <Link
                        href="/categories"
                        className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-brand-primary hover:text-brand-primary"
                    >
                        Browse Categories
                    </Link>
                </div>
            </div>
        </div>
    );
}
