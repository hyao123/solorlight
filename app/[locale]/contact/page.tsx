import { getTranslations } from 'next-intl/server'
import { getSiteSettings } from '@/lib/queries'
import { ContactForm } from '@/components/ContactForm'
import { FAQPageJsonLd, BreadcrumbJsonLd } from '@/components/StructuredData'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'en' ? 'Contact Us – SolarLight Solutions' : 'Связаться с нами – SolarLight Solutions',
    description: locale === 'en'
      ? 'Get a free lighting plan and quote within 24 hours. WhatsApp, email, or inquiry form.'
      : 'Получите бесплатный светотехнический проект и КП в течение 24 часов. WhatsApp, email или форма запроса.',
    alternates: { languages: { en: '/en/contact', ru: '/ru/contact' } },
  }
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }]
}

export default async function ContactPage({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }) {
  const { locale } = await params
  const [settings, t] = await Promise.all([
    getSiteSettings(),
    getTranslations({ locale, namespace: 'contact' }),
  ])

  const channels = [
    {
      icon: '💬',
      title: t('channels.whatsappTitle'),
      desc: t('channels.whatsappDesc'),
      action: `https://wa.me/${settings.whatsappNumber?.replace(/\D/g, '') ?? ''}`,
      label: settings.whatsappNumber ?? '',
      cta: t('channels.whatsappCta'),
      external: true,
    },
    {
      icon: '📧',
      title: t('channels.emailTitle'),
      desc: t('channels.emailDesc'),
      action: `mailto:${settings.email ?? ''}`,
      label: settings.email ?? '',
      cta: t('channels.emailCta'),
      external: false,
    },
    {
      icon: '📍',
      title: t('channels.factoryTitle'),
      desc: t('channels.factoryDesc'),
      action: 'https://maps.google.com/?q=Shenzhen+Guangdong+China',
      label: settings.address[locale],
      cta: t('channels.factoryCta'),
      external: true,
    },
  ]

  const steps = t.raw('steps') as Array<{ n: string; title: string; desc: string }>
  const faqs = t.raw('faqs') as Array<{ q: string; a: string }>

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solarlight.kz'

  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: locale === 'ru' ? 'Главная' : 'Home', url: `${siteUrl}/${locale}` },
          { name: locale === 'ru' ? 'Контакты' : 'Contact', url: `${siteUrl}/${locale}/contact` },
        ]}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <span className="inline-block rounded-full bg-green-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-green-400">
            {t('heroTag')}
          </span>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{t('heroTitle')}</h1>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">{t('heroSub')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 space-y-20">

        {/* Contact channels */}
        <section>
          <h2 className="mb-8 text-2xl font-bold text-slate-50">{t('channelsTitle')}</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {channels.map((ch) => (
              <div key={ch.title} className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-sm">
                <div className="mb-3 text-4xl">{ch.icon}</div>
                <div className="font-semibold text-slate-100">{ch.title}</div>
                <p className="mt-1 flex-1 text-sm text-slate-400 leading-relaxed">{ch.desc}</p>
                <div className="mt-3 text-sm font-medium text-sky-400">{ch.label}</div>
                <a
                  href={ch.action}
                  target={ch.external ? '_blank' : undefined}
                  rel={ch.external ? 'noopener noreferrer' : undefined}
                  className="mt-4 rounded-xl bg-slate-800 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-700 transition"
                >
                  {ch.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 px-8 py-10">
          <h2 className="mb-8 text-2xl font-bold text-slate-50">{t('processTitle')}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.n} className="flex flex-col items-start">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-slate-900">
                  {step.n}
                </div>
                <div className="font-semibold text-slate-100">{step.title}</div>
                <p className="mt-1 text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Main: form + FAQ */}
        <section className="grid gap-12 lg:grid-cols-[1fr_440px]">

          {/* FAQ */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-slate-50">{t('faqTitle')}</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-xl border border-slate-800 bg-slate-900/80">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-medium text-slate-100 marker:hidden list-none">
                    {faq.q}
                    <svg className="h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="border-t border-slate-800 px-5 py-4 text-sm text-slate-400 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>

          {/* Inquiry form */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-sm">
            <h2 className="mb-1 text-xl font-bold text-slate-100">{t('formTitle')}</h2>
            <p className="mb-6 text-sm text-slate-400">{t('formSub')}</p>
            <ContactForm locale={locale} />
          </div>

        </section>

      </div>
    </>
  )
}
