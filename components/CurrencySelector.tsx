"use client";

import { useEffect, useRef, useState } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { SUPPORTED_CURRENCIES, type CurrencyCode } from "@/lib/currency/constants";
import { cn } from "@/lib/utils";

export function CurrencySelector() {
    const { currency, setCurrency } = useCurrency();
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    const current = SUPPORTED_CURRENCIES.find((c) => c.code === currency) ?? SUPPORTED_CURRENCIES[0];

    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    return (
        <div className="relative" ref={rootRef}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-[2px] border border-ink-20 bg-white px-2.5 py-1.5 text-[12px] font-medium text-ink-60 transition hover:border-ink hover:text-ink"
                aria-expanded={open}
                aria-haspopup="listbox"
            >
                <span aria-hidden>{current.flag}</span>
                <span>{current.code}</span>
            </button>

            {open ? (
                <ul
                    role="listbox"
                    className="absolute right-0 z-50 mt-1 min-w-[220px] rounded-[2px] border border-ink-20 bg-white py-1 shadow-card"
                >
                    {SUPPORTED_CURRENCIES.map((item) => {
                        const selected = item.code === currency;
                        return (
                            <li key={item.code}>
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={selected}
                                    className={cn(
                                        "flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] font-medium transition",
                                        selected
                                            ? "bg-parchment text-ink"
                                            : "text-ink-60 hover:bg-parchment hover:text-ink"
                                    )}
                                    onClick={() => {
                                        setCurrency(item.code as CurrencyCode);
                                        setOpen(false);
                                    }}
                                >
                                    <span aria-hidden>{item.flag}</span>
                                    <span className="text-ink">{item.code}</span>
                                    <span className="truncate text-[11px] font-normal text-ink-60">{item.name}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            ) : null}
        </div>
    );
}
