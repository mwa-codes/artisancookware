"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type LoginFormState } from "./actions";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/30 transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            disabled={pending}
        >
            {pending ? "Signing in..." : "Sign in"}
        </button>
    );
}

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
    const initialState: LoginFormState = {};
    const [state, formAction] = useFormState(loginAction, initialState);

    return (
        <form action={formAction} className="space-y-6 rounded-[2.5rem] border border-brand-primary/10 bg-white/80 p-10 shadow-xl shadow-brand-primary/10 backdrop-blur">
            <div className="space-y-2 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-dark">Admin Access</p>
                <h1 className="font-heading text-3xl font-semibold text-slate-900">Sign in to Artisan Cookware</h1>
            </div>
            <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    required
                    className="w-full rounded-2xl border border-brand-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                />
            </div>
            <div className="space-y-1">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="w-full rounded-2xl border border-brand-primary/20 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                />
            </div>
            {redirectTo ? <input type="hidden" name="redirectTo" value={redirectTo} /> : null}
            {state.error ? <p className="text-sm text-rose-500">{state.error}</p> : null}
            <SubmitButton />
            <p className="text-center text-xs text-slate-500">
                Access is limited to authorized Artisan Cookware administrators.
            </p>
        </form>
    );
}
