/**
 * Logs Supabase read failures only in development so `next build` and production
 * logs stay clean when the API is unreachable (offline build, DNS, firewall).
 */
export function logSupabaseReadFailure(scope: string, detail?: unknown): void {
    if (process.env.NODE_ENV !== "development") return;
    if (detail !== undefined) {
        console.warn(`[Supabase:${scope}]`, detail);
    }
}
