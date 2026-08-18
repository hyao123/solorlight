import { getProducts, getProductSeries } from '@/lib/queries'
import { ProductsFilter } from '@/components/ProductsFilter'
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

export default async function ProductsPage({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }) {
  const { locale } = await params
  const [products, series] = await Promise.all([
    getProducts(), getProductSeries()
  ])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">
        {locale === 'en' ? 'Solar Street Lights' : 'Солнечные уличные фонари'}
      </h1>

      <ProductsFilter products={products} series={series} locale={locale} />
    </div>
  )
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }]
}
