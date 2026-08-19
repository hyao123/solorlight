import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getSiteSettings } from '@/lib/queries'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
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

  return {
    metadataBase: new URL('https://solarlight-solutions.com'),
    title: {
      default: en
        ? `${company} – Solar Street Lights for Central Asia`
        : `${company} – Солнечные фонари для Центральной Азии`,
      template: `%s | ${company}`,
    },
    description: en
      ? 'CE & RoHS certified solar street lights. 20 W–150 W, LiFePO4 battery, 5-year warranty. Ships to Kazakhstan, Uzbekistan, and 20+ countries.'
      : 'Солнечные уличные фонари с сертификатами CE и RoHS. 20–150 Вт, батарея LiFePO4, гарантия 5 лет. Доставка в Казахстан, Узбекистан и 20+ стран.',
    keywords: en
      ? ['solar street light', 'solar street lamp', 'Kazakhstan', 'Uzbekistan', 'Central Asia', 'CE certified', 'LiFePO4', 'off-grid lighting']
      : ['солнечный уличный фонарь', 'Казахстан', 'Узбекистан', 'Центральная Азия', 'CE сертификат', 'LiFePO4'],
    openGraph: {
      type: 'website',
      locale: en ? 'en_US' : 'ru_RU',
      siteName: company,
      title: en
        ? `${company} – Solar Street Lights for Central Asia`
        : `${company} – Солнечные фонари для Центральной Азии`,
      description: en
        ? 'CE & RoHS certified solar street lights. 5-year warranty. Ships to Kazakhstan, Uzbekistan & beyond.'
        : 'Солнечные фонари с CE и RoHS. Гарантия 5 лет. Казахстан, Узбекистан и другие страны.',
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
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
  const settings = await getSiteSettings()

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased`}>
        <NextIntlClientProvider messages={{}}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer settings={settings} />
          <WhatsAppButton phone={settings.whatsappNumber} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
