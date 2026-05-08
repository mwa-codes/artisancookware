import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

/**
 * Public marketing site only — admin routes under /admin are NOT wrapped
 * (see root app/layout.tsx), so the dashboard is not double-stacked with this chrome.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
            <WhatsAppFloat />
        </>
    );
}
