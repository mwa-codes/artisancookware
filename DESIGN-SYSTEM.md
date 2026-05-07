# ArtisanCookware Brand Design System

## 📐 Brand Identity

### Logo Files
- **Primary Logo**: `/public/Artisan-logo.jpg` - Full logo with "ArtisanCookware" text and slogan "YOUR KITCHEN NEEDS"
- **Icon Logo**: `/public/a-logo.jpeg` - Standalone red flame symbol on black background
- **Usage**: 
  - Use primary logo on light backgrounds (header, topbar)
  - Use icon logo in compact spaces (footer, mobile, admin sidebar)

### Brand Slogan
**"Your Kitchen Needs"** - Emphasizes comprehensive cookware solutions for professional and home kitchens

---

## 🎨 Color Palette

### Primary Colors
```css
--brand-red: #B71C1C       /* Signature red from logo - Primary CTA, highlights */
--brand-black: #111111     /* Deep black from logo - Admin sidebar, footer */
--brand-gold: #D4AF37      /* Premium gold - Hover accents, premium badges */
```

### Background Colors
```css
--bg-primary: #F9F9F9      /* Main background - Light gray/off-white */
--bg-white: #FFFFFF        /* Cards, surfaces */
--bg-gray-50: #F5F5F5      /* Subtle backgrounds */
```

### Text Colors
```css
--text-heading: #000000    /* Headings, important text */
--text-body: #333333       /* Body text, descriptions */
--text-muted: #666666      /* Secondary text, labels */
--text-light: #999999      /* Disabled, timestamps */
```

### Hover States
```css
--brand-red-hover: #8B1414     /* Darker red for hover */
--brand-gold-hover: #C5A028    /* Darker gold for hover */
```

---

## 📝 Typography

### Font Families
```css
/* Headings & Display */
font-family: 'Inter', 'Poppins', 'Source Sans Pro', sans-serif;

/* Body & UI */
font-family: 'Inter', 'Source Sans Pro', sans-serif;
```

### Type Scale
```css
.heading-hero    → text-5xl (48px) / sm:text-6xl / lg:text-7xl | Bold
.heading-section → text-3xl (30px) / sm:text-4xl / lg:text-5xl | Bold
.heading-card    → text-xl (20px) | Semibold
.text-body-large → text-lg (18px) | Regular, leading-relaxed
```

### Font Weights
- **Regular**: 400 (body text)
- **Medium**: 500 (labels)
- **Semibold**: 600 (subheadings, card titles)
- **Bold**: 700 (headings, CTA buttons)
- **Extra Bold**: 800-900 (hero headlines)

---

## 🎯 Component Library

### Buttons

#### Primary Button (Red with Gold Hover)
```tsx
<button className="btn-primary-gold">
  Explore Collections
</button>
```
**Style**: Red background, white text, gold hover, shadow glow

#### Primary Button (Red)
```tsx
<button className="btn-primary">
  Add to Cart
</button>
```
**Style**: Red background, white text, darker red hover

#### Secondary Button
```tsx
<button className="btn-secondary">
  Learn More
</button>
```
**Style**: White background, black border, hover bg-gray-50

#### Ghost Button
```tsx
<button className="btn-ghost">
  Cancel
</button>
```
**Style**: Transparent, hover bg-gray-100

---

### Cards

#### Product Card
- **Border**: Rounded-2xl, border-gray-200
- **Shadow**: shadow-card with hover:shadow-card-hover
- **Hover**: Lift (-translate-y-1), red gradient overlay
- **Badge**: Red category badge (top-left)
- **CTA**: Red button with gold hover

#### Category Card
- **Border**: Rounded-2xl, border-gray-200
- **Shadow**: shadow-card with hover:shadow-card-hover
- **Hover**: Lift (-translate-y-2), red/gold gradient overlay
- **Badge**: Red "Premium collection" badge
- **CTA Footer**: Gray background with red text on hover

---

### Form Inputs

#### Text Input
```tsx
<input className="input-premium" />
```
**Style**: Rounded-2xl, border-gray-300, focus:red ring

#### Textarea
```tsx
<textarea className="textarea-premium" />
```
**Style**: Same as input, min-height 120px

---

### Badges

```tsx
<span className="badge-red">ISO Certified</span>
<span className="badge-gold">Export Quality</span>
<span className="badge-black">Premium</span>
```

---

## 📄 Page Layouts

