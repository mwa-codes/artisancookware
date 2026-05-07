"use client";

import { useEffect, useMemo, useState } from "react";
import { PriceToggle, type PriceType } from "@/components/PriceToggle";
import { formatCurrency } from "@/lib/utils";

const PRICE_TYPES: PriceType[] = ["Factory", "FOB"];

type ProductPricingProps = {
    factoryPrice: number | null | undefined;
    fobPrice: number | null | undefined;
    defaultType: PriceType | null;
};

const fallbackMessages: Record<PriceType, string> = {
    Factory: "Contact us for factory pricing",
    FOB: "FOB pricing available on request"
};

export function ProductPricing({ factoryPrice, fobPrice, defaultType }: ProductPricingProps) {
    const priceMap = useMemo(
        () => ({
            Factory: typeof factoryPrice === "number" ? factoryPrice : null,
            FOB: typeof fobPrice === "number" ? fobPrice : null
        }),
        [factoryPrice, fobPrice]
    );

    const initialType: PriceType = useMemo(() => {
        if (defaultType && PRICE_TYPES.includes(defaultType)) {
            return defaultType;
        }
        if (priceMap.Factory != null) return "Factory";
        if (priceMap.FOB != null) return "FOB";
        return "Factory";
    }, [defaultType, priceMap]);

    const [selectedType, setSelectedType] = useState<PriceType>(initialType);

    useEffect(() => {
        setSelectedType(initialType);
    }, [initialType]);

    const selectedPrice = priceMap[selectedType];
    const formattedPrice = typeof selectedPrice === "number" ? formatCurrency(selectedPrice) : null;

    const disabledOptions = useMemo(
        () => ({
            Factory: priceMap.Factory == null,
            FOB: priceMap.FOB == null
        }),
        [priceMap]
    );

    const showFallback = formattedPrice == null;

    return (
        <div className="space-y-4 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Current pricing</p>
                    <p className="text-2xl font-heading font-semibold text-slate-900">
                        {formattedPrice ?? "—"}
                    </p>
                </div>
                <PriceToggle value={selectedType} onChange={setSelectedType} disabledOptions={disabledOptions} />
            </div>
            <p className="text-xs text-slate-500">
                {showFallback ? fallbackMessages[selectedType] : `${selectedType} price per set (PKR).`}
            </p>
        </div>
    );
}
