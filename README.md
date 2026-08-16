# Solar Street Light Website

A bilingual (English/Russian) website for solar street light products, built with Next.js 15, Sanity CMS, and deployed on Vercel.

## Features

- Bilingual support (EN/RU) with next-intl
- Sanity CMS for product management
- ISR with 5-minute revalidation for product pages
- WhatsApp inquiry integration
- EmailJS contact form
- SEO optimized with sitemap and robots.txt
- Responsive design with Tailwind CSS

## Tech Stack

- Next.js 15.x (App Router)
- TypeScript
- Sanity CMS
- next-intl (i18n)
- EmailJS
- Tailwind CSS
- Vercel (hosting)

## Getting Started

### Prerequisites

- Node.js >= 20
- npm or yarn
- Sanity account
- EmailJS account

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
SITE_URL=https://your-domain.com
```

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Build

```bash
npm run build
```

The postbuild script automatically generates the sitemap.

## Deployment

### Step 1: Push to GitHub

```bash
git remote add origin https://github.com/your-org/solar-street-lights.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository
3. Add all environment variables from `.env.local`
4. Deploy

### Step 3: Deploy Sanity Studio

```bash
npx sanity deploy
```

Enter a studio hostname (e.g., `solar-lights`) → studio will be available at `solar-lights.sanity.studio`

### Step 4: Seed Initial Content

1. Open your Sanity Studio URL
2. Create certificate documents (CE, RoHS)
3. Create product series (Road Lighting, Community Lighting, Rural Off-Grid)
4. Create site settings with company info, WhatsApp number, email
5. Create products with bilingual names and specifications

### Step 5: Verify Deployment

- Visit `your-domain.com` → should redirect to `/en/`
- Visit `your-domain.com/ru` → Russian content should load
- Test WhatsApp inquiry button
- Test contact form submission

## Project Structure

```
solarlight/
├── app/
│   └── [locale]/          # Localized routes
│       ├── products/      # Product listing and detail pages
│       ├── about/         # About page
│       └── contact/       # Contact page
├── components/            # React components
├── i18n/                  # Internationalization config
├── lib/                   # Utilities (Sanity client, etc.)
├── messages/              # Translation files (en.json, ru.json)
├── sanity/                # Sanity schema and config
├── types/                 # TypeScript types
└── public/                # Static assets
```

## License

Proprietary
