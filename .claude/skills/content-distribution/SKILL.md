---
name: content-distribution
description: Turn a published mwadev.me page (blog post, service page, or project) into a multi-channel distribution plan and draft the assets (LinkedIn, X, dev.to/Hashnode, newsletter, communities). Use when the user asks to promote, market, distribute, share, or drive traffic to content.
---

# Content Distribution & Marketing (mwadev.me)

Publishing is step one; distribution is what earns traffic, backlinks, and leads — which in turn feed SEO/GEO. Given a target URL, produce a channel plan and **draft ready-to-post assets** in the site's voice.

## Voice & positioning
Muhammed Waqar Ahmed / MWA Dev — remote AI & full-stack developer (Next.js, FastAPI, Supabase, PostgreSQL) who **serves US clients**, async-first, in English. Tone: direct, technical, credible, no hype. Always end with a clear, low-friction CTA and the canonical URL.

## Inputs
Ask for (or infer from the repo) the target URL and its goal: leads (service pages), authority/backlinks (blog guides), or proof (project case studies).

## Channel playbook (pick what fits the piece)
- **LinkedIn (primary for US B2B/founder reach):** 3–5 short paragraphs, a concrete hook (problem or result), one insight from the piece, CTA + link. Offer a "no-link-in-body, link-in-first-comment" variant since LinkedIn suppresses outbound links.
- **X/Twitter:** a 4–7 tweet thread that teaches the core idea, last tweet links out. Plus a standalone single-tweet variant.
- **dev.to / Hashnode / Medium:** canonical-linked republish (set `canonical_url` to the mwadev.me URL to avoid duplicate-content dilution) for technical guides — strong for backlinks and developer reach.
- **Communities:** relevant subreddits, Indie Hackers, Hacker News (Show HN for projects), niche Slack/Discord. Lead with value, disclose authorship, follow each community's self-promo rules.
- **Newsletter / email:** short blurb + link if a list exists.
- **Repurpose:** pull 2–3 quote cards or a carousel outline from the piece.

## Deliverable
For the chosen channels, output:
1. Ready-to-paste copy per channel (with hashtags/mentions where useful).
2. A suggested 1-week cadence (e.g. LinkedIn day 1, X thread day 2, dev.to day 4, community day 5) so it's not all at once.
3. 5–10 hashtag/keyword suggestions per platform.
4. A short measurement note: watch referral traffic in GA4 (already wired via `NEXT_PUBLIC_GA_ID` in `src/app/layout.tsx`) and, after deploy, submit/refresh in Search Console.

## Guardrails
- No spam, no mass-posting identical text across many communities, no fake engagement or undisclosed astroturfing — respect each platform's self-promotion rules.
- No fabricated results, testimonials, or metrics. Claims must match the site.
- Distribution is drafting + planning; the user posts to their own accounts. Do not attempt to publish on their behalf.
