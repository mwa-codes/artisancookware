import { NextResponse } from "next/server";
import { getSupabaseClient, getSupabaseServiceClient, isSupabaseConfigured } from "@/lib/supabase";
import { BASE_CURRENCY, CURRENCY_CODES, type CurrencyCode } from "@/lib/currency/constants";

export const dynamic = "force-dynamic";

const CACHE_MS = 60 * 60 * 1000;

const FALLBACK_RATES: Record<CurrencyCode, number> = {
    USD: 1,
    GBP: 0.79,
    EUR: 0.92,
    AED: 3.67,
    SAR: 3.75,
    AUD: 1.53,
    CAD: 1.36,
    PKR: 278
};

function normalizeRates(raw: Record<string, unknown> | null): Record<CurrencyCode, number> {
    const out = { ...FALLBACK_RATES };
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

async function readCachedRow(): Promise<{ rates: Record<CurrencyCode, number>; fetchedAt: string } | null> {
    if (!isSupabaseConfigured()) return null;
    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("currency_rates")
            .select("rates, fetched_at")
            .eq("base_currency", BASE_CURRENCY)
            .maybeSingle();

        if (error || !data?.rates) return null;
        const rates = normalizeRates(data.rates as Record<string, unknown>);
        const fetchedAt =
            typeof data.fetched_at === "string"
                ? data.fetched_at
                : new Date(data.fetched_at as string).toISOString();
        return { rates, fetchedAt };
    } catch {
        return null;
    }
}

async function upsertCache(rates: Record<CurrencyCode, number>) {
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!isSupabaseConfigured() || !key) return;

    try {
        const client = getSupabaseServiceClient();
        const payload = {
            base_currency: BASE_CURRENCY,
            rates,
            fetched_at: new Date().toISOString()
        };

        await client.from("currency_rates").upsert(payload, { onConflict: "base_currency" });
    } catch (e) {
        console.error("currency_rates upsert", e);
    }
}

async function fetchRemoteRates(): Promise<Record<CurrencyCode, number> | null> {
    const apiKey = process.env.EXCHANGE_RATE_API_KEY ?? process.env.NEXT_PUBLIC_EXCHANGE_API_KEY;
    const baseUrl =
        process.env.EXCHANGE_RATE_API_URL ?? "https://v6.exchangerate-api.com/v6";

    if (!apiKey) return null;

    try {
        const url = `${baseUrl.replace(/\/$/, "")}/${apiKey}/latest/${BASE_CURRENCY}`;
        const res = await fetch(url, { next: { revalidate: 0 } });
        if (!res.ok) return null;
        const json = (await res.json()) as { conversion_rates?: Record<string, number> };
        const conv = json.conversion_rates;
        if (!conv) return null;

        const merged: Partial<Record<CurrencyCode, number>> = {};
        for (const code of CURRENCY_CODES) {
            const v = conv[code];
            if (typeof v === "number" && Number.isFinite(v)) {
                merged[code] = v;
            }
        }
        return normalizeRates(merged as Record<string, unknown>);
    } catch (e) {
        console.error("fetchRemoteRates", e);
        return null;
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const force = searchParams.get("force") === "true";

    const cached = await readCachedRow();
    const now = Date.now();

    if (
        cached &&
        !force &&
        cached.fetchedAt &&
        now - Date.parse(cached.fetchedAt) < CACHE_MS
    ) {
        return NextResponse.json({
            base: BASE_CURRENCY,
            rates: cached.rates,
            fetchedAt: cached.fetchedAt
        });
    }

    const remote = await fetchRemoteRates();
    if (remote) {
        await upsertCache(remote);
        const fetchedAt = new Date().toISOString();
        return NextResponse.json({
            base: BASE_CURRENCY,
            rates: remote,
            fetchedAt
        });
    }

    if (cached) {
        return NextResponse.json({
            base: BASE_CURRENCY,
            rates: cached.rates,
            fetchedAt: cached.fetchedAt,
            stale: true
        });
    }

    const fallback = normalizeRates(null);
    const fetchedAt = new Date().toISOString();
    return NextResponse.json({
        base: BASE_CURRENCY,
        rates: fallback,
        fetchedAt,
        stale: true,
        note: "Using built-in fallback rates — configure EXCHANGE_RATE_API_KEY for live data."
    });
}
