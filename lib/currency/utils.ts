import type { CurrencyCode } from "@/lib/currency/constants";

export function formatMoneyIntl(amount: number, currency: CurrencyCode): string {
    try {
        return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    } catch {
        return `${amount.toFixed(2)} ${currency}`;
    }
}
