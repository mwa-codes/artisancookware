---
name: backlink-outreach
description: Build a backlink and citation acquisition plan for mwadev.me and draft the outreach assets (guest-post pitches, directory/profile citations, HARO-style responses, link-reclamation emails). Focuses on US-relevant, white-hat links that move search and GEO rankings. Use when the user asks about backlinks, link building, citations, domain authority, off-page SEO, or getting mentioned/linked by other sites.
---

# Backlink & Citation Outreach (mwadev.me)

On-page SEO/GEO is handled elsewhere in this repo (metadata, JSON-LD, `llms.txt`, FAQPage schema). This skill covers **off-page** signals: earned links and citations from other domains, which are the strongest remaining lever for US search rankings and for being cited by AI answer engines. Given a target page (or the site as a whole), produce a prioritized target list and **draft ready-to-send outreach assets** in the site's voice.

## Voice & positioning
Muhammed Waqar Ahmed / MWA Dev — remote AI & full-stack developer (Next.js, FastAPI, Supabase, PostgreSQL) who **serves US clients**, async-first, in English. Tone: direct, specific, credible, no hype. Every pitch leads with value to the recipient, not a request.

## Inputs
Ask for (or infer from the repo) the target URL and its goal, then match link type to goal:
- **Service pages** (`/services/*`) → citations + relevant industry/directory links that pass topical + geographic (US) relevance.
- **Blog guides** (`/blog/*`) → editorial/guest links and resource-page inclusions (highest authority value).
- **Project case studies** (`/projects/*`) → product directories, "built with" showcases, Show HN.

## Link-type playbook (white-hat only)
- **Business & developer profiles / citations:** GitHub (linked in profile + repo READMEs), LinkedIn, Upwork, Crunchbase, dev.to/Hashnode profiles, Clutch/G2-style directories where eligible. Consistent Name + URL across all — these are the citation equivalent of NAP for a solo brand.
- **Guest posts / editorial:** pitch relevant dev and startup blogs a genuinely useful article (repurpose an existing blog guide's angle, don't duplicate). US-audience publications first for geo-relevance.
- **Resource-page & listicle inclusion:** find "best Next.js/FastAPI developers", "hire a SaaS MVP developer" style pages and pitch inclusion with a one-line value prop.
- **Link reclamation:** find unlinked brand mentions ("MWA Dev", "mwadev.me", "Muhammed Waqar Ahmed") and request a link; fix any broken inbound links.
- **HARO / expert-quote requests:** respond to journalist/blogger queries on Next.js, FastAPI, AI dev, freelancing with a concise expert quote + attribution to the site.
- **Community & content links:** dev.to/Hashnode canonical republishes (link back), answering relevant Stack Overflow / Reddit / Indie Hackers threads with genuine help and a contextual link where allowed.

## Deliverable
1. A prioritized target table: prospect, link type, why relevant (topical + US-geo), effort, and the URL to point at.
2. **Ready-to-send drafts** for each chosen prospect — short, personalized, subject line + body, one clear ask, the canonical URL. Include a follow-up line to send after ~5 business days.
3. A simple tracker suggestion (prospect / status / date contacted / follow-up / result) so outreach isn't lost.
4. Measurement note: watch referral traffic in GA4 (`NEXT_PUBLIC_GA_ID` in `src/app/layout.tsx`) and new links in Search Console → Links report after they're live.

## Guardrails
- **White-hat only.** Never suggest or draft for: paid link schemes, PBNs, link farms, comment/forum spam, mass-automated outreach, reciprocal-link rings, or anything against Google's link spam policy. These risk manual penalties and are a net negative.
- **No fabrication.** Pitches must not invent credentials, results, client names, or metrics. Everything must match what the site actually shows.
- **No impersonation** and no undisclosed identity. Outreach is honest and from the user's real identity.
- **Personalize, don't blast.** Reject "send the same email to 500 sites" — draft per-prospect or per-small-batch. Respect each platform's self-promotion and link rules.
- This skill drafts + plans; the user sends from their own accounts. Do not attempt to send on their behalf.
