"use client";

import Image from "next/image";
import { useFormState } from "react-dom";
import { loginAction } from "./actions";

const initialState = { error: "" };

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
    const [state, formAction] = useFormState(loginAction, initialState);

    return (
        <div className="flex min-h-screen items-center justify-center bg-ink px-4">
            <div className="w-full max-w-sm">
                <div className="mb-10 flex justify-center">
                    <Image
                        src="/Artisan-logo.jpg"
                        alt="Artisan Cookware"
                        width={160}
                        height={46}
                        className="h-[46px] w-auto object-contain brightness-0 invert"
                        priority
                    />
                </div>

                <div className="bg-white p-8">
                    <div className="mb-6">
                        <div className="eyebrow mb-2">
                            <div className="eyebrow-line" />
                            <span className="eyebrow-text">Secure Access</span>
                        </div>
                        <h1 className="font-heading text-2xl font-light text-ink">Admin Login</h1>
                        <p className="mt-1 text-sm text-ink-60">Sign in to manage your catalogue.</p>
                    </div>

                    <form action={formAction} className="space-y-4">
                        {redirectTo ? <input type="hidden" name="redirectTo" value={redirectTo} /> : null}
                        <div>
                            <label htmlFor="email" className="admin-label">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="admin-input"
                                placeholder="admin@artisancookware.co"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="admin-label">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="admin-input"
                            />
                        </div>

                        {state?.error ? <p className="text-sm text-red-600">{state.error}</p> : null}

                        <button type="submit" className="admin-btn-primary mt-2 w-full justify-center">
                            Sign In
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-[rgba(255,255,255,0.3)]">
                    © {new Date().getFullYear()} Artisan Cookware
                </p>
            </div>
        </div>
    );
}
