"use client";

import Link from "next/link";
import { PriceDisplay } from "@/components/PriceDisplay";
import { useCurrency } from "@/context/CurrencyContext";

export function ProductDetailPrices({
    factoryUsd,
    fobUsd,
    factoryPkr,
    fobPkr,
    moq
}: {
    factoryUsd: number | null;
    fobUsd: number | null;
    factoryPkr: number | null;
    fobPkr: number | null;
    moq: number;
}) {
    const { currency } = useCurrency();

    return (
        <div className="space-y-6 rounded-[4px] border border-ink-20 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-2">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">Factory price</p>
                    <div className="mt-2">
                        <PriceDisplay priceUsd={factoryUsd} pricePkr={factoryPkr} moq={moq} showLabel={false} size="lg" showMoq={false} />
                    </div>
                </div>
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">FOB Karachi</p>
                    <div className="mt-2">
                        <PriceDisplay priceUsd={fobUsd} pricePkr={fobPkr} moq={moq} showLabel={false} size="lg" showMoq={false} />
                    </div>
                </div>
            </div>
            <p className="text-[12px] leading-relaxed text-ink-60">
                Prices shown in {currency}. FOB Karachi. MOQ {moq} units. Contact us for volume discounts.
            </p>
            <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                    Request Quote
                </Link>
                <a href="https://wa.me/923016636557" target="_blank" rel="noopener noreferrer" className="btn-outline">
                    WhatsApp Inquiry
                </a>
            </div>
        </div>
    );
}
