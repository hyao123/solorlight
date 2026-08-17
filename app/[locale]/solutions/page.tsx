import Link from 'next/link'
import Image from 'next/image'
import { getProductSeries, getProducts, getSiteSettings } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'en'
      ? 'Solar Lighting Solutions by Application – SolarLight Solutions'
      : 'Решения солнечного освещения по применению – SolarLight Solutions',
    description: locale === 'en'
      ? 'Solar street lights for roads, rural villages, community areas, and industrial sites. CE certified, 5-year warranty, ships to Central Asia and Middle East.'
      : 'Солнечные уличные фонари для дорог, сёл, жилых районов и промышленных объектов. Сертификат CE, гарантия 5 лет, доставка в Центральную Азию.',
    alternates: { languages: { en: '/en/solutions', ru: '/ru/solutions' } },
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
  road: {
    icon: '🛣️',
    heroImg: 'https://www.zgsm-china.com/wp-content/uploads/2022/01/65w-outdoor-solar-street-lights-for-Road-lighting-in-industrial-area-in-JIANGXI-OF-CHINA-1024x683.jpg',
    colorFrom: 'from-blue-900',
    colorTo: 'to-slate-900',
    accent: 'text-blue-400',
    statsEn: [
      { label: 'Recommended power', value: '60 W – 150 W' },
      { label: 'Lumen output', value: '9,600 – 24,000 lm' },
      { label: 'Mount height', value: '8 – 15 m' },
      { label: 'Protection', value: 'IP66 / IK10' },
    ],
    statsRu: [
      { label: 'Рекомендуемая мощность', value: '60 Вт – 150 Вт' },
      { label: 'Световой поток', value: '9 600 – 24 000 лм' },
      { label: 'Высота монтажа', value: '8 – 15 м' },
      { label: 'Защита', value: 'IP66 / IK10' },
    ],
    useCasesEn: ['National highways', 'Inter-city roads', 'Ring roads & bypass routes', 'Border crossing zones', 'Bridge lighting'],
    useCasesRu: ['Национальные автомагистрали', 'Межгородские дороги', 'Кольцевые и объездные дороги', 'Зоны пограничных переходов', 'Освещение мостов'],
    challengesEn: 'Main roads demand maximum lux levels, consistent beam uniformity, and lights that stay on through 3+ cloudy days. We specify split-type systems with oversized panels and LiFePO4 batteries rated for -30 °C so that winter conditions in Kazakhstan or the Afghan highlands are not a problem.',
    challengesRu: 'Основные дороги требуют максимального уровня освещённости, равномерного светораспределения и автономии на 3+ пасмурных дня. Мы применяем раздельные системы с увеличенными панелями и батареями LiFePO4 на -30 °C — чтобы зима в Казахстане или горах Афганистана не была проблемой.',
    recommendedWatts: '60 W · 90 W · 120 W · 150 W',
  },
  community: {
    icon: '🏘️',
    heroImg: 'https://www.zgsm-china.com/wp-content/uploads/2022/01/Series-PV-solar-powered-parking-lot-lights-in-amusement-park-in-Thailand-1024x683.jpg',
    colorFrom: 'from-emerald-900',
    colorTo: 'to-slate-900',
    accent: 'text-emerald-400',
    statsEn: [
      { label: 'Recommended power', value: '30 W – 60 W' },
      { label: 'Lumen output', value: '4,800 – 9,600 lm' },
      { label: 'Mount height', value: '5 – 10 m' },
      { label: 'Protection', value: 'IP66' },
    ],
    statsRu: [
      { label: 'Рекомендуемая мощность', value: '30 Вт – 60 Вт' },
      { label: 'Световой поток', value: '4 800 – 9 600 лм' },
      { label: 'Высота монтажа', value: '5 – 10 м' },
      { label: 'Защита', value: 'IP66' },
    ],
    useCasesEn: ['Residential neighbourhoods', 'Parks & squares', 'School playgrounds', 'Markets & bazaars', 'Mosque & church surrounds'],
    useCasesRu: ['Жилые кварталы', 'Парки и площади', 'Школьные дворы', 'Рынки и базары', 'Территории мечетей и церквей'],
    challengesEn: 'Community areas need warm, welcoming light at moderate heights — not industrial brightness. All-in-one integrated designs keep installation simple and pole costs low. PIR sensors cut power use by 40 % when no one is around.',
    challengesRu: 'Жилые зоны требуют тёплого, комфортного освещения на умеренной высоте. Универсальные интегрированные конструкции упрощают монтаж и снижают стоимость столбов. Датчики PIR снижают потребление на 40 % при отсутствии людей.',
    recommendedWatts: '30 W · 40 W · 60 W',
  },
  rural: {
    icon: '🌾',
    heroImg: 'https://www.zgsm-china.com/wp-content/uploads/2022/08/Series-Kmini-led-solar-street-lamp-on-Suburban-highway-in-Tunisia-2-1024x683.jpg',
    colorFrom: 'from-amber-900',
    colorTo: 'to-slate-900',
    accent: 'text-amber-400',
    statsEn: [
      { label: 'Recommended power', value: '20 W – 40 W' },
      { label: 'Lumen output', value: '3,000 – 6,400 lm' },
      { label: 'Mount height', value: '4 – 7 m' },
      { label: 'Battery autonomy', value: '3 rainy days' },
    ],
    statsRu: [
      { label: 'Рекомендуемая мощность', value: '20 Вт – 40 Вт' },
      { label: 'Световой поток', value: '3 000 – 6 400 лм' },
      { label: 'Высота монтажа', value: '4 – 7 м' },
      { label: 'Автономность батареи', value: '3 пасмурных дня' },
    ],
    useCasesEn: ['Village main streets', 'Rural schools & clinics', 'Farm access roads', 'Irrigation canal paths', 'Off-grid settlements'],
    useCasesRu: ['Главные улицы сёл', 'Сельские школы и фельдшерские пункты', 'Сельскохозяйственные дороги', 'Тропы вдоль ирригационных каналов', 'Автономные посёлки'],
    challengesEn: 'Rural budgets are tight. Our Kmini range delivers 90 % of road performance at 60 % of the cost by using proven monocrystalline panels and LiFePO4 cells without the premium form factor. No electrician required — a village handyman can install one in 2 hours.',
    challengesRu: 'Сельские бюджеты ограничены. Линейка Kmini обеспечивает 90 % характеристик дорожных моделей за 60 % стоимости за счёт монокристаллических панелей и элементов LiFePO4 без премиальных корпусов. Электрик не нужен — сельский мастер установит один фонарь за 2 часа.',
    recommendedWatts: '20 W · 30 W',
  },
  industrial: {
    icon: '🏭',
    heroImg: 'https://www.zgsm-china.com/wp-content/uploads/2022/01/solar-street-led-light-in-road-lighting-in-Ecuador-2-1024x683.jpg',
    colorFrom: 'from-violet-900',
    colorTo: 'to-slate-900',
    accent: 'text-violet-400',
    statsEn: [
      { label: 'Recommended power', value: '100 W – 150 W' },
      { label: 'Lumen output', value: '16,000 – 26,400 lm' },
      { label: 'Mount height', value: '10 – 16 m' },
      { label: 'Protection', value: 'IP66 / IK10' },
    ],
    statsRu: [
      { label: 'Рекомендуемая мощность', value: '100 Вт – 150 Вт' },
      { label: 'Световой поток', value: '16 000 – 26 400 лм' },
      { label: 'Высота монтажа', value: '10 – 16 м' },
      { label: 'Защита', value: 'IP66 / IK10' },
    ],
    useCasesEn: ['Logistics yards & warehouses', 'Port terminals', 'Mining site perimeters', 'Oil field access roads', 'Airport ground areas'],
    useCasesRu: ['Логистические дворы и склады', 'Портовые терминалы', 'Периметры горнодобывающих предприятий', 'Дороги нефтяных месторождений', 'Наземные зоны аэропортов'],
    challengesEn: 'Industrial sites run 24/7 and cannot tolerate lighting failures. We pair high-output 100–150 W heads with 1,000+ Wh battery packs and dual MPPT controllers for redundancy. Remote monitoring via 4G is available on request.',
    challengesRu: 'Промышленные объекты работают круглосуточно и не могут допустить сбоев освещения. Мы комплектуем мощные головки 100–150 Вт батарейными блоками 1000+ Вт·ч и двойными контроллерами MPPT для резервирования. Дистанционный мониторинг через 4G — по запросу.',
    recommendedWatts: '100 W · 120 W · 150 W',
  },
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }) {
  const { locale } = await params
  const [series, products, settings] = await Promise.all([
    getProductSeries(), getProducts(), getSiteSettings(),
  ])

  const en = locale === 'en'

  return (
    <>
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
      <div className="divide-y divide-slate-100">
        {series.map((s, idx) => {
          const cfg = SCENE_CONFIG[s.targetScene]
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
                    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${cfg.colorFrom} ${cfg.colorTo}`}>
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
                      <div className="grid grid-cols-2 divide-x divide-white/10 border-t border-white/10">
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
                    <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                      {s.description[locale]}
                    </h2>
                    <p className="mt-4 text-slate-500 leading-relaxed">{challenge}</p>

                    {/* Use cases */}
                    <div className="mt-6">
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {en ? 'Typical applications' : 'Типичные применения'}
                      </div>
                      <ul className="grid grid-cols-2 gap-1.5">
                        {useCases.map((uc) => (
                          <li key={uc} className="flex items-start gap-2 text-sm text-slate-700">
                            <span className="mt-0.5 text-green-500">✓</span> {uc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommended models */}
                    {seriesProducts.length > 0 && (
                      <div className="mt-6">
                        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          {en ? 'Recommended models' : 'Рекомендуемые модели'}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {seriesProducts.map((p) => (
                            <Link
                              key={p._id}
                              href={`/${locale}/products/${p.slug.current}`}
                              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-orange-400 hover:text-orange-600 transition"
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
                        className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                      >
                        {en ? `View all ${s.name.en} products →` : `Все продукты серии ${s.name.ru} →`}
                      </Link>
                      <a
                        href={`https://wa.me/${settings.whatsappNumber?.replace(/\D/g, '') ?? ''}?text=${encodeURIComponent(en ? `I need solar lights for: ${s.name.en}` : `Нужны фонари для: ${s.name.ru}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-green-400 hover:text-green-600 transition"
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

      {/* Comparison table */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="mb-8 text-2xl font-bold text-slate-900 text-center">
            {en ? 'Quick Selection Guide' : 'Краткое руководство по выбору'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-5 py-3 text-left font-semibold text-slate-700">{en ? 'Application' : 'Применение'}</th>
                  <th className="px-5 py-3 text-left font-semibold text-slate-700">{en ? 'Power' : 'Мощность'}</th>
                  <th className="px-5 py-3 text-left font-semibold text-slate-700">{en ? 'Mount height' : 'Высота'}</th>
                  <th className="px-5 py-3 text-left font-semibold text-slate-700">{en ? 'Type' : 'Тип'}</th>
                  <th className="px-5 py-3 text-left font-semibold text-slate-700">{en ? 'Autonomy' : 'Автономность'}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { scene: en ? 'Highway / Main road' : 'Магистраль / Основная дорога', power: '90–150 W', height: '10–15 m', type: en ? 'Split' : 'Раздельный', auto: en ? '3 days' : '3 дня' },
                  { scene: en ? 'Secondary road' : 'Второстепенная дорога', power: '60–90 W', height: '8–10 m', type: en ? 'Split / AIO' : 'Раздельный / AIO', auto: en ? '3 days' : '3 дня' },
                  { scene: en ? 'Residential area' : 'Жилой квартал', power: '40–60 W', height: '6–8 m', type: en ? 'All-in-one' : 'Универсальный', auto: en ? '2–3 days' : '2–3 дня' },
                  { scene: en ? 'Village road' : 'Сельская дорога', power: '20–30 W', height: '4–6 m', type: en ? 'All-in-one' : 'Универсальный', auto: en ? '3 days' : '3 дня' },
                  { scene: en ? 'Park / Pathway' : 'Парк / Дорожка', power: '30–40 W', height: '5–6 m', type: en ? 'All-in-one' : 'Универсальный', auto: en ? '2 days' : '2 дня' },
                  { scene: en ? 'Industrial yard' : 'Промышленный двор', power: '100–150 W', height: '10–16 m', type: en ? 'Split' : 'Раздельный', auto: en ? '3 days' : '3 дня' },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-5 py-3 font-medium text-slate-900">{row.scene}</td>
                    <td className="px-5 py-3 text-slate-600">{row.power}</td>
                    <td className="px-5 py-3 text-slate-600">{row.height}</td>
                    <td className="px-5 py-3 text-slate-600">{row.type}</td>
                    <td className="px-5 py-3 text-slate-600">{row.auto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          <Link href={`/${locale}/contact`} className="rounded-full bg-slate-900 px-8 py-3 font-semibold text-white hover:bg-slate-700">
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
