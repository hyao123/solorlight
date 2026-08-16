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
