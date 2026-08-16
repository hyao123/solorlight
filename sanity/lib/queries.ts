import { promises as fs } from 'fs'
import path from 'path'
import type { SanityProduct, SanityProductSeries, SanitySiteSettings, SanityCertificate } from '@/types/sanity'

const contentDir = path.join(process.cwd(), 'content')

async function readJsonFile<T>(filePath: string): Promise<T> {
  const fullPath = path.join(contentDir, filePath)
  const fileContent = await fs.readFile(fullPath, 'utf-8')
  return JSON.parse(fileContent)
}

let certificatesCache: SanityCertificate[] | null = null
let seriesCache: SanityProductSeries[] | null = null

async function getCertificates(): Promise<SanityCertificate[]> {
  if (!certificatesCache) {
    certificatesCache = await readJsonFile<SanityCertificate[]>('certificates/index.json')
  }
  return certificatesCache
}

async function getSeries(): Promise<SanityProductSeries[]> {
  if (!seriesCache) {
    seriesCache = await readJsonFile<SanityProductSeries[]>('series/index.json')
  }
  return seriesCache
}

export async function getProducts(): Promise<SanityProduct[]> {
  const [products, certificates, series] = await Promise.all([
    readJsonFile<any[]>('products/index.json'),
    getCertificates(),
    getSeries(),
  ])

  return products.map((product) => ({
    ...product,
    certificates: product.certificates
      .map((certId: string) => certificates.find((c) => c._id === certId))
      .filter(Boolean),
    series: series.find((s) => s._id === product.series) || null,
  }))
}

export async function getProduct(slug: string): Promise<SanityProduct | null> {
  const products = await getProducts()
  return products.find((p) => p.slug.current === slug) || null
}

export async function getProductSeries(): Promise<SanityProductSeries[]> {
  return getSeries()
}

export async function getSiteSettings(): Promise<SanitySiteSettings> {
  return readJsonFile<SanitySiteSettings>('settings.json')
}
