import React from 'react'

export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
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
    logo: logo || `${url}/images/products/road-90w.jpg`,
    description:
      description ||
      'Manufacturer of industrial solar street lights, LiFePO4 solar lighting systems, and off-grid solutions.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Shenzhen',
      addressRegion: 'Guangdong',
      addressCountry: 'CN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: contactPhone || '+86 138 0000 0000',
        contactType: 'sales',
        email: email || 'sales@solarlight.kz',
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
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      price: '0.00',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: brand,
      },
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