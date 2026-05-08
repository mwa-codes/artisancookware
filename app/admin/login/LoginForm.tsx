"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type LoginFormState } from "./actions";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className="admin-btn-primary w-full justify-center" disabled={pending}>
            {pending ? "Signing in..." : "Sign in"}
        </button>
    );
}

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
    const initialState: LoginFormState = {};
    const [state, formAction] = useFormState(loginAction, initialState);

    return (
        <div className="min-h-screen bg-ink flex items-center justify-center px-4">
            <form action={formAction} className="w-full max-w-sm bg-white p-8 rounded-[2px] shadow-xl">
                <div className="flex justify-center mb-8">
                    <span className="grid h-10 w-10 shrink-0 place-items-center bg-ink text-[11px] font-bold uppercase tracking-tight text-gold-light rounded-[2px]">
                        AC
                    </span>
                </div>
                <div className="space-y-2 text-center mb-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-60">Admin Access</p>
                    <h1 className="font-heading text-2xl font-light text-ink">Sign in</h1>
                </div>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="admin-label">
                            Email
                        </label>
                        <input id="email" name="email" type="email" placeholder="admin@example.com" required className="admin-input" />
                    </div>
                    <div>
                        <label htmlFor="password" className="admin-label">
                            Password
                        </label>
                        <input id="password" name="password" type="password" placeholder="••••••••" required className="admin-input" />
                    </div>
                </div>
                {redirectTo ? <input type="hidden" name="redirectTo" value={redirectTo} /> : null}
                {state.error ? <p className="text-sm text-red-600 mt-2">{state.error}</p> : null}
                <div className="mt-8">
                    <SubmitButton />
                </div>
                <p className="text-center text-xs text-ink-60 mt-6">Access is limited to authorized Artisan Cookware administrators.</p>
            </form>
        </div>
    );
}
