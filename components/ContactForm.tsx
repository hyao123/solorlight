'use client'

import { useState } from 'react'
import emailjs from 'emailjs-com'
import { useTranslations } from 'next-intl'

const COUNTRIES_EN = ['Kazakhstan', 'Uzbekistan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan',
  'Afghanistan', 'Azerbaijan', 'Georgia', 'United Arab Emirates', 'Saudi Arabia',
  'Iraq', 'Iran', 'Turkey', 'Other']
const COUNTRIES_RU = ['Казахстан', 'Узбекистан', 'Кыргызстан', 'Таджикистан', 'Туркменистан',
  'Афганистан', 'Азербайджан', 'Грузия', 'ОАЭ', 'Саудовская Аравия',
  'Ирак', 'Иран', 'Турция', 'Другое']

interface ContactFormProps {
  locale: 'en' | 'ru'
}

export function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const countries = locale === 'ru' ? COUNTRIES_RU : COUNTRIES_EN

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        e.currentTarget,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setStatus('success')
      ;(e.target as HTMLFormElement).reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center text-green-800">
        {t('success')}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        required
        name="from_name"
        placeholder={t('name')}
        className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
      />
      <input
        required
        name="company"
        placeholder={t('company')}
        className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
      />
      <select
        required
        name="country"
        className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-700 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
      >
        <option value="">{t('country')}</option>
        {countries.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <input
        name="product"
        placeholder={t('product')}
        className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
      />
      <input
        name="quantity"
        placeholder={t('quantity')}
        className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
      />
      <input
        required
        name="reply_to"
        type="email"
        placeholder={t('email')}
        className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
      />
      <textarea
        required
        name="message"
        rows={4}
        placeholder={t('message')}
        className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
      />
      {status === 'error' && (
        <p className="text-sm text-red-600">{t('error')}</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white shadow-lg hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? '...' : t('submit')}
      </button>
    </form>
  )
}
