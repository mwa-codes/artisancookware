-- Categories
insert into
    public.categories (id, name, description)
values (
        '9ab4f474-3f19-4bf6-8465-63683bcab9d1',
        'Anodised/Dull',
        'Durable anodised cookware with a timeless matte finish, ideal for heavy duty kitchens.'
    ),
    (
        '0d83e4cf-5014-4909-9e66-7bda83ed17f7',
        'Metal Finish',
        'Polished metal cookware that shines in presentation and performance.'
    ),
    (
        'ad21925e-7b3d-4c28-8c4f-cc6f4ef67663',
        'Non-Stick',
        'Modern non-stick collections designed for low-fat, effortless cooking.'
    ),
    (
        '2e89714d-0bf4-4e37-8f9e-dd2a44596c11',
        'Soda Finish',
        'Classic soda-finish cookware celebrated for its distinctive texture.'
    ) on conflict (id) do nothing;

-- Products
insert into
    public.products (
        id,
        category_id,
        name,
        description,
        sizes,
        features,
        specifications,
        image_url,
        price_type,
        price_value,
        factory_price_value,
        fob_price_value
    )
values (
        '8c4c668c-0be3-47c5-9453-51f63f923c2a',
        '0d83e4cf-5014-4909-9e66-7bda83ed17f7',
        '15-Piece Metal Finish Gift Set',
        'Complete cookware bundle with polished metal finish, ideal for gifting and outfitting kitchens in one go.',
        'Frying Pan (23 cm), Saucepan (20 cm), Karahi/Wok (28 cm), Baking Tawa (13 inch), Pots (20/23/25.5 cm), Wooden spoon set (3 pcs)',
    'Elegant metal finish for timeless presentation\nComplete cooking range for everyday needs\nDurable aluminium lids for heat retention',
    '[{"label":"Gauge","value":"3.0 mm"},{"label":"Material","value":"Food-grade aluminium"},{"label":"Finish","value":"High-gloss metal"},{"label":"Weight","value":"11.5 kg (complete set)"}]'::jsonb,
        'https://images.unsplash.com/photo-1589307004390-97eb644ed3f2?auto=format&fit=crop&w=800&q=80',
        'Factory',
        5400,
        5400,
        6100
    ),
    (
        '0f735b0b-d93c-4c56-8a16-1dc2812f6a0a',
        'ad21925e-7b3d-4c28-8c4f-cc6f4ef67663',
        '18-Piece Non-Stick Gift Set',
        'Versatile non-stick set tailored for modern kitchens with multiple colorways to match your style.',
        'Casseroles (20/24/28 cm), Frying Pan (24 cm), Saucepan (18 cm), Karahi/Wok (28 cm), Baking Tawa (12 inch), Plastic spoon set (6 pcs)',
        'Healthy cooking with premium non-stick coating\nFull kitchen solution in a single collection\nSmart choice for modern kitchens',
    '[{"label":"Gauge","value":"2.5 mm"},{"label":"Material","value":"Heavy-gauge aluminium"},{"label":"Coating","value":"Triple-layer non-stick"},{"label":"Weight","value":"12.2 kg (gross)"}]'::jsonb,
        'https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=800&q=80',
        'Factory',
        6200,
        6200,
        6900
    ),
    (
        '8dc1d98f-9168-4a5b-8fd7-b9cd680b7f7c',
        '9ab4f474-3f19-4bf6-8465-63683bcab9d1',
        'Dull/Anodised Cooking Set',
        'Hard-anodised cookware built to endure intensive commercial and home kitchen use.',
        'Sizes available from 18 cm up to 47 cm',
        'Hard-anodised construction with even heating\nHeavy lids for moisture retention\nExceptional value for professional kitchens',
    '[{"label":"Gauge","value":"3.2 mm"},{"label":"Material","value":"Hard-anodised aluminium"},{"label":"Finish","value":"Matte dull"},{"label":"Weight","value":"14.0 kg (full set)"}]'::jsonb,
        'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=800&q=80',
        'Factory',
        4800,
        4800,
        5400
    ),
    (
        'aba9a069-7938-4b82-9d14-d58a1d8f5c31',
        '0d83e4cf-5014-4909-9e66-7bda83ed17f7',
        'Metal Finish Wok Set',
        'Heavy-duty wok series crafted for traditional Pakistani recipes and high-heat cooking.',
        null,
        'Heavy-duty construction with reinforced base\nPerfectly balanced for stir-fries and curries\nResilient finish for long-term commercial use',
    '[{"label":"Gauge","value":"3.5 mm"},{"label":"Material","value":"Aluminium with metal finish"},{"label":"Set Weight","value":"8.3 kg"}]'::jsonb,
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        'Factory',
        5100,
        5100,
        5800
    ) on conflict (id) do nothing;

-- Variants for non-stick gift set
insert into
    public.product_variants (
        id,
        product_id,
        color_name,
        image_url
    )
values (
        '8b438b57-6d0b-4b78-b8ba-97ed9869965b',
        '0f735b0b-d93c-4c56-8a16-1dc2812f6a0a',
        'Antique Silver',
        'https://images.unsplash.com/photo-1522747776116-64ee0d07f6b6?auto=format&fit=crop&w=800&q=80'
    ),
    (
        '86ad0dd8-3b71-4681-bad1-c116d0fb89e1',
        '0f735b0b-d93c-4c56-8a16-1dc2812f6a0a',
        'Black',
        'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=800&q=80'
    ),
    (
        '1e0dfc52-9728-4d90-bd02-1b047953afcf',
        '0f735b0b-d93c-4c56-8a16-1dc2812f6a0a',
        'Red',
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80'
    ),
    (
        '2c17fed2-45d2-4f5a-8dd5-3ae675b89b75',
        '0f735b0b-d93c-4c56-8a16-1dc2812f6a0a',
        'Maroon',
        'https://images.unsplash.com/photo-1542718610-a1d656d189f4?auto=format&fit=crop&w=800&q=80'
    ) on conflict (id) do nothing;