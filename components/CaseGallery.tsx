'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { ProjectCase } from '@/lib/queries'

interface CaseGalleryProps {
  cases: ProjectCase[]
  locale: 'en' | 'ru'
}

export function CaseGallery({ cases, locale }: CaseGalleryProps) {
  const [selected, setSelected] = useState<ProjectCase | null>(null)

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(c)}
            className="group relative overflow-hidden rounded-xl bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={c.image}
                alt={c.caption[locale]}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
              <p className="text-xs font-medium text-sky-400">{c.location[locale]}</p>
              <p className="mt-1 text-sm text-slate-200 line-clamp-2">{c.caption[locale]}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={selected.image}
                alt={selected.caption[locale]}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-sky-400">{selected.location[locale]}</p>
              <p className="mt-1 text-sm text-slate-300">{selected.caption[locale]}</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 rounded-full bg-slate-800/80 p-1 text-slate-400 hover:text-slate-100"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
