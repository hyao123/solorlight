import Link from 'next/link'
import { getProductSeries } from '@/sanity/lib/queries'
import type { Metadata } from 'next'

const SCENE_ICONS: Record<string, string> = {
  road: '🛣️', community: '🏘️', rural: '🌾', industrial: '🏭',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }): Promise<Metadata> {
  const { locale } = await params
  const title = locale === 'en' ? 'Solutions by Application' : 'Решения по применению'
  const description = locale === 'en'
    ? 'We match the right solar street light product to your project type: roads, communities, rural areas, and industrial sites.'
    : 'Мы подбираем солнечный уличный фонарь под ваш тип проекта: дороги, сообщества, сельские районы и промышленные объекты.'

  return {
    title,
    description,
    alternates: {
      languages: {
        en: '/en/solutions',
        ru: '/ru/solutions',
      },
    },
  }
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }) {
  const { locale } = await params
  const series = await getProductSeries()

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="mb-4 text-3xl font-bold text-slate-900">
        {locale === 'en' ? 'Solutions by Application' : 'Решения по применению'}
      </h1>
      <p className="mb-12 text-slate-600">
        {locale === 'en'
          ? 'We match the right product to your project type.'
          : 'Мы подбираем продукт под ваш тип проекта.'}
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {series.map((s) => (
          <div key={s._id} className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/10">
            <div className="text-3xl">{SCENE_ICONS[s.targetScene] ?? '💡'}</div>
            <h2 className="mt-3 text-lg font-semibold text-slate-50">{s.name[locale]}</h2>
            <p className="mt-2 text-sm text-slate-400">{s.description[locale]}</p>
            <Link
              href={`/${locale}/products?series=${s.slug.current}`}
              className="mt-4 inline-block text-sm font-medium text-orange-500 hover:text-orange-400"
            >
              {locale === 'en' ? 'View products →' : 'Смотреть продукты →'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }]
}
