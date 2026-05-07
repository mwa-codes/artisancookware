"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_CURRENCY, isCurrencyCode, type CurrencyCode } from "@/lib/currency/constants";
import type { CurrencyContextValue } from "@/lib/currency/types";
import { useExchangeRates } from "@/hooks/useExchangeRates";

const STORAGE_CURRENCY = "preferred_currency";

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function guessCurrencyFromTimeZone(): CurrencyCode | null {
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
        if (/dubai|abu Dhabi|uae|Asia\/Dubai/i.test(tz)) return "AED";
        if (/riyadh|saudi|Asia\/Riyadh/i.test(tz)) return "SAR";
        if (/karachi|lahore|pakistan|Asia\/Karachi/i.test(tz)) return "PKR";
        if (/london|Europe\/London|UK/i.test(tz)) return "GBP";
        if (/Europe\/(Paris|Berlin|Amsterdam|Rome)/i.test(tz)) return "EUR";
        if (/Australia/i.test(tz)) return "AUD";
        if (/America\/(Toronto|Vancouver|Montreal)/i.test(tz)) return "CAD";
    } catch {
        /* ignore */
    }
    return null;
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const { rates, isLoading, convertFromUsd, formatMoney } = useExchangeRates();
    const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const saved = localStorage.getItem(STORAGE_CURRENCY);
            if (saved && isCurrencyCode(saved)) {
                setCurrencyState(saved);
                return;
            }
            const guessed = guessCurrencyFromTimeZone();
            if (guessed) {
                setCurrencyState(guessed);
            }
        } catch {
            /* ignore */
        }
    }, []);

    const setCurrency = useCallback((code: CurrencyCode) => {
        setCurrencyState(code);
        try {
            localStorage.setItem(STORAGE_CURRENCY, code);
        } catch {
            /* ignore */
        }
    }, []);

    const convertPrice = useCallback(
        (amountUsd: number) => convertFromUsd(amountUsd, currency),
        [convertFromUsd, currency]
    );

    const formatPriceUsd = useCallback(
        (amountUsd: number) => formatMoney(amountUsd, currency),
        [formatMoney, currency]
    );

    const formatCode = useCallback(
        (amount: number) => {
            try {
                return new Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(amount);
            } catch {
                return amount.toFixed(2);
            }
        },
        [currency]
    );

    const value = useMemo<CurrencyContextValue>(
        () => ({
            currency,
            setCurrency,
            convertPrice,
            formatPrice: formatPriceUsd,
            formatCode,
            isLoading,
            rates
        }),
        [currency, setCurrency, convertPrice, formatPriceUsd, formatCode, isLoading, rates]
    );

    return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyContextValue {
    const ctx = useContext(CurrencyContext);
    if (!ctx) {
        throw new Error("useCurrency must be used within CurrencyProvider");
    }
    return ctx;
}
