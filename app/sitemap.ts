import type { MetadataRoute } from 'next'
import { getProducts } from '@/sanity/lib/queries'

const BASE_URL = process.env.SITE_URL ?? 'https://solarlight-solutions.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/en`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/ru`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/en/products`,  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/ru/products`,  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/en/solutions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/ru/solutions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/en/about`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/ru/about`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/en/contact`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/ru/contact`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const productRoutes: MetadataRoute.Sitemap = products.flatMap((p) => [
    { url: `${BASE_URL}/en/products/${p.slug.current}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/ru/products/${p.slug.current}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
  ])

  return [...staticRoutes, ...productRoutes]
}
