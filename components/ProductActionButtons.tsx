'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { QuoteModal } from './QuoteModal'
import { ProductDatasheetButton } from './ProductDatasheetButton'

interface ProductActionButtonsProps {
  productName: string
  locale: 'en' | 'ru'
  whatsappNumber?: string
  email?: string
  whatsappMsg: string
}

export function ProductActionButtons({
  productName,
  locale,
  whatsappNumber,
  email,
  whatsappMsg,
}: ProductActionButtonsProps) {
  const t = useTranslations('products')
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Instant RFQ button (Primary Gold) */}
        <button
          type="button"
          onClick={() => setIsQuoteModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3.5 font-bold text-slate-950 shadow-lg hover:bg-yellow-300 transition text-sm"
        >
          <span>⚡</span>
          <span>{locale === 'ru' ? 'Запросить коммерческое предложение (КП)' : 'Request Official Quotation (RFQ)'}</span>
        </button>

        {/* WhatsApp & Datasheet row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.549 4.1 1.508 5.83L0 24l6.345-1.484A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.913 0-3.703-.5-5.254-1.375l-.376-.222-3.768.882.918-3.674-.245-.39A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              <span>{t('requestQuoteWhatsApp')}</span>
            </a>
          )}

          <ProductDatasheetButton productName={productName} />
        </div>

        {/* Email fallback */}
        {email && (
          <a
            href={`mailto:${email}?subject=${encodeURIComponent(productName)}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-400 hover:border-slate-700 hover:text-slate-200 transition"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>{t('sendEmailInquiry')}</span>
          </a>
        )}
      </div>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        locale={locale}
        prefilledProduct={productName}
        whatsappNumber={whatsappNumber}
      />
    </>
  )
}