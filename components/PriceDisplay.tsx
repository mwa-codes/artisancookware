"use client";

import { useCurrency } from "@/context/CurrencyContext";

export type PriceDisplayProps = {
    priceUsd: number | null;
    pricePkr?: number | null;
    moq?: number;
    showMoq?: boolean;
    size?: "sm" | "md" | "lg";
    showLabel?: boolean;
};

export function PriceDisplay({
    priceUsd,
    pricePkr,
    moq,
    showMoq = true,
    size = "md",
    showLabel = true
}: PriceDisplayProps) {
    const { currency, formatPrice, formatCode } = useCurrency();

    const mono =
        size === "sm"
            ? "text-[13px]"
            : size === "lg"
              ? "text-lg md:text-xl"
              : "text-[15px]";

    let display: string;
    if (currency === "PKR" && pricePkr != null && Number.isFinite(pricePkr)) {
        display = formatCode(pricePkr);
    } else if (priceUsd != null && Number.isFinite(priceUsd)) {
        display = formatPrice(priceUsd);
    } else {
        display = "—";
    }

    return (
        <div className="space-y-1">
            {showLabel ? (
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
                    Factory price
                </span>
            ) : null}
            <div className={`font-mono-price font-normal text-ink ${mono}`}>{display}</div>
            {showMoq && moq != null && moq > 0 ? (
                <p className="text-[11px] text-ink-60">
                    · MOQ {moq} units
                </p>
            ) : null}
        </div>
    );
}
