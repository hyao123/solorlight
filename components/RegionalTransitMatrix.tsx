'use client'

import React from 'react'

interface RegionalTransitProps {
  locale: 'en' | 'ru'
  whatsappNumber?: string
}

export function RegionalTransitMatrix({ locale, whatsappNumber }: RegionalTransitProps) {
  const isRu = locale === 'ru'
  const cleanPhone = whatsappNumber?.replace(/\D/g, '') || '8615866126888'

  const routes = isRu
    ? [
        {
          corridor: 'Коридор Центральной Азии',
          destinations: 'Казахстан · Узбекистан · Кыргызстан · Таджикистан',
          cities: 'Алматы, Астана, Шымкент, Ташкент, Самарканд, Бишкек, Ош',
          mode: 'Прямой ускоренный ж/д контейнерный поезд (China-Europe Rail)',
          transitTime: '7 – 12 дней',
          hub: 'Хоргос / Достык (погранпереходы Китай — Казахстан)',
          docs: 'Сертификат происхождения (Форма А/СТ-1), Декларация ЕАЭС/EAC, CE, RoHS',
          icon: '🚆',
          bgAccent: 'from-blue-500/10 to-transparent',
          borderAccent: 'border-blue-500/30',
        },
        {
          corridor: 'Морской коридор Ближнего Востока',
          destinations: 'ОАЭ · Саудовская Аравия · Оман · Катар',
          cities: 'Дубай (Джебель-Али), Даммам, Эр-Рияд, Джидда, Сохар',
          mode: 'Морские контейнерные линии (20GP / 40HQ) из глубоководного порта Циндао',
          transitTime: '18 – 24 дня',
          hub: 'Порт Циндао (180 км от завода в Вэйфане)',
          docs: 'SABER / SASO сертификация, Сертификат соответствия COC, CE, Bill of Lading',
          icon: '🚢',
          bgAccent: 'from-amber-500/10 to-transparent',
          borderAccent: 'border-amber-500/30',
        },
        {
          corridor: 'Каспийский и Кавказский коридор',
          destinations: 'Азербайджан · Грузия · Армения · Туркменистан',
          cities: 'Баку, Тбилиси, Ереван, Туркменбаши, Ашхабад',
          mode: 'Мультимодальные ж/д и морские паромные перевозки через Каспий',
          transitTime: '14 – 20 дней',
          hub: 'Актау / Курык (паромный транзит)',
          docs: 'Экспортная таможенная декларация, упаковочные листы, сертификаты качества',
          icon: '🚚',
          bgAccent: 'from-emerald-500/10 to-transparent',
          borderAccent: 'border-emerald-500/30',
        },
      ]
    : [
        {
          corridor: 'Central Asian Rail Corridor',
          destinations: 'Kazakhstan · Uzbekistan · Kyrgyzstan · Tajikistan',
          cities: 'Almaty, Astana, Shymkent, Tashkent, Samarkand, Bishkek, Osh',
          mode: 'China-Europe Railway Express (Direct Container Block Trains)',
          transitTime: '7 – 12 Days',
          hub: 'Horgos / Dostyk Border Rail Crossings',
          docs: 'Certificate of Origin (Form A / CO), EAEU / EAC Declaration, CE, RoHS',
          icon: '🚆',
          bgAccent: 'from-blue-500/10 to-transparent',
          borderAccent: 'border-blue-500/30',
        },
        {
          corridor: 'Middle East Maritime Corridor',
          destinations: 'UAE · Saudi Arabia · Oman · Qatar',
          cities: 'Dubai (Jebel Ali), Dammam, Riyadh, Jeddah, Sohar',
          mode: 'Direct Ocean Freight (20GP / 40HQ) from Qingdao Deepwater Port',
          transitTime: '18 – 24 Days',
          hub: 'Qingdao Port Terminal (180 km from Weifang Factory)',
          docs: 'SABER / SASO Compliance, COC Inspection, CE, Bill of Lading',
          icon: '🚢',
          bgAccent: 'from-amber-500/10 to-transparent',
          borderAccent: 'border-amber-500/30',
        },
        {
          corridor: 'Caspian & Caucasus Corridor',
          destinations: 'Azerbaijan · Georgia · Armenia · Turkmenistan',
          cities: 'Baku, Tbilisi, Yerevan, Turkmenbashi, Ashgabat',
          mode: 'Multimodal Rail & Caspian Sea Ferry Transit',
          transitTime: '14 – 20 Days',
          hub: 'Aktau / Kuryk Ferry Hub',
          docs: 'Export Customs Declaration, Packing Lists, CE Quality Inspection',
          icon: '🚚',
          bgAccent: 'from-emerald-500/10 to-transparent',
          borderAccent: 'border-emerald-500/30',
        },
      ]

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-10 shadow-xl">
      <div className="max-w-3xl">
        <span className="inline-block rounded-full bg-yellow-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-400 border border-yellow-400/20">
          {isRu ? 'География экспорта и логистические коридоры' : 'Export Logistics & Transport Corridors'}
        </span>
        <h2 className="mt-4 text-2xl font-bold text-slate-50 sm:text-3xl">
          {isRu
            ? 'Прямые поставки с завода в Вэйфане в 20+ стран'
            : 'Direct Factory Freight from Weifang to 20+ Countries'}
        </h2>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          {isRu
            ? 'Благодаря близости к порту Циндао (180 км) и регулярным контейнерным поездам «Китай — Европа», мы гарантируем предсказуемые сроки доставки и полный пакет таможенной документации.'
            : 'Located 180 km from Qingdao Port and connected to the China-Europe Railway Network, we deliver fast, trackable freight with complete EAC and CE export compliance.'}
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {routes.map((r, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col justify-between rounded-2xl border ${r.borderAccent} bg-gradient-to-b ${r.bgAccent} bg-slate-900/60 p-6 hover:border-yellow-400/50 transition`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-3xl">{r.icon}</span>
                <span className="rounded-full bg-slate-800/90 px-3 py-1 text-xs font-bold text-yellow-400 border border-slate-700">
                  ⏱️ {r.transitTime}
                </span>
              </div>

              <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-100">{r.corridor}</h3>
              <p className="mt-1 text-xs font-semibold text-yellow-400/90">{r.destinations}</p>

              <div className="mt-4 space-y-2.5 border-t border-slate-800/80 pt-4 text-xs text-slate-300">
                <div>
                  <span className="font-semibold text-slate-400">{isRu ? 'Города:' : 'Key Cities:'}</span>{' '}
                  <span>{r.cities}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-400">{isRu ? 'Транспорт:' : 'Transport:'}</span>{' '}
                  <span>{r.mode}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-400">{isRu ? 'Логистический узел:' : 'Transit Hub:'}</span>{' '}
                  <span>{r.hub}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-400">{isRu ? 'Документы:' : 'Documents:'}</span>{' '}
                  <span>{r.docs}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-800/80 pt-4">
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  isRu
                    ? `Здравствуйте, интересует расчёт стоимости доставки и КП для направления: ${r.corridor}.`
                    : `Hello, please calculate shipping freight and lead time for: ${r.corridor}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-yellow-400 hover:text-slate-950 transition"
              >
                <span>💬</span>
                <span>{isRu ? 'Рассчитать доставку в WhatsApp' : 'Calculate Freight on WhatsApp'}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
