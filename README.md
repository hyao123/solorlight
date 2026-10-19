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

- Node.js 24.x LTS (recommended production runtime)
- npm / pnpm / yarn

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure your variables:

```env
NEXT_PUBLIC_SITE_URL=https://jiazun6888.com
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

# Run regression tests
npm test

# Build the Next.js production application
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

## Free personal-site deployment

For the current use case—an author profile and social-media landing page—use Netlify Free with the existing domain. Connect the Git repository, keep the production branch `master`, select the Next.js framework, and set `NEXT_PUBLIC_SITE_URL=https://jiazun6888.com` before building. The repository's `netlify.toml` sets Node 24, the build command, publish directory, and security headers. Netlify automatically supplies its current Next.js adapter; do not pin a legacy adapter. Do not add a database, CMS, or separate CDN at this stage.

The current Free plan includes a 300-credit monthly hard limit shared by production deploys, traffic, and compute. It incurs no overage charges, but reaching the limit can pause all sites on the account. Avoid unnecessary production builds; use deploy previews for review. Verify the current plan limits when creating the site. The current product and quotation content makes Vercel Hobby's restriction to non-commercial personal use a poor fit, even if the site is personally owned.

The free deployment still serves the current Next.js application, including the language proxy and image optimization; it is not a static export. Validate these features on the Netlify preview before changing DNS. The existing form remains a browser-side EmailJS contact path, with its own account and quota requirements. Keep WhatsApp and the existing `15866126888@163.com` contact available; no paid email service is required for this phase.

### Production domain

Primary URL: `https://jiazun6888.com`. Add both the root domain and `www.jiazun6888.com` to Netlify's Domain management, select the root domain as primary, and copy the DNS records from that site's domain setup panel. Existing DNS hosting can remain in place. Wait for HTTPS provisioning and verify the www redirect preserves paths and query parameters. This application requires Next.js hosting support; it is not a static export.

See [deployment plan](docs/方案设计.md) for the domain setup and launch checklist.

## License

Proprietary. All rights reserved.

