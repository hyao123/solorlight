import type { MetadataRoute } from 'next'
import { getProducts } from '@/lib/queries'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://solarlight.kz'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()
  const now = new Date()

  const pagePaths = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/products', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/solutions', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
  ]

  const staticRoutes: MetadataRoute.Sitemap = pagePaths.flatMap(({ path, priority, changeFrequency }) => [
    {
      url: `${BASE_URL}/en${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: `${BASE_URL}/en${path}`,
          ru: `${BASE_URL}/ru${path}`,
        },
      },
    },
    {
      url: `${BASE_URL}/ru${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: `${BASE_URL}/en${path}`,
          ru: `${BASE_URL}/ru${path}`,
        },
      },
    },
  ])

  const productRoutes: MetadataRoute.Sitemap = products.flatMap((p) => [
    {
      url: `${BASE_URL}/en/products/${p.slug.current}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
      alternates: {
        languages: {
          en: `${BASE_URL}/en/products/${p.slug.current}`,
          ru: `${BASE_URL}/ru/products/${p.slug.current}`,
        },
      },
    },
    {
      url: `${BASE_URL}/ru/products/${p.slug.current}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
      alternates: {
        languages: {
          en: `${BASE_URL}/en/products/${p.slug.current}`,
          ru: `${BASE_URL}/ru/products/${p.slug.current}`,
        },
      },
    },
  ])

  return [...staticRoutes, ...productRoutes]
}
