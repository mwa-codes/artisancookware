---
name: seo-audit
description: Audit SEO and GEO (AI answer engine) health of the mwadev.me Next.js site against this project's own conventions, then report prioritized fixes. Use when the user asks to check, review, or improve SEO, GEO, search visibility, or discoverability.
---

# SEO & GEO Audit (mwadev.me)

Audit the site's search + AI-answer-engine readiness against **this repo's established conventions**, then report a prioritized, honest fix list. Verify with a build.

## Project conventions (the baseline every page must meet)

- **Framework:** Next.js 15 App Router, TypeScript, Tailwind. Base URL `https://mwadev.me`.
- **Metadata:** every route exports `metadata: Metadata` with a `title`, `description`, and `alternates.canonical` (relative path). Root `src/app/layout.tsx` owns `metadataBase`, title template `%s | MWA Dev`, default OG/Twitter, and robots.
- **JSON-LD:** injected via `next/script` with `type="application/ld+json"` and **always** `JSON.stringify(schema).replace(/</g, '\\u003c')` to escape. Each `<Script>` needs a unique `id`.
  - Home (`src/app/page.tsx`): `Person` + `ProfessionalService`.
  - Projects (`src/app/projects/*/page.tsx`): `SoftwareApplication`.
  - Blog posts (`src/app/blog/*/page.tsx`): `Article`.
  - Service pages (`src/app/services/*/page.tsx`): `Service` + `FAQPage` + `BreadcrumbList` via `src/components/seo/ServiceSeo.tsx`.
- **Sitemap:** `src/app/sitemap.ts` auto-discovers `blog/`, `projects/`, `services/` route folders. New pages appear automatically — no manual sitemap edits.
- **Crawl/AI files:** `public/robots.txt` (allows all, blocks `/api/`, points to sitemap + llms.txt) and `public/llms.txt` (AI-crawler guidance).
- **Positioning:** remote developer who **serves US clients**, async-first/flexible hours, English. Never fabricate a US street address or a physical `PostalAddress` — that is a deceptive signal. US targeting is done via `areaServed: United States`, US-intent copy, and FAQ answers.

## Steps

1. **Inventory routes.** List `src/app/**/page.tsx`. For each, read its `metadata` block.
2. **Check per-page basics.** Flag any page missing `title`, `description`, or `alternates.canonical`. Flag titles >60 chars or descriptions >160 chars (truncation risk).
3. **Check structured data.** Confirm each page type carries the expected JSON-LD (table above) and that every schema uses the `.replace(/</g, '\\u003c')` escape and a unique script `id`.
4. **Check GEO signals** (AI answer engines — the highest-leverage, most-missed area):
   - `FAQPage` schema + visible FAQ on service pages.
   - `public/llms.txt` current and lists all key/service/blog pages.
   - Entity completeness on home `Person`/`ProfessionalService` (`sameAs`, `knowsAbout`, `knowsLanguage`, `areaServed`).
5. **Check US targeting is truthful.** `areaServed` names United States; copy/FAQ mention remote-with-US-clients and timezone/async. Confirm no fake `PostalAddress`.
6. **Check internal linking.** Service pages ↔ proof projects ↔ contact. Orphan pages (no inbound internal link) are a flag.
7. **Verify build:** run `npm run build`. Report pass/fail with output. Optionally `npm run lint`.
8. **Report.** Markdown table: Area | Issue | Impact | Fix. Order by impact (GEO/structured-data/thin-content first). Separate "code fixes I can make" from "off-code actions the user must do" (Search Console submission, backlinks, deploy). Be honest about what you did and did not verify — schema validity in Google's eyes can only be confirmed in the Rich Results Test on the live URL.

## Guardrails

- Do not invent testimonials, client names, metrics, or a physical address.
- Do not claim rich results are "live" — markup only makes a page *eligible*; Google decides, and it takes days-to-weeks after deploy.
- Recommend Search Console sitemap submission + Rich Results Test as the verification step, but note there is no "target USA" toggle for a `.me` domain — geography is inferred from content/schema/links.
