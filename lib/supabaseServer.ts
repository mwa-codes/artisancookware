import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient, User } from "@supabase/supabase-js";

export function createSupabaseServerComponentClient(): SupabaseClient {
    const cookieStore = cookies();

    return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        cookies: {
            get(name: string) {
                return cookieStore.get(name)?.value;
            },
            set() {
                return void 0;
            },
            remove() {
                return void 0;
            }
        }
    });
}

export function createSupabaseServerActionClient(): SupabaseClient {
    const cookieStore = cookies();

    return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        cookies: {
            get(name: string) {
                return cookieStore.get(name)?.value;
            },
            set(name, value, options) {
                cookieStore.set({ name, value, ...options });
            },
            remove(name, options) {
                cookieStore.delete({ name, ...options });
            }
        }
    });
}

type MinimalSession = {
    user: User;
};

export async function getSupabaseSession(): Promise<MinimalSession | null> {
    const supabase = createSupabaseServerComponentClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
        return null;
    }

    return { user: data.user };
}
