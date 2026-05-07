export const SUPPORTED_CURRENCIES = [
    { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸" },
    { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧" },
    { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
    { code: "AED", symbol: "د.إ", name: "UAE Dirham", flag: "🇦🇪" },
    { code: "SAR", symbol: "﷼", name: "Saudi Riyal", flag: "🇸🇦" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar", flag: "🇦🇺" },
    { code: "CAD", symbol: "CA$", name: "Canadian Dollar", flag: "🇨🇦" },
    { code: "PKR", symbol: "₨", name: "Pakistani Rupee", flag: "🇵🇰" }
] as const;

export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number]["code"];

export const DEFAULT_CURRENCY: CurrencyCode = "USD";
export const BASE_CURRENCY: CurrencyCode = "USD";

export const CURRENCY_CODES: CurrencyCode[] = SUPPORTED_CURRENCIES.map((c) => c.code);

export function isCurrencyCode(value: string): value is CurrencyCode {
    return CURRENCY_CODES.includes(value as CurrencyCode);
}
