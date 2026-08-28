import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { getSiteSettings } from '@/lib/queries'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FloatingInquiryWidget } from '@/components/FloatingInquiryWidget'
import { OrganizationJsonLd } from '@/components/StructuredData'
import '../globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const en = locale === 'en'
  const settings = await getSiteSettings()
  const company = settings.companyName[en ? 'en' : 'ru']

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solarlight.kz'

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: en
        ? `${company} – Industrial Solar Street Lights Manufacturer (Weifang, China)`
        : `${company} – Завод солнечных уличных фонарей (Вэйфан, Китай)`,
      template: `%s | ${company}`,
    },
    description: en
      ? 'Direct manufacturer of CE & RoHS certified solar street lights (20W–150W). High-efficiency LiFePO4 battery & MPPT system engineered for Central Asia (-30°C) and Middle East (+60°C). Factory in Weifang, Shandong.'
      : 'Прямой завод-производитель солнечных уличных фонарей (20–150 Вт) с сертификатами CE и RoHS. Батареи LiFePO4 для морозов Центральной Азии (-30°C) и жары (+60°C). Завод в Вэйфане (Шаньдун).',
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
        ? 'Direct manufacturer of industrial solar street lights. 5-year warranty, -30°C winter-proof LiFePO4 battery. Rail & sea freight to Central Asia and Middle East.'
        : 'Прямой производитель промышленных солнечных фонарей. Гарантия 5 лет, морозостойкие батареи LiFePO4 до -30°C. Доставка в Центральную Азию.',
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
  const [settings, messages] = await Promise.all([
    getSiteSettings(),
    getMessages(),
  ])

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased`}>
        <OrganizationJsonLd
          name={settings.companyName[locale === 'ru' ? 'ru' : 'en']}
          url={process.env.NEXT_PUBLIC_SITE_URL || 'https://solarlight.kz'}
          contactPhone={settings.whatsappNumber}
          email={settings.email}
        />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer settings={settings} />
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
