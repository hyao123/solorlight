## Task 3 Brief: Sanity Client + GROQ Queries + TypeScript Types

**Plan:** `C:/Users/24960/claudework/docs/superpowers/plans/2026-08-16-solar-street-light-website.md`
**Report file:** `.superpowers/sdd/2026-08-16-solar-street-light-website/task-3-report.md`

### Context
Task 3 of 11. Tasks 1-2 complete. Sanity schemas are in `sanity/schemas/`.
You are writing the data-access layer: TypeScript types, Sanity client, image URL builder, and GROQ queries.

Work directory: `C:/Users/24960/claudework/solarlight`

### Global Constraints
- Sanity v3, `@sanity/client@6`
- No TypeScript `any`
- ISR revalidate: 300 seconds on all product/listing queries
- `getSiteSettings()` returns `SanitySiteSettings` (single object, not array)

### Your task — create these files exactly:

**`types/sanity.ts`**
```ts
export interface BilingualString {
  en: string
  ru: string
}

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; width: number; height: number }
}

export interface SanityProductSeries {
  _id: string
  slug: { current: string }
  name: BilingualString
  description: BilingualString
  coverImage: SanityImage
  targetScene: 'road' | 'community' | 'rural' | 'industrial'
  sortOrder: number
}

export interface SanityProductSpecs {
  wattage: number
  batteryCapacity: number
  lumens: number
  colorTemp: string
  ipRating: string
  poleHeight: number
  workingHours: number
}

export interface SanityCertificate {
  _id: string
  name: string
  logo: SanityImage
  validUntil: string
}

export interface SanityProduct {
  _id: string
  slug: { current: string }
  name: BilingualString
  series: SanityProductSeries
  images: SanityImage[]
  specs: SanityProductSpecs
  description: { en: unknown[]; ru: unknown[] }
  certificates: SanityCertificate[]
  isHotProduct: boolean
  seoTitle: BilingualString
  seoDescription: BilingualString
}

export interface SanitySiteSettings {
  companyName: string
  whatsappNumber: string
  contactEmail: string
  address: BilingualString
  socialLinks: {
    linkedin?: string
    youtube?: string
    alibaba?: string
  }
}
```

**`sanity/lib/client.ts`**
```ts
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  useCdn: true,
})
```

**`sanity/lib/image.ts`**
```ts
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { sanityClient } from './client'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
```

**`sanity/lib/queries.ts`**
```ts
import { sanityClient } from './client'
import type { SanityProduct, SanityProductSeries, SanitySiteSettings } from '@/types/sanity'

const PRODUCT_FIELDS = `
  _id,
  slug,
  name,
  series->{ _id, slug, name, targetScene },
  images,
  specs,
  description,
  certificates[]->{ _id, name, logo, validUntil },
  isHotProduct,
  seoTitle,
  seoDescription
`

export async function getProducts(): Promise<SanityProduct[]> {
  return sanityClient.fetch(
    `*[_type == "product"] | order(isHotProduct desc) { ${PRODUCT_FIELDS} }`,
    {},
    { next: { revalidate: 300 } }
  )
}

export async function getProduct(slug: string): Promise<SanityProduct | null> {
  const results = await sanityClient.fetch<SanityProduct[]>(
    `*[_type == "product" && slug.current == $slug] { ${PRODUCT_FIELDS} }`,
    { slug },
    { next: { revalidate: 300 } }
  )
  return results[0] ?? null
}

export async function getProductSeries(): Promise<SanityProductSeries[]> {
  return sanityClient.fetch(
    `*[_type == "productSeries"] | order(sortOrder asc)`,
    {},
    { next: { revalidate: 300 } }
  )
}

export async function getSiteSettings(): Promise<SanitySiteSettings> {
  return sanityClient.fetch<SanitySiteSettings>(
    `*[_type == "siteSettings"][0]`,
    {},
    { next: { revalidate: 3600 } }
  )
}
```

After writing all files, run:
```bash
npx tsc --noEmit
```
Fix any type errors, then commit:
```bash
git add -A
git commit -m "feat: Sanity client, image builder, GROQ queries, TypeScript types"
```

### Report contract
Write full report to: `C:/Users/24960/claudework/solarlight/.superpowers/sdd/2026-08-16-solar-street-light-website/task-3-report.md`
Return ONLY: Status, commit hash, one-line build summary, concerns if any.
Do NOT dispatch subagents.
