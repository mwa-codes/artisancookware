-- Enable extensions
create extension if not exists "uuid-ossp";

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'price_type_enum') then
    create type price_type_enum as enum ('Factory', 'FOB');

end if;

end $$;

-- Categories
create table if not exists public.categories (
    id uuid primary key default gen_random_uuid (),
    name text not null unique,
    description text,
    created_at timestamptz not null default now()
);

-- Products
create table if not exists public.products (
    id uuid primary key default gen_random_uuid (),
    category_id uuid not null references public.categories (id) on delete cascade,
    name text not null,
    description text,
    sizes text,
    features text,
    image_url text,
    price_type price_type_enum,
    price_value numeric,
    created_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category_id);

-- Product variants
create table if not exists public.product_variants (
    id uuid primary key default gen_random_uuid (),
    product_id uuid not null references public.products (id) on delete cascade,
    color_name text not null,
    image_url text,
    created_at timestamptz not null default now()
);

create index if not exists product_variants_product_idx on public.product_variants (product_id);

-- Inquiries
create table if not exists public.inquiries (
    id uuid primary key default gen_random_uuid (),
    product_id uuid references public.products (id) on delete set null,
    customer_name text not null,
    email text not null,
    message text not null,
    created_at timestamptz not null default now()
);

create index if not exists inquiries_product_idx on public.inquiries (product_id);