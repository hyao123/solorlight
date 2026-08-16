## Task 7 Brief: Products Listing + Detail Pages

**Plan:** `C:/Users/24960/claudework/docs/superpowers/plans/2026-08-16-solar-street-light-website.md`
**Report file:** `.superpowers/sdd/2026-08-16-solar-street-light-website/task-7-report.md`

### Context
Task 7 of 11. Tasks 1-6 complete. Homepage with hero and hot products grid is live.
You are building the products listing page and individual product detail pages with static generation.

Work directory: `C:/Users/24960/claudework/solarlight`

### Global Constraints
- Design: slate base (#0F172A), sky accent (#38BDF8), orange CTA (#F97316)
- All components must handle bilingual content via `locale` prop
- Images use Next.js `<Image>` + Sanity's `urlFor()` helper
- Use `generateStaticParams` for static site generation (ISR enabled in queries)
- Product detail pages include JSON-LD structured data for SEO

### Your task — create two pages:

**`app/[locale]/products/page.tsx`**
```tsx
import { getProducts, getProductSeries, getSiteSettings } from '@/sanity/lib/queries'
import { ProductGrid } from '@/components/ProductGrid'

export default async function ProductsPage({ params: { locale } }: { params: { locale: 'en' | 'ru' } }) {
  const [products, series] = await Promise.all([
    getProducts(), getProductSeries()
  ])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">
        {locale === 'en' ? 'Solar Street Lights' : 'Солнечные уличные фонари'}
      </h1>

      {/* Series filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {series.map((s) => (
          <span key={s._id} className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-700">
            {s.name[locale]}
          </span>
        ))}
      </div>

      <ProductGrid products={products} locale={locale} />
    </div>
  )
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }]
}
```

**`app/[locale]/products/[slug]/page.tsx`**
```tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getProduct, getProducts, getSiteSettings } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { ProductSpecs } from '@/components/ProductSpecs'
import { CertificateBadge } from '@/components/CertificateBadge'

interface Params { locale: 'en' | 'ru'; slug: string }

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = await getProduct(params.slug)
  if (!product) return {}
  return {
    title: product.seoTitle[params.locale] || product.name[params.locale],
    description: product.seoDescription[params.locale],
    alternates: {
      languages: {
        en: `/en/products/${params.slug}`,
        ru: `/ru/products/${params.slug}`,
      },
    },
  }
}

export async function generateStaticParams() {
  const products = await getProducts()
  return ['en', 'ru'].flatMap((locale) =>
    products.map((p) => ({ locale, slug: p.slug.current }))
  )
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const [product, settings] = await Promise.all([
    getProduct(params.slug),
    getSiteSettings(),
  ])
  if (!product) notFound()

  const { locale } = params
  const name = product.name[locale]
  const mainImg = product.images?.[0]
    ? urlFor(product.images[0]).width(800).height(600).url()
    : '/placeholder.jpg'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    image: mainImg,
    description: product.seoDescription[locale],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-800">
            <Image src={mainImg} alt={name} fill className="object-cover" priority />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{name}</h1>
            <p className="mt-2 text-sm text-slate-500">{product.series?.name[locale]}</p>
            
            <div className="mt-6">
              <ProductSpecs specs={product.specs} locale={locale} />
            </div>

            {product.certificates.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-semibold text-slate-900">
                  {locale === 'en' ? 'Certifications' : 'Сертификаты'}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {product.certificates.map((cert) => (
                    <CertificateBadge key={cert._id} certificate={cert} />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-3">
              <a
                href={`https://wa.me/${settings.whatsappNumber?.replace(/\D/g, '') ?? ''}?text=${encodeURIComponent(
                  locale === 'en'
                    ? `I'm interested in ${name}`
                    : `Интересует ${name}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg hover:bg-orange-600"
              >
                {locale === 'en' ? 'Request Quote' : 'Запросить цену'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
```

After writing both files, run:
```bash
npx tsc --noEmit
```
Fix any type errors, then commit:
```bash
git add -A
git commit -m "feat: product listing and detail pages with static generation"
```

### Report contract
Write full report to: `C:/Users/24960/claudework/solarlight/.superpowers/sdd/2026-08-16-solar-street-light-website/task-7-report.md`
Return ONLY: Status, commit hash, one-line build summary, concerns if any.
Do NOT dispatch subagents.
