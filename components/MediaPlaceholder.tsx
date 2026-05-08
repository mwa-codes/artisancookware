import { ImageIcon } from "lucide-react";

/** Neutral surface — avoids repeating the brand logo when a photo is missing or fails to load. */
export function CardImagePlaceholder({ title }: { title: string }) {
    const initial = title.trim().charAt(0).toUpperCase() || '?';
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[linear-gradient(155deg,#ebe7df_0%,#f7f4ef_42%,#dfd9cf_100%)]">
            <span className="font-heading text-[clamp(2rem,12vw,4rem)] font-light leading-none text-ink/[0.09]">{initial}</span>
            <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">Photo pending</span>
        </div>
    );
}

/** Dark tile for category grids (text overlay stays readable). */
export function CategoryImagePlaceholder({ name }: { name: string }) {
    const initial = name.trim().charAt(0).toUpperCase() || '?';
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#2c2c2c] via-[#161616] to-[#0d0d0d]">
            <span className="font-heading text-[clamp(3rem,18vw,6rem)] font-light text-white/[0.14]">{initial}</span>
        </div>
    );
}

/** Hero right column when no product photo — no logo tile. */
export function HeroImagePlaceholder() {
    return (
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-br from-[#1a1a1a] via-[#2d2820] to-[#c4a35a]/25 p-10">
            <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(135deg,currentColor_0,currentColor_1px,transparent_1px,transparent_12px)] text-white" />
            <p className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-gold/90">Catalogue preview</p>
            <p className="relative mt-2 max-w-sm text-sm font-light leading-relaxed text-white/55">
                Add a featured product image in Admin → Products to showcase your line here.
            </p>
        </div>
    );
}

export function IconImagePlaceholder() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-parchment">
            <ImageIcon className="h-14 w-14 text-ink/15" strokeWidth={1} aria-hidden />
        </div>
    );
}
