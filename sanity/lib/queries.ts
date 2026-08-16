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
