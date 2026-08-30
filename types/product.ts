export interface BilingualString {
  en: string
  ru: string
}

export interface ProductImage {
  _type?: 'image'
  asset?: { _ref?: string; _type?: 'reference'; url?: string }
  hotspot?: { x: number; y: number; width: number; height: number }
}

export interface ProductSeries {
  _id: string
  slug: { current: string }
  name: BilingualString
  description: BilingualString
  coverImage?: ProductImage
  targetScene: 'road' | 'community' | 'rural' | 'industrial'
  sortOrder?: number
}

export interface ProductSpecs {
  power?: string
  wattage?: number
  solarPanel?: string
  battery?: string
  batteryCapacity?: number
  lumens?: string | number
  lightingTime?: string
  chargingTime?: string
  colorTemp?: string
  cct?: string
  ipRating?: string
  poleHeight?: number
  mountHeight?: string
  workingHours?: number
  controller?: string
  motionSensor?: string
  efficacy?: string
  panelDimensions?: string
  panelEfficiency?: string
  ledLifetime?: string
  batteryCycles?: string
  autonomy?: string
  nightlyRuntime?: string
  poleConstruction?: string
  arm?: string
  flange?: string
  foundation?: string
  installationNote?: string
}

export interface Certificate {
  _id: string
  name: BilingualString
  image?: string
  logo?: ProductImage
  validUntil?: string
}

export interface Product {
  _id: string
  slug: { current: string }
  name: BilingualString
  series: ProductSeries | string | null
  images: (ProductImage | string)[]
  specs: ProductSpecs
  description?: { en: unknown[]; ru: unknown[] }
  certificates: Certificate[]
  isHotProduct: boolean
  seoTitle: BilingualString
  seoDescription: BilingualString
}

export interface SiteSettings {
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

export interface ProjectCase {
  id: string
  image: string
  location: BilingualString
  scene: string
  caption: BilingualString
}
