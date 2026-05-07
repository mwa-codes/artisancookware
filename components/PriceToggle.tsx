"use client";

import { cn } from "@/lib/utils";

const PRICE_TYPES = ["Factory", "FOB"] as const;
type PriceType = (typeof PRICE_TYPES)[number];

type PriceToggleProps = {
    value: PriceType;
    onChange: (value: PriceType) => void;
    disabledOptions?: Partial<Record<PriceType, boolean>>;
    className?: string;
};

export function PriceToggle({ value, onChange, disabledOptions, className }: PriceToggleProps) {
    return (
        <div className={cn("inline-flex flex-col gap-2 text-sm", className)}>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Show price as</span>
            <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
                {PRICE_TYPES.map((type) => {
                    const isActive = value === type;
                    const disabled = Boolean(disabledOptions?.[type]);

                    return (
                        <button
                            key={type}
                            type="button"
                            disabled={disabled}
                            aria-pressed={isActive}
                            aria-label={`Show ${type} price`}
                            onClick={() => {
                                if (!disabled && type !== value) {
                                    onChange(type);
                                }
                            }}
                            className={cn(
                                "min-w-[88px] rounded-full px-4 py-2 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/70",
                                isActive
                                    ? "bg-brand-primary text-white shadow"
                                    : "text-slate-600 hover:bg-brand-light/70",
                                disabled && "cursor-not-allowed opacity-40 hover:bg-transparent"
                            )}
                        >
                            {type}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export type { PriceType };
