import { getProducts, getProductSeries } from '@/lib/queries'
import { ProductsFilter } from '@/components/ProductsFilter'
import { CatalogueShowcase } from '@/components/CatalogueShowcase'
import { BreadcrumbJsonLd } from '@/components/StructuredData'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }): Promise<Metadata> {
  const { locale } = await params
  const title = locale === 'en' ? 'Solar Street Lights' : 'Солнечные уличные фонари'
  const description = locale === 'en'
    ? 'Browse our complete range of solar street lights. High-efficiency panels, long-life LiFePO4 batteries, and professional-grade construction.'
    : 'Просмотрите наш полный ассортимент солнечных уличных фонарей. Высокоэффективные панели, долговечные батареи LiFePO4 и конструкция профессионального уровня.'

  return {
    title,
    description,
    alternates: {
      languages: {
        en: '/en/products',
        ru: '/ru/products',
      },
    },
  }
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: 'en' | 'ru' }>
  searchParams?: Promise<{ series?: string }>
}) {
  const { locale } = await params
  const { series: querySeries } = (await searchParams) || {}
  const [products, series] = await Promise.all([
    getProducts(),
    getProductSeries(),
  ])

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solarlight.kz'
  const subtitle = locale === 'en'
    ? 'High-efficiency monocrystalline solar street lighting solutions for roads, communities, rural areas, and industrial facilities.'
    : 'Высокоэффективные решения солнечного уличного освещения для дорог, жилых районов, сёл и промышленных объектов.'

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: locale === 'ru' ? 'Главная' : 'Home', url: `${siteUrl}/${locale}` },
          { name: locale === 'ru' ? 'Продукты' : 'Products', url: `${siteUrl}/${locale}/products` },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-50">
            {locale === 'en' ? 'Solar Street Lights' : 'Солнечные уличные фонари'}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
            {subtitle}
          </p>
        </div>

        <ProductsFilter
          products={products}
          series={series}
          locale={locale}
          initialSeries={querySeries}
        />
      </div>

      <CatalogueShowcase locale={locale} />
    </>
  )
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }]
}
