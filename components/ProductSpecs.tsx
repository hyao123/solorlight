import type { SanityProductSpecs } from '@/types/sanity'

interface ProductSpecsProps {
  specs: SanityProductSpecs
  locale: 'en' | 'ru'
}

const SPEC_GROUPS: {
  key: keyof SanityProductSpecs
  en: string
  ru: string
  icon: string
  unit?: string
}[] = [
  { key: 'power',         en: 'LED Power',           ru: 'Мощность LED',            icon: '⚡' },
  { key: 'lumens',        en: 'Luminous Flux',        ru: 'Световой поток',          icon: '💡' },
  { key: 'cct',           en: 'Color Temperature',    ru: 'Цветовая температура',    icon: '🌡️' },
  { key: 'ipRating',      en: 'Protection Rating',    ru: 'Класс защиты',            icon: '🛡️' },
  { key: 'solarPanel',    en: 'Solar Panel',          ru: 'Солнечная панель',        icon: '☀️' },
  { key: 'battery',       en: 'Battery',              ru: 'Аккумулятор',             icon: '🔋' },
  { key: 'lightingTime',  en: 'Lighting Duration',    ru: 'Время работы',            icon: '🌙' },
  { key: 'chargingTime',  en: 'Charging Time',        ru: 'Время зарядки',           icon: '⏱️' },
  { key: 'mountHeight',   en: 'Mounting Height',      ru: 'Высота монтажа',          icon: '📏' },
  { key: 'controller',    en: 'Solar Controller',     ru: 'Контроллер заряда',       icon: '📡' },
  { key: 'motionSensor',  en: 'Motion Sensor',        ru: 'Датчик движения',         icon: '👁️' },
  { key: 'colorTemp',     en: 'Color Temperature',    ru: 'Цветовая температура',    icon: '🌡️' },
  { key: 'wattage',       en: 'Wattage',              ru: 'Мощность',                icon: '⚡' },
  { key: 'batteryCapacity', en: 'Battery Capacity',  ru: 'Ёмкость батареи',         icon: '🔋' },
  { key: 'poleHeight',    en: 'Pole Height',          ru: 'Высота столба',           icon: '📏' },
  { key: 'workingHours',  en: 'Working Hours/Night',  ru: 'Часы работы/ночь',        icon: '⏰' },
]

export function ProductSpecs({ specs, locale }: ProductSpecsProps) {
  const rows = SPEC_GROUPS
    .map((def) => ({ ...def, value: specs[def.key] }))
    .filter((r) => r.value !== undefined && r.value !== null && r.value !== '')

  if (rows.length === 0) return null

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
        <h3 className="font-semibold text-slate-900">
          {locale === 'en' ? '📋 Technical Specifications' : '📋 Технические характеристики'}
        </h3>
      </div>
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.key}
              className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
            >
              <td className="w-48 px-5 py-3 text-slate-500">
                <span className="mr-2">{row.icon}</span>
                {row[locale]}
              </td>
              <td className="px-5 py-3 font-medium text-slate-900">
                {String(row.value)}{row.unit ? ` ${row.unit}` : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
