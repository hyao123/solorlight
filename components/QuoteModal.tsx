'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import emailjs from '@emailjs/browser'

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
  locale: 'en' | 'ru'
  prefilledProduct?: string
  prefilledNote?: string
  whatsappNumber?: string
}

const POPULAR_DESTINATIONS_EN = [
  'Kazakhstan (Almaty / Astana / Shymkent)',
  'Uzbekistan (Tashkent / Samarkand)',
  'Kyrgyzstan (Bishkek / Osh)',
  'Tajikistan (Dushanbe)',
  'Turkmenistan (Ashgabat)',
  'Azerbaijan (Baku)',
  'United Arab Emirates (Dubai)',
  'Saudi Arabia (Riyadh)',
  'Other Destination',
]

const POPULAR_DESTINATIONS_RU = [
  'Казахстан (Алматы / Астана / Шымкент)',
  'Узбекистан (Ташкент / Самарканд)',
  'Кыргызстан (Бишкек / Ош)',
  'Таджикистан (Душанбе)',
  'Туркменистан (Ашхабад)',
  'Азербайджан (Баку)',
  'ОАЭ (Дубай)',
  'Саудовская Аравия (Эр-Рияд)',
  'Другое направление',
]

export function QuoteModal({
  isOpen,
  onClose,
  locale,
  prefilledProduct = '',
  prefilledNote = '',
  whatsappNumber = '',
}: QuoteModalProps) {
  const t = useTranslations('rfq')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const [formData, setFormData] = useState({
    from_name: '',
    company: '',
    country: '',
    quantity: '50',
    reply_to: '',
    product: prefilledProduct,
    message: prefilledNote,
  })

  useEffect(() => {
    if (prefilledProduct) {
      setFormData((prev) => ({ ...prev, product: prefilledProduct }))
    }
    if (prefilledNote) {
      setFormData((prev) => ({ ...prev, message: prefilledNote }))
    }
  }, [prefilledProduct, prefilledNote])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const destinations = locale === 'ru' ? POPULAR_DESTINATIONS_RU : POPULAR_DESTINATIONS_EN

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const buildWhatsAppText = () => {
    if (locale === 'ru') {
      return `Здравствуйте! Запрос коммерческого предложения:
• Продукт/Серия: ${formData.product || 'Не указан'}
• Количество: ${formData.quantity} шт.
• Имя: ${formData.from_name || '—'}
• Компания: ${formData.company || '—'}
• Страна: ${formData.country || '—'}
• Контакт: ${formData.reply_to || '—'}
• Примечания: ${formData.message || '—'}`
    }
    return `Hello! B2B RFQ Inquiry:
• Product/Series: ${formData.product || 'Not specified'}
• Quantity: ${formData.quantity} units
• Name: ${formData.from_name || '—'}
• Company: ${formData.company || '—'}
• Destination: ${formData.country || '—'}
• Contact: ${formData.reply_to || '—'}
• Notes: ${formData.message || '—'}`
  }

  const handleWhatsAppRedirect = () => {
    const cleanPhone = whatsappNumber.replace(/\D/g, '')
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(buildWhatsAppText())}`
    window.open(url, '_blank')
  }

  const handleSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        e.currentTarget,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      )
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition"
          aria-label={t('close')}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <span className="inline-block rounded-full bg-yellow-400/10 px-3 py-0.5 text-xs font-semibold text-yellow-400 mb-2">
            RFQ · 24h Response Guarantee
          </span>
          <h2 className="text-2xl font-bold text-slate-100">{t('modalTitle')}</h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">{t('modalSub')}</p>
        </div>

        {status === 'success' ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center text-emerald-400 my-6">
            <div className="text-4xl mb-3">✓</div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">{t('success')}</h3>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              {locale === 'ru'
                ? 'Наш экспортный инженер свяжется с вами по указанным контактам. Для срочных вопросов можете написать напрямую в WhatsApp.'
                : 'Our export engineer will reply to your contact shortly. For immediate response, reach out directly on WhatsApp.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={handleWhatsAppRedirect}
                className="rounded-xl bg-yellow-400 px-6 py-2.5 text-sm font-bold text-slate-900 hover:bg-yellow-300 transition"
              >
                💬 {t('submitWhatsApp')}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-2.5 text-sm font-medium text-slate-300 hover:text-slate-100"
              >
                {t('close')}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitEmail} className="space-y-4">
            {/* Product selection preview */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {t('productLabel')}
              </label>
              <input
                name="product"
                value={formData.product}
                onChange={handleInputChange}
                placeholder="e.g. Falcon Pro 90W or Road Series"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
              />
            </div>

            {/* Quantity and Destination row */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  {t('quantity')}
                </label>
                <input
                  required
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder={t('quantityPlaceholder')}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  {t('country')}
                </label>
                <select
                  required
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-200 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                >
                  <option value="" className="bg-slate-900 text-slate-500">
                    {locale === 'ru' ? 'Выберите страну / город' : 'Select Destination'}
                  </option>
                  {destinations.map((d) => (
                    <option key={d} value={d} className="bg-slate-900 text-slate-200">
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Name and Company row */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  {t('name')}
                </label>
                <input
                  required
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  {t('company')}
                </label>
                <input
                  required
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="LLC / Construction Co."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>
            </div>

            {/* Contact info (Email or WhatsApp) */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {t('emailOrPhone')}
              </label>
              <input
                required
                name="reply_to"
                value={formData.reply_to}
                onChange={handleInputChange}
                placeholder="name@company.com or +7 (701) 000-0000"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {t('projectNotes')}
              </label>
              <textarea
                rows={3}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={
                  locale === 'ru'
                    ? 'Укажите ширину дороги, высоту столбов, требования к освещённости...'
                    : 'Specify road width, pole height, target lux, or delivery requirements...'
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
              />
            </div>

            {status === 'error' && (
              <p className="text-xs text-rose-400">{t('error')}</p>
            )}

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex-1 rounded-xl bg-yellow-400 py-3 text-sm font-bold text-slate-900 shadow-md hover:bg-yellow-300 disabled:opacity-60 transition"
              >
                {status === 'sending' ? t('sending') : t('submitEmail')}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppRedirect}
                className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-sm font-bold text-emerald-400 hover:bg-emerald-500/20 transition flex items-center justify-center gap-1.5"
              >
                <span>💬</span>
                <span>{t('submitWhatsApp')}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}