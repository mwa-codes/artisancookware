import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin/", "/admin"],
            },
        ],
        sitemap: "https://www.artisancookware.co/sitemap.xml",
        host: "https://www.artisancookware.co",
    };
}
