'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
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
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        e.currentTarget,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      )
      setStatus('success')
      ;(e.target as HTMLFormElement).reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center text-emerald-400">
        <div className="text-xl mb-1">✓</div>
        <p className="font-medium">{t('success')}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          required
          name="from_name"
          placeholder={t('name')}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
        />
      </div>
      <div>
        <input
          required
          name="company"
          placeholder={t('company')}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
        />
      </div>
      <div>
        <select
          required
          name="country"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-slate-300 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
        >
          <option value="" className="bg-slate-900 text-slate-500">{t('country')}</option>
          {countries.map((c) => <option key={c} value={c} className="bg-slate-900 text-slate-200">{c}</option>)}
        </select>
      </div>
      <div>
        <input
          name="product"
          placeholder={t('product')}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
        />
      </div>
      <div>
        <input
          name="quantity"
          placeholder={t('quantity')}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
        />
      </div>
      <div>
        <input
          required
          name="reply_to"
          type="email"
          placeholder={t('email')}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
        />
      </div>
      <div>
        <textarea
          required
          name="message"
          rows={4}
          placeholder={t('message')}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
        />
      </div>
      {status === 'error' && (
        <p className="text-sm text-rose-400">{t('error')}</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-xl bg-yellow-400 py-3 font-semibold text-slate-900 shadow-lg hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {status === 'sending' ? t('sending') : t('submit')}
      </button>
    </form>
  )
}
