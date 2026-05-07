type SectionHeadingProps = {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
    const alignment = align === "center" ? "text-center mx-auto" : "text-left";
    const descriptionWidth = align === "center" ? "max-w-3xl" : "max-w-4xl";

    return (
        <div className={`space-y-8 ${alignment}`}>
            {eyebrow ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-brand-red backdrop-blur">
                    <div className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
                    {eyebrow}
                </div>
            ) : null}
            <h2 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                {title}
            </h2>
            {description ? (
                <p className={`text-xl leading-relaxed text-gray-600 ${descriptionWidth}`}>
                    {description}
                </p>
            ) : null}
        </div>
    );
}
