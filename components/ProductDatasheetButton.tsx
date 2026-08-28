'use client'

import { useTranslations } from 'next-intl'

interface ProductDatasheetButtonProps {
  productName: string
}

export function ProductDatasheetButton({ productName }: ProductDatasheetButtonProps) {
  const t = useTranslations('datasheet')

  const handlePrint = () => {
    const originalTitle = document.title
    document.title = `${productName} - SolarLight Datasheet`
    window.print()
    document.title = originalTitle
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:border-slate-600 hover:bg-slate-700 hover:text-white transition print:hidden"
    >
      <svg className="h-4 w-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
        />
      </svg>
      <span>{t('button')}</span>
    </button>
  )
}