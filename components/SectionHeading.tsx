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
                <div className="inline-flex items-center gap-2 rounded-[2px] border border-gold/30 bg-gold-pale px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-gold backdrop-blur">
                    <div className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                    {eyebrow}
                </div>
            ) : null}
            <h2 className="font-heading text-4xl font-light leading-tight text-ink sm:text-5xl lg:text-6xl">{title}</h2>
            {description ? (
                <p className={`text-xl leading-relaxed text-ink-60 ${descriptionWidth}`}>{description}</p>
            ) : null}
        </div>
    );
}
