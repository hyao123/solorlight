import type { Metadata } from 'next'
import { JzCatalogueContent } from '@/components/JzCatalogue'
import { BreadcrumbJsonLd } from '@/components/StructuredData'
import { getSiteSettings } from '@/lib/queries'
import catalogue from '@/content/catalogues/jz-split.json'

type Params = { locale: 'en' | 'ru' }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: catalogue.title[locale],
    description: locale === 'en' ? 'Compare five JZ 6–8 m split solar street lights: conch arm, A-arm, meander-pattern pole, clamp and wall mount. Specifications, site guidance and downloadable PDF.' : 'Пять раздельных солнечных фонарей JZ высотой 6–8 м: конструкции, характеристики, условия применения и PDF-каталог.',
    alternates: { canonical: `/${locale}/catalogue/jz-split`, languages: { en: '/en/catalogue/jz-split', ru: '/ru/catalogue/jz-split', 'x-default': '/en/catalogue/jz-split' } },
  }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }]
}

export default async function JzCataloguePage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  const settings = await getSiteSettings()
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://jiazun6888.com'
  return <>
    <BreadcrumbJsonLd items={[
      { name: locale === 'en' ? 'Products' : 'Продукты', url: `${origin}/${locale}/products` },
      { name: catalogue.title[locale], url: `${origin}/${locale}/catalogue/jz-split` },
    ]} />
    <JzCatalogueContent locale={locale} whatsappNumber={settings.whatsappNumber} />
  </>
}
