/** @type {import('next').NextConfig} */

/** Ensures Next/Image can optimize Supabase Storage URLs (public + signed). */
function supabaseRemotePatterns() {
    const fromEnv = [process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_URL].filter(Boolean);
    /** @type {{ protocol: string; hostname: string; pathname: string }[]} */
    const patterns = [];
    const hosts = new Set();
    for (const raw of fromEnv) {
        try {
            hosts.add(new URL(raw).hostname);
        } catch {
            /* skip invalid */
        }
    }
    for (const hostname of hosts) {
        patterns.push(
            { protocol: 'https', hostname, pathname: '/storage/v1/object/public/**' },
            { protocol: 'https', hostname, pathname: '/storage/v1/object/sign/**' }
        );
    }
    // Backup when env loads after config parse — subdomain pattern for *.supabase.co
    patterns.push({ protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/**' });
    return patterns;
}

const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
            { protocol: 'https', hostname: 'cdn.shopify.com', pathname: '/**' },
            ...supabaseRemotePatterns()
        ]
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb'
        }
    }
};

export default nextConfig;
