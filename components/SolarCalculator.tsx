'use client'

import { useState, useId } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

interface SolarCalculatorProps {
  locale: 'en' | 'ru'
  whatsappNumber?: string
  onOpenQuoteModal?: (prefilledNote: string) => void
}

type ScenarioKey = 'road' | 'community' | 'rural' | 'industrial'

const SCENARIO_CONFIG: Record<ScenarioKey, {
  targetLux: number
  defaultWidth: number
  defaultHeight: number
  seriesSlug: string
  seriesNameEn: string
  seriesNameRu: string
  recommendedModelEn: string
  recommendedModelRu: string
}> = {
  road: {
    targetLux: 25,
    defaultWidth: 10,
    defaultHeight: 9,
    seriesSlug: 'series-road',
    seriesNameEn: 'Falcon / ALCA Series',
    seriesNameRu: 'Серия Falcon / ALCA',
    recommendedModelEn: 'Falcon Pro 90W / ALCA 120W',
    recommendedModelRu: 'Falcon Pro 90 Вт / ALCA 120 Вт',
  },
  community: {
    targetLux: 15,
    defaultWidth: 6,
    defaultHeight: 6,
    seriesSlug: 'series-community',
    seriesNameEn: 'Leaf All-in-One Series',
    seriesNameRu: 'Серия Leaf All-in-One',
    recommendedModelEn: 'Leaf AIO 40W / 60W',
    recommendedModelRu: 'Leaf AIO 40 Вт / 60 Вт',
  },
  rural: {
    targetLux: 8,
    defaultWidth: 5,
    defaultHeight: 5,
    seriesSlug: 'series-rural',
    seriesNameEn: 'Kmini Rural Series',
    seriesNameRu: 'Серия Kmini Rural',
    recommendedModelEn: 'Kmini 20W / 30W',
    recommendedModelRu: 'Kmini 20 Вт / 30 Вт',
  },
  industrial: {
    targetLux: 35,
    defaultWidth: 14,
    defaultHeight: 12,
    seriesSlug: 'series-industrial',
    seriesNameEn: 'Nova / Rifle Series',
    seriesNameRu: 'Серия Nova / Rifle',
    recommendedModelEn: 'Nova 100W / Rifle 120W',
    recommendedModelRu: 'Nova 100 Вт / Rifle 120 Вт',
  },
}

const STANDARD_WATTS = [20, 30, 40, 60, 90, 100, 120, 150]

