import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getSiteSettings } from '@/lib/queries'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FloatingInquiryWidget } from '@/components/FloatingInquiryWidget'
import { OrganizationJsonLd } from '@/components/StructuredData'
import '../globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const dynamicParams = false

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const en = locale === 'en'
  const settings = await getSiteSettings()
  const company = settings.companyName[en ? 'en' : 'ru']

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jiazun6888.com'

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: en
        ? `${company} – Industrial Solar Street Lights Manufacturer (Weifang, China)`
        : `${company} – Завод солнечных уличных фонарей (Вэйфан, Китай)`,
      template: `%s | ${company}`,
    },
    description: en
      ? 'Direct manufacturer of solar street lights (20W–150W). Compare model specifications and confirm the battery, controller, climate suitability and compliance documents for your project. Weifang, Shandong.'
      : 'Производитель солнечных фонарей (20–150 Вт). Сравните модели и согласуйте батарею, контроллер, климатические условия и документы для проекта. Вэйфан, Шаньдун.',
    keywords: en
      ? [
          'solar street light manufacturer',
          'solar street lamp factory China',
          'Weifang Shandong solar lighting',
          'Kazakhstan solar street lights',
          'Uzbekistan solar lighting supplier',
          'Kyrgyzstan solar road lighting',
          'LiFePO4 solar street light',
          'Central Asia solar lamp',
          'all in one solar street light',
          'off-grid solar lighting engineering',
          'CE certified solar light factory',
        ]
      : [
          'производитель солнечных уличных фонарей',
          'завод солнечных светильников Вэйфан Шаньдун',
          'солнечные уличные фонари Казахстан',
          'солнечное освещение дорог Узбекистан',
          'автономные фонари Кыргызстан',
          'солнечные светильники LiFePO4',
          'Центральная Азия уличное освещение',
          'завод светодиодных солнечных фонарей',
          'CE RoHS сертификация фонари',
        ],
    openGraph: {
      type: 'website',
      locale: en ? 'en_US' : 'ru_RU',
      siteName: company,
      title: en
        ? `${company} – Industrial Solar Street Lights Manufacturer`
        : `${company} – Завод солнечных уличных фонарей (Вэйфан, Китай)`,
      description: en
        ? 'Solar street light manufacturer. Model-specific warranty and project configurations. Rail & sea freight to Central Asia and the Middle East.'
        : 'Производитель солнечных фонарей. Гарантия по модели и комплектация для объекта. Доставка в Центральную Азию и на Ближний Восток.',
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    other: {
      'geo.region': 'CN-SD',
      'geo.placename': 'Weifang, Shandong, China',
      'geo.position': '36.7068;119.1618',
      ICBM: '36.7068, 119.1618',
      'target-markets': 'Kazakhstan, Uzbekistan, Kyrgyzstan, Tajikistan, Turkmenistan, UAE, Saudi Arabia, Oman, Central Asia, Middle East',
    },
    alternates: {
      languages: {
        en: '/en',
        ru: '/ru',
        'x-default': '/en',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const [settings, messages] = await Promise.all([
    getSiteSettings(),
    getMessages({ locale }),
  ])

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased`}>
        <OrganizationJsonLd
          name={settings.companyName[locale === 'ru' ? 'ru' : 'en']}
          url={process.env.NEXT_PUBLIC_SITE_URL || 'https://jiazun6888.com'}
          contactPhone={settings.whatsappNumber}
          email={settings.email}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header whatsappNumber={settings.whatsappNumber} />
          <main className="min-h-screen">{children}</main>
          <Footer settings={settings} locale={locale === 'ru' ? 'ru' : 'en'} />
          <FloatingInquiryWidget
            whatsappNumber={settings.whatsappNumber}
            email={settings.email}
            locale={locale === 'ru' ? 'ru' : 'en'}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
