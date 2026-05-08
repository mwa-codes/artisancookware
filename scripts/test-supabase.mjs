// Quick Supabase connectivity test.
// Usage: node --env-file=.env.local scripts/test-supabase.mjs
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const tablesToProbe = ["categories", "products", "product_variants", "inquiries"];

function mask(value) {
    if (!value) return "(missing)";
    return `${value.slice(0, 6)}…${value.slice(-4)} (len ${value.length})`;
}

console.log("── Supabase connectivity test ──");
console.log("URL:                          ", url || "(missing)");
console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", mask(anonKey));
console.log("SUPABASE_SERVICE_ROLE_KEY:    ", mask(serviceKey));
console.log("");

if (!url || !anonKey) {
    console.error("Missing URL or anon key. Aborting.");
    process.exit(1);
}

async function probe(label, client) {
    console.log(`▶ ${label}`);
    // 1. Auth round-trip (validates URL + key signature against the project).
    try {
        const { data, error } = await client.auth.getSession();
        if (error) {
            console.log(`  auth.getSession  → ERROR: ${error.message}`);
        } else {
            console.log(`  auth.getSession  → ok (session: ${data.session ? "present" : "none"})`);
        }
    } catch (err) {
        console.log(`  auth.getSession  → THREW: ${err.message}`);
    }

    // 2. Probe each known table with a HEAD count to confirm schema + RLS.
    for (const table of tablesToProbe) {
        try {
            const { count, error, status } = await client
                .from(table)
                .select("*", { count: "exact", head: true });
            if (error) {
                console.log(`  ${table.padEnd(17)} → ERROR ${status ?? ""} ${error.code ?? ""} ${error.message}`);
            } else {
                console.log(`  ${table.padEnd(17)} → ok (rows: ${count ?? "?"})`);
            }
        } catch (err) {
            console.log(`  ${table.padEnd(17)} → THREW: ${err.message}`);
        }
    }
    console.log("");
}

const anonClient = createClient(url, anonKey, { auth: { persistSession: false } });
await probe("anon key", anonClient);

if (serviceKey) {
    const serviceClient = createClient(url, serviceKey, { auth: { persistSession: false } });
    await probe("service-role key", serviceClient);
} else {
    console.log("(skipping service-role probe — SUPABASE_SERVICE_ROLE_KEY not set)");
}

console.log("Done.");
