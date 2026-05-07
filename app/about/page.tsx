import { SectionHeading } from "@/components/SectionHeading";

export const metadata = {
    title: "About Artisan Cookware",
    description:
        "Artisan Cookware is a trusted Pakistani cookware manufacturer blending tradition with modern needs for over 25 years."
};

const aboutParagraph =
    "Artisan Cookware is a trusted local brand with over 25 years of excellence in kitchenware manufacturing. We deliver durable, stylish, and affordable cookware across Pakistan. Our mission is to blend tradition with modern needs — ensuring quality, functionality, and long-lasting performance.";

export default function AboutPage() {
    const googleProfileUrl = process.env.NEXT_PUBLIC_GOOGLE_PROFILE_URL ?? "https://share.google/jRINLyBqArGppOdzX";

    return (
        <div className="container-grid space-y-16 py-16">
            <SectionHeading
                eyebrow="About"
                title="Premium cookware engineered in Pakistan"
                description="Born in Gujranwala, our workshops have supported households, retailers, and hospitality partners for over two decades."
                align="center"
            />

            <div className="grid gap-12 lg:grid-cols-2">
                <div className="space-y-6">
                    <p className="text-base text-slate-700">{aboutParagraph}</p>
                    <p className="text-base text-slate-700">
                        From raw aluminium casting to finishing, every step happens under our roof. We oversee quality at every turn to deliver
                        cookware that performs in busy Pakistani kitchens, withstands commercial use, and looks beautiful on display.
                    </p>
                    <a
                        href={googleProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
                    >
                        View our Google Profile ↗
                    </a>
                </div>
                <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-8">
                    <h3 className="font-heading text-xl font-semibold text-slate-900">How we build trust</h3>
                    <ul className="space-y-4 text-sm text-slate-700">
                        <li><span className="font-semibold text-slate-900">National distribution:</span> Fast deliveries to retailers across Pakistan.</li>
                        <li>
                            <span className="font-semibold text-slate-900">Custom OEM services:</span> Tailored non-stick colors, handles, and packaging for your brand.
                        </li>
                        <li><span className="font-semibold text-slate-900">Quality assurance:</span> Each batch is inspected for finish, coating thickness, and balance.</li>
                        <li><span className="font-semibold text-slate-900">Sustainable focus:</span> Responsible sourcing and efficient manufacturing to reduce waste.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
