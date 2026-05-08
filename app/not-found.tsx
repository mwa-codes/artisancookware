import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-parchment flex items-center justify-center px-4">
            <div className="text-center">
                <div className="font-heading text-[120px] font-light leading-none text-ink-20">404</div>
                <h1 className="font-heading text-3xl font-light text-ink mt-4">Page not found</h1>
                <p className="mt-3 text-sm text-ink-60 max-w-xs mx-auto">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link href="/" className="admin-btn-primary mt-8 inline-flex">
                    Back to Homepage
                </Link>
            </div>
        </main>
    );
}
