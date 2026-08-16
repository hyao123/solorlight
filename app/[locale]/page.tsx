import Link from 'next/link'
import { getProducts, getSiteSettings } from '@/sanity/lib/queries'
import { ProductGrid } from '@/components/ProductGrid'

export default async function HomePage({ params: { locale } }: { params: { locale: 'en' | 'ru' } }) {
  const [products, settings] = await Promise.all([getProducts(), getSiteSettings()])
  const hotProducts = products.filter((p) => p.isHotProduct).slice(0, 8)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-yellow-400 to-orange-500 py-24 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            {locale === 'en'
              ? 'Solar Street Lights for Central Asia'
              : 'Солнечные уличные фонари для Центральной Азии'}
          </h1>
          <p className="mt-4 text-lg opacity-90">
            {locale === 'en'
              ? 'CE & RoHS certified · 5-year warranty · Ships to Kazakhstan, Uzbekistan & beyond'
              : 'Сертифицировано CE и RoHS · Гарантия 5 лет · Доставка в Казахстан, Узбекистан и другие страны'}
          </p>
          <a
            href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-semibold text-yellow-600 shadow-lg hover:bg-yellow-50"
          >
            {locale === 'en' ? 'Get a Free Quote' : 'Получить бесплатное предложение'}
          </a>
        </div>
      </section>

      {/* Hot Products */}
      {hotProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">
            {locale === 'en' ? 'Popular Products' : 'Популярные товары'}
          </h2>
          <ProductGrid products={hotProducts} locale={locale} />
          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/products`}
              className="rounded-full border border-yellow-400 px-6 py-2 text-sm font-semibold text-yellow-600 hover:bg-yellow-50"
            >
              {locale === 'en' ? 'View All Products →' : 'Все продукты →'}
            </Link>
          </div>
        </section>
      )}

      {/* Trust strip */}
      <section className="border-t bg-gray-50 py-10 text-center">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-8 px-4">
          {['CE Certified', 'RoHS Compliant', 'ISO 9001', '5-Year Warranty', '10+ Years Export'].map((badge) => (
            <span key={badge} className="text-sm font-semibold text-gray-600">✓ {badge}</span>
          ))}
        </div>
      </section>
    </>
  )
}
