import type { SanityProductSpecs } from '@/types/sanity'

interface ProductSpecsProps {
  specs: SanityProductSpecs
  locale: 'en' | 'ru'
}

const SPEC_LABELS: Record<string, { en: string; ru: string }> = {
  power: { en: 'Power', ru: 'Мощность' },
  solarPanel: { en: 'Solar Panel', ru: 'Солнечная панель' },
  battery: { en: 'Battery', ru: 'Батарея' },
  lumens: { en: 'Lumens', ru: 'Световой поток' },
  lightingTime: { en: 'Lighting Duration', ru: 'Время освещения' },
  chargingTime: { en: 'Charging Time', ru: 'Время зарядки' },
  wattage: { en: 'Wattage', ru: 'Мощность' },
  batteryCapacity: { en: 'Battery Capacity', ru: 'Емкость батареи' },
  colorTemp: { en: 'Color Temperature', ru: 'Цветовая температура' },
  ipRating: { en: 'IP Rating', ru: 'Класс защиты IP' },
  poleHeight: { en: 'Pole Height', ru: 'Высота столба' },
  workingHours: { en: 'Working Hours/Night', ru: 'Часы работы/ночь' },
}

export function ProductSpecs({ specs, locale }: ProductSpecsProps) {
  const entries = Object.entries(specs).filter(([, v]) => v !== undefined && v !== null && v !== '')

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="mb-4 text-xl font-semibold text-slate-50">
        {locale === 'en' ? 'Technical Specifications' : 'Технические характеристики'}
      </h3>
      <dl className="grid gap-4 sm:grid-cols-2">
        {entries.map(([key, value]) => (
          <div key={key} className="border-b border-slate-800 pb-3">
            <dt className="text-sm text-slate-400">
              {SPEC_LABELS[key]?.[locale] ?? key}
            </dt>
            <dd className="mt-1 text-base font-medium text-slate-50">{String(value)}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
