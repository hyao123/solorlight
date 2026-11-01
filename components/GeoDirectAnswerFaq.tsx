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
          a: 'Для холодной зимы нужно подтвердить допустимые температуры зарядки и разрядки, настройки BMS и наличие обогрева у выбранной модели. Низкотемпературная защита и термоизоляция не подразумеваются автоматически. Панель, наклон и полезную ёмкость рассчитывают по снеговой нагрузке, инсоляции худшего месяца и графику диммирования.',
        },
        {
          tag: 'Технологии аккумуляторов',
          q: 'В чём преимущество LiFePO4 батарей перед традиционными свинцово-кислотными и гелевыми?',
          a: 'LiFePO4 часто выбирают для солнечного освещения. Ёмкость, ресурс в циклах и температурные пределы зависят от ячеек, BMS и режима работы; их подтверждают по документации модели. Число циклов само по себе не гарантирует срок службы или гарантию в годах.',
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
          a: 'Проверьте температурные пределы и снижение мощности всех компонентов, класс IP/IK конкретной модели и данные покрытия. IP и IK сами по себе не подтверждают стойкость к солевому туману, абразивному песку или работу при +60°C. Нужны документы и расчёт для условий объекта.',
        },
        {
          tag: 'Условия закупки · Гарантия',
          q: 'Каков минимальный объём заказа (MOQ), гарантия и производственные сертификаты?',
          a: 'Минимальный объём заказа — 10 единиц; образцы согласуются отдельно. Срок, компоненты и исключения гарантии подтверждаются для модели в предложении. До заказа запросите документы CE/RoHS с перечнем моделей и сертификат ISO 9001 производителя; ISO 9001 относится к системе менеджмента, а не к допуску изделия.',
        },
      ]
    : [
        {
          tag: 'Winter Performance · Central Asia',
          q: 'How do SolarLight solar street lights perform in -30°C winter conditions in Kazakhstan & Central Asia?',
          a: 'For winter projects, confirm the selected model’s charge/discharge temperature limits, BMS settings and any heating requirement. Low-temperature protection and insulation are not included by assumption. Size the panel, tilt and usable battery energy for snow loads, worst-month solar yield and the agreed dimming schedule.',
        },
        {
          tag: 'Battery Technology Benchmark',
          q: 'Why is LiFePO4 battery technology superior to traditional lead-acid or gel batteries in solar lighting?',
          a: 'LiFePO4 is commonly used in solar lighting. Capacity, cycle life and temperature limits depend on the cells, BMS and operating conditions and must be checked in the model documentation. A cycle rating alone does not guarantee a service life or warranty duration in years.',
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
          a: 'Review component temperature limits and derating, the selected model’s IP/IK ratings, and coating test data. IP and IK ratings alone do not establish resistance to salt spray or abrasive sand, or operation at +60°C. Confirm the configuration against site conditions and supporting reports.',
        },
        {
          tag: 'Procurement Terms & Warranty',
          q: 'What are the Minimum Order Quantity (MOQ), warranty terms, and factory certifications?',
          a: 'The standard MOQ is 10 units; sample arrangements are confirmed separately. Warranty duration, covered components and exclusions are agreed for the model in the quotation. Request CE/RoHS documentation with covered models and the manufacturer’s ISO 9001 certificate before ordering; ISO 9001 concerns the quality system rather than product approval.',
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
