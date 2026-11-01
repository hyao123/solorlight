import Link from 'next/link'
import Image from 'next/image'
import { getProductSeries, getProducts, getSiteSettings } from '@/lib/queries'
import { SolarCalculator } from '@/components/SolarCalculator'
import { RegionalAdaptationMatrix } from '@/components/RegionalAdaptationMatrix'
import { RegionalTransitMatrix } from '@/components/RegionalTransitMatrix'
import { GeoDirectAnswerFaq } from '@/components/GeoDirectAnswerFaq'
import { BreadcrumbJsonLd } from '@/components/StructuredData'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'en'
      ? 'Solar Lighting Solutions by Application – SolarLight Solutions'
      : 'Решения солнечного освещения по применению – SolarLight Solutions',
    description: locale === 'en'
      ? 'Solar street lights for roads, villages, communities and industrial sites. Model-specific specifications, documentation and warranty terms; shipping to Central Asia and the Middle East.'
      : 'Солнечные фонари для дорог, сёл, жилых районов и промышленных объектов. Характеристики, документы и гарантия по модели; доставка в Центральную Азию.',
    alternates: { canonical: `/${locale}/solutions`, languages: { en: '/en/solutions', ru: '/ru/solutions' } },
  }
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }]
}

const SCENE_CONFIG: Record<string, {
  icon: string
  heroImg: string
  colorFrom: string
  colorTo: string
  accent: string
  statsEn: { label: string; value: string }[]
  statsRu: { label: string; value: string }[]
  useCasesEn: string[]
  useCasesRu: string[]
  challengesEn: string
  challengesRu: string
  recommendedWatts: string
}> = {
  'jz-split': {
    icon: '☀️', heroImg: '/images/jz/jz-hl0001.webp',
    colorFrom: 'from-amber-900', colorTo: 'to-slate-900', accent: 'text-amber-400',
    statsEn: [
      { label: 'LED reference', value: '60 W' },
      { label: 'Mounting height', value: '6–8 m' },
      { label: 'Battery energy', value: '192 Wh' },
      { label: 'LED / battery protection', value: 'IP65 / IP67' },
    ],
    statsRu: [
      { label: 'Мощность LED', value: '60 Вт' },
      { label: 'Высота монтажа', value: '6–8 м' },
      { label: 'Энергия батареи', value: '192 Вт·ч' },
      { label: 'Защита LED / батареи', value: 'IP65 / IP67' },
    ],
    useCasesEn: ['Village streets', 'Community lanes', 'Courtyards', 'Existing-pole retrofits', 'Wall-mounted entrances'],
    useCasesRu: ['Сельские улицы', 'Жилые проезды', 'Дворы', 'Монтаж на существующие опоры', 'Настенное освещение входов'],
    challengesEn: 'Choose from conch, A-arm, meander, clamp and wall mounting. Clamp and wall models use an approved existing support; 6–8 m is the installation height. A 192 Wh battery provides about 3.2 h at continuous 60 W before losses; the stated longer runtime requires a confirmed dimming schedule and solar yield.',
    challengesRu: 'Выберите дуговой, А-образный, орнаментальный, хомутовый или настенный монтаж. Последние два используют подходящую существующую конструкцию; 6–8 м — высота монтажа. Батарея 192 Вт·ч даёт около 3,2 ч при постоянных 60 Вт без потерь; большая автономность требует согласованного диммирования и инсоляции.',
    recommendedWatts: '60 W',
  },
  road: {
    icon: '🛣️',
    heroImg: '/images/products/road-90w.jpg',
    colorFrom: 'from-blue-900',
    colorTo: 'to-slate-900',
    accent: 'text-blue-400',
    statsEn: [
      { label: 'Recommended power', value: '60 W – 150 W' },
      { label: 'Lumen output', value: '6,000 – 24,000 lm' },
      { label: 'Mount height', value: '8 – 15 m' },
      { label: 'Protection', value: 'IP65–IP66; IK by model' },
    ],
    statsRu: [
      { label: 'Рекомендуемая мощность', value: '60 Вт – 150 Вт' },
      { label: 'Световой поток', value: '6 000 – 24 000 лм' },
      { label: 'Высота монтажа', value: '8 – 15 м' },
      { label: 'Защита', value: 'IP65–IP66; IK по модели' },
    ],
    useCasesEn: ['National highways', 'Inter-city roads', 'Ring roads & bypass routes', 'Border crossing zones', 'Bridge lighting'],
    useCasesRu: ['Национальные автомагистрали', 'Межгородские дороги', 'Кольцевые и объездные дороги', 'Зоны пограничных переходов', 'Освещение мостов'],
    challengesEn: 'Main roads require a project-specific photometric layout and energy budget. Compare the listed 60–150 W split systems; confirm winter charging limits, dimming and the required cloudy-day autonomy before ordering.',
    challengesRu: 'Для дорог нужны светотехнический расчёт и энергобаланс объекта. Сравните раздельные системы 60–150 Вт; до заказа уточните температурные пределы зарядки, диммирование и требуемую автономность.',
    recommendedWatts: '60 W · 90 W · 120 W · 150 W',
  },
  community: {
    icon: '🏘️',
    heroImg: '/images/products/community-40w.jpg',
    colorFrom: 'from-emerald-900',
    colorTo: 'to-slate-900',
    accent: 'text-emerald-400',
    statsEn: [
      { label: 'Recommended power', value: '30 W – 60 W' },
      { label: 'Lumen output', value: '4,800 – 9,600 lm' },
      { label: 'Mount height', value: '5 – 10 m' },
      { label: 'Protection', value: 'IP65–IP66 by model' },
    ],
    statsRu: [
      { label: 'Рекомендуемая мощность', value: '30 Вт – 60 Вт' },
      { label: 'Световой поток', value: '4 800 – 9 600 лм' },
      { label: 'Высота монтажа', value: '5 – 10 м' },
      { label: 'Защита', value: 'IP65–IP66 по модели' },
    ],
    useCasesEn: ['Residential neighbourhoods', 'Parks & squares', 'School playgrounds', 'Markets & bazaars', 'Mosque & church surrounds'],
    useCasesRu: ['Жилые кварталы', 'Парки и площади', 'Школьные дворы', 'Рынки и базары', 'Территории мечетей и церквей'],
    challengesEn: 'Compare split and all-in-one models for residential spaces. Select mounting height, color temperature and beam layout for the site; sensor availability and energy savings depend on the ordered configuration.',
    challengesRu: 'Сравните раздельные и интегрированные модели для жилых зон. Высота, цветовая температура и светораспределение подбираются для объекта; наличие датчика и экономия зависят от комплектации.',
    recommendedWatts: '30 W · 40 W · 60 W',
  },
  rural: {
    icon: '🌾',
    heroImg: '/images/products/rural-30w.jpg',
    colorFrom: 'from-amber-900',
    colorTo: 'to-slate-900',
    accent: 'text-amber-400',
    statsEn: [
      { label: 'Recommended power', value: '20 W – 60 W' },
      { label: 'Lumen output', value: '3,000 – 7,200 lm' },
      { label: 'Mount height', value: 'By model and support' },
      { label: 'Battery autonomy', value: 'Confirm dimming and solar yield' },
    ],
    statsRu: [
      { label: 'Рекомендуемая мощность', value: '20 Вт – 60 Вт' },
      { label: 'Световой поток', value: '3 000 – 7 200 лм' },
      { label: 'Высота монтажа', value: 'По модели и опоре' },
      { label: 'Автономность батареи', value: 'Уточните диммирование и инсоляцию' },
    ],
    useCasesEn: ['Village main streets', 'Rural schools & clinics', 'Farm access roads', 'Irrigation canal paths', 'Off-grid settlements'],
    useCasesRu: ['Главные улицы сёл', 'Сельские школы и фельдшерские пункты', 'Сельскохозяйственные дороги', 'Тропы вдоль ирригационных каналов', 'Автономные посёлки'],
    challengesEn: 'Compare Kmini 20/30 W lights and the 60 W wall/pole retrofit option. Confirm road width, support strength, shading and winter solar yield. Mounting near utilities or at height requires a qualified installer.',
    challengesRu: 'Сравните Kmini 20/30 Вт и настенный/опорный вариант 60 Вт. Проверьте ширину дороги, несущую способность, затенение и зимнюю инсоляцию. Высотный монтаж и работы у коммуникаций выполняют специалисты.',
    recommendedWatts: '20 W · 30 W · 60 W',
  },
  industrial: {
    icon: '🏭',
    heroImg: '/images/products/industrial-120w.jpg',
    colorFrom: 'from-violet-900',
    colorTo: 'to-slate-900',
    accent: 'text-violet-400',
    statsEn: [
      { label: 'Recommended power', value: '100 W – 150 W' },
      { label: 'Lumen output', value: '16,000 – 26,400 lm' },
      { label: 'Mount height', value: '10 – 16 m' },
      { label: 'Protection', value: 'IP66 / IK09–IK10 by model' },
    ],
    statsRu: [
      { label: 'Рекомендуемая мощность', value: '100 Вт – 150 Вт' },
      { label: 'Световой поток', value: '16 000 – 26 400 лм' },
      { label: 'Высота монтажа', value: '10 – 16 м' },
      { label: 'Защита', value: 'IP66 / IK09–IK10 по модели' },
    ],
    useCasesEn: ['Logistics yards & warehouses', 'Port terminals', 'Mining site perimeters', 'Oil field access roads', 'Airport ground areas'],
    useCasesRu: ['Логистические дворы и склады', 'Портовые терминалы', 'Периметры горнодобывающих предприятий', 'Дороги нефтяных месторождений', 'Наземные зоны аэропортов'],
    challengesEn: 'Compare 100–150 W models with the battery and MPPT specifications listed for each product. Continuous operation, backup duration and monitoring options require a project-specific power budget and confirmed equipment configuration.',
    challengesRu: 'Сравните модели 100–150 Вт по характеристикам батарей и MPPT. Непрерывная работа, резервная автономность и мониторинг требуют энергобаланса объекта и подтверждения комплектации.',
    recommendedWatts: '100 W · 120 W · 150 W',
  },
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }) {
  const { locale } = await params
  const [series, products, settings] = await Promise.all([
    getProductSeries(), getProducts(), getSiteSettings(),
  ])

  const en = locale === 'en'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jiazun6888.com'

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: en ? 'Home' : 'Главная', url: `${siteUrl}/${locale}` },
          { name: en ? 'Solutions' : 'Решения', url: `${siteUrl}/${locale}/solutions` },
        ]}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <span className="inline-block rounded-full bg-orange-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-400">
            {en ? 'Application Guide' : 'Руководство по применению'}
          </span>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            {en ? 'The Right Light for Every Project' : 'Правильный фонарь для каждого проекта'}
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            {en
              ? 'Different locations have different lighting requirements. Choose your scenario below and we will show you exactly which product fits — with specs, use cases, and a direct quote link.'
              : 'Разные объекты требуют разного освещения. Выберите свой сценарий ниже, и мы покажем, какой именно продукт подходит — со спецификациями, примерами применения и ссылкой на запрос цены.'}
          </p>
        </div>
      </section>

      {/* Solution cards — one per series */}
      <div className="divide-y divide-slate-800">
        {series.map((s, idx) => {
          const cfg = SCENE_CONFIG[s.slug.current] ?? SCENE_CONFIG[s.targetScene]
          if (!cfg) return null
          const stats = en ? cfg.statsEn : cfg.statsRu
          const useCases = en ? cfg.useCasesEn : cfg.useCasesRu
          const challenge = en ? cfg.challengesEn : cfg.challengesRu
          const seriesProducts = products
            .filter((p) => {
              const ps = typeof p.series === 'object' && p.series ? p.series._id : p.series
              return ps === s._id
            })
            .slice(0, 3)

          const isEven = idx % 2 === 0

          return (
            <section key={s._id} className="py-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className={`grid items-start gap-10 lg:grid-cols-2 ${isEven ? '' : 'lg:grid-flow-dense'}`}>

                  {/* Image side */}
                  <div className={isEven ? '' : 'lg:col-start-2'}>
                    <div className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br ${cfg.colorFrom} ${cfg.colorTo}`}>
                      <div className="relative aspect-[3/2] w-full">
                        <Image
                          src={cfg.heroImg}
                          alt={s.name[locale]}
                          fill
                          className="object-cover opacity-80 mix-blend-luminosity"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                      {/* Stats overlay */}
                      <div className="grid grid-cols-2 divide-x divide-white/10 border-t border-white/10 bg-slate-950/70">
                        {stats.map((st) => (
                          <div key={st.label} className="px-5 py-4">
                            <div className="text-base font-bold text-white">{st.value}</div>
                            <div className="text-xs text-slate-400">{st.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{cfg.icon}</span>
                      <span className={`text-sm font-semibold uppercase tracking-wider ${cfg.accent}`}>
                        {s.name[locale]}
                      </span>
                    </div>
                    <h2 className="mt-2 text-2xl font-bold text-slate-50 sm:text-3xl">
                      {s.description[locale]}
                    </h2>
                    <p className="mt-4 text-slate-400 leading-relaxed">{challenge}</p>

                    {/* Use cases */}
                    <div className="mt-6">
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {en ? 'Typical applications' : 'Типичные применения'}
                      </div>
                      <ul className="grid grid-cols-2 gap-1.5">
                        {useCases.map((uc) => (
                          <li key={uc} className="flex items-start gap-2 text-sm text-slate-300">
                            <span className="mt-0.5 text-emerald-400">✓</span> {uc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommended models */}
                    {seriesProducts.length > 0 && (
                      <div className="mt-6">
                        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          {en ? 'Recommended models' : 'Рекомендуемые модели'}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {seriesProducts.map((p) => (
                            <Link
                              key={p._id}
                              href={`/${locale}/products/${p.slug.current}`}
                              className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm font-medium text-slate-300 hover:border-yellow-400/50 hover:text-yellow-400 transition"
                            >
                              {p.name[locale]}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href={`/${locale}/products?series=${s.slug.current}`}
                        className="rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-yellow-300 transition"
                      >
                        {en ? `View all ${s.name.en} products →` : `Все продукты серии ${s.name.ru} →`}
                      </Link>
                      <a
                        href={`https://wa.me/${settings.whatsappNumber?.replace(/\D/g, '') ?? ''}?text=${encodeURIComponent(en ? `I need solar lights for: ${s.name.en}` : `Нужны фонари для: ${s.name.ru}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-emerald-400 hover:text-emerald-400 transition"
                      >
                        💬 {en ? 'Quick quote' : 'Быстрый запрос'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* Regional Climate Adaptation Matrix (GEO) */}
      <section className="bg-slate-950 py-16 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <RegionalAdaptationMatrix
            locale={locale}
            whatsappNumber={settings.whatsappNumber}
          />
        </div>
      </section>

      {/* Interactive Sizing Calculator */}
      <section className="bg-slate-950/80 py-16 border-t border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SolarCalculator
            locale={locale}
            whatsappNumber={settings.whatsappNumber}
          />
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-slate-950 py-16 border-t border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="mb-8 text-2xl font-bold text-slate-50 text-center">
            {en ? 'Quick Selection Guide' : 'Краткое руководство по выбору'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950">
                  <th className="px-5 py-3 text-left font-semibold text-slate-300">{en ? 'Application' : 'Применение'}</th>
                  <th className="px-5 py-3 text-left font-semibold text-slate-300">{en ? 'Power' : 'Мощность'}</th>
                  <th className="px-5 py-3 text-left font-semibold text-slate-300">{en ? 'Mount height' : 'Высота'}</th>
                  <th className="px-5 py-3 text-left font-semibold text-slate-300">{en ? 'Type' : 'Тип'}</th>
                  <th className="px-5 py-3 text-left font-semibold text-slate-300">{en ? 'Autonomy' : 'Автономность'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {[
                  { scene: en ? 'Highway / Main road' : 'Магистраль / Основная дорога', power: '90–150 W', height: '10–15 m', type: en ? 'Split' : 'Раздельный', auto: en ? '3 days' : '3 дня' },
                  { scene: en ? 'Secondary road' : 'Второстепенная дорога', power: '60–90 W', height: '8–10 m', type: en ? 'Split / AIO' : 'Раздельный / AIO', auto: en ? '3 days' : '3 дня' },
                  { scene: en ? 'Residential area' : 'Жилой квартал', power: '40–60 W', height: '6–8 m', type: en ? 'All-in-one' : 'Универсальный', auto: en ? '2–3 days' : '2–3 дня' },
                  { scene: en ? 'Village road' : 'Сельская дорога', power: '20–30 W', height: '4–6 m', type: en ? 'All-in-one' : 'Универсальный', auto: en ? '3 days' : '3 дня' },
                  { scene: en ? 'Park / Pathway' : 'Парк / Дорожка', power: '30–40 W', height: '5–6 m', type: en ? 'All-in-one' : 'Универсальный', auto: en ? '2 days' : '2 дня' },
                  { scene: en ? 'Industrial yard' : 'Промышленный двор', power: '100–150 W', height: '10–16 m', type: en ? 'Split' : 'Раздельный', auto: en ? '3 days' : '3 дня' },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-950/50'}>
                    <td className="px-5 py-3 font-medium text-slate-200">{row.scene}</td>
                    <td className="px-5 py-3 text-slate-400">{row.power}</td>
                    <td className="px-5 py-3 text-slate-400">{row.height}</td>
                    <td className="px-5 py-3 text-slate-400">{row.type}</td>
                    <td className="px-5 py-3 text-slate-400">{row.auto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {en ? 'Selection ranges are preliminary. Autonomy depends on the selected battery, dimming schedule and local solar yield; confirm full-output hours separately.' : 'Диапазоны приведены для предварительного выбора. Автономность зависит от батареи, диммирования и местной инсоляции; время полной мощности уточняется отдельно.'}
          </p>
        </div>
      </section>

      {/* Export Logistics & Transit Corridors (GEO) */}
      <section className="bg-slate-950 py-16 border-t border-slate-800">
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

      {/* CTA */}
      <section className="bg-gradient-to-r from-yellow-400 to-orange-400 py-14 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          {en ? 'Not sure which model fits your project?' : 'Не уверены, какая модель подходит вашему проекту?'}
        </h2>
        <p className="mt-2 text-slate-800">
          {en ? 'Send us photos and the road width — we will pick the right model and send a lux simulation.' : 'Пришлите фото и ширину дороги — подберём модель и пришлём расчёт освещённости.'}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href={`/${locale}/contact`} className="rounded-full bg-slate-900 px-8 py-3 font-semibold text-white hover:bg-slate-800 transition">
            {en ? 'Get Free Lighting Plan' : 'Получить бесплатный проект'}
          </Link>
          <a
            href={`https://wa.me/${settings.whatsappNumber?.replace(/\D/g, '') ?? ''}`}
            target="_blank" rel="noopener noreferrer"
            className="rounded-full border-2 border-slate-900 px-8 py-3 font-semibold text-slate-900 hover:bg-slate-900 hover:text-white transition"
          >
            💬 WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
