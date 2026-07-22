---
name: new-service-page
description: Scaffold a new service landing page for mwadev.me wired to the ServiceSeo component (Service + FAQPage + BreadcrumbList JSON-LD and a US-intent FAQ). Use when the user wants to add a new service, offering, or hire-me landing page.
---

# New Service Page (mwadev.me)

Create a service landing page under `src/app/services/<slug>/page.tsx` that ranks for one high-intent query and is citable by AI answer engines. The sitemap auto-includes it.

## Pattern (match existing service pages)
See `src/app/services/nextjs-development/page.tsx`. Structure:
1. `import ServiceSeo from '@/components/seo/ServiceSeo';` plus `Metadata`, `Link`, `Header`, `Footer`.
2. Export `metadata`: `title`, `description`, `alternates.canonical: '/services/<slug>'`.
3. Page body inside `<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">`:
   - Eyebrow `<p>`, one `<h1>` ("Hire a … for …"), intro `<p>`.
   - Two-column "Best for" / "What you achieve" cards.
   - A gradient "Relevant proof" section linking to 1–2 real `/projects/*` case studies.
   - CTA buttons to `/#contact` and back to `/services`.
4. **Render `<ServiceSeo />` as the last thing inside `<main>`**, before `<Footer />`.

## ServiceSeo props (`src/components/seo/ServiceSeo.tsx`)
```tsx
<ServiceSeo
  slug="your-slug"
  serviceName="Human Readable Service Name"
  serviceDescription="One sentence; mention remote delivery for US businesses/startups where honest."
  serviceType="Web Development"       // schema serviceType keyword
  breadcrumbLabel="Short Label"        // breadcrumb leaf
  faqs={[ /* 4–6 items */ ]}
/>
```
It renders `Service` + `FAQPage` + `BreadcrumbList` JSON-LD (already escaped, unique ids, `areaServed: United States`) and a visible `<details>` FAQ. **FAQ schema is the strongest GEO lever** — always supply real, specific FAQs.

## Writing the FAQs (US-intent)
Cover the questions US buyers actually search/ask. Include at least one on each:
- Working with US clients remotely + timezone/async collaboration (honest positioning).
- What's included / best-fit use cases.
- Tech specifics for the service.
- Cost/engagement model (ranges or "scoped per project" — never invent fixed prices).
- How to start (points to `/#contact`).

## Also do
- Add the new page to `public/llms.txt` under "Service pages".
- Consider linking to it from the `/services` hub (`src/app/services/page.tsx`) `services` array and from related project pages' `proofLinks`.

## Finish
Run `npm run build` and `npm run lint`; fix errors. Report the live path.

## Guardrails
No fabricated prices, guarantees, client names, or physical address. Keep US positioning truthful: remote, serves US clients, async/flexible, English.
