import type { SanityProductSpecs } from '@/types/sanity'

interface ProductSpecsProps {
  specs: SanityProductSpecs
  locale: 'en' | 'ru'
}

type SpecGroup = 'performance' | 'construction'

const GROUP_LABELS: Record<SpecGroup, { en: string; ru: string; icon: string }> = {
  performance: { en: 'Technical Specifications', ru: 'Технические характеристики', icon: '📋' },
  construction: { en: 'Construction & Installation', ru: 'Конструкция и монтаж', icon: '🛠️' },
}

const SPEC_GROUPS: {
  key: keyof SanityProductSpecs
  en: string
  ru: string
  icon: string
  group: SpecGroup
  unit?: string
}[] = [
  { key: 'power', en: 'LED Power', ru: 'Мощность LED', icon: '⚡', group: 'performance' },
  { key: 'lumens', en: 'Luminous Flux', ru: 'Световой поток', icon: '💡', group: 'performance' },
  { key: 'efficacy', en: 'Luminous Efficacy', ru: 'Световая отдача', icon: '◉', group: 'performance' },
  { key: 'cct', en: 'Color Temperature', ru: 'Цветовая температура', icon: '🌡️', group: 'performance' },
  { key: 'colorTemp', en: 'Color Temperature', ru: 'Цветовая температура', icon: '🌡️', group: 'performance' },
  { key: 'ipRating', en: 'Protection Rating', ru: 'Класс защиты', icon: '🛡️', group: 'performance' },
  { key: 'solarPanel', en: 'Solar Panel', ru: 'Солнечная панель', icon: '☀️', group: 'performance' },
  { key: 'panelDimensions', en: 'Panel Dimensions', ru: 'Размеры панели', icon: '▦', group: 'performance' },
  { key: 'panelEfficiency', en: 'Panel Efficiency', ru: 'Эффективность панели', icon: '☀️', group: 'performance' },
  { key: 'battery', en: 'Battery', ru: 'Аккумулятор', icon: '🔋', group: 'performance' },
  { key: 'batteryCapacity', en: 'Battery Capacity', ru: 'Ёмкость батареи', icon: '🔋', group: 'performance' },
  { key: 'batteryCycles', en: 'Battery Cycle Life', ru: 'Ресурс аккумулятора', icon: '↻', group: 'performance' },
  { key: 'autonomy', en: 'Rainy-Day Autonomy', ru: 'Автономность в пасмурные дни', icon: '☂', group: 'performance' },
  { key: 'nightlyRuntime', en: 'Nightly Runtime', ru: 'Работа за ночь', icon: '☾', group: 'performance' },
  { key: 'lightingTime', en: 'Lighting Duration', ru: 'Время работы', icon: '🌙', group: 'performance' },
  { key: 'workingHours', en: 'Working Hours/Night', ru: 'Часы работы/ночь', icon: '⏰', group: 'performance' },
  { key: 'chargingTime', en: 'Charging Time', ru: 'Время зарядки', icon: '⏱️', group: 'performance' },
  { key: 'ledLifetime', en: 'Stated LED Lifetime', ru: 'Заявленный срок службы LED', icon: '◷', group: 'performance' },
  { key: 'controller', en: 'Solar Controller', ru: 'Контроллер заряда', icon: '📡', group: 'performance' },
  { key: 'motionSensor', en: 'Motion Sensor', ru: 'Датчик движения', icon: '👁️', group: 'performance' },
  { key: 'wattage', en: 'Wattage', ru: 'Мощность', icon: '⚡', group: 'performance' },
  { key: 'mountHeight', en: 'Mounting Height', ru: 'Высота монтажа', icon: '📏', group: 'construction' },
  { key: 'poleHeight', en: 'Pole Height', ru: 'Высота столба', icon: '📏', group: 'construction' },
  { key: 'poleConstruction', en: 'Pole Construction', ru: 'Конструкция опоры', icon: '│', group: 'construction' },
  { key: 'arm', en: 'Mounting Arm', ru: 'Кронштейн', icon: '⌁', group: 'construction' },
  { key: 'flange', en: 'Base Flange', ru: 'Опорный фланец', icon: '□', group: 'construction' },
  { key: 'foundation', en: 'Foundation Cage', ru: 'Закладная деталь', icon: '⌗', group: 'construction' },
  { key: 'installationNote', en: 'Foundation Note', ru: 'Примечание по фундаменту', icon: 'ℹ', group: 'construction' },
]

function formatSpecValue(
  value: SanityProductSpecs[keyof SanityProductSpecs],
  locale: 'en' | 'ru',
) {
  if (typeof value === 'object' && value !== null && 'en' in value && 'ru' in value) {
    return value[locale]
  }
  return String(value)
}

export function ProductSpecs({ specs, locale }: ProductSpecsProps) {
  const groups = (Object.keys(GROUP_LABELS) as SpecGroup[])
    .map((group) => ({
      group,
      rows: SPEC_GROUPS
        .filter((definition) => definition.group === group)
        .map((definition) => ({ ...definition, value: specs[definition.key] }))
        .filter((row) => row.value !== undefined && row.value !== null && row.value !== ''),
    }))
    .filter(({ rows }) => rows.length > 0)

  if (groups.length === 0) return null

  return (
    <div className="space-y-5">
      {groups.map(({ group, rows }) => {
        const heading = GROUP_LABELS[group]
        return (
          <section key={group} className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
              <h3 className="font-semibold text-slate-900">
                <span className="mr-2" aria-hidden="true">{heading.icon}</span>
                {heading[locale]}
              </h3>
            </div>
            <dl className="divide-y divide-slate-200 sm:hidden">
              {rows.map((row, index) => (
                <div key={row.key} className={index % 2 === 0 ? 'bg-white px-4 py-3' : 'bg-slate-50 px-4 py-3'}>
                  <dt className="text-xs font-medium text-slate-500">
                    <span className="mr-2" aria-hidden="true">{row.icon}</span>
                    {row[locale]}
                  </dt>
                  <dd className="mt-1 break-words text-sm font-semibold leading-5 text-slate-900">
                    {formatSpecValue(row.value, locale)}{row.unit ? ` ${row.unit}` : ''}
                  </dd>
                </div>
              ))}
            </dl>
            <table className="hidden w-full text-sm sm:table">
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={row.key} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="w-40 px-4 py-3 text-slate-500 sm:w-56 sm:px-5">
                        <span className="mr-2" aria-hidden="true">{row.icon}</span>
                        {row[locale]}
                      </td>
                      <td className="break-words px-4 py-3 font-medium text-slate-900 sm:px-5">
                        {formatSpecValue(row.value, locale)}{row.unit ? ` ${row.unit}` : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </section>
        )
      })}
    </div>
  )
}