### Homepage Hero
- **Background**: White with subtle red/gold gradient overlays
- **Headline**: Large bold text with gradient (red → gold)
- **CTA**: Red primary button with gold hover
- **Trust Badge**: Red badge with "Premium Pakistani Craftsmanship"
- **Features**: 3 trust icons in card format
- **Image**: Product showcase with stat cards

### Product Listing
- **Grid**: 3-4 columns responsive
- **Card Style**: White cards with shadows
- **Hover**: Red gradient overlay, lift effect
- **CTA**: Red "View" button with gold hover

### Admin Dashboard

#### Sidebar (Black)
- **Background**: #111111 (brand-black)
- **Active Link**: Red background with shadow
- **Inactive**: Gray text, hover:gray-800
- **Logo**: Icon logo with text overlay
- **Border**: white/10 dividers

#### Topbar (White)
- **Background**: White with border-gray-200
- **Logo**: Full logo with slogan
- **Badge**: Red "Admin Dashboard" label
- **Logout**: Gray button with red hover

#### Tables
- **Border**: Rounded-2xl, border-gray-200
- **Header**: bg-gray-50
- **Rows**: Hover:bg-gray-50
- **Buttons**: Red primary, gray secondary

---

## 🖼️ Logo Usage Guidelines

### Header (Public Site)
```tsx
<Image 
  src="/Artisan-logo.jpg" 
  alt="ArtisanCookware - Your Kitchen Needs"
  width={220} 
  height={52}
  className="h-11 w-auto"
/>
```

### Footer
```tsx
<Image 
  src="/a-logo.jpeg" 
  alt="ArtisanCookware Logo"
  fill
  className="object-cover"
/>
```
+ Text: "ArtisanCookware" + "Your Kitchen Needs"

### Admin Sidebar
```tsx
<Image 
  src="/a-logo.jpeg" 
  alt="ArtisanCookware"
  fill
  className="object-cover"
/>
```
+ Text overlay

### Admin Topbar
- **Mobile**: Icon logo only (`/a-logo.jpeg`)
- **Desktop**: Full logo (`/Artisan-logo.jpg`)

---

## 🎭 Shadow System

```css
/* Card shadows */
shadow-card         → subtle elevation
shadow-card-hover   → lifted on hover
shadow-elegant      → premium soft shadow

/* Glow effects */
shadow-glow         → red glow for buttons
shadow-glow-gold    → gold glow for premium CTAs
```

---

## 🌐 Responsive Breakpoints

```css
sm: 640px   → Mobile landscape
md: 768px   → Tablet
lg: 1024px  → Desktop
xl: 1280px  → Large desktop
2xl: 1536px → Extra large
```

---

## ✨ Animation & Transitions

### Hover Effects
- **Cards**: Lift -translate-y-1 or -translate-y-2
- **Buttons**: Lift -translate-y-0.5, shadow increase
- **Images**: Scale 105% on product cards

### Duration
- **Fast**: 200-300ms (buttons, links)
- **Standard**: 300-500ms (cards, overlays)
- **Slow**: 500-700ms (images, large elements)

---

## 📱 Mobile-First Design

1. **Stack vertically** on mobile
2. **Show icon logo** in compact spaces
3. **Hamburger menu** for navigation
4. **Touch-friendly targets** (min 44x44px)
5. **Simplified admin tables** with horizontal scroll

---

## 🎯 Brand Voice & Tone

- **Professional**: ISO certified, export quality
- **Premium**: Luxury positioning, high-quality materials
- **Trustworthy**: 25+ years experience, international clients
- **Pakistani Pride**: Gujranwala craftsmanship

---

## 📦 Component Examples

### Hero CTA
```tsx
<Link href="/categories" className="btn-primary-gold group">
  Explore Collections
  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
</Link>
```

### Product Card
```tsx
<article className="product-card group transition-all hover:-translate-y-1">
  {/* Image with red overlay on hover */}
  {/* Category badge (red) */}
  {/* Product name & description */}
  {/* Price + red CTA button */}
</article>
```

### Category Card
```tsx
<Link className="group rounded-2xl border bg-white hover:-translate-y-2">
  {/* Red/gold gradient overlay on hover */}
  {/* "Premium collection" badge */}
  {/* Category name & description */}
  {/* CTA footer with red icon */}
</Link>
```

---

## 🔗 External Links

- **Fonts**: Google Fonts (Inter, Poppins)
- **Icons**: Lucide React
- **Framework**: Next.js 14 + Tailwind CSS

---

**Last Updated**: October 4, 2025  
**Version**: 1.0  
**Designer**: AI Design System for ArtisanCookware
