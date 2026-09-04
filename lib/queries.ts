import { promises as fs } from 'fs'
import path from 'path'
import type { Product, ProductSeries, SiteSettings, Certificate, ProjectCase } from '@/types/product'

const contentDir = path.join(process.cwd(), 'content')

async function readJsonFile<T>(filePath: string): Promise<T> {
  const fullPath = path.join(contentDir, filePath)
  const fileContent = await fs.readFile(fullPath, 'utf-8')
  return JSON.parse(fileContent)
}

type RawProduct = Omit<Product, 'certificates' | 'series'> & {
  certificates?: string[]
  series?: string | null
}

let certificatesCache: Promise<Certificate[]> | null = null
let seriesCache: Promise<ProductSeries[]> | null = null
let rawProductsCache: Promise<RawProduct[]> | null = null
let productsCache: Promise<Product[]> | null = null
let settingsCache: Promise<SiteSettings> | null = null
let casesCache: Promise<ProjectCase[]> | null = null

async function getCertificates(): Promise<Certificate[]> {
  certificatesCache ??= readJsonFile<Certificate[]>('certificates/index.json')
  return certificatesCache
}

async function getSeries(): Promise<ProductSeries[]> {
  seriesCache ??= readJsonFile<ProductSeries[]>('series/index.json')
  return seriesCache
}

async function getRawProducts(): Promise<RawProduct[]> {
  rawProductsCache ??= readJsonFile<RawProduct[]>('products/index.json')
  return rawProductsCache
}

async function loadProducts(): Promise<Product[]> {
  const [products, certificates, series] = await Promise.all([getRawProducts(), getCertificates(), getSeries()])
  const certificatesById = new Map(certificates.map((certificate) => [certificate._id, certificate]))
  const seriesById = new Map(series.map((productSeries) => [productSeries._id, productSeries]))

  return products.map((product) => ({
    ...product,
    certificates: (product.certificates ?? [])
      .map((certId) => certificatesById.get(certId))
      .filter((certificate): certificate is Certificate => Boolean(certificate)),
    series: product.series ? seriesById.get(product.series) ?? null : null,
  }))
}

export async function getProducts(): Promise<Product[]> {
  productsCache ??= loadProducts()
  return productsCache
}

export async function getProduct(slug: string): Promise<Product | null> {
  const products = await getProducts()
  return products.find((p) => p.slug.current === slug) || null
}

export async function getProductSeries(): Promise<ProductSeries[]> {
  return getSeries()
}

export async function getSiteSettings(): Promise<SiteSettings> {
  settingsCache ??= readJsonFile<SiteSettings>('settings.json')
  return settingsCache
}

export type { ProjectCase }

export async function getProjectCases(): Promise<ProjectCase[]> {
  casesCache ??= readJsonFile<ProjectCase[]>('cases.json')
  return casesCache
}
