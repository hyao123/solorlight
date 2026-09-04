'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

const QuoteModal = dynamic(() => import('./QuoteModal').then((module) => module.QuoteModal), { ssr: false })

interface FloatingInquiryWidgetProps {
  whatsappNumber: string
  email?: string
  locale: 'en' | 'ru'
}

export function FloatingInquiryWidget({
  whatsappNumber,
  email = 'sales@solarlight.kz',
  locale,
}: FloatingInquiryWidgetProps) {
  const t = useTranslations('floatingWidget')
  const [isExpanded, setIsExpanded] = useState(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  const cleanPhone = whatsappNumber.replace(/\D/g, '')
  const defaultWhatsAppText = locale === 'ru'
    ? 'Здравствуйте! Хочу запросить коммерческое предложение на солнечные уличные светильники.'
    : 'Hello! I would like to request a quotation for solar street lights.'
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultWhatsAppText)}`

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 print:hidden">
        {/* Expanded Quick Action Popover */}
        {isExpanded && (
          <div className="w-72 rounded-2xl border border-slate-700 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-100">{t('helpTitle')}</p>
                  <p className="text-[10px] text-emerald-400 font-medium">{t('replyTime')}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                aria-label="Close"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-3">{t('helpSub')}</p>

            <div className="space-y-2">
              {/* WhatsApp direct chat */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 w-full rounded-xl bg-emerald-600 px-3.5 py-2.5 text-xs font-bold text-white shadow hover:bg-emerald-500 transition"
              >
                <span className="text-base">💬</span>
                <span>{t('chatWhatsApp')}</span>
              </a>

              {/* Instant RFQ Modal Trigger */}
              <button
                type="button"
                onClick={() => {
                  setIsQuoteModalOpen(true)
                  setIsExpanded(false)
                }}
                className="flex items-center gap-2.5 w-full rounded-xl bg-yellow-400 px-3.5 py-2.5 text-xs font-bold text-slate-900 shadow hover:bg-yellow-300 transition text-left"
              >
                <span className="text-base">⚡</span>
                <span>{t('requestRfq')}</span>
              </button>

              {/* Email Form */}
              <a
                href={`mailto:${email}?subject=${encodeURIComponent(
                  locale === 'ru' ? 'Запрос цен: Солнечные уличные светильники' : 'RFQ: Solar Street Lighting Project'
                )}`}
                className="flex items-center gap-2.5 w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition"
              >
                <span className="text-base">✉️</span>
                <span className="truncate">{t('emailUs')}</span>
              </a>
            </div>
          </div>
        )}

        {/* Floating Bubble Button */}
        <div className="flex items-center gap-2">
          {!isExpanded && (
            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-900/90 py-1.5 px-3 shadow-lg backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-200">{t('replyTime')}</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 shadow-xl ring-4 ring-yellow-400/20 hover:scale-105 active:scale-95 transition"
            aria-label={t('helpTitle')}
          >
            {isExpanded ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <span className="text-2xl">💬</span>
            )}
          </button>
        </div>
      </div>

      {isQuoteModalOpen && (
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          locale={locale}
          whatsappNumber={whatsappNumber}
        />
      )}
    </>
  )
}
