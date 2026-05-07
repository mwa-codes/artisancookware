import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { ADMIN_EMAIL } from "@/lib/constants";

const ADMIN_PREFIX = "/admin";
const LOGIN_PATH = `${ADMIN_PREFIX}/login`;

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isAdminRoute = pathname.startsWith(ADMIN_PREFIX);
    const isLoginRoute = pathname === LOGIN_PATH;

    if (!isAdminRoute) {
        return NextResponse.next();
    }

    const response = NextResponse.next({ request: { headers: request.headers } });

    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        cookies: {
            get(name: string) {
                return request.cookies.get(name)?.value;
            },
            set(name, value, options) {
                response.cookies.set({ name, value, ...options });
            },
            remove(name, options) {
                response.cookies.delete({ name, ...options });
            }
        }
    });

    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (isLoginRoute) {
        if (session?.user?.email === ADMIN_EMAIL) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = ADMIN_PREFIX;
            return NextResponse.redirect(redirectUrl);
        }
        return response;
    }

    if (!session || session.user?.email !== ADMIN_EMAIL) {
        if (session) {
            await supabase.auth.signOut();
        }
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = LOGIN_PATH;
        redirectUrl.searchParams.set("redirect", request.nextUrl.pathname + request.nextUrl.search);
        return NextResponse.redirect(redirectUrl);
    }

    return response;
}

export const config = {
    matcher: ["/admin/:path*"]
};
