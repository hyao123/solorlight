import Link from 'next/link'
import dynamic from 'next/dynamic'
import { getTranslations } from 'next-intl/server'
import { getProducts, getSiteSettings, getProjectCases } from '@/lib/queries'
import { ProductGrid } from '@/components/ProductGrid'
import { CaseGallery } from '@/components/CaseGallery'

const SolarCalculator = dynamic(() => import('@/components/SolarCalculator').then((module) => module.SolarCalculator), {
  loading: () => <div className="min-h-[560px]" aria-hidden="true" />,
})
const RegionalAdaptationMatrix = dynamic(
  () => import('@/components/RegionalAdaptationMatrix').then((module) => module.RegionalAdaptationMatrix),
  { loading: () => <div className="min-h-[560px]" aria-hidden="true" /> },
)
const RegionalTransitMatrix = dynamic(
  () => import('@/components/RegionalTransitMatrix').then((module) => module.RegionalTransitMatrix),
  { loading: () => <div className="min-h-[400px]" aria-hidden="true" /> },
)
const GeoDirectAnswerFaq = dynamic(
  () => import('@/components/GeoDirectAnswerFaq').then((module) => module.GeoDirectAnswerFaq),
  { loading: () => <div className="min-h-[400px]" aria-hidden="true" /> },
)

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }]
}

export default async function HomePage({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }) {
  const { locale } = await params
  const [products, settings, cases, t] = await Promise.all([
    getProducts(),
    getSiteSettings(),
    getProjectCases(),
    getTranslations({ locale, namespace: 'home' }),
  ])
  const hotProducts = products.filter((p) => p.isHotProduct).slice(0, 6)

  const stats = [
    { value: t('stats.projects'), sub: t('stats.projectsSub') },
    { value: t('stats.countries'), sub: t('stats.countriesSub') },
    { value: t('stats.warranty'), sub: t('stats.warrantySub') },
    { value: t('stats.exp'), sub: t('stats.expSub') },
  ]

  const features = t.raw('features') as Array<{ icon: string; title: string; desc: string }>
  const scenes = t.raw('scenes') as Array<{ icon: string; title: string; desc: string }>
  const howSteps = t.raw('howSteps') as Array<{ n: string; title: string; desc: string }>
  const testimonials = t.raw('testimonials') as Array<{ name: string; role: string; text: string }>
  const trustBadges = t.raw('trustBadges') as string[]

  const whatsappLink = `https://wa.me/${settings.whatsappNumber?.replace(/\D/g, '') ?? ''}`

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-28 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(250,204,21,0.15),_transparent_60%)]" />
        <div className="mx-auto max-w-3xl px-4 text-center">
          <span className="mb-4 inline-block rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-yellow-400">
            {t('badge')}
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t('heroTitle')}
          </h1>
          <p className="mt-5 text-lg text-slate-300">{t('heroSub')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-yellow-400 px-8 py-3 font-semibold text-slate-900 shadow-lg hover:bg-yellow-300 transition"
            >
              {t('heroBtn')}
            </a>
            <Link
              href={`/${locale}/products`}
              className="rounded-full border border-slate-500 px-8 py-3 font-semibold text-slate-100 hover:border-yellow-400 hover:text-yellow-400 transition"
            >
              {t('heroBtn2')}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-yellow-400">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-yellow-500 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.value} className="py-6 text-center">
              <div className="text-xl font-bold text-slate-900 sm:text-2xl">{s.value}</div>
              <div className="mt-0.5 text-xs text-slate-700">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-50">{t('whyTitle')}</h2>
            <p className="mt-3 text-slate-400">{t('whySub')}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 hover:border-yellow-400/50 hover:shadow-lg transition">
                <div className="mb-3 text-3xl">{f.icon}</div>
                <h3 className="mb-2 font-semibold text-slate-100">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Scenarios */}
      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-50">{t('scenesTitle')}</h2>
            <p className="mt-3 text-slate-400">{t('scenesSub')}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {scenes.map((s) => (
              <div key={s.title} className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm hover:border-sky-500/50 hover:-translate-y-1 transition-all">
                <div className="mb-4 text-4xl">{s.icon}</div>
                <h3 className="mb-2 font-semibold text-slate-100">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Products */}
      {hotProducts.length > 0 && (
        <section className="bg-slate-900 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-slate-50">{t('popularTitle')}</h2>
            <ProductGrid products={hotProducts} locale={locale} />
            <div className="mt-10 text-center">
              <Link
                href={`/${locale}/products`}
                className="rounded-full bg-yellow-400 px-8 py-3 text-sm font-semibold text-slate-900 hover:bg-yellow-300 transition"
              >
                {t('viewAll')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Sizing Calculator */}
      <section className="bg-slate-950 py-20 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SolarCalculator
            locale={locale}
            whatsappNumber={settings.whatsappNumber}
          />
        </div>
      </section>

      {/* Regional Climate Adaptation Matrix (GEO) */}
      <section className="bg-slate-950 py-16 border-y border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <RegionalAdaptationMatrix
            locale={locale}
            whatsappNumber={settings.whatsappNumber}
          />
        </div>
      </section>

      {/* How to Order */}
      <section className="bg-slate-900/50 py-20 text-white border-b border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">{t('howTitle')}</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {howSteps.map((step) => (
              <div key={step.n} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-xl font-bold text-slate-900 shadow-md">
                  {step.n}
                </div>
                <h3 className="mb-2 font-semibold text-slate-100">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-yellow-400 px-10 py-3 font-semibold text-slate-900 hover:bg-yellow-300 transition"
            >
              {t('howBtn')}
            </a>
          </div>
        </div>
      </section>

      {/* Project Cases Gallery */}
      {cases.length > 0 && (
        <section className="bg-slate-900 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-3 text-3xl font-bold text-slate-50">{t('galleryTitle')}</h2>
            <p className="mb-10 text-slate-400">{t('gallerySub')}</p>
            <CaseGallery cases={cases} locale={locale} whatsappNumber={settings.whatsappNumber} />
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-50">{t('testimonialsTitle')}</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map((r) => (
              <div key={r.name} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-sm">
                <p className="text-sm text-slate-300 leading-relaxed italic">"{r.text}"</p>
                <div className="mt-4 border-t border-slate-800 pt-4">
                  <div className="font-semibold text-slate-100">{r.name}</div>
                  <div className="text-xs text-sky-400 mt-0.5">{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Logistics & Transit Corridors (GEO) */}
      <section className="bg-slate-900/40 py-16 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <RegionalTransitMatrix
            locale={locale}
            whatsappNumber={settings.whatsappNumber}
          />
        </div>
      </section>

      {/* Engineering Knowledge Base & Direct Answer FAQ (GEO) */}
      <section className="bg-slate-950 py-16 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <GeoDirectAnswerFaq locale={locale} />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-yellow-400 to-orange-400 py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-bold text-slate-900">{t('ctaTitle')}</h2>
          <p className="mt-3 text-slate-800">{t('ctaSub')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-slate-900 px-8 py-3 font-semibold text-white hover:bg-slate-800 transition"
            >
              {t('ctaBtn')}
            </a>
            <Link
              href={`/${locale}/products`}
              className="rounded-full border-2 border-slate-900 px-8 py-3 font-semibold text-slate-900 hover:bg-slate-900 hover:text-white transition"
            >
              {t('ctaBtn2')}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t border-slate-800 bg-slate-950 py-8 text-center">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-8 px-4">
          {trustBadges.map((badge) => (
            <span key={badge} className="text-sm font-semibold text-slate-400">✓ {badge}</span>
          ))}
        </div>
      </section>
    </>
  )
}
