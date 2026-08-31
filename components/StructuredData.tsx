import React from 'react'

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonLdValue[]
  | { [key: string]: JsonLdValue }

type JsonLdObject = { [key: string]: JsonLdValue }

export function JsonLd({ data }: { data: JsonLdObject }) {
  const serialized = JSON.stringify(data).replace(/</g, '\\u003c')

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  )
}

export function OrganizationJsonLd({
  name,
  url,
  logo,
  description,
  contactPhone,
  email,
}: {
  name: string
  url: string
  logo?: string
  description?: string
  contactPhone?: string
  email?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    ...(logo ? { logo } : {}),
    description:
      description ||
      'Professional manufacturer of industrial solar street lights, LiFePO4 battery solar lighting systems, and off-grid solutions based in Weifang, Shandong, China.',
    foundingLocation: {
      '@type': 'Place',
      name: 'Weifang, Shandong, China',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Weifang',
      addressRegion: 'Shandong',
      postalCode: '261000',
      addressCountry: 'CN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '36.7068',
      longitude: '119.1618',
    },
    areaServed: [
      { '@type': 'Country', name: 'Kazakhstan', identifier: 'KZ' },
      { '@type': 'Country', name: 'Uzbekistan', identifier: 'UZ' },
      { '@type': 'Country', name: 'Kyrgyzstan', identifier: 'KG' },
      { '@type': 'Country', name: 'Tajikistan', identifier: 'TJ' },
      { '@type': 'Country', name: 'Turkmenistan', identifier: 'TM' },
      { '@type': 'Country', name: 'United Arab Emirates', identifier: 'AE' },
      { '@type': 'Country', name: 'Saudi Arabia', identifier: 'SA' },
      { '@type': 'Country', name: 'Oman', identifier: 'OM' },
      { '@type': 'Country', name: 'Azerbaijan', identifier: 'AZ' },
    ],
    knowsAbout: [
      'Solar Street Lighting Systems',
      'LiFePO4 Lithium Battery Energy Storage',
      'Monocrystalline Solar Panels',
      'MPPT Solar Charge Controllers',
      'DIALux Photometric Simulations',
      'Off-Grid Road & Highway Illumination',
      'Municipal Lighting Engineering',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: contactPhone || '+86 158 6612 6888',
        contactType: 'sales',
        email: email || '15866126888@163.com',
        availableLanguage: ['English', 'Russian', 'Chinese'],
      },
    ],
  }

  return <JsonLd data={schema} />
}

export function ProductJsonLd({
  name,
  description,
  images,
  sku,
  url,
  brand = 'SolarLight',
}: {
  name: string
  description: string
  images: string[]
  sku: string
  url: string
  brand?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: images.length > 0 ? images : undefined,
    sku,
    url,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
  }

  return <JsonLd data={schema} />
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <JsonLd data={schema} />
}

export function FAQPageJsonLd({
  faqs,
}: {
  faqs: { q: string; a: string }[]
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  return <JsonLd data={schema} />
}
