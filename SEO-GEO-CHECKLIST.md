# SEO / GEO Action Checklist — Artisan Cookware

Last updated: 2026-07-22

This file lists the steps to finish the SEO/GEO work. Part A is code (done in this repo).
Part B is what **only you** can do in Google Search Console (GSC) after deploying.

---

## Part A — Code changes (DONE, ship these)

1. **Category pages no longer force-dynamic → ISR.**
   `app/(site)/categories/[slug]/page.tsx` now pre-renders with `revalidate = 3600`
   and `generateStaticParams`. This removes the crawl-time 5xx risk that was hurting
   indexing. Admin edits still appear instantly (admin actions call `revalidatePath`).

2. **Thin content fixed.** New `lib/data/categoryContent.ts` adds unique 250–400-word
   copy + spec table + buyer FAQ per category, rendered below the product grid.
   No two category pages read alike now (kills the duplicate-content signal).

3. **Schema added.** Category pages now emit `CollectionPage` + `ItemList` +
   `BreadcrumbList` + `FAQPage` JSON-LD.

4. **B2B metadata retargeted.** Home, products, categories, and category-detail
   titles/descriptions now lead with "manufacturer & exporter", "wholesale",
   "OEM / private label", "FOB Karachi".

5. **GEO improvements.** `public/llms.txt` expanded with categories, capabilities,
   FAQs, and export markets. Organization schema gained `sameAs` (Google Business
   profile), `areaServed`, and `knowsAbout`.

**Deploy, then confirm live:**
- [ ] `https://www.artisancookware.co/sitemap.xml` returns 200 and lists all pages
- [ ] `https://www.artisancookware.co/robots.txt` returns 200
- [ ] `https://www.artisancookware.co/llms.txt` returns 200
- [ ] Visit each category page and confirm the new copy + FAQ render
- [ ] Test 2–3 URLs in Google's Rich Results Test (search.google.com/test/rich-results)

---

## Part B — Google Search Console (ONLY YOU CAN DO THIS)

### B1. Fix the Server error (5xx) — HIGHEST PRIORITY
1. GSC → **Indexing → Pages** → click the **"Server error (5xx)"** row.
2. Copy the affected URL. (Likely a `/categories/[slug]` page — the ISR change should fix it.)
3. Open the URL in a browser to confirm it now loads.
4. In GSC, use **URL Inspection** on that URL → **Test Live URL** → confirm no error.
5. Click **Validate Fix** on the 5xx issue. Google will re-crawl over ~1–2 weeks.

### B2. Force-index the key pages (do the day you deploy)
For each URL below: GSC → **URL Inspection** → paste URL → **Request Indexing**.
(Limit ~10–12/day.)
- [ ] https://www.artisancookware.co/products
- [ ] https://www.artisancookware.co/categories
- [ ] https://www.artisancookware.co/categories/nonstick
- [ ] https://www.artisancookware.co/categories/dullanodised
- [ ] https://www.artisancookware.co/categories/metal-finish
- [ ] https://www.artisancookware.co/categories/soda-finish
- [ ] https://www.artisancookware.co/aluminium-cookware
- [ ] https://www.artisancookware.co/metal-finish-gift-sets
- [ ] https://www.artisancookware.co/non-stick-gift-sets
- [ ] https://www.artisancookware.co/anodized-dull-cookware
- [ ] https://www.artisancookware.co/about
- [ ] https://www.artisancookware.co/contact

### B3. Resubmit the sitemap
GSC → **Indexing → Sitemaps** → enter `sitemap.xml` → **Submit**.
(Re-submitting nudges a re-crawl even if it's already listed.)

### B4. Attack "Discovered — currently not indexed" (23 pages)
The code changes target the root cause (thin content + 5xx). After deploy:
1. Wait ~1 week, then GSC → **Pages** → open the "Discovered - currently not
   indexed" row and click **Validate Fix**.
2. Re-request indexing (B2) for any that are still excluded after 2 weeks.

---

## Part C — Off-page / authority (ongoing, moves the needle most for a new domain)

Your domain is new, so authority is the ceiling on everything above. Priority order:
- [ ] **Google Business Profile** — verify/complete it (you already have a profile link).
      Add category "Cookware Manufacturer", photos, and the website URL.
- [ ] **B2B directories** — list on Alibaba, TradeKey, ExportHub, and Pakistan export
      directories (TDAP). These are the queries your buyers actually use.
- [ ] **Consistent NAP** — ensure Name/Address/Phone is identical across every listing.
- [ ] **Trade profiles** — LinkedIn company page + a couple of cookware/export
      B2B communities, all linking back to artisancookware.co.

---

## Part D — What to measure (check monthly in GSC)

| Metric | Today (baseline) | Target 90 days |
|---|---|---|
| Indexed pages | 1 | 20+ |
| Impressions (3-mo) | ~1,384 | 3,000+ |
| Clicks (3-mo) | 39 | 120+ |
| Queries with "manufacturer/wholesale/exporter/OEM" | ~0 clicks | ranking + clicks |

Watch the **"artisan cookware"** query specifically — you're at position ~6 for your
own brand; the new homepage title targets moving that toward #1–2.
