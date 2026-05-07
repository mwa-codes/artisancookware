import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabaseClient: SupabaseClient | null = null;
let supabaseServiceClient: SupabaseClient | null = null;

type ClientMode = "anon" | "service";

function createSupabaseClient(mode: ClientMode): SupabaseClient {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const key =
        mode === "service"
            ? process.env.SUPABASE_SERVICE_ROLE_KEY
            : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (!url || !key) {
        throw new Error(`Supabase ${mode} credentials are not fully configured.`);
    }

    return createClient(url, key, {
        auth: {
            persistSession: false
        }
    });
}

export function isSupabaseConfigured() {
    return Boolean(
        (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL) &&
        (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY)
    );
}

export function getSupabaseClient(): SupabaseClient {
    if (!supabaseClient) {
        supabaseClient = createSupabaseClient("anon");
    }
    return supabaseClient;
}

export function getSupabaseServiceClient(): SupabaseClient {
    if (!supabaseServiceClient) {
        supabaseServiceClient = createSupabaseClient("service");
    }
    return supabaseServiceClient;
}
