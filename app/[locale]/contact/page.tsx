import { getSiteSettings } from '@/sanity/lib/queries'
import { ContactForm } from '@/components/ContactForm'
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
  const settings = await getSiteSettings()

  const t = locale === 'en' ? {
    heroTag: 'Get in Touch',
    heroTitle: 'We Reply Within 24 Hours',
    heroSub: 'Send us your project requirements — site photos, road width, pole spacing — and we will return a free lighting design and quote.',
    channelsTitle: 'Ways to Reach Us',
    channels: [
      {
        icon: '💬',
        title: 'WhatsApp (Fastest)',
        desc: 'Send photos, specs, or questions. We monitor WhatsApp daily including weekends.',
        action: `https://wa.me/${settings.whatsappNumber?.replace(/\D/g, '') ?? ''}`,
        label: settings.whatsappNumber ?? '',
        cta: 'Chat on WhatsApp',
        external: true,
      },
      {
        icon: '📧',
        title: 'Email',
        desc: 'For formal inquiries, RFQs, or attaching project documents.',
        action: `mailto:${settings.email ?? ''}`,
        label: settings.email ?? '',
        cta: 'Send Email',
        external: false,
      },
      {
        icon: '📍',
        title: 'Factory Address',
        desc: 'Visitors welcome by appointment. We can arrange factory tours for buyers.',
        action: 'https://maps.google.com/?q=Shenzhen+Guangdong+China',
        label: settings.address.en,
        cta: 'View on Map',
        external: true,
      },
    ],
    processTitle: 'What Happens After You Contact Us',
    steps: [
      { n: '01', title: 'You send requirements', desc: 'Share road photos, pole spacing, wattage estimate, or just your location and project type.' },
      { n: '02', title: 'We send a lighting plan', desc: 'Our engineer prepares a lux simulation layout within 24 hours at no cost.' },
      { n: '03', title: 'You receive a quote', desc: 'Itemised quote with unit price, MOQ, lead time, and shipping options (FOB/CIF).' },
      { n: '04', title: 'We handle the rest', desc: 'Factory inspection, packing, customs docs (CO, packing list, invoice). Door-to-door available.' },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is the minimum order quantity?', a: 'MOQ is 10 units. We can mix models in one order (e.g. 5 × 60W + 5 × 90W).' },
      { q: 'How long does shipping to Kazakhstan take?', a: 'Sea freight via Caspian route: 18–25 days. Rail freight (China-Kazakhstan): 12–18 days. Air freight: 5–7 days.' },
      { q: 'Do you provide CE certificate?', a: 'Yes. CE, RoHS, and ISO 9001 certificates are included with every shipment at no extra cost.' },
      { q: 'Can you provide a sample before bulk order?', a: 'Yes. Sample orders of 1–3 units are available. Sample cost is refunded on first bulk order ≥50 units.' },
      { q: 'Do you offer OEM / custom branding?', a: 'Yes. We support custom logo on lamp head, pole, and packaging. MOQ for OEM is 50 units.' },
    ],
    formTitle: 'Send an Inquiry',
    formSub: 'Fill in the details below and we will reply with a quote and lighting plan.',
  } : {
    heroTag: 'Связаться с нами',
    heroTitle: 'Отвечаем в течение 24 часов',
    heroSub: 'Пришлите требования к проекту — фото объекта, ширину дороги, расстояние между столбами — и мы подготовим бесплатный светотехнический проект и КП.',
    channelsTitle: 'Способы связи',
    channels: [
      {
        icon: '💬',
        title: 'WhatsApp (быстрее всего)',
        desc: 'Пишите фото, спецификации или вопросы. Мониторим WhatsApp ежедневно, включая выходные.',
        action: `https://wa.me/${settings.whatsappNumber?.replace(/\D/g, '') ?? ''}`,
        label: settings.whatsappNumber ?? '',
        cta: 'Написать в WhatsApp',
        external: true,
      },
      {
        icon: '📧',
        title: 'Электронная почта',
        desc: 'Для официальных запросов, тендерной документации или прикрепления проектных файлов.',
        action: `mailto:${settings.email ?? ''}`,
        label: settings.email ?? '',
        cta: 'Написать на email',
        external: false,
      },
      {
        icon: '📍',
        title: 'Адрес завода',
        desc: 'Посещения по предварительной записи. Организуем экскурсии по заводу для покупателей.',
        action: 'https://maps.google.com/?q=Shenzhen+Guangdong+China',
        label: settings.address.ru,
        cta: 'Показать на карте',
        external: true,
      },
    ],
    processTitle: 'Что происходит после обращения',
    steps: [
      { n: '01', title: 'Вы присылаете требования', desc: 'Фото дороги, расстояние между столбами, предполагаемая мощность или просто тип и местоположение проекта.' },
      { n: '02', title: 'Мы готовим светотехнический проект', desc: 'Наш инженер подготовит расчёт освещённости в течение 24 часов — бесплатно.' },
      { n: '03', title: 'Вы получаете КП', desc: 'Развёрнутое предложение с ценой за единицу, МОК, сроком производства и вариантами доставки (FOB/CIF).' },
      { n: '04', title: 'Мы берём остальное на себя', desc: 'Заводская инспекция, упаковка, таможенные документы (CO, упаковочный лист, инвойс). Доставка до двери — доступна.' },
    ],
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { q: 'Какой минимальный объём заказа?', a: 'МОК — 10 единиц. Можно комбинировать модели в одном заказе (например, 5 × 60 Вт + 5 × 90 Вт).' },
      { q: 'Сколько идёт доставка в Казахстан?', a: 'Морем через Каспийский маршрут: 18–25 дней. Железная дорога (Китай–Казахстан): 12–18 дней. Авиа: 5–7 дней.' },
      { q: 'Предоставляете ли вы сертификат CE?', a: 'Да. CE, RoHS и ISO 9001 включены в каждую поставку без дополнительной платы.' },
      { q: 'Можно заказать образец до основной партии?', a: 'Да. Доступны образцы 1–3 единицы. Стоимость образца возвращается при первом заказе от 50 единиц.' },
      { q: 'Предлагаете ли вы OEM / брендирование?', a: 'Да. Поддерживаем нанесение логотипа на корпус, столб и упаковку. МОК для OEM — 50 единиц.' },
    ],
    formTitle: 'Отправить запрос',
    formSub: 'Заполните форму ниже, и мы ответим с КП и светотехническим проектом.',
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <span className="inline-block rounded-full bg-green-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-green-400">
            {t.heroTag}
          </span>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{t.heroTitle}</h1>
          <p className="mt-4 text-lg text-slate-300">{t.heroSub}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 space-y-20">

        {/* Contact channels */}
        <section>
          <h2 className="mb-8 text-2xl font-bold text-slate-900">{t.channelsTitle}</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {t.channels.map((ch) => (
              <div key={ch.title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 text-4xl">{ch.icon}</div>
                <div className="font-semibold text-slate-900">{ch.title}</div>
                <p className="mt-1 flex-1 text-sm text-slate-500 leading-relaxed">{ch.desc}</p>
                <div className="mt-3 text-sm font-medium text-slate-700">{ch.label}</div>
                <a
                  href={ch.action}
                  target={ch.external ? '_blank' : undefined}
                  rel={ch.external ? 'noopener noreferrer' : undefined}
                  className="mt-4 rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-700"
                >
                  {ch.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="rounded-2xl bg-slate-50 px-8 py-10">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">{t.processTitle}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((step) => (
              <div key={step.n} className="flex flex-col items-start">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-slate-900">
                  {step.n}
                </div>
                <div className="font-semibold text-slate-900">{step.title}</div>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Main: form + FAQ */}
        <section className="grid gap-12 lg:grid-cols-[1fr_420px]">

          {/* FAQ */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-slate-900">{t.faqTitle}</h2>
            <div className="space-y-4">
              {t.faqs.map((faq) => (
                <details key={faq.q} className="group rounded-xl border border-slate-200 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-medium text-slate-900 marker:hidden list-none">
                    {faq.q}
                    <svg className="h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="border-t border-slate-100 px-5 py-4 text-sm text-slate-500 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>

          {/* Inquiry form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-xl font-bold text-slate-900">{t.formTitle}</h2>
            <p className="mb-6 text-sm text-slate-500">{t.formSub}</p>
            <ContactForm locale={locale} />
          </div>

        </section>

      </div>
    </>
  )
}
