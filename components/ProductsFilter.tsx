'use client'
 
import { useState, useEffect } from 'react'
import { ProductGrid } from './ProductGrid'
import type { SanityProduct, SanityProductSeries } from '@/types/sanity'

interface ProductsFilterProps {
  products: SanityProduct[]
  series: SanityProductSeries[]
  locale: 'en' | 'ru'
  initialSeries?: string
}

export function ProductsFilter({ products, series, locale, initialSeries }: ProductsFilterProps) {
  const [activeSeries, setActiveSeries] = useState<string | null>(initialSeries ?? null)

  useEffect(() => {
    if (initialSeries !== undefined) {
      setActiveSeries(initialSeries)
    }
  }, [initialSeries])

  const isMatchedSeries = (productSeries: unknown, target: string) => {
    if (!productSeries) return false
    if (typeof productSeries === 'string') {
      return productSeries === target || productSeries === `series-${target}` || productSeries.replace('series-', '') === target
    }
    if (typeof productSeries === 'object' && productSeries !== null) {
      const s = productSeries as SanityProductSeries
      return s._id === target || s._id === `series-${target}` || s.slug?.current === target
    }
    return false
  }

  const filtered = activeSeries
    ? products.filter((p) => isMatchedSeries(p.series, activeSeries))
    : products

  const handleSelect = (seriesKey: string | null) => {
    setActiveSeries(seriesKey)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      if (seriesKey) {
        url.searchParams.set('series', seriesKey)
      } else {
        url.searchParams.delete('series')
      }
      window.history.replaceState({}, '', url.toString())
    }
  }

  const allLabel = locale === 'en' ? 'All Products' : 'Все продукты'

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2.5">
        <button
          onClick={() => handleSelect(null)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            activeSeries === null
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 ring-2 ring-sky-400/20'
              : 'border border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-slate-100'
          }`}
        >
          {allLabel} ({products.length})
        </button>
        {series.map((s) => {
          const isSelected = activeSeries === s.slug.current || activeSeries === s._id || activeSeries === `series-${s.slug.current}`
          const count = products.filter((p) => isMatchedSeries(p.series, s.slug.current)).length

          return (
            <button
              key={s._id}
              onClick={() => handleSelect(s.slug.current)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 ring-2 ring-sky-400/20'
                  : 'border border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              {s.name[locale]} ({count})
            </button>
          )
        })}
      </div>

      <ProductGrid products={filtered} locale={locale} />
    </div>
  )
}
