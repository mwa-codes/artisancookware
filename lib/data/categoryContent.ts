/**
 * Per-category long-form SEO/GEO content, keyed by category slug.
 *
 * Purpose: the DB `description` is a one-line summary; that alone leaves category
 * pages thin, which is why Google reports them "Discovered — currently not indexed."
 * This module adds unique, buyer-focused copy + FAQs per category so no two pages
 * read alike (kills the duplicate-content signal) and gives AI engines citable facts.
 *
 * Matching is hyphen/compact-insensitive so `non-stick`, `nonstick`, `Non-Stick`
 * all resolve to the same entry.
 */

export interface CategoryFaq {
    question: string;
    answer: string;
}

export interface CategoryContent {
    /** Buyer-intent H2 shown above the long-form copy. */
    heading: string;
    /** 2–4 paragraphs of unique prose (250–400 words total). */
    paragraphs: string[];
    /** Bullet specs buyers evaluate — differentiated per finish. */
    specs: { label: string; value: string }[];
    faqs: CategoryFaq[];
}

function compactKey(s: string) {
    return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Alias map: real DB slugs vary in word order and spelling from the canonical keys
 * below (e.g. live slug `dullanodised` vs key `anodiseddull`). Every known variant
 * compacts to one canonical CONTENT key.
 */
const ALIASES: Record<string, string> = {
    nonstick: "nonstick",
    metalfinish: "metalfinish",
    anodiseddull: "anodiseddull",
    dullanodised: "anodiseddull",
    dullanodized: "anodiseddull",
    anodizeddull: "anodiseddull",
    hardanodised: "anodiseddull",
    hardanodized: "anodiseddull",
    sodafinish: "sodafinish",
};

const CONTENT: Record<string, CategoryContent> = {
    nonstick: {
        heading: "Non-stick cookware built for wholesale and private-label programs",
        paragraphs: [
            "Our non-stick cookware is manufactured on dedicated aluminium forming and coating lines in Gujranwala, Pakistan, engineered for wholesale buyers who need consistent coating adhesion across large production runs. Each body is pressure-cast or deep-drawn from food-grade aluminium, then coated and cured to a repeatable film thickness so the pieces in order number ten match the samples you approved in order number one.",
            "For importers and retailers, the appeal is predictability. We publish MOQs, lead times, and FOB Karachi pricing up front, and every batch passes an in-house release inspection before it is sealed for export. Non-stick is our most requested range for gift-set programs and everyday retail lines, and it supports OEM / private-label branding — your logo, colour, and packaging on our production platform.",
            "Typical buyers include wholesale importers comparing aluminium cookware suppliers, retail chains building house-brand cookware, and distributors assembling wedding and promotional gift sets. If you are sourcing non-stick cookware sets for a specific market, share your target price band and we will map it to the right gauge, coating tier, and set configuration.",
        ],
        specs: [
            { label: "Base material", value: "Food-grade aluminium (pressure-cast / deep-drawn)" },
            { label: "Coating", value: "Multi-layer non-stick, cured to repeatable film thickness" },
            { label: "Typical MOQ", value: "50 units per SKU (mix-and-match on request)" },
            { label: "Branding", value: "OEM / private label — logo, colour, packaging" },
            { label: "Export", value: "FOB Karachi, export-grade packing" },
        ],
        faqs: [
            {
                question: "Do you supply non-stick cookware for private-label / OEM programs?",
                answer:
                    "Yes. We manufacture non-stick cookware under OEM and private-label terms, applying your brand, colourway, and packaging to our production platform. Minimum order quantities and tooling requirements depend on the configuration.",
            },
            {
                question: "What is the minimum order quantity for non-stick cookware?",
                answer:
                    "Typical MOQ is 50 units per SKU, with mix-and-match options across set sizes. Share your target market and price band and we will confirm the exact MOQ for your specification.",
            },
            {
                question: "Is your non-stick coating suitable for export markets?",
                answer:
                    "Yes. Our non-stick coatings are cured to a repeatable film thickness and batch-inspected before export packing. We ship FOB Karachi with documentation prepared for international buyers.",
            },
        ],
    },
    metalfinish: {
        heading: "Metal finish cookware and gift sets for retail and wholesale buyers",
        paragraphs: [
            "Our metal finish cookware carries a bright, polished aluminium surface prized for presentation as much as performance. It is the range wholesale buyers reach for when the cookware itself is part of the display — wedding gift sets, promotional bundles, and premium retail lines where shelf appeal drives the sale. Every piece is finished on lines tuned for a consistent lustre across the full order.",
            "Because the finish is unforgiving of variation, this range is where our batch-inspection discipline matters most: units are checked for surface uniformity before they are packed. We produce metal finish gift sets in common 15- and 18-piece configurations, and we support custom set builds for buyers who want a distinctive assortment for their market.",
            "Buyers typically include gifting distributors, retail chains sourcing house-brand presentation cookware, and exporters supplying markets where polished aluminium sets remain a category staple. Send us your set specification and target price and we will return sampling timelines and FOB pricing bands.",
        ],
        specs: [
            { label: "Finish", value: "Bright polished aluminium, uniformity-inspected" },
            { label: "Popular sets", value: "15-piece and 18-piece gift configurations" },
            { label: "Typical MOQ", value: "50 units per SKU (custom set builds on request)" },
            { label: "Branding", value: "Custom packaging and set assortment" },
            { label: "Export", value: "FOB Karachi, presentation-grade packing" },
        ],
        faqs: [
            {
                question: "Do you make metal finish gift sets for wholesale and export?",
                answer:
                    "Yes. Metal finish gift sets are one of our core wholesale ranges, produced in 15- and 18-piece configurations and custom builds, with export-ready packing shipped FOB Karachi.",
            },
            {
                question: "Can you customise the set assortment and packaging?",
                answer:
                    "Yes. We build custom set assortments and packaging for retail and gifting programs. Share your target market and price band and we will propose a configuration.",
            },
            {
                question: "How do you keep the polished finish consistent across a large order?",
                answer:
                    "Metal finish units are surface-inspected for uniformity before packing, and the finishing line is tuned so early and late units in the same order match.",
            },
        ],
    },
    anodiseddull: {
        heading: "Hard anodised and dull-finish cooking sets for heavy-duty kitchens",
        paragraphs: [
            "Our anodised and dull-finish cookware is built for durability. The hard-anodised surface resists scratching and wear, and the matte dull finish hides everyday marks, which makes this range a favourite for commercial kitchens, catering suppliers, and export markets that prioritise longevity over shine. Bodies are formed from heavier-gauge aluminium so the pieces hold heat and shape through demanding use.",
            "For wholesale buyers, anodised cookware is the specification-driven end of our catalogue: gauge, base thickness, and finish depth are repeatable batch to batch, and we document them so re-orders match. This is the range buyers choose when they need dependable specs across recurring shipments rather than a seasonal look.",
            "Typical buyers include catering and HORECA suppliers, distributors serving durable-goods retail, and importers who need cookware that survives long ocean legs and heavy handling. Tell us your gauge and finish target and we will confirm production capacity and FOB pricing.",
        ],
        specs: [
            { label: "Surface", value: "Hard-anodised, scratch- and wear-resistant" },
            { label: "Finish", value: "Matte dull — conceals everyday marks" },
            { label: "Gauge", value: "Heavier-gauge aluminium for heat retention" },
            { label: "Typical MOQ", value: "50 units per SKU" },
            { label: "Export", value: "FOB Karachi, heavy-duty export packing" },
        ],
        faqs: [
            {
                question: "What is the difference between your anodised and metal finish ranges?",
                answer:
                    "Anodised/dull cookware is optimised for durability with a scratch-resistant matte surface for heavy-duty use, while metal finish cookware is a bright polished range optimised for presentation and gifting.",
            },
            {
                question: "Are your anodised cooking sets suitable for commercial kitchens?",
                answer:
                    "Yes. The hard-anodised surface and heavier-gauge bodies are built for demanding commercial and catering use, and specs are documented so re-orders stay consistent.",
            },
            {
                question: "Can I re-order the same specification later?",
                answer:
                    "Yes. Gauge, base thickness, and finish depth are recorded per specification so repeat shipments match your original approved order.",
            },
        ],
    },
    sodafinish: {
        heading: "Soda finish cookware — classic textured aluminium for wholesale supply",
        paragraphs: [
            "Soda finish cookware is our classic range, recognised by its distinctive textured aluminium surface. It remains a category staple in many markets where buyers value the traditional look and the durability of a heavier, honestly finished pan. We manufacture it on the same disciplined lines as the rest of our catalogue, with batch inspection before export packing.",
            "For wholesale buyers, soda finish is a dependable, cost-effective range that ships well and sells steadily. It suits distributors serving traditional retail, exporters supplying established cookware markets, and buyers who want a straightforward aluminium set without a coating or polish premium.",
            "Share your set configuration and target market and we will map it to the right gauge and pricing band, with FOB Karachi terms and export-ready packing.",
        ],
        specs: [
            { label: "Surface", value: "Classic textured soda finish" },
            { label: "Material", value: "Heavier-gauge food-grade aluminium" },
            { label: "Positioning", value: "Cost-effective traditional range" },
            { label: "Typical MOQ", value: "50 units per SKU" },
            { label: "Export", value: "FOB Karachi, export-ready packing" },
        ],
        faqs: [
            {
                question: "What is soda finish cookware?",
                answer:
                    "Soda finish cookware is a classic textured-aluminium range recognised by its distinctive surface. It is a durable, cost-effective staple that remains popular in traditional cookware markets.",
            },
            {
                question: "Is soda finish cheaper than non-stick or metal finish?",
                answer:
                    "Soda finish is typically our most cost-effective range because it has no coating or polishing premium, which makes it a dependable choice for value-focused wholesale programs.",
            },
            {
                question: "Do you export soda finish cookware?",
                answer:
                    "Yes. We supply soda finish cookware to export buyers with batch inspection and export-ready packing, shipped FOB Karachi.",
            },
        ],
    },
};

export function getCategoryContent(slug: string): CategoryContent | null {
    const key = ALIASES[compactKey(slug)] ?? compactKey(slug);
    return CONTENT[key] ?? null;
}
