'use client'

import React, { useState } from 'react'

interface RegionalAdaptationMatrixProps {
  locale: 'en' | 'ru'
  whatsappNumber?: string
}

export function RegionalAdaptationMatrix({ locale, whatsappNumber }: RegionalAdaptationMatrixProps) {
  const isRu = locale === 'ru'
  const [activeTab, setActiveTab] = useState<'centralAsia' | 'middleEast' | 'remoteVillage'>('centralAsia')

  const cleanPhone = whatsappNumber?.replace(/\D/g, '') || '8615866126888'

  const data = {
    centralAsia: {
      id: 'centralAsia',
      badge: isRu ? 'Казахстан · Узбекистан · Кыргызстан' : 'Kazakhstan · Uzbekistan · Kyrgyzstan',
      title: isRu
        ? 'Адаптация к суровым зимам Центральной Азии (-30°C)'
        : 'Engineered for Central Asian Cold Steppes & Winters (-30°C)',
      description: isRu
        ? 'Специализированная серия с морозостойкими аккумуляторами LiFePO4, оптимизированным зимним углом наклона панели и защитой от обледенения.'
        : 'Specialized cold-climate series featuring low-temperature LiFePO4 chemistry, automated BMS thermal protection, and high-tilt snow-shedding solar brackets.',
      features: [
        {
          title: isRu ? 'Морозостойкий LiFePO4 аккумулятор' : 'Low-Temperature LiFePO4 Chemistry',
          desc: isRu
            ? 'Сохраняет более 80% эффективной ёмкости при температуре до -30°C благодаря специальному электролиту и термоизоляции отсека.'
            : 'Retains >80% usable capacity at sub-zero temperatures down to -30°C with insulated battery compartment and low-temp electrolyte.',
          icon: '❄️',
        },
        {
          title: isRu ? 'Угол наклона 35°–45° против снега' : '35°–45° Snow-Shedding Tilt Angle',
          desc: isRu
            ? 'Крутой угол установки панели предотвращает скапливание снега и обеспечивает максимальный сбор зимней солнечной радиации.'
            : 'Steep panel inclination prevents heavy snow accumulation while maximizing winter solar insolation in high-latitude regions.',
          icon: '📐',
        },
        {
          title: isRu ? '3–4 дня автономной работы' : '3–4 Days Cloudy/Snow Autonomy',
          desc: isRu
            ? 'Интеллектуальный MPPT контроллер снижает яркость при отсутствии движения, гарантируя бесперебойный свет во время затяжных снегопадов.'
            : 'Intelligent MPPT dimming and microwave radar sensors guarantee continuous illumination through multi-day blizzards.',
          icon: '🔋',
        },
        {
          title: isRu ? 'Прямая ж/д доставка за 7–10 дней' : 'Direct Rail Express (7–10 Days Transit)',
          desc: isRu
            ? 'Прямые контейнерные поезда из Шаньдуна (Хоргос / Алашанькоу) в Алматы, Астану, Ташкент и Бишкек с полным пакетом EAC / CE.'
            : 'Regular container block trains via China-Europe Railway Express directly to Almaty, Astana, Tashkent, and Bishkek.',
          icon: '🚆',
        },
      ],
      recommendedModels: isRu
        ? 'Рекомендуемые модели: Falcon-60W, Falcon-90W, Leaf-120W (Split)'
        : 'Recommended: Falcon-60W, Falcon-90W, Leaf-120W (Split-Type)',
    },
    middleEast: {
      id: 'middleEast',
      badge: isRu ? 'ОАЭ · Саудовская Аравия · Оман' : 'UAE · Saudi Arabia · Oman',
      title: isRu
        ? 'Стойкость к экстремальной жаре и песчаным бурям (+60°C)'
        : 'Built for Middle Eastern Desert & Extreme Ambient Heat (+60°C)',
      description: isRu
        ? 'Корпус из литого алюминия с развитым радиатором охлаждения, герметичная оптика IP66 и ударопрочность IK10 против песчаных бурь.'
        : 'Die-cast aluminum alloy chassis with multi-fin thermal convection, IP66 hermetic dust seal, and IK10 sandstorm impact resistance.',
      features: [
        {
          title: isRu ? 'Эффективное охлаждение LED матрицы' : 'High-Convection Thermal Dissipation',
          desc: isRu
            ? 'Температура LED перехода удерживается ниже 65°C даже при температуре окружающего воздуха +50°C, предотвращая деградацию люменов.'
            : 'Maintains LED junction temperature below 65°C under +50°C ambient desert conditions, preventing lumen degradation.',
          icon: '☀️',
        },
        {
          title: isRu ? 'Герметичность IP66 и защита IK10' : 'IP66 Dust-Tight & IK10 Sandstorm Armor',
          desc: isRu
            ? 'Полная изоляция оптической камеры от мелкодисперсной пыли и закалённое стекло, устойчивое к абразивному воздействию песка.'
            : 'Hermetically sealed optical chamber impervious to fine desert dust, with tempered glass resisting sand abrasive erosion.',
          icon: '🛡️',
        },
        {
          title: isRu ? 'Антикоррозийное порошковое покрытие' : 'Anti-UV & High-Salinity Powder Coating',
          desc: isRu
            ? 'Электростатическое напыление полиэфирного порошка выдерживает более 1000 часов соляного тумана в прибрежных зонах Персидского залива.'
            : 'Electrostatically applied polyester powder coating tested for 1000+ hours salt-spray resistance in Gulf coastal environments.',
          icon: '🌊',
        },
        {
          title: isRu ? 'Морской фрахт из порта Циндао (18–24 дня)' : 'Direct Sea Freight from Qingdao (18–24 Days)',
          desc: isRu
            ? 'Быстрая отгрузка 20GP/40HQ контейнеров через порт Циндао в Джебель-Али (Дубай), Даммам, Джидду и Сохар.'
            : 'Direct container shipments from Qingdao Port to Jebel Ali (Dubai), Dammam, Jeddah, and Sohar with full SASO/CE documentation.',
          icon: '🚢',
        },
      ],
      recommendedModels: isRu
        ? 'Рекомендуемые модели: Falcon-90W, Falcon-120W, ALCA-80W'
        : 'Recommended: Falcon-90W, Falcon-120W, ALCA-80W (Modular)',
    },
    remoteVillage: {
      id: 'remoteVillage',
      badge: isRu ? 'Сельская электрификация · Автодороги' : 'Village Electrification · Highways',
      title: isRu
        ? 'Автономное освещение без прокладки кабелей и рытья траншей'
        : 'Standalone Zero-Cabling Off-Grid Municipal Infrastructure',
      description: isRu
        ? 'Идеальное решение для отдалённых посёлков, промышленных карьеров и междугородних трасс, где подключение к электросети нерентабельно.'
        : 'Zero electrical trenching, zero grid dependency, and zero monthly electricity bills. Fast installation on standard 6m–10m poles.',
      features: [
        {
          title: isRu ? 'Экономия 100% затрат на кабель' : '100% Grid Cabling Elimination',
          desc: isRu
            ? 'Установка занимает 15 минут на столб: нет необходимости в трансформаторах, траншеях, кабельных муфтах и согласовании с энергосетями.'
            : 'Requires only 15 minutes per pole. No transformers, subterranean cabling, trenching permits, or utility connection fees.',
          icon: '⚡',
        },
        {
          title: isRu ? 'Автоматический датчик день/ночь' : 'Radar Microwave Smart Dimming',
          desc: isRu
            ? 'Включается на закате, работает на 30% мощности в дежурном режиме и выходит на 100% при обнаружении пешехода или автомобиля.'
            : 'Operates at 30% standby power and ramps to 100% full brightness upon detecting pedestrians or approaching vehicles.',
          icon: '👁️',
        },
        {
          title: isRu ? 'Срок службы батареи 8–10 лет' : '8–10 Year Battery Service Life',
          desc: isRu
            ? 'Литий-железо-фосфатные элементы выдерживают более 2000 полных циклов заряда/разряда при ежедневной эксплуатации.'
            : 'Grade-A LiFePO4 cells deliver 2,000+ deep discharge cycles with over 80% remaining capacity after 8 years.',
          icon: '🔄',
        },
        {
          title: isRu ? 'Бесплатный фотометрический расчёт DIALux' : 'Free DIALux Lighting Simulation',
          desc: isRu
            ? 'Наши инженеры рассчитают точное количество столбов, шаг опор и равномерность освещения по стандартам ГОСТ / EN 13201.'
            : 'Our engineering department provides custom DIALux lux distribution maps and pole placement blueprints within 24 hours.',
          icon: '📊',
        },
      ],
      recommendedModels: isRu
        ? 'Рекомендуемые модели: Kmini-30W, Falcon-60W, Nova-40W'
        : 'Recommended: Kmini-30W, Falcon-60W, Nova-40W',
    },
  }

  const current = data[activeTab]

  return (
    <section className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-10 shadow-2xl">
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-block rounded-full bg-yellow-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-400 border border-yellow-400/20">
          {isRu ? 'Географическая и климатическая адаптивность' : 'Geographic & Climate Engineering Matrix'}
        </span>
        <h2 className="mt-4 text-2xl font-bold text-slate-50 sm:text-3xl">
          {isRu ? 'Надёжное освещение для любых климатических зон' : 'Engineered for Extreme Climates & Off-Grid Terrain'}
        </h2>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          {isRu
            ? 'От степных морозов Казахстана (-30°C) до раскалённых песков Персидского залива (+60°C) — светильники SolarLight испытаны на долговечность.'
            : 'From freezing sub-zero steppe winters (-30°C) to extreme Arabian desert heat (+60°C), our solar street lights deliver guaranteed photometric performance.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-4">
        {[
          { key: 'centralAsia' as const, label: isRu ? '❄️ Центральная Азия (-30°C)' : '❄️ Central Asian Steppe (-30°C)' },
          { key: 'middleEast' as const, label: isRu ? '☀️ Ближний Восток (+60°C)' : '☀️ Middle East Desert (+60°C)' },
          { key: 'remoteVillage' as const, label: isRu ? '⚡ Автономные посёлки & Трассы' : '⚡ Off-Grid Villages & Highways' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeTab === tab.key
                ? 'bg-yellow-400 text-slate-950 shadow-md shadow-yellow-400/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/70 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-yellow-400">{current.badge}</span>
            <h3 className="mt-1 text-lg sm:text-xl font-bold text-slate-100">{current.title}</h3>
          </div>
          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              isRu
                ? `Здравствуйте, интересует проект освещения для региона: ${current.badge}. Подберите подходящую модель.`
                : `Hello, I need a lighting solution for: ${current.badge}. Please send technical recommendations.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-green-500/10 px-3.5 py-1.5 text-xs font-semibold text-green-400 border border-green-500/20 hover:bg-green-500/20 transition"
          >
            <span>💬</span>
            <span>{isRu ? 'Консультация инженера' : 'Consult Project Engineer'}</span>
          </a>
        </div>

        <p className="mt-4 text-sm text-slate-300 leading-relaxed">{current.description}</p>

        {/* Feature Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {current.features.map((feat, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 hover:border-yellow-400/40 transition"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{feat.icon}</span>
                <h4 className="text-sm font-semibold text-slate-100">{feat.title}</h4>
              </div>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-yellow-400/10 via-amber-400/5 to-transparent p-4 border border-yellow-400/20">
          <div className="text-xs text-slate-300 font-medium">{current.recommendedModels}</div>
          <a
            href={`/${locale}/contact`}
            className="rounded-lg bg-yellow-400 px-4 py-1.5 text-xs font-bold text-slate-950 hover:bg-yellow-300 transition"
          >
            {isRu ? 'Запросить расчёт проекта →' : 'Request Project Plan →'}
          </a>
        </div>
      </div>
    </section>
  )
}
