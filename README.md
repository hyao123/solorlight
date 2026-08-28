# SolarLight – Solar Street Light B2B Export Website

A high-performance bilingual (English/Russian) B2B catalog and inquiry website for industrial solar street lights, built with **Next.js (App Router)**, **next-intl**, **Tailwind CSS**, and **TypeScript**.

## Key Features

- **Bilingual Internationalization (EN / RU)**: Centralized message dictionaries via `next-intl` with full path-preserving language switching.
- **SSG Pre-rendering**: Static site generation for all localized pages (`/en`, `/ru`, `/products`, `/solutions`, `/about`, `/contact`, `/products/[slug]`).
- **Interactive Products & Filtering**: Real-time series filter with URL query synchronization, category counts, and technical specifications grid.
- **Application Scenarios**: Scenario-based lighting solution guides (Highways, Community, Rural, Industrial) with quick comparison matrices.
- **Direct B2B Inquiry Flows**:
  - One-click WhatsApp consultation with pre-filled product inquiries.
  - Interactive email form powered by `@emailjs/browser`.
- **High-Contrast Dark Theme**: Industrial gold & dark slate styling optimized for accessibility and readability.
- **SEO & Structured Data**:
  - Dynamic `sitemap.ts` and `robots.ts` with hreflang alternates.
  - Schema.org JSON-LD structured data on product detail pages.
- **Self-Contained Assets**: High-resolution local image and SVG certificate assets without third-party CDN downtime risks.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS
- **i18n**: `next-intl`
- **Forms**: `@emailjs/browser`
- **Linting & Code Quality**: ESLint 9 (Flat Config)

---

## Getting Started

### Prerequisites

- Node.js >= 20.x
- npm / pnpm / yarn

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure your variables:

```env
NEXT_PUBLIC_SITE_URL=https://solarlight.kz
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Installation & Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verification & Production Build

```bash
# Run linting checks
npm run lint

# Build static production bundle
npm run build
```

---

## Project Structure

```
solarlight/
├── app/
│   ├── [locale]/             # Localized routes (en, ru)
│   │   ├── page.tsx          # Homepage
│   │   ├── about/            # About us page
│   │   ├── contact/          # Contact & inquiry form page
│   │   ├── solutions/        # Application scenarios guide
│   │   └── products/         # Product catalog and [slug] detail pages
│   ├── robots.ts             # Dynamic robots.txt
│   └── sitemap.ts            # Dynamic sitemap.xml
├── components/               # UI components (Header, Footer, ProductGrid, etc.)
├── content/                  # Structured JSON content (products, series, cases, settings)
├── i18n/                     # Next-intl routing & request configuration
├── lib/                      # Data layer queries and image helpers
├── messages/                 # Dictionaries (en.json, ru.json)
├── public/                   # Static assets (images, svg certificates)
└── types/                    # Domain models and TypeScript interfaces
```

---

## License

Proprietary. All rights reserved.

