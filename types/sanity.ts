export interface BilingualString {
  en: string
  ru: string
}

export interface SanityImage {
  _type?: 'image'
  asset?: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; width: number; height: number }
}

export interface SanityProductSeries {
  _id: string
  slug: { current: string }
  name: BilingualString
  description: BilingualString
  coverImage?: SanityImage
  targetScene: 'road' | 'community' | 'rural' | 'industrial'
  sortOrder?: number
}

export interface SanityProductSpecs {
  power?: string
  wattage?: number
  solarPanel?: string
  battery?: string
  batteryCapacity?: number
  lumens?: string | number
  lightingTime?: string
  chargingTime?: string
  colorTemp?: string
  ipRating?: string
  poleHeight?: number
  workingHours?: number
}

export interface SanityCertificate {
  _id: string
  name: BilingualString
  image?: string
  logo?: SanityImage
  validUntil?: string
}

export interface SanityProduct {
  _id: string
  slug: { current: string }
  name: BilingualString
  series: SanityProductSeries | null
  images: (SanityImage | string)[]
  specs: SanityProductSpecs
  description?: { en: unknown[]; ru: unknown[] }
  certificates: SanityCertificate[]
  isHotProduct: boolean
  seoTitle: BilingualString
  seoDescription: BilingualString
}

export interface SanitySiteSettings {
  companyName: BilingualString
  tagline?: BilingualString
  whatsappNumber: string
  email?: string
  contactEmail?: string
  address: BilingualString
  socialLinks?: {
    linkedin?: string
    youtube?: string
    alibaba?: string
  }
}
