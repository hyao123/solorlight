import { promises as fs } from 'fs'
import path from 'path'
import type { Product, ProductSeries, SiteSettings, Certificate, ProjectCase } from '@/types/product'

const contentDir = path.join(process.cwd(), 'content')

async function readJsonFile<T>(filePath: string): Promise<T> {
  const fullPath = path.join(contentDir, filePath)
  const fileContent = await fs.readFile(fullPath, 'utf-8')
  return JSON.parse(fileContent)
}

let certificatesCache: Certificate[] | null = null
let seriesCache: ProductSeries[] | null = null

async function getCertificates(): Promise<Certificate[]> {
  if (!certificatesCache) {
    certificatesCache = await readJsonFile<Certificate[]>('certificates/index.json')
  }
  return certificatesCache
}

async function getSeries(): Promise<ProductSeries[]> {
  if (!seriesCache) {
    seriesCache = await readJsonFile<ProductSeries[]>('series/index.json')
  }
  return seriesCache
}

export async function getProducts(): Promise<Product[]> {
  const [products, certificates, series] = await Promise.all([
    readJsonFile<any[]>('products/index.json'),
    getCertificates(),
    getSeries(),
  ])

  return products.map((product) => ({
    ...product,
    certificates: (product.certificates || [])
      .map((certId: string) => certificates.find((c) => c._id === certId))
      .filter(Boolean),
    series: series.find((s) => s._id === product.series) || null,
  }))
}

export async function getProduct(slug: string): Promise<Product | null> {
  const products = await getProducts()
  return products.find((p) => p.slug.current === slug) || null
}

export async function getProductSeries(): Promise<ProductSeries[]> {
  return getSeries()
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return readJsonFile<SiteSettings>('settings.json')
}

export type { ProjectCase }

export async function getProjectCases(): Promise<ProjectCase[]> {
  return readJsonFile<ProjectCase[]>('cases.json')
}
