"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

type ToastProps = {
    message: string;
    type?: "success" | "error";
    onDismiss: () => void;
};

export function Toast({ message, type = "success", onDismiss }: ToastProps) {
    useEffect(() => {
        const timeout = setTimeout(onDismiss, 4000);
        return () => clearTimeout(timeout);
    }, [onDismiss]);

    return (
        <div
            className={`fixed bottom-6 right-6 z-[200] flex max-w-sm items-start gap-3 rounded-[2px] border px-4 py-3 shadow-card-hover ${
                type === "success" ? "border-green-200 bg-white text-green-800" : "border-red-200 bg-white text-red-700"
            }`}
        >
            {type === "success" ? (
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
            ) : (
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
            )}
            <span className="text-sm font-medium leading-snug">{message}</span>
            <button onClick={onDismiss} className="ml-2 shrink-0 text-ink-60 hover:text-ink" type="button">
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}

export function useToast() {
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    function showToast(message: string, type: "success" | "error" = "success") {
        setToast({ message, type });
    }

    function dismissToast() {
        setToast(null);
    }

    return { toast, showToast, dismissToast };
}
