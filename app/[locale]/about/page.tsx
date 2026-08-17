import { getSiteSettings } from '@/sanity/lib/queries'
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
  await getSiteSettings()

  const t = locale === 'en' ? {
    heroTag: 'Solar Street Light Manufacturer',
    heroTitle: 'Built on a Decade of Export Experience',
    heroSub: 'From a small factory in Shenzhen to 500+ projects across 20+ countries — we deliver reliable solar lighting wherever the grid does not reach.',
    storyTitle: 'Our Story',
    story: [
      'SolarLight Solutions was founded in Shenzhen, China in 2014 by a team of engineers who saw a clear gap: developing markets needed reliable outdoor lighting, but extending the grid was too slow and too expensive.',
      'We started with a single product — a 30W split-type solar street light — and shipped 50 units to a rural electrification project in Kazakhstan. That project is still running today.',
      'Over the next decade we expanded our range to 20+ models covering 20W–150W, built a factory with ISO 9001 certification, and established export channels into 20+ countries across Central Asia, the Middle East, and Africa.',
      'Today our lights illuminate village roads in Uzbekistan, school playgrounds in Kyrgyzstan, industrial yards in Oman, and commercial zones in Kazakhstan. Every product leaves our factory CE and RoHS certified.',
    ],
    statsTitle: 'By the Numbers',
    stats: [
      { value: '500+', label: 'Projects completed' },
      { value: '20+', label: 'Countries served' },
      { value: '50,000+', label: 'Lights installed' },
      { value: '10+', label: 'Years of experience' },
      { value: '5-year', label: 'Product warranty' },
      { value: 'ISO 9001', label: 'Certified factory' },
    ],
    valuesTitle: 'What We Stand For',
    values: [
      { icon: '🔬', title: 'Engineering First', desc: 'Every model is tested for 1,000+ hours before release. We only ship what we would install ourselves.' },
      { icon: '🤝', title: 'Long-Term Partnership', desc: 'We provide free lighting plans, customs documentation support, and 5-year after-sales service.' },
      { icon: '🌍', title: 'Local Market Knowledge', desc: 'Our team speaks Russian and Arabic. We understand Central Asian procurement requirements and standards.' },
      { icon: '⚡', title: 'No Compromise on Components', desc: 'Lumileds/Bridgelux LEDs, CATL LiFePO4 cells, and Epever MPPT controllers — no substitutions.' },
    ],
    certTitle: 'Certifications & Standards',
    certs: [
      { name: 'CE', desc: 'Required for all EU and many CIS markets. Covers EMC, LVD, and RoHS directives.' },
      { name: 'RoHS', desc: 'Restriction of hazardous substances. No lead, mercury, or cadmium in our products.' },
      { name: 'ISO 9001', desc: 'Factory quality management system. Audited annually by Bureau Veritas.' },
      { name: 'IP66', desc: 'Full dust-tight seal, protected against powerful water jets. Suitable for desert conditions.' },
      { name: 'IEC 60598', desc: 'International standard for luminaire safety and performance.' },
      { name: 'LM-80', desc: 'LED lumen maintenance testing. Confirms L70 lifespan >100,000 hours.' },
    ],
    teamTitle: 'The Team Behind the Products',
    team: [
      { name: 'David Chen', role: 'Founder & Chief Engineer', note: '15 years in LED lighting, led R&D for 3 product generations.' },
      { name: 'Elena Sorokina', role: 'Export Manager – CIS', note: 'Native Russian speaker, 8 years managing Kazakhstan and Uzbekistan accounts.' },
      { name: 'Omar Al-Khalidi', role: 'Regional Manager – Middle East', note: 'Based in Dubai, covers GCC and MENA project tenders.' },
      { name: 'Wei Zhang', role: 'Quality Assurance Director', note: 'Manages ISO 9001 compliance and pre-shipment inspection protocols.' },
    ],
    ctaTitle: 'Ready to discuss your project?',
    ctaSub: 'Our engineering team provides free lighting plans within 24 hours.',
    ctaBtn: 'Contact Us',
    ctaWa: 'WhatsApp Us',
  } : {
    heroTag: 'Производитель солнечных уличных фонарей',
    heroTitle: 'Более десяти лет экспортного опыта',
    heroSub: 'От небольшого завода в Шэньчжэне — к 500+ проектам в 20+ странах. Мы поставляем надёжное солнечное освещение туда, где нет электросети.',
    storyTitle: 'Наша история',
    story: [
      'SolarLight Solutions основана в Шэньчжэне (Китай) в 2014 году командой инженеров, увидевших очевидный пробел: развивающимся рынкам нужно надёжное уличное освещение, но прокладка электросети — слишком медленный и дорогой путь.',
      'Мы начали с одного продукта — раздельного солнечного фонаря 30 Вт — и отправили 50 единиц в проект сельской электрификации в Казахстане. Этот проект работает по сей день.',
      'За следующее десятилетие мы расширили ассортимент до 20+ моделей мощностью 20–150 Вт, построили завод с сертификатом ISO 9001 и наладили экспортные каналы в 20+ стран Центральной Азии, Ближнего Востока и Африки.',
      'Сегодня наши фонари освещают сельские дороги в Узбекистане, школьные площадки в Кыргызстане, промышленные дворы в Омане и коммерческие зоны в Казахстане. Каждый продукт покидает наш завод с сертификатами CE и RoHS.',
    ],
    statsTitle: 'Цифры говорят сами',
    stats: [
      { value: '500+', label: 'Завершённых проектов' },
      { value: '20+', label: 'Стран-партнёров' },
      { value: '50 000+', label: 'Установленных фонарей' },
      { value: '10+', label: 'Лет опыта' },
      { value: '5 лет', label: 'Гарантия на продукцию' },
      { value: 'ISO 9001', label: 'Сертифицированный завод' },
    ],
    valuesTitle: 'Наши ценности',
    values: [
      { icon: '🔬', title: 'Инженерный подход', desc: 'Каждая модель тестируется 1000+ часов перед выпуском. Мы отгружаем только то, что установили бы сами.' },
      { icon: '🤝', title: 'Долгосрочное партнёрство', desc: 'Бесплатные светотехнические проекты, поддержка таможенной документации и послепродажное обслуживание 5 лет.' },
      { icon: '🌍', title: 'Знание местных рынков', desc: 'Наша команда говорит по-русски и по-арабски. Мы понимаем требования к закупкам в Центральной Азии.' },
      { icon: '⚡', title: 'Без компромиссов в компонентах', desc: 'Светодиоды Lumileds/Bridgelux, ячейки LiFePO4 CATL и контроллеры MPPT Epever — без замен.' },
    ],
    certTitle: 'Сертификаты и стандарты',
    certs: [
      { name: 'CE', desc: 'Обязателен для стран ЕС и большинства рынков СНГ. Охватывает директивы ЭМС, НВД и RoHS.' },
      { name: 'RoHS', desc: 'Ограничение вредных веществ. В наших продуктах нет свинца, ртути и кадмия.' },
      { name: 'ISO 9001', desc: 'Система управления качеством завода. Ежегодный аудит Bureau Veritas.' },
      { name: 'IP66', desc: 'Полная пылезащита и защита от мощных водяных струй. Подходит для пустынных условий.' },
      { name: 'IEC 60598', desc: 'Международный стандарт безопасности и характеристик световых приборов.' },
      { name: 'LM-80', desc: 'Тестирование поддержания светового потока LED. Подтверждает ресурс L70 >100 000 часов.' },
    ],
    teamTitle: 'Команда за продуктами',
    team: [
      { name: 'Дэвид Чэнь', role: 'Основатель и главный инженер', note: '15 лет в LED-освещении, руководил разработкой 3 поколений продуктов.' },
      { name: 'Елена Сорокина', role: 'Менеджер по экспорту — СНГ', note: 'Носитель русского языка, 8 лет ведёт клиентов в Казахстане и Узбекистане.' },
      { name: 'Омар Аль-Халиди', role: 'Региональный менеджер — Ближний Восток', note: 'Базируется в Дубае, работает с тендерами GCC и MENA.' },
      { name: 'Вэй Чжан', role: 'Директор по контролю качества', note: 'Управляет соответствием ISO 9001 и протоколами предотгрузочной инспекции.' },
    ],
    ctaTitle: 'Готовы обсудить проект?',
    ctaSub: 'Наша инженерная команда предоставит бесплатный светотехнический проект в течение 24 часов.',
    ctaBtn: 'Связаться с нами',
    ctaWa: 'Написать в WhatsApp',
  }

  const settings = await getSiteSettings()

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <span className="inline-block rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-yellow-400">
            {t.heroTag}
          </span>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{t.heroTitle}</h1>
          <p className="mt-4 text-lg text-slate-300">{t.heroSub}</p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-yellow-400">
        <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-yellow-500 sm:grid-cols-6">
          {t.stats.map((s) => (
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
          <h2 className="mb-8 text-2xl font-bold text-slate-900">{t.storyTitle}</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            {t.story.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="mb-8 text-2xl font-bold text-slate-900">{t.valuesTitle}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {t.values.map((v) => (
              <div key={v.title} className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="text-3xl">{v.icon}</div>
                <div>
                  <div className="font-semibold text-slate-900">{v.title}</div>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="mb-8 text-2xl font-bold text-slate-900">{t.certTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.certs.map((c) => (
              <div key={c.name} className="rounded-2xl border border-slate-200 p-5">
                <div className="mb-2 inline-block rounded-full bg-orange-50 px-3 py-1 text-sm font-bold text-orange-600 ring-1 ring-orange-200">
                  {c.name}
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="mb-8 text-2xl font-bold text-slate-900">{t.teamTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.team.map((m) => (
              <div key={m.name} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xl font-bold text-slate-600">
                  {m.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{m.name}</div>
                  <div className="text-sm font-medium text-sky-600">{m.role}</div>
                  <p className="mt-1 text-sm text-slate-500">{m.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-slate-900">{t.ctaTitle}</h2>
          <p className="mt-2 text-slate-800">{t.ctaSub}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href={`/${locale}/contact`}
              className="rounded-full bg-slate-900 px-8 py-3 font-semibold text-white hover:bg-slate-700"
            >
              {t.ctaBtn}
            </a>
            <a
              href={`https://wa.me/${settings.whatsappNumber?.replace(/\D/g, '') ?? ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-slate-900 px-8 py-3 font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
            >
              {t.ctaWa}
            </a>
          </div>
        </section>

      </div>
    </>
  )
}
