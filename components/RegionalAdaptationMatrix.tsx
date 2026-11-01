'use client'

import { useState } from 'react'
import Link from 'next/link'

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
      badge: 'Kazakhstan · Uzbekistan · Kyrgyzstan',
      title: isRu ? 'Подбор для холодных зим Центральной Азии' : 'Selection for Central Asian winters',
      description: isRu
        ? 'Подбирайте систему по зимней инсоляции и температуре зарядки батареи. Обогрев, термоизоляция и низкотемпературная защита требуют отдельного подтверждения для модели.'
        : 'Size the system for winter solar yield and battery charging temperatures. Heating, insulation and low-temperature protection must be confirmed for the selected model.',
      features: [
        { icon: '❄️', title: isRu ? 'Температурные пределы батареи' : 'Battery temperature limits', desc: isRu ? 'Запросите допустимые температуры зарядки и разрядки, настройки BMS и результаты испытаний.' : 'Request charge/discharge limits, BMS settings and supporting test data.' },
        { icon: '📐', title: isRu ? 'Снег и угол панели' : 'Snow and panel tilt', desc: isRu ? 'Наклон, снеговую нагрузку и доступ для очистки рассчитывают для широты и условий объекта.' : 'Design tilt, snow loads and cleaning access for the site latitude and local conditions.' },
        { icon: '🔋', title: isRu ? 'Зимний энергобаланс' : 'Winter energy budget', desc: isRu ? 'Согласуйте полезную ёмкость, график диммирования и требуемое число пасмурных дней.' : 'Confirm usable battery energy, the dimming schedule and required cloudy-day autonomy.' },
      ],
      candidates: [
        { slug: 'falcon-pro-60w', name: 'Falcon Pro 60W' },
        { slug: 'falcon-pro-90w', name: 'Falcon Pro 90W' },
        { slug: 'alca-split-120w', name: 'ALCA Split 120W' },
      ],
    },
    middleEast: {
      badge: 'UAE · Saudi Arabia · Oman',
      title: isRu ? 'Подбор для жары, пыли и побережья' : 'Selection for heat, dust and coastal sites',
      description: isRu
        ? 'Класс IP сам по себе не подтверждает стойкость к жаре, абразивному песку или солевому туману. Требования согласуются по месту установки.'
        : 'An IP rating alone does not establish resistance to heat, abrasive sand or salt spray. Confirm environmental requirements for the installation site.',
      features: [
        { icon: '☀️', title: isRu ? 'Температура и снижение мощности' : 'Temperature and derating', desc: isRu ? 'Проверьте температурные пределы LED, батареи и контроллера и снижение мощности в жару.' : 'Check LED, battery and controller temperature limits and output derating in heat.' },
        { icon: '🛡️', title: isRu ? 'Защита по модели' : 'Model-specific protection', desc: isRu ? 'Сверьте IP/IK каждого компонента с требованиями объекта и протоколами испытаний.' : 'Match each component’s IP/IK rating to site requirements and available test reports.' },
        { icon: '🌊', title: isRu ? 'Коррозия и обслуживание' : 'Corrosion and maintenance', desc: isRu ? 'Для побережья запросите данные покрытия и солевого тумана; предусмотрите очистку панелей.' : 'Request coating and salt-spray evidence for coastal sites, and plan panel cleaning.' },
      ],
      candidates: [
        { slug: 'falcon-pro-90w', name: 'Falcon Pro 90W' },
        { slug: 'alca-split-120w', name: 'ALCA Split 120W' },
        { slug: 'alca-industrial-150w', name: 'ALCA Industrial 150W' },
      ],
    },
    remoteVillage: {
      badge: isRu ? 'Сельские дороги · Реконструкция' : 'Village roads · Retrofit projects',
      title: isRu ? 'Автономное освещение для конкретного объекта' : 'Off-grid lighting matched to the site',
      description: isRu
        ? 'Сравните компактные фонари, новые опоры и монтаж на существующие конструкции. Высоту, фундамент и крепёж подбирают по нагрузкам и геометрии дороги.'
        : 'Compare compact lights, new poles and existing-support retrofits. Select mounting height, foundations and fixings for structural loads and road geometry.',
      features: [
        { icon: '⚡', title: isRu ? 'Монтаж и опоры' : 'Installation and supports', desc: isRu ? 'Несущую способность, зазоры и работы у коммуникаций проверяет квалифицированный монтажник.' : 'A qualified installer checks support strength, clearances and work near utilities.' },
        { icon: '👁️', title: isRu ? 'Датчики и диммирование' : 'Sensors and dimming', desc: isRu ? 'Наличие PIR, пороги и график работы зависят от заказанного контроллера.' : 'PIR availability, thresholds and operating schedules depend on the ordered controller.' },
        { icon: '📊', title: isRu ? 'Расчёт освещения' : 'Lighting design', desc: isRu ? 'До заказа согласуйте светораспределение, шаг опор, зимнюю инсоляцию и ночной график.' : 'Confirm photometry, pole spacing, winter solar yield and the nightly schedule before ordering.' },
      ],
      candidates: [
        { slug: 'kmini-rural-30w', name: 'Kmini Rural 30W' },
        { slug: 'falcon-pro-60w', name: 'Falcon Pro 60W' },
        { slug: 'jz-bg0001', name: 'JZ-BG0001' },
      ],
    },
  }
  const current = data[activeTab]

  return (
    <section className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 shadow-2xl sm:p-10">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-block rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-400">
          {isRu ? 'Региональный подбор' : 'Regional selection guide'}
        </span>
        <h2 className="mt-4 text-2xl font-bold text-slate-50 sm:text-3xl">{isRu ? 'Подберите систему под климат и объект' : 'Match the system to the climate and site'}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{isRu ? 'Примеры моделей для сравнения; пригодность, комплектация и расчёт освещения подтверждаются для проекта.' : 'Model candidates for comparison; suitability, configuration and lighting performance are confirmed for the project.'}</p>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-4">
        {([
          ['centralAsia', isRu ? '❄️ Центральная Азия' : '❄️ Central Asia'],
          ['middleEast', isRu ? '☀️ Ближний Восток' : '☀️ Middle East'],
          ['remoteVillage', isRu ? '⚡ Автономные посёлки' : '⚡ Off-grid villages'],
        ] as const).map(([key, label]) => (
          <button key={key} type="button" aria-pressed={activeTab === key} onClick={() => setActiveTab(key)} className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${activeTab === key ? 'border-yellow-400 bg-yellow-400 text-slate-950' : 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white'}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-yellow-400">{current.badge}</p>
        <h3 className="mt-3 text-xl font-bold text-slate-100 sm:text-2xl">{current.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-slate-300">{current.description}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {current.features.map((feature) => (
            <div key={feature.title} className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
              <span className="text-2xl" aria-hidden="true">{feature.icon}</span>
              <h4 className="mt-3 font-semibold text-slate-100">{feature.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-400">{isRu ? 'Модели для сравнения:' : 'Models to compare:'}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {current.candidates.map((model) => <Link key={model.slug} href={`/${locale}/products/${model.slug}`} className="rounded-full border border-slate-700 px-3 py-1.5 text-sm text-slate-200 hover:border-yellow-400">{model.name}</Link>)}
        </div>
        <a href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(isRu ? `Нужна конфигурация для: ${current.badge}` : `Please advise a project configuration for: ${current.badge}`)}`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-yellow-300">{isRu ? 'Обсудить проект' : 'Discuss the project'} →</a>
      </div>
    </section>
  )
}
