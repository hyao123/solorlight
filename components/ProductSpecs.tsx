import type { SanityProductSpecs } from '@/types/sanity'

interface ProductSpecsProps {
  specs: SanityProductSpecs
  locale: 'en' | 'ru'
}

export function ProductSpecs({ specs, locale }: ProductSpecsProps) {
  const labels: Record<keyof SanityProductSpecs, { en: string; ru: string }> = {
    wattage: { en: 'Wattage', ru: 'Мощность' },
    batteryCapacity: { en: 'Battery Capacity', ru: 'Емкость батареи' },
    lumens: { en: 'Lumens', ru: 'Световой поток' },
    colorTemp: { en: 'Color Temperature', ru: 'Цветовая температура' },
    ipRating: { en: 'IP Rating', ru: 'Класс защиты IP' },
    poleHeight: { en: 'Pole Height', ru: 'Высота столба' },
    workingHours: { en: 'Working Hours/Night', ru: 'Часы работы/ночь' },
  }

  const renderValue = (key: keyof SanityProductSpecs, value: number | string) => {
    if (key === 'wattage') return `${value} W`
    if (key === 'batteryCapacity') return `${value} Ah`
    if (key === 'lumens') return `${value} lm`
    if (key === 'poleHeight') return `${value} m`
    if (key === 'workingHours') return `${value} h`
    return value
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="mb-4 text-xl font-semibold text-slate-50">
        {locale === 'en' ? 'Technical Specifications' : 'Технические характеристики'}
      </h3>
      <dl className="grid gap-4 sm:grid-cols-2">
        {(Object.keys(specs) as Array<keyof SanityProductSpecs>).map((key) => (
          <div key={key} className="border-b border-slate-800 pb-3">
            <dt className="text-sm text-slate-400">{labels[key][locale]}</dt>
            <dd className="mt-1 text-base font-medium text-slate-50">{renderValue(key, specs[key])}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
