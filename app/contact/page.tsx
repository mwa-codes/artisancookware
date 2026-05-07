import { SectionHeading } from "@/components/SectionHeading";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata = {
    title: "Contact Artisan Cookware",
    description: "Connect with Artisan Cookware for wholesale, export, and OEM cookware inquiries."
};

export default function ContactPage() {
    const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923001234567"}`;

    return (
        <div className="container-grid space-y-14 py-16">
            <SectionHeading
                eyebrow="Contact"
                title="Let's craft cookware that elevates your brand"
                description="Share your requirements, order volumes, or export plans. Our team will respond within one business day."
                align="center"
            />

            <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr]">
                <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <h2 className="font-heading text-2xl font-semibold text-slate-900">Send an inquiry</h2>
                    <InquiryForm />
                </div>
                <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-8">
                    <h3 className="font-heading text-xl font-semibold text-slate-900">Reach us directly</h3>
                    <ul className="space-y-4 text-sm text-slate-700">
                        <li>
                            <span className="font-semibold text-slate-900">Location:</span> Gujranwala, Punjab, Pakistan
                        </li>
                        <li>
                            <span className="font-semibold text-slate-900">WhatsApp:</span>{" "}
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-brand-primary">
                                {whatsappLink}
                            </a>
                        </li>
                        <li>
                            <span className="font-semibold text-slate-900">Email:</span>{" "}
                            <a href="mailto:info@artisancookware.com" className="text-brand-primary">
                                info@artisancookware.com
                            </a>
                        </li>
                        <li>
                            <span className="font-semibold text-slate-900">Phone:</span> +92 (300) 123 4567
                        </li>
                    </ul>
                    <div className="rounded-2xl border border-dashed border-brand-primary/40 bg-brand-light/40 p-6 text-sm text-slate-600">
                        <p className="font-semibold text-slate-900">Factory tours & OEM consultations</p>
                        <p className="mt-2">
                            Book an appointment to review our production line, coatings lab, and packaging facilities. We welcome retailer and
                            export partners.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
