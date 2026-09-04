'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import type { ProjectCase } from '@/lib/queries'

const QuoteModal = dynamic(() => import('./QuoteModal').then((module) => module.QuoteModal), { ssr: false })

interface CaseGalleryProps {
  cases: ProjectCase[]
  locale: 'en' | 'ru'
  whatsappNumber?: string
}

export function CaseGallery({ cases, locale, whatsappNumber }: CaseGalleryProps) {
  const t = useTranslations('caseParams')
  const [selected, setSelected] = useState<ProjectCase | null>(null)
  const [quoteCase, setQuoteCase] = useState<ProjectCase | null>(null)

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelected(c)}
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 hover:border-slate-700 transition"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={c.image}
                alt={c.caption[locale]}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-yellow-400">{c.location[locale]}</span>
                <span className="text-slate-500">Case #{c.id}</span>
              </div>
              <p className="text-sm font-medium text-slate-200 line-clamp-2">{c.caption[locale]}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl mb-4">
              <Image
                src={selected.image}
                alt={selected.caption[locale]}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-yellow-400">
                  {selected.location[locale]}
                </p>
                <h3 className="mt-1 text-lg font-bold text-slate-100">{selected.caption[locale]}</h3>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setQuoteCase(selected)
                    setSelected(null)
                  }}
                  className="rounded-xl bg-yellow-400 px-5 py-2.5 text-xs font-bold text-slate-900 hover:bg-yellow-300 transition"
                >
                  ⚡ {t('requestSimilar')}
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-medium text-slate-300 hover:text-white"
                >
                  {locale === 'ru' ? 'Закрыть' : 'Close'}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 rounded-full bg-slate-950/80 p-2 text-slate-400 hover:text-slate-100"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {quoteCase && (
        <QuoteModal
          isOpen={!!quoteCase}
          onClose={() => setQuoteCase(null)}
          locale={locale}
          prefilledProduct={`Case Solution: ${quoteCase.location[locale]}`}
          prefilledNote={`Interested in solution similar to case: ${quoteCase.caption[locale]}`}
          whatsappNumber={whatsappNumber}
        />
      )}
    </>
  )
}
