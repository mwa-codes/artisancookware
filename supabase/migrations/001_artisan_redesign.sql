-- Run in Supabase SQL editor in order (combined reference). Adjust if tables already partially migrated.

-- Migration 1 — slugs
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS slug text;
UPDATE public.categories SET slug = lower(regexp_replace(name, '[^a-zA-Z0-9\s]', '', 'g'))::text WHERE slug IS NULL;
UPDATE public.categories SET slug = replace(slug, ' ', '-') WHERE slug IS NOT NULL;
ALTER TABLE public.categories ALTER COLUMN slug SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS categories_slug_idx ON public.categories (slug);

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS slug text;
UPDATE public.products SET slug = lower(regexp_replace(name, '[^a-zA-Z0-9\s]', '', 'g')) || '-' || substring(id::text, 1, 6) WHERE slug IS NULL;
UPDATE public.products SET slug = replace(slug, ' ', '-') WHERE slug IS NOT NULL;
ALTER TABLE public.products ALTER COLUMN slug SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS products_slug_idx ON public.products (slug);

-- Migration 2 — product & category commerce fields
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS moq integer NOT NULL DEFAULT 50;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS factory_price_usd numeric;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS fob_price_usd numeric;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS oem_available boolean NOT NULL DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS lead_time_weeks integer NOT NULL DEFAULT 4;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'active';
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_status_check;
ALTER TABLE public.products ADD CONSTRAINT products_status_check CHECK (status IN ('active', 'draft', 'discontinued'));

ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS display_order integer NOT NULL DEFAULT 0;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;
CREATE INDEX IF NOT EXISTS categories_display_order_idx ON public.categories (display_order);

-- Migration 3 — inquiries
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS company_name text;
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS country text;
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS buyer_type text;
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS quantity_requested text;
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'unread';
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS notes text;
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS replied_at timestamptz;
ALTER TABLE public.inquiries DROP CONSTRAINT IF EXISTS inquiries_buyer_type_check;
ALTER TABLE public.inquiries ADD CONSTRAINT inquiries_buyer_type_check CHECK (
    buyer_type IS NULL OR buyer_type IN ('wholesaler', 'retailer', 'hotel', 'importer', 'oem', 'other')
);
ALTER TABLE public.inquiries DROP CONSTRAINT IF EXISTS inquiries_status_check;
ALTER TABLE public.inquiries ADD CONSTRAINT inquiries_status_check CHECK (status IN ('unread', 'read', 'replied', 'closed'));
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON public.inquiries (status, created_at DESC);

-- Migration 4 — currency cache (USD base for app)
CREATE TABLE IF NOT EXISTS public.currency_rates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    base_currency text NOT NULL DEFAULT 'USD',
    rates jsonb NOT NULL DEFAULT '{}',
    fetched_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS currency_rates_base_idx ON public.currency_rates (base_currency);
