'use client'

import { useState } from 'react'
import { ProductGrid } from './ProductGrid'
import type { SanityProduct, SanityProductSeries } from '@/types/sanity'

interface ProductsFilterProps {
  products: SanityProduct[]
  series: SanityProductSeries[]
  locale: 'en' | 'ru'
}

export function ProductsFilter({ products, series, locale }: ProductsFilterProps) {
  const [activeSeries, setActiveSeries] = useState<string | null>(null)

  const filtered = activeSeries
    ? products.filter((p) => {
        const s = p.series
        if (!s) return false
        if (typeof s === 'string') return s === activeSeries
        return s._id === activeSeries
      })
    : products

  const allLabel = locale === 'en' ? 'All' : 'Все'

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSeries(null)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            activeSeries === null
              ? 'bg-sky-500 text-white'
              : 'border border-slate-300 text-slate-600 hover:border-sky-400 hover:text-sky-600'
          }`}
        >
          {allLabel}
        </button>
        {series.map((s) => (
          <button
            key={s._id}
            onClick={() => setActiveSeries(s._id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activeSeries === s._id
                ? 'bg-sky-500 text-white'
                : 'border border-slate-300 text-slate-600 hover:border-sky-400 hover:text-sky-600'
            }`}
          >
            {s.name[locale]}
          </button>
        ))}
      </div>

      <ProductGrid products={filtered} locale={locale} />
    </>
  )
}
