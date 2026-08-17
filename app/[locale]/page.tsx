import Link from 'next/link'
import { getProducts, getSiteSettings, getProjectCases } from '@/sanity/lib/queries'
import { ProductGrid } from '@/components/ProductGrid'
import { CaseGallery } from '@/components/CaseGallery'

export default async function HomePage({ params }: { params: Promise<{ locale: 'en' | 'ru' }> }) {
  const { locale } = await params
  const [products, settings, cases] = await Promise.all([getProducts(), getSiteSettings(), getProjectCases()])
  const hotProducts = products.filter((p) => p.isHotProduct).slice(0, 6)

  const t = locale === 'en'
    ? {
        heroTitle: 'Solar Street Lights Built for Harsh Climates',
        heroSub: 'CE & RoHS certified · LiFePO4 battery · 5-year warranty · Ships to Kazakhstan, Uzbekistan & beyond',
        heroBtn: 'Get a Free Quote',
        heroBtn2: 'Browse Products',
        statsProjects: '500+ Projects',
        statsProjectsSub: 'Completed worldwide',
        statsCountries: '20+ Countries',
        statsCountriesSub: 'Active export markets',
        statsWarranty: '5-Year Warranty',
        statsWarrantySub: 'On all products',
        statsExp: '10+ Years',
        statsExpSub: 'Manufacturing experience',
        whyTitle: 'Why Choose SolarLight?',
        whySub: 'Engineered for reliability in extreme heat, dust, and off-grid environments.',
        features: [
          { icon: '🔋', title: 'LiFePO4 Battery', desc: 'Safer and longer-lasting than Li-ion. Rated 2000+ cycles, works from -20°C to +60°C.' },
          { icon: '☀️', title: 'Monocrystalline Panel', desc: '22%+ efficiency panels with anti-reflective glass. Charges fully even in partial shade.' },
          { icon: '💡', title: 'Bridgelux / Epistar LEDs', desc: '160+ lm/W luminous efficacy. Consistent color temperature 4000–6500K.' },
          { icon: '🛡️', title: 'IP65 / IP66 Rated', desc: 'Fully sealed against dust and rain. Withstands sandstorms common in Central Asia.' },
          { icon: '📡', title: 'Smart Motion Sensor', desc: 'Optional PIR sensor dims to 30% when idle, extends runtime by up to 40%.' },
          { icon: '🏆', title: 'CE · RoHS · ISO 9001', desc: 'All required certifications for import into Kazakhstan, Uzbekistan, and EU markets.' },
        ],
        scenesTitle: 'Application Scenarios',
        scenesSub: 'From remote villages to urban highways — one supplier for every project type.',
        scenes: [
          { icon: '🛣️', title: 'Main Roads & Highways', desc: '60W–120W high-power models with 8–12m pole height. Uniform 30+ lux road illumination.' },
          { icon: '🏘️', title: 'Residential & Community', desc: '30W–60W with decorative pole options. Perfect for housing estates and public squares.' },
          { icon: '🌾', title: 'Rural Villages', desc: '20W–40W cost-effective models. No grid needed — ideal for off-grid communities.' },
          { icon: '🏭', title: 'Industrial & Ports', desc: '80W–150W flood-style models. High lux output for warehouses, yards, and logistics hubs.' },
        ],
        howTitle: 'How to Order',
        howSteps: [
          { n: '01', title: 'Send Your Requirements', desc: 'Share site photos, pole spacing, and road width via WhatsApp or email.' },
          { n: '02', title: 'Receive Free Lighting Plan', desc: 'Our engineers design a layout with lux simulation within 24 hours.' },
          { n: '03', title: 'Confirm & Ship', desc: 'MOQ 10 units. Sea freight or air freight. Door-to-door delivery to Central Asia.' },
        ],
        howBtn: 'Start on WhatsApp',
        popularTitle: 'Popular Products',
        viewAll: 'View All Products →',
        galleryTitle: 'Real Installations',
        gallerySub: 'Photos from actual project sites across China and export markets.',
        testimonialsTitle: 'What Our Clients Say',
        testimonials: [
          { name: 'Alibek Dzhaksybekov', role: 'Municipal Procurement, Almaty', text: 'Ordered 200 units for a road project. Installation was straightforward and the lights have been running flawlessly for 18 months.' },
          { name: 'Rustam Nazarov', role: 'Infrastructure Developer, Tashkent', text: 'CE certificate made customs clearance easy. The free lighting design service saved us weeks of engineering work.' },
          { name: 'Ahmed Al-Rashidi', role: 'Project Manager, Oman', text: 'IP66 model handles the desert heat and dust perfectly. No maintenance calls in the first year.' },
        ],
        ctaTitle: 'Ready to light your next project?',
        ctaSub: 'Get a free lighting plan and quote within 24 hours.',
        ctaBtn: 'WhatsApp Us Now',
        ctaBtn2: 'Download Catalogue',
        trustBadges: ['CE Certified', 'RoHS Compliant', 'ISO 9001', '5-Year Warranty', '10+ Years Export'],
      }
    : {
        heroTitle: 'Солнечные фонари для суровых климатических условий',
        heroSub: 'Сертификаты CE и RoHS · Батарея LiFePO4 · Гарантия 5 лет · Доставка в Казахстан, Узбекистан и другие страны',
        heroBtn: 'Получить бесплатное предложение',
        heroBtn2: 'Смотреть продукты',
        statsProjects: '500+ проектов',
        statsProjectsSub: 'Выполнено по всему миру',
        statsCountries: '20+ стран',
        statsCountriesSub: 'Активные экспортные рынки',
        statsWarranty: 'Гарантия 5 лет',
        statsWarrantySub: 'На все продукты',
        statsExp: '10+ лет',
        statsExpSub: 'Опыт производства',
        whyTitle: 'Почему выбирают SolarLight?',
        whySub: 'Разработаны для надёжной работы в условиях экстремальной жары, пыли и автономных систем.',
        features: [
          { icon: '🔋', title: 'Батарея LiFePO4', desc: 'Безопаснее и долговечнее литий-ионных. Рассчитана на 2000+ циклов, работает от -20°C до +60°C.' },
          { icon: '☀️', title: 'Монокристаллическая панель', desc: 'КПД 22%+, антибликовое стекло. Заряжается даже при частичном затенении.' },
          { icon: '💡', title: 'Светодиоды Bridgelux / Epistar', desc: 'Световой поток 160+ лм/Вт. Цветовая температура 4000–6500K.' },
          { icon: '🛡️', title: 'Степень защиты IP65/IP66', desc: 'Полная защита от пыли и дождя. Выдерживает пыльные бури, типичные для Центральной Азии.' },
          { icon: '📡', title: 'Умный датчик движения', desc: 'Опциональный ИК-датчик снижает яркость до 30% при отсутствии движения, увеличивая работу до 40%.' },
          { icon: '🏆', title: 'CE · RoHS · ISO 9001', desc: 'Все необходимые сертификаты для импорта в Казахстан, Узбекистан и страны ЕС.' },
        ],
        scenesTitle: 'Сферы применения',
        scenesSub: 'От отдалённых деревень до городских магистралей — один поставщик для любого проекта.',
        scenes: [
          { icon: '🛣️', title: 'Дороги и магистрали', desc: 'Мощные модели 60–120 Вт, высота столба 8–12 м. Равномерное освещение 30+ люкс.' },
          { icon: '🏘️', title: 'Жилые и общественные зоны', desc: '30–60 Вт с декоративными вариантами столбов. Идеально для жилых кварталов и площадей.' },
          { icon: '🌾', title: 'Сельские населённые пункты', desc: 'Экономичные модели 20–40 Вт. Без подключения к сети — для автономных поселений.' },
          { icon: '🏭', title: 'Промышленность и порты', desc: 'Прожекторные модели 80–150 Вт. Высокая освещённость для складов и логистических центров.' },
        ],
        howTitle: 'Как заказать',
        howSteps: [
          { n: '01', title: 'Отправьте требования', desc: 'Поделитесь фото объекта, расстоянием между столбами и шириной дороги через WhatsApp или email.' },
          { n: '02', title: 'Получите бесплатный план', desc: 'Наши инженеры разработают схему с расчётом освещённости в течение 24 часов.' },
          { n: '03', title: 'Подтвердите и отправьте', desc: 'МОК от 10 единиц. Морская или авиадоставка. Доставка до двери в Центральную Азию.' },
        ],
        howBtn: 'Написать в WhatsApp',
        popularTitle: 'Популярные товары',
        viewAll: 'Все продукты →',
        galleryTitle: 'Реальные установки',
        gallerySub: 'Фотографии с реальных объектов в Китае и экспортных рынках.',
        testimonialsTitle: 'Отзывы клиентов',
        testimonials: [
          { name: 'Алибек Джаксыбеков', role: 'Муниципальные закупки, Алматы', text: 'Заказали 200 единиц для дорожного проекта. Монтаж прошёл легко, фонари работают без сбоев уже 18 месяцев.' },
          { name: 'Рустам Назаров', role: 'Застройщик инфраструктуры, Ташкент', text: 'Сертификат CE упростил таможенное оформление. Бесплатный светотехнический проект сэкономил нам недели работы.' },
          { name: 'Ахмед Аль-Рашиди', role: 'Менеджер проекта, Оман', text: 'Модель IP66 отлично справляется с пустынной жарой и пылью. За первый год — ни одного сервисного вызова.' },
        ],
        ctaTitle: 'Готовы осветить следующий проект?',
        ctaSub: 'Получите бесплатный светотехнический проект и коммерческое предложение в течение 24 часов.',
        ctaBtn: 'Написать в WhatsApp',
        ctaBtn2: 'Скачать каталог',
        trustBadges: ['Сертификат CE', 'Соответствует RoHS', 'ISO 9001', 'Гарантия 5 лет', 'Экспорт 10+ лет'],
      }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-28 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(250,204,21,0.15),_transparent_60%)]" />
        <div className="mx-auto max-w-3xl px-4 text-center">
          <span className="mb-4 inline-block rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-yellow-400">
            {locale === 'en' ? 'B2B Solar Lighting Manufacturer' : 'Производитель солнечных светильников B2B'}
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t.heroTitle}
          </h1>
          <p className="mt-5 text-lg text-slate-300">{t.heroSub}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${settings.whatsappNumber?.replace(/\D/g, '') ?? ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-yellow-400 px-8 py-3 font-semibold text-slate-900 shadow-lg hover:bg-yellow-300"
            >
              {t.heroBtn}
            </a>
            <Link
              href={`/${locale}/products`}
              className="rounded-full border border-slate-500 px-8 py-3 font-semibold text-slate-100 hover:border-yellow-400 hover:text-yellow-400"
            >
              {t.heroBtn2}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-yellow-400">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-yellow-500 sm:grid-cols-4">
          {[
            { value: t.statsProjects, sub: t.statsProjectsSub },
            { value: t.statsCountries, sub: t.statsCountriesSub },
            { value: t.statsWarranty, sub: t.statsWarrantySub },
            { value: t.statsExp, sub: t.statsExpSub },
          ].map((s) => (
            <div key={s.value} className="py-6 text-center">
              <div className="text-xl font-bold text-slate-900 sm:text-2xl">{s.value}</div>
              <div className="mt-0.5 text-xs text-slate-700">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">{t.whyTitle}</h2>
            <p className="mt-3 text-slate-500">{t.whySub}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-6 hover:border-yellow-300 hover:shadow-md transition">
                <div className="mb-3 text-3xl">{f.icon}</div>
                <h3 className="mb-2 font-semibold text-slate-900">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Scenarios */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">{t.scenesTitle}</h2>
            <p className="mt-3 text-slate-500">{t.scenesSub}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.scenes.map((s) => (
              <div key={s.title} className="group rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="mb-4 text-4xl">{s.icon}</div>
                <h3 className="mb-2 font-semibold text-slate-900">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Products */}
      {hotProducts.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-10 text-3xl font-bold text-slate-900">{t.popularTitle}</h2>
            <ProductGrid products={hotProducts} locale={locale} />
            <div className="mt-10 text-center">
              <Link
                href={`/${locale}/products`}
                className="rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-700"
              >
                {t.viewAll}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* How to Order */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">{t.howTitle}</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {t.howSteps.map((step) => (
              <div key={step.n} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-xl font-bold text-slate-900">
                  {step.n}
                </div>
                <h3 className="mb-2 font-semibold text-slate-100">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href={`https://wa.me/${settings.whatsappNumber?.replace(/\D/g, '') ?? ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-yellow-400 px-10 py-3 font-semibold text-slate-900 hover:bg-yellow-300"
            >
              {t.howBtn}
            </a>
          </div>
        </div>
      </section>

      {/* Project Cases Gallery */}
      {cases.length > 0 && (
        <section className="bg-slate-950 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-3 text-3xl font-bold text-slate-50">{t.galleryTitle}</h2>
            <p className="mb-10 text-slate-400">{t.gallerySub}</p>
            <CaseGallery cases={cases} locale={locale} />
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">{t.testimonialsTitle}</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {t.testimonials.map((r) => (
              <div key={r.name} className="rounded-2xl border border-slate-100 p-6 shadow-sm">
                <p className="text-sm text-slate-600 leading-relaxed">"{r.text}"</p>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <div className="font-semibold text-slate-900">{r.name}</div>
                  <div className="text-xs text-slate-400">{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-yellow-400 to-orange-400 py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-bold text-slate-900">{t.ctaTitle}</h2>
          <p className="mt-3 text-slate-800">{t.ctaSub}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${settings.whatsappNumber?.replace(/\D/g, '') ?? ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-slate-900 px-8 py-3 font-semibold text-white hover:bg-slate-700"
            >
              {t.ctaBtn}
            </a>
            <Link
              href={`/${locale}/products`}
              className="rounded-full border-2 border-slate-900 px-8 py-3 font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
            >
              {t.ctaBtn2}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t bg-slate-50 py-8 text-center">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-8 px-4">
          {t.trustBadges.map((badge) => (
            <span key={badge} className="text-sm font-semibold text-slate-500">✓ {badge}</span>
          ))}
        </div>
      </section>
    </>
  )
}
