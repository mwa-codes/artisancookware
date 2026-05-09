-- The Next.js storefront uses the Supabase anon key. When Row Level Security (RLS)
-- is enabled on catalogue tables without a permissive SELECT policy for `anon`,
-- queries can return fewer rows than you see in the SQL Editor (service role).
--
-- Apply via: supabase db push   OR paste into Supabase SQL Editor.

alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.product_variants enable row level security;

drop policy if exists "storefront_anon_select_products" on public.products;
create policy "storefront_anon_select_products"
on public.products
for select
to anon, authenticated
using (true);

drop policy if exists "storefront_anon_select_categories" on public.categories;
create policy "storefront_anon_select_categories"
on public.categories
for select
to anon, authenticated
using (true);

drop policy if exists "storefront_anon_select_variants" on public.product_variants;
create policy "storefront_anon_select_variants"
on public.product_variants
for select
to anon, authenticated
using (true);