export function SolarCalculator({ locale, whatsappNumber, onOpenQuoteModal }: SolarCalculatorProps) {
  const t = useTranslations('calculator')
  const [scenario, setScenario] = useState<ScenarioKey>('road')
  const [roadWidth, setRoadWidth] = useState<number>(10)
  const [poleHeight, setPoleHeight] = useState<number>(9)
  const [autonomyDays, setAutonomyDays] = useState<number>(3)

  const widthId = useId()
  const heightId = useId()

  const cfg = SCENARIO_CONFIG[scenario]

  // Photometric & Solar sizing math
  const poleSpacing = Math.round(poleHeight * 3.2)
  const areaPerPole = roadWidth * poleSpacing
  const targetTotalLumens = Math.round(areaPerPole * cfg.targetLux * 1.8)

  // Standard wattage resolution (160 lm/W)
  const rawWatts = targetTotalLumens / 160
  const recommendedWatts = STANDARD_WATTS.reduce((prev, curr) => {
    return Math.abs(curr - rawWatts) < Math.abs(prev - rawWatts) ? curr : prev
  }, 60)

  const estimatedLumens = recommendedWatts * 160
  const estimatedLux = Math.round((estimatedLumens * 0.55) / areaPerPole)

  // Battery & Solar sizing
  const dailyWattHours = Math.round(recommendedWatts * 12 * 0.7) // 12h night with average 70% dimming
  const batteryWh = Math.round((dailyWattHours * autonomyDays) / 0.85)
  const batteryAh12v = Math.round(batteryWh / 12.8)
  const solarPanelWatts = Math.round((dailyWattHours * 1.35) / 4.2)

  const recommendedModel = locale === 'ru' ? cfg.recommendedModelRu : cfg.recommendedModelEn
  const scenarioName = locale === 'ru' ? cfg.seriesNameRu : cfg.seriesNameEn

  const whatsappMessage = locale === 'ru'
    ? `Здравствуйте! Рассчитал проект на сайте: Сценарий: ${t('scenarios.' + scenario)}, Ширина: ${roadWidth}м, Высота: ${poleHeight}м, Автономия: ${autonomyDays} дня. Рекомендовано: ${recommendedWatts} Вт (${estimatedLumens.toLocaleString()} лм, LiFePO4 ${batteryWh} Вт·ч / ${batteryAh12v} А·ч). Пришлите расчет DIALux и КП.`
    : `Hello! I used your Solar Calculator: Scenario: ${t('scenarios.' + scenario)}, Width: ${roadWidth}m, Pole: ${poleHeight}m, Autonomy: ${autonomyDays} days. Recommended: ${recommendedWatts}W (${estimatedLumens.toLocaleString()} lm, LiFePO4 ${batteryWh}Wh / ${batteryAh12v}Ah). Please send a free DIALux lighting layout and quote.`

  const whatsappLink = `https://wa.me/${(whatsappNumber || '').replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-block rounded-full bg-yellow-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-yellow-400 mb-3">
          {t('tag')}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-50">{t('title')}</h2>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">{t('subtitle')}</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Controls Column */}
        <div className="space-y-6">
          {/* Scenario Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
              {t('scenarioLabel')}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {(['road', 'community', 'rural', 'industrial'] as ScenarioKey[]).map((key) => {
                const isActive = scenario === key
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setScenario(key)
                      setRoadWidth(SCENARIO_CONFIG[key].defaultWidth)
                      setPoleHeight(SCENARIO_CONFIG[key].defaultHeight)
                    }}
                    className={`flex items-center gap-2 rounded-xl border p-3 text-left text-sm font-medium transition ${
                      isActive
                        ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400 shadow-sm'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{key === 'road' ? '🛣️' : key === 'community' ? '🏘️' : key === 'rural' ? '🌾' : '🏭'}</span>
                    <span className="truncate">{t('scenarios.' + key)}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Road Width Slider */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={widthId} className="text-sm font-medium text-slate-300">{t('roadWidth')}</label>
              <span className="text-base font-bold text-yellow-400">{roadWidth} m</span>
            </div>
            <input
              id={widthId}
              type="range"
              min={3}
              max={24}
              step={1}
              value={roadWidth}
              onChange={(e) => setRoadWidth(Number(e.target.value))}
              className="w-full accent-yellow-400 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>3 m</span>
              <span>12 m (2-Lane)</span>
              <span>24 m (Highway)</span>
            </div>
          </div>

          {/* Pole Height Slider */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={heightId} className="text-sm font-medium text-slate-300">{t('poleHeight')}</label>
              <span className="text-base font-bold text-yellow-400">{poleHeight} m</span>
            </div>
            <input
              id={heightId}
              type="range"
              min={4}
              max={16}
              step={1}
              value={poleHeight}
              onChange={(e) => setPoleHeight(Number(e.target.value))}
              className="w-full accent-yellow-400 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>4 m</span>
              <span>8–10 m (Standard)</span>
              <span>16 m (Mast)</span>
            </div>
          </div>

          {/* Autonomy Days Selector */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-sm font-medium text-slate-300">{t('autonomyDays')}</span>
              <span className="text-sm font-bold text-yellow-400">{autonomyDays} {t('daysUnit')}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[2, 3, 4].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setAutonomyDays(days)}
                  className={`rounded-xl py-2 text-center text-xs font-semibold transition ${
                    autonomyDays === days
                      ? 'bg-yellow-400 text-slate-900 font-bold'
                      : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {days} {t('daysUnit')} {days === 3 ? '★' : ''}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card Column */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">{t('recommendations')}</span>
                <h3 className="text-xl font-bold text-slate-100 mt-0.5">{recommendedModel}</h3>
              </div>
              <span className="text-3xl">💡</span>
            </div>

            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 p-4">
                <div className="text-xs text-slate-400">{t('recWattage')}</div>
                <div className="text-2xl font-bold text-yellow-400 mt-1">{recommendedWatts} W</div>
                <div className="text-xs text-slate-500 mt-0.5">~{estimatedLumens.toLocaleString()} lm</div>
              </div>

              <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 p-4">
                <div className="text-xs text-slate-400">{t('recBattery')}</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">{batteryAh12v} Ah</div>
                <div className="text-xs text-slate-500 mt-0.5">{batteryWh} Wh (LiFePO4)</div>
              </div>

              <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 p-4">
                <div className="text-xs text-slate-400">{t('recPanel')}</div>
                <div className="text-2xl font-bold text-sky-400 mt-1">{solarPanelWatts} Wp</div>
                <div className="text-xs text-slate-500 mt-0.5">Monocrystalline 23%</div>
              </div>

              <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 p-4">
                <div className="text-xs text-slate-400">{t('recLux')} / {t('recSpacing')}</div>
                <div className="text-2xl font-bold text-slate-100 mt-1">~{estimatedLux} lx</div>
                <div className="text-xs text-slate-500 mt-0.5">Pole step: {poleSpacing} m</div>
              </div>
            </div>

            <div className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 flex items-center justify-between text-xs text-slate-400 mb-6">
              <span>{scenarioName}</span>
              <Link
                href={`/${locale}/products?series=${cfg.seriesSlug}`}
                className="font-semibold text-yellow-400 hover:underline"
              >
                {t('viewProduct')}
              </Link>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-yellow-400 px-6 py-3.5 font-bold text-slate-900 shadow-lg hover:bg-yellow-300 transition text-sm"
            >
              <span>💬</span>
              <span>{t('ctaWhatsApp')}</span>
            </a>

            {onOpenQuoteModal && (
              <button
                type="button"
                onClick={() => onOpenQuoteModal(whatsappMessage)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-400 transition"
              >
                {t('ctaRfq')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}