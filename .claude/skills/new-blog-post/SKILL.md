---
name: new-blog-post
description: Scaffold a new SEO/GEO-optimized blog post for the mwadev.me site following this project's exact conventions (posts.ts entry, page.tsx with Article schema and dynamic OG). Use when the user wants to write, add, or draft a blog post or article.
---

# New Blog Post (mwadev.me)

Create a blog post that matches this repo's exact conventions so it is indexed, shareable, and citable by AI answer engines. The sitemap and RSS feed pick it up automatically once both pieces below exist.

## Two required pieces

### 1. Register metadata in `src/data/posts.ts`
Append an entry to the `posts` array using the `Post` type:
```ts
{
    slug: 'kebab-case-slug',              // becomes /blog/<slug>
    title: 'Full Title (<= ~60 chars for SERP)',
    description: 'Compelling 140–160 char summary with the primary keyword.',
    publishedAt: 'YYYY-MM-DD',            // ISO; use today's real date
    modifiedAt: 'YYYY-MM-DD',             // same as published on creation
    ogTitle: 'Short OG Title',            // punchy, fits the OG card
    ogSubtitle: 'Point one • Point two • Point three',
},
```

### 2. Create `src/app/blog/<slug>/page.tsx`
Follow the existing pattern exactly (see `src/app/blog/nextjs-fastapi-saas-mvp-checklist/page.tsx`):
- `const post = posts.find((entry) => entry.slug === '<slug>')!;`
- Export `metadata` from `post`: `title`, `description`, `alternates.canonical: '/blog/<slug>'`, and `openGraph` with `type: 'article'`, canonical URL, and the dynamic OG image:
  ```
  /og?title=${encodeURIComponent(post.ogTitle ?? post.title)}&subtitle=${encodeURIComponent(post.ogSubtitle ?? '...')}
  ```
- Inject `Article` JSON-LD via `next/script` (unique `id`, `.replace(/</g, '\\u003c')` escape) with `headline`, `description`, `author` (Muhammed Waqar Ahmed / https://mwadev.me), `datePublished`, `dateModified`, and `mainEntityOfPage`.
- Layout: `<Header /> ... <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24"> <article className="space-y-6"> ... </article> </main> <Footer />`.
- Use `&quot;` / `&apos;` for quotes/apostrophes in JSX to avoid react/no-unescaped-entities lint errors.

## Content structure (SEO + GEO)
- One `<h1>` = the post title. Logical `<h2>` sections.
- Front-load the answer/thesis in the first two paragraphs (AI engines extract the top of the page).
- Include a natural **FAQ or key-takeaways** section — question-style headings get cited by ChatGPT/Perplexity/AI Overviews. For hire/service posts, add `FAQPage` JSON-LD too.
- Link internally to relevant `/services/*` and `/projects/*` pages, and to `/#contact`.
- Target one primary keyword cluster; write for a US business/founder audience where relevant, honestly (remote, serves US clients).

## Finish
1. Confirm the slug is unique.
2. Run `npm run build` and `npm run lint`; fix errors before reporting done.
3. Tell the user the live path, and that sitemap.xml + /blog/rss.xml include it automatically.

## Guardrails
Write genuine, accurate content. No fabricated stats, quotes, or client stories. No keyword stuffing.
