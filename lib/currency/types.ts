import type { CurrencyCode } from "@/lib/currency/constants";

export type CurrencyRates = Record<CurrencyCode, number>;

export type CurrencyContextValue = {
    currency: CurrencyCode;
    setCurrency: (code: CurrencyCode) => void;
    convertPrice: (amountUsd: number) => number;
    formatPrice: (amountUsd: number) => string;
    formatCode: (amount: number) => string;
    isLoading: boolean;
    rates: Partial<CurrencyRates>;
};
