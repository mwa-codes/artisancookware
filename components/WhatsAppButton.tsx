type WhatsAppButtonProps = {
    productName: string;
    selectedVariant?: string;
    className?: string;
};

export function WhatsAppButton({ productName, selectedVariant, className }: WhatsAppButtonProps) {
    const base = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923001234567";
    const message = selectedVariant
        ? `Hello Artisan Cookware, I'm interested in the ${productName} (${selectedVariant}).`
        : `Hello Artisan Cookware, I'm interested in the ${productName}.`;
    const href = `https://wa.me/${base}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 ${className ?? ""}`.trim()}
        >
            Inquire on WhatsApp
        </a>
    );
}
