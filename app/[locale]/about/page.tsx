import { getTranslations } from 'next-intl/server'
import { getSiteSettings } from '@/lib/queries'
import { BreadcrumbJsonLd } from '@/components/StructuredData'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'en' ? 'About Us – SolarLight Solutions' : 'О нас – SolarLight Solutions',
    description: locale === 'en'
      ? 'Learn about SolarLight Solutions — 10+ years manufacturing solar street lights for Central Asia and the Middle East.'
      : 'Узнайте о SolarLight Solutions — более 10 лет производства солнечных фонарей для Центральной Азии и Ближнего Востока.',
    alternates: { languages: { en: '/en/about', ru: '/ru/about' } },
  }
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }]
}

export default async function AboutPage({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }) {
  const { locale } = await params
  const [settings, t] = await Promise.all([
    getSiteSettings(),
    getTranslations({ locale, namespace: 'about' }),
  ])

  const story = t.raw('story') as string[]
  const stats = t.raw('stats') as Array<{ value: string; label: string }>
  const values = t.raw('values') as Array<{ icon: string; title: string; desc: string }>
  const certs = t.raw('certs') as Array<{ name: string; desc: string }>
  const team = t.raw('team') as Array<{ name: string; role: string; note: string }>

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solarlight.kz'
  const whatsappLink = `https://wa.me/${settings.whatsappNumber?.replace(/\D/g, '') ?? ''}`

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: locale === 'ru' ? 'Главная' : 'Home', url: `${siteUrl}/${locale}` },
          { name: locale === 'ru' ? 'О нас' : 'About Us', url: `${siteUrl}/${locale}/about` },
        ]}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <span className="inline-block rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-yellow-400">
            {t('heroTag')}
          </span>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{t('heroTitle')}</h1>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">{t('heroSub')}</p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-yellow-400">
        <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-yellow-500 sm:grid-cols-6">
          {stats.map((s) => (
            <div key={s.value} className="py-5 text-center">
              <div className="text-lg font-bold text-slate-900 sm:text-xl">{s.value}</div>
              <div className="mt-0.5 text-xs text-slate-700">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 space-y-20">

        {/* Our Story */}
        <section>
          <h2 className="mb-8 text-2xl font-bold text-slate-50">{t('storyTitle')}</h2>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            {story.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="mb-8 text-2xl font-bold text-slate-50">{t('valuesTitle')}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 hover:border-slate-700 transition">
                <div className="text-3xl">{v.icon}</div>
                <div>
                  <div className="font-semibold text-slate-100">{v.title}</div>
                  <p className="mt-1 text-sm text-slate-400 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="mb-8 text-2xl font-bold text-slate-50">{t('certTitle')}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certs.map((c) => (
              <div key={c.name} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                <div className="mb-2 inline-block rounded-full bg-orange-500/10 px-3 py-1 text-sm font-bold text-orange-400 ring-1 ring-orange-500/20">
                  {c.name}
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="mb-8 text-2xl font-bold text-slate-50">{t('teamTitle')}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {team.map((m) => (
              <div key={m.name} className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xl font-bold text-sky-400">
                  {m.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-slate-100">{m.name}</div>
                  <div className="text-sm font-medium text-sky-400">{m.role}</div>
                  <p className="mt-1 text-sm text-slate-400">{m.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-slate-900">{t('ctaTitle')}</h2>
          <p className="mt-2 text-slate-800">{t('ctaSub')}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href={`/${locale}/contact`}
              className="rounded-full bg-slate-900 px-8 py-3 font-semibold text-white hover:bg-slate-800 transition"
            >
              {t('ctaBtn')}
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-slate-900 px-8 py-3 font-semibold text-slate-900 hover:bg-slate-900 hover:text-white transition"
            >
              {t('ctaWa')}
            </a>
          </div>
        </section>

      </div>
    </>
  )
}
