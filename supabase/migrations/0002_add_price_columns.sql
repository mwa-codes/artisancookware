alter table public.products
add column if not exists factory_price_value numeric,
add column if not exists fob_price_value numeric;

update public.products
set
    factory_price_value = coalesce(
        factory_price_value,
        price_value
    )
where
    price_type = 'Factory'
    and price_value is not null;

update public.products
set
    fob_price_value = coalesce(fob_price_value, price_value)
where
    price_type = 'FOB'
    and price_value is not null;