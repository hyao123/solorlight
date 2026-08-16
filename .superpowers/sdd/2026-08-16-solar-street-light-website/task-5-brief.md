## Task 5 Brief: Product Components

**Plan:** `C:/Users/24960/claudework/docs/superpowers/plans/2026-08-16-solar-street-light-website.md`
**Report file:** `.superpowers/sdd/2026-08-16-solar-street-light-website/task-5-report.md`

### Context
Task 5 of 11. Tasks 1-4 complete. Layout components (Header, Footer, WhatsApp) are in place.
You are building reusable product display components: ProductCard, ProductGrid, ProductSpecs, CertificateBadge.

Work directory: `C:/Users/24960/claudework/solarlight`

### Global Constraints
- Design: slate base (#0F172A), sky accent (#38BDF8), orange CTA (#F97316)
- All components must handle bilingual content via `locale` prop
- Images use Next.js `<Image>` + Sanity's `urlFor()` helper
- Card radius: 12px, slate borders, controlled shadows

### Your task — create these components:

**`components/ProductCard.tsx`**
```tsx
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityProduct } from '@/types/sanity'

interface ProductCardProps {
  product: SanityProduct
  locale: 'en' | 'ru'
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const imageUrl = product.images[0] ? urlFor(product.images[0]).width(400).height(300).url() : '/placeholder.jpg'

  return (
    <Link
      href={`/${locale}/products/${product.slug.current}`}
      className="group block overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
        <Image
          src={imageUrl}
          alt={product.name[locale]}
          fill
          className="object-cover transition group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.isHotProduct && (
          <div className="absolute right-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
            HOT
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-slate-50 group-hover:text-sky-400">
          {product.name[locale]}
        </h3>
        <div className="mb-3 flex flex-wrap gap-2 text-sm text-slate-400">
          <span>{product.specs.wattage}W</span>
          <span>•</span>
          <span>{product.specs.lumens} lm</span>
          <span>•</span>
          <span>{product.specs.ipRating}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {product.certificates.length} {locale === 'en' ? 'Certificates' : 'Сертификатов'}
        </div>
      </div>
    </Link>
  )
}
```

**`components/ProductGrid.tsx`**
```tsx
import { ProductCard } from './ProductCard'
import type { SanityProduct } from '@/types/sanity'

interface ProductGridProps {
  products: SanityProduct[]
  locale: 'en' | 'ru'
}

export function ProductGrid({ products, locale }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center text-slate-400">
        {locale === 'en' ? 'No products found' : 'Продукты не найдены'}
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} locale={locale} />
      ))}
    </div>
  )
}
```

**`components/ProductSpecs.tsx`**
```tsx
import type { SanityProductSpecs } from '@/types/sanity'

interface ProductSpecsProps {
  specs: SanityProductSpecs
  locale: 'en' | 'ru'
}

export function ProductSpecs({ specs, locale }: ProductSpecsProps) {
  const labels: Record<keyof SanityProductSpecs, { en: string; ru: string }> = {
    wattage: { en: 'Wattage', ru: 'Мощность' },
    batteryCapacity: { en: 'Battery Capacity', ru: 'Емкость батареи' },
    lumens: { en: 'Lumens', ru: 'Световой поток' },
    colorTemp: { en: 'Color Temperature', ru: 'Цветовая температура' },
    ipRating: { en: 'IP Rating', ru: 'Класс защиты IP' },
    poleHeight: { en: 'Pole Height', ru: 'Высота столба' },
    workingHours: { en: 'Working Hours/Night', ru: 'Часы работы/ночь' },
  }

  const renderValue = (key: keyof SanityProductSpecs, value: number | string) => {
    if (key === 'wattage') return `${value} W`
    if (key === 'batteryCapacity') return `${value} Ah`
    if (key === 'lumens') return `${value} lm`
    if (key === 'poleHeight') return `${value} m`
    if (key === 'workingHours') return `${value} h`
    return value
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="mb-4 text-xl font-semibold text-slate-50">
        {locale === 'en' ? 'Technical Specifications' : 'Технические характеристики'}
      </h3>
      <dl className="grid gap-4 sm:grid-cols-2">
        {(Object.keys(specs) as Array<keyof SanityProductSpecs>).map((key) => (
          <div key={key} className="border-b border-slate-800 pb-3">
            <dt className="text-sm text-slate-400">{labels[key][locale]}</dt>
            <dd className="mt-1 text-base font-medium text-slate-50">{renderValue(key, specs[key])}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
```

**`components/CertificateBadge.tsx`**
```tsx
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityCertificate } from '@/types/sanity'

interface CertificateBadgeProps {
  certificate: SanityCertificate
}

export function CertificateBadge({ certificate }: CertificateBadgeProps) {
  const logoUrl = urlFor(certificate.logo).width(80).height(80).url()

  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 p-3">
      <div className="relative h-12 w-12 flex-shrink-0">
        <Image src={logoUrl} alt={certificate.name} fill className="object-contain" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-50">{certificate.name}</p>
        {certificate.validUntil && (
          <p className="text-xs text-slate-500">Valid until {certificate.validUntil}</p>
        )}
      </div>
    </div>
  )
}
```

**Create placeholder image `public/placeholder.jpg`** (a 400x300 dark slate rectangle with "No Image" text centered — use any method: ImageMagick convert, Node canvas, or copy an existing placeholder).

After writing all files, run:
```bash
npx tsc --noEmit
```
Fix any type errors, then commit:
```bash
git add -A
git commit -m "feat: ProductCard, ProductGrid, ProductSpecs, CertificateBadge components"
```

### Report contract
Write full report to: `C:/Users/24960/claudework/solarlight/.superpowers/sdd/2026-08-16-solar-street-light-website/task-5-report.md`
Return ONLY: Status, commit hash, one-line build summary, concerns if any.
Do NOT dispatch subagents.
