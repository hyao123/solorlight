import { getSiteSettings } from '@/sanity/lib/queries'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }): Promise<Metadata> {
  const { locale } = await params
  const settings = await getSiteSettings()
  const title = locale === 'en' ? 'About Us' : 'О нас'
  const description = locale === 'en'
    ? `Learn about ${settings.companyName}, a professional solar street light manufacturer with over 10 years of export experience.`
    : `Узнайте о ${settings.companyName}, профессиональном производителе солнечных уличных фонарей с более чем 10-летним опытом экспорта.`

  return {
    title,
    description,
    alternates: {
      languages: {
        en: '/en/about',
        ru: '/ru/about',
      },
    },
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }) {
  const { locale } = await params
  const settings = await getSiteSettings()

  const content = {
    en: {
      title: 'About Us',
      intro: `${settings.companyName} is a professional solar street light manufacturer with over 10 years of export experience. We supply governments, municipalities, and private developers across Central Asia and the Middle East.`,
      certTitle: 'Our Certifications',
    },
    ru: {
      title: 'О нас',
      intro: `${settings.companyName} — профессиональный производитель солнечных уличных фонарей с более чем 10-летним опытом экспорта. Мы поставляем продукцию правительствам, муниципалитетам и частным застройщикам в Центральной Азии и на Ближнем Востоке.`,
      certTitle: 'Наши сертификаты',
    },
  }[locale]

  const certs = ['CE', 'RoHS', 'ISO 9001', 'IEC 60598']

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">{content.title}</h1>
      <p className="text-lg text-slate-600">{content.intro}</p>
      <h2 className="mb-4 mt-12 text-xl font-semibold text-slate-900">{content.certTitle}</h2>
      <div className="flex flex-wrap gap-4">
        {certs.map((c) => (
          <span key={c} className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 ring-1 ring-orange-200">
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }]
}
