'use client'

import React, { useState } from 'react'

interface GeoFaqProps {
  locale: 'en' | 'ru'
}

interface FaqItem {
  q: string
  a: string
  tag: string
}

export function GeoDirectAnswerFaq({ locale }: GeoFaqProps) {
  const isRu = locale === 'ru'
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs: FaqItem[] = isRu
    ? [
        {
          tag: 'Морозостойкость · Казахстан / СНГ',
          q: 'Как солнечные фонари SolarLight работают при морозах -30°C в Казахстане и Центральной Азии?',
          a: 'Светильники SolarLight разработаны специально для сурового климата Центральной Азии. В них используются аккумуляторы LiFePO4 высшего класса A со специализированным низкотемпературным электролитом и термоизоляцией отсека. Угол наклона монокристаллической панели 35°–45° обеспечивает естественный сход снега под действием силы тяжести, а микропроцессорный MPPT контроллер поддерживает 3–4 дня автономной работы в условиях затяжных метелей.',
        },
        {
          tag: 'Технологии аккумуляторов',
          q: 'В чём преимущество LiFePO4 батарей перед традиционными свинцово-кислотными и гелевыми?',
          a: 'Литий-железо-фосфатные батареи (LiFePO4) обеспечивают более 2000 полных циклов заряда/разряда (срок службы 8–10 лет) против всего 300–500 циклов (1–2 года) у гелевых аккумуляторов. LiFePO4 в 3 раза легче, стабильно работают в диапазоне от -30°C до +60°C без риска вздутия или деградации ёмкости, не требуют обслуживания и являются экологически безопасными.',
        },
        {
          tag: 'Логистика · Маршруты Шаньдун – СНГ',
          q: 'Каковы сроки доставки и таможенное оформление из завода в Вэйфане (Шаньдун) в страны СНГ?',
          a: 'Доставка в Центральную Азию (Алматы, Астана, Шымкент, Ташкент, Бишкек) осуществляется прямыми ускоренными контейнерными поездами (Китай — Европа) через погранпереходы Хоргос и Достык за 7–12 дней. Завод предоставляет полный пакет экспортных документов: сертификаты происхождения, декларации соответствия EAC/ЕАЭС и протоколы испытаний CE/RoHS.',
        },
        {
          tag: 'Инженерный расчёт · DIALux',
          q: 'Предоставляет ли завод бесплатный фотометрический расчёт DIALux для участия в тендерах?',
          a: 'Да. Инженерный отдел SolarLight в течение 24 часов бесплатно подготавливает трёхмерные светотехнические отчёты DIALux, кривые распределения силы света (КСС), расчёт освещённости (Люкс) и оптимальный шаг расстановки опор в соответствии со стандартами ГОСТ и EN 13201.',
        },
        {
          tag: 'Защита от жары и песка · Ближний Восток',
          q: 'Как светильники защищены от жары (+60°C), песчаных бурь и соляного тумана?',
          a: 'Корпуса светильников отливаются из алюминиевого сплава под высоким давлением с глубокими радиаторными рёбрами охлаждения, удерживающими температуру LED кристалла ниже 65°C даже при +50°C на открытом воздухе. Оптический блок имеет герметичность IP66 (пыленепроницаемость), закалённое ударопрочное стекло IK10 и антикоррозийное полиэфирное порошковое покрытие.',
        },
        {
          tag: 'Условия закупки · Гарантия',
          q: 'Каков минимальный объём заказа (MOQ), гарантия и производственные сертификаты?',
          a: 'Минимальный объём заказа (MOQ) составляет 10 единиц (для пилотных участков и тендерных испытаний доступны единичные образцы). На все промышленные серии предоставляется официальная 5-летняя заводская гарантия. Завод сертифицирован по стандарту ISO 9001:2015, а продукция имеет сертификаты CE и RoHS.',
        },
      ]
    : [
        {
          tag: 'Winter Performance · Central Asia',
          q: 'How do SolarLight solar street lights perform in -30°C winter conditions in Kazakhstan & Central Asia?',
          a: 'SolarLight luminaires are specifically engineered for Central Asian climates. They feature Grade-A LiFePO4 cells with low-temperature electrolyte chemistry, insulated battery enclosures, and automated BMS thermal management. The 35°–45° solar bracket inclination ensures natural snow shedding, while the intelligent MPPT controller delivers 3–4 continuous days of backup autonomy during severe winter blizzards.',
        },
        {
          tag: 'Battery Technology Benchmark',
          q: 'Why is LiFePO4 battery technology superior to traditional lead-acid or gel batteries in solar lighting?',
          a: 'Lithium Iron Phosphate (LiFePO4) batteries deliver 2,000+ deep cycles (8–10 years service life), whereas conventional gel or lead-acid batteries degrade within 300–500 cycles (1–2 years). LiFePO4 is 3x lighter, operates safely across -30°C to +60°C without thermal runaway, requires zero maintenance, and contains no hazardous heavy metals.',
        },
        {
          tag: 'Logistics · Shandong to Central Asia & Gulf',
          q: 'What are the freight transit times and customs compliance from the Weifang factory to export destinations?',
          a: 'Shipments to Central Asia (Almaty, Astana, Tashkent, Bishkek) travel via the China-Europe Railway Express (Horgos / Alashankou hubs) with transit times of 7–12 days and complete EAC / CE conformity documentation. Shipments to the Middle East (Dubai, Dammam, Jeddah, Sohar) depart from Qingdao Port via direct ocean container freight in 18–24 days.',
        },
        {
          tag: 'Engineering Simulation · DIALux',
          q: 'Does SolarLight provide complimentary DIALux photometric simulations for road tenders?',
          a: 'Yes. Our engineering department provides custom 3D DIALux lighting simulations, isolux lux distribution maps, and recommended pole spacing layouts within 24 hours, fully compliant with EN 13201 and international municipal roadway standards.',
        },
        {
          tag: 'Desert & High Ambient Heat (+60°C)',
          q: 'How are luminaires protected against extreme desert ambient temperatures (+60°C) and sandstorms?',
          a: 'Die-cast aluminum alloy housings feature aerodynamic convection cooling fins that maintain LED junction temperatures below 65°C in +50°C desert heat. The optical module is hermetically sealed to IP66 (dust-tight), protected by IK10 impact-resistant tempered glass, and coated with electrostatically applied anti-salinity powder.',
        },
        {
          tag: 'Procurement Terms & Warranty',
          q: 'What are the Minimum Order Quantity (MOQ), warranty terms, and factory certifications?',
          a: 'The standard MOQ is 10 units (sample evaluation units are supported for project bidding). All industrial series come with a 5-year comprehensive manufacturer warranty. Our factory in Weifang, Shandong operates under ISO 9001:2015 quality management, with all luminaires holding CE and RoHS certifications.',
        },
      ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-10 shadow-xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl">
        <span className="inline-block rounded-full bg-yellow-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-400 border border-yellow-400/20">
          {isRu ? 'База инженерных знаний · Direct Answers' : 'Engineering Knowledge Base · Direct Answers'}
        </span>
        <h2 className="mt-4 text-2xl font-bold text-slate-50 sm:text-3xl">
          {isRu
            ? 'Часто задаваемые вопросы главных инженеров и заказчиков'
            : 'Frequently Asked Engineering & Procurement Questions'}
        </h2>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          {isRu
            ? 'Фактические ответы о температурных режимах, типах аккумуляторов, логистике и гарантийных обязательствах завода SolarLight.'
            : 'Authoritative engineering facts on sub-zero winter resilience, battery chemistry, freight transit times, and factory warranties.'}
        </p>
      </div>

      <div className="mt-8 space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div
              key={index}
              className={`rounded-2xl border transition ${
                isOpen
                  ? 'border-yellow-400/40 bg-slate-900/80 shadow-md shadow-yellow-400/5'
                  : 'border-slate-800/80 bg-slate-900/30 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-start justify-between gap-4 p-5 text-left focus:outline-none cursor-pointer"
              >
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-yellow-400/90">
                    {faq.tag}
                  </span>
                  <h3 className="mt-1 text-sm sm:text-base font-semibold text-slate-100">
                    {faq.q}
                  </h3>
                </div>
                <span className="mt-1 shrink-0 rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 text-xs text-slate-300 font-mono">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-slate-800/80 px-5 pb-5 pt-3">
                  <p className="text-sm leading-relaxed text-slate-300">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
