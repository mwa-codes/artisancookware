"use client";

import { useCallback, useEffect, useState } from "react";
import type { CurrencyRates } from "@/lib/currency/types";
import { BASE_CURRENCY, type CurrencyCode, CURRENCY_CODES } from "@/lib/currency/constants";

const STORAGE_KEY = "currency_rates_cache_v1";
const TTL_MS = 60 * 60 * 1000;

type CachedPayload = {
    rates: Partial<CurrencyRates>;
    fetchedAt: number;
};

function normalizeRates(raw: Record<string, number> | null | undefined): Partial<CurrencyRates> {
    const out: Partial<CurrencyRates> = {};
    if (!raw) return out;
    for (const code of CURRENCY_CODES) {
        const v = raw[code];
        if (typeof v === "number" && Number.isFinite(v) && v > 0) {
            out[code] = v;
        }
    }
    out[BASE_CURRENCY] = 1;
    return out;
}

function readLocalCache(): CachedPayload | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as CachedPayload;
        if (!parsed.fetchedAt || !parsed.rates) return null;
        if (Date.now() - parsed.fetchedAt > TTL_MS) return null;
        return parsed;
    } catch {
        return null;
    }
}

function writeLocalCache(rates: Partial<CurrencyRates>, fetchedAt: number) {
    if (typeof window === "undefined") return;
    try {
        const payload: CachedPayload = { rates, fetchedAt };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
        /* ignore */
    }
}

export function useExchangeRates() {
    const [rates, setRates] = useState<Partial<CurrencyRates>>({ USD: 1 });
    const [fetchedAt, setFetchedAt] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const load = useCallback(async () => {
        const cached = readLocalCache();
        if (cached?.rates && Object.keys(cached.rates).length > 1) {
            setRates(normalizeRates(cached.rates as Record<string, number>));
            setFetchedAt(cached.fetchedAt);
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/currency", { cache: "no-store" });
            const json = (await res.json()) as {
                base?: string;
                rates?: Record<string, number>;
                fetchedAt?: string;
            };

            const next = normalizeRates(json.rates ?? null);
            const ts = json.fetchedAt ? Date.parse(json.fetchedAt) : Date.now();
            setRates(next);
            setFetchedAt(Number.isFinite(ts) ? ts : Date.now());
            writeLocalCache(next, Number.isFinite(ts) ? ts : Date.now());
        } catch {
            setRates({ USD: 1 });
            setFetchedAt(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void load();
    }, [load]);

    const convertFromUsd = useCallback(
        (amountUsd: number, currency: CurrencyCode) => {
            if (!Number.isFinite(amountUsd)) return 0;
            if (currency === BASE_CURRENCY) return amountUsd;
            const rate = rates[currency];
            if (!rate || !Number.isFinite(rate)) return amountUsd;
            return amountUsd * rate;
        },
        [rates]
    );

    const formatMoney = useCallback(
        (amountUsd: number, currency: CurrencyCode) => {
            const converted = convertFromUsd(amountUsd, currency);
            try {
                return new Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(converted);
            } catch {
                return converted.toFixed(2);
            }
        },
        [convertFromUsd]
    );

    return { rates, fetchedAt, isLoading, reload: load, convertFromUsd, formatMoney };
}
