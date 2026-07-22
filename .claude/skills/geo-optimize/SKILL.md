---
name: geo-optimize
description: Optimize mwadev.me for GEO (Generative Engine Optimization) so ChatGPT, Perplexity, Google AI Overviews, and Claude cite the site. Focuses on llms.txt, FAQPage schema, entity signals, and answer-first content. Use when the user asks about AI search, LLM visibility, answer engines, or "getting cited by AI".
---

# GEO — Generative Engine Optimization (mwadev.me)

Classic SEO ranks blue links; GEO gets the site **quoted inside AI answers**. This skill improves how AI answer engines discover, understand, and cite mwadev.me. It complements `seo-audit` and `new-service-page`.

## What AI engines reward (and where this repo stands)
1. **Answer-first content.** Put the direct answer in the first 1–2 sentences under a question-style heading, then support it. Retrieval grabs the top of the section.
2. **FAQPage schema + visible Q&A.** The single strongest, most extractable format. Present on service pages via `src/components/seo/ServiceSeo.tsx`; extend to hire/how-to blog posts.
3. **Clear entity graph.** Home `Person` + `ProfessionalService` JSON-LD with `sameAs` (GitHub, LinkedIn, Upwork), `knowsAbout`, `knowsLanguage`, `areaServed`. Keep these complete and accurate.
4. **`public/llms.txt`.** Explicit crawl guidance + canonical URLs + a curated page list. Keep it current whenever pages are added/removed.
5. **Consistent, factual claims.** AI engines cross-check. State the same stack, services, and positioning (remote, serves US clients, async, English) everywhere.

## Playbook
1. **Audit extractability.** For each key page, is there a crisp, self-contained answer near the top? If a section only makes sense with surrounding context, tighten it.
2. **Add FAQ/Q&A blocks** to high-intent pages that lack them. Reuse `ServiceSeo` on service pages; add `FAQPage` JSON-LD to hire/guide blog posts (unique script `id`, `.replace(/</g, '\\u003c')` escape).
3. **Strengthen entities.** Verify `sameAs` links resolve and profiles are consistent with the site. Fill gaps in `knowsAbout`/`serviceType`.
4. **Refresh `public/llms.txt`** so every service, key blog post, and canonical URL is listed with a one-line description.
5. **Fact table.** For comparison/guide content, a compact table or bullet list of facts is highly extractable — prefer it over long prose where it fits.
6. **Freshness.** Update `modifiedAt` in `src/data/posts.ts` when revising a post; keep dates truthful.
7. **Verify.** `npm run build`. Suggest testing prompts in ChatGPT/Perplexity/Claude after deploy (e.g. "remote Next.js + FastAPI developer for US startups") to see whether the site is surfaced/cited, and iterate.

## Honest expectations
- GEO results lag deploys and are non-deterministic — engines re-crawl and re-rank on their own schedule.
- You cannot force a citation. You make the content the easiest, most trustworthy source to quote.
- Never fabricate authority signals (fake reviews, inflated metrics, invented affiliations). AI engines and users both punish this.

## Guardrails
Truthful positioning only: remote, serves US clients, async/flexible, English. No fake address, testimonials, or numbers.
