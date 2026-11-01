import type { Product, ProductSpecs } from '@/types/product'

type Locale = 'en' | 'ru'

/** Describe only the configuration recorded for this model. */
export function productHighlights(specs: ProductSpecs, locale: Locale) {
  const en = locale === 'en'
  return [
    { icon: '🔋', title: en ? 'Battery configuration' : 'Аккумулятор', value: specs.battery },
    { icon: '☀️', title: en ? 'Solar panel' : 'Солнечная панель', value: specs.solarPanel },
    { icon: '🛡️', title: en ? 'Protection rating' : 'Класс защиты', value: specs.ipRating },
    { icon: '📡', title: en ? 'Charge controller' : 'Контроллер заряда', value: specs.controller },
    { icon: '👁️', title: en ? 'Motion sensor' : 'Датчик движения', value: specs.motionSensor },
    { icon: '💡', title: en ? 'Luminous flux' : 'Световой поток', value: specs.lumens },
  ].filter((item) => item.value !== undefined && item.value !== '')
}

export function runtimeGuidance(specs: ProductSpecs, locale: Locale) {
  const battery = specs.battery || ''
  const wh = battery.match(/([\d.]+)\s*Wh/i)
  const volts = battery.match(/([\d.]+)\s*V\b/i)
  const ah = battery.match(/([\d.]+)\s*Ah/i)
  const energy = wh ? Number(wh[1]) : volts && ah ? Number(volts[1]) * Number(ah[1]) : null
  const power = Number.parseFloat(specs.power || '')
  const energyNote = energy && power > 0
    ? locale === 'en'
      ? `${Number(energy.toFixed(1))} Wh ÷ ${power} W ≈ ${(energy / power).toFixed(1)} h at continuous rated power, before losses. `
      : `${Number(energy.toFixed(1))} Вт·ч ÷ ${power} Вт ≈ ${(energy / power).toFixed(1)} ч при постоянной номинальной мощности, без учёта потерь. `
    : ''
  return energyNote + (locale === 'en'
    ? 'Nightly runtime and rainy-day autonomy are conditional references, not guarantees at continuous full output. Confirm the dimming schedule, usable battery capacity, charging temperature limits and worst-month solar yield for the project. Battery cycle ratings and component lifetimes are not warranty periods.'
    : 'Работа за ночь и автономность в пасмурные дни — условные ориентиры, а не гарантия постоянной полной мощности. Согласуйте график диммирования, полезную ёмкость, температурные пределы зарядки и инсоляцию худшего месяца. Число циклов и ресурс компонентов не являются гарантийными сроками.')
}

export function sharedImageNote(product: Product, products: Product[], locale: Locale) {
  if (product.imageNote) return product.imageNote[locale]
  const primary = product.images[0]
  if (typeof primary !== 'string' || !products.some((p) => p._id !== product._id && p.images[0] === primary)) return null
  return locale === 'en'
    ? 'Series appearance reference shared by several models. Confirm the exact housing, dimensions and supplied configuration with the model-specific quotation.'
    : 'Общий пример внешнего вида серии для нескольких моделей. Корпус, размеры и комплектация конкретной модели согласуются в коммерческом предложении.'
}
