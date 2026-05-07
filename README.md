# Artisan Cookware

Premium cookware catalogue built with Next.js 14 (App Router), Tailwind CSS, and Supabase for data + inquiries. Designed for fast deployment on Vercel with responsive layouts tailored to wholesale buyers in Pakistan.

## ✨ Highlights

- **Modern App Router** architecture with server components and streaming-friendly data fetching
- Tailwind-powered design system with reusable components for hero, categories, products, and contact flows
- Supabase-backed schema for categories, products, variants, and customer inquiries
- WhatsApp inquiry flows with pre-filled messages and backend persistence
- Ready-to-run SQL migration and seed scripts for quick provisioning

## 🧱 Tech Stack

- [Next.js 14](https://nextjs.org/) (React 18, App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (PostgreSQL + Auth)
- TypeScript, ESLint, and modern tooling

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the site.

## 🔐 Environment Variables

Create a `.env.local` file based on the template below (included as `.env.example`).

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=923001234567
NEXT_PUBLIC_GOOGLE_PROFILE_URL=https://maps.app.goo.gl/your-google-profile
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Note:** `SUPABASE_SERVICE_ROLE_KEY` is required to store inquiries from the contact form. If you prefer using an anon key, update Supabase Row Level Security (RLS) policies accordingly.

## 🗃️ Supabase Setup

1. **Create a new project** in Supabase and note the URL + keys.
2. **Enable database extensions** (already handled in migration – `uuid-ossp` and `pgcrypto`).
3. **Run the migration** to create tables and enum:
   ```bash
   supabase db push
   ```
4. **Seed sample data** (categories, products, variants):
   ```bash
   supabase db execute --file supabase/seeds/seed.sql
   ```
   _or_ paste the SQL contents into the Supabase SQL editor and execute.
5. **Configure storage & RLS** if you need custom policies. The tables assume authenticated server access via the service role.

## 🧭 Project Structure

```
app/
  page.tsx                 # Home page with hero, categories, featured products
  categories/              # Categories index + slug-based product listings
  products/[id]/           # Product details with variants + inquiry form
  about/                   # About Artisan Cookware page
  contact/                 # Contact page with inquiry form
  api/inquiries/           # Supabase-backed inquiry endpoint
components/                # Reusable UI building blocks
lib/                       # Supabase client, repository helpers, sample data, utilities
supabase/                  # SQL migration + seed data
```

## 📦 Deployment on Vercel

1. **Import repository** into Vercel and select the project.
2. **Set environment variables** in Vercel → Settings → Environment Variables (use values from your `.env.local`).
3. **Provision Supabase migrations** via CI/CD or manually run the SQL scripts once.
4. Deploy — Vercel uses the included `build` script (`next build`).

## ✅ Quality Gates

- `npm run lint` – runs Next.js lint rules
- `npm run build` – ensures the project builds before deployment

## 🤝 Next Steps

- Connect Supabase storage for product imagery if needed
- Integrate authentication for internal dashboards or pricing controls
- Localize content for additional markets (Urdu/Arabic)

Enjoy building with Artisan Cookware! 🛠️🍳
