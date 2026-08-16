## Task 8 Brief: Contact Page with EmailJS Form

**Plan:** `C:/Users/24960/claudework/docs/superpowers/plans/2026-08-16-solar-street-light-website.md`
**Report file:** `.superpowers/sdd/2026-08-16-solar-street-light-website/task-8-report.md`

### Context
Task 8 of 11. Tasks 1-7 complete. Products listing and detail pages are live with static generation.
You are building the contact page with an EmailJS-powered inquiry form.

Work directory: `C:/Users/24960/claudework/solarlight`

### Global Constraints
- Design: slate base (#0F172A), sky accent (#38BDF8), orange CTA (#F97316)
- All components must handle bilingual content via `locale` prop
- Form submit button uses orange CTA color (#F97316), not yellow
- EmailJS integration for form submission without backend

### Your task — create contact page and form:

**Step 1: Add EmailJS env vars to `.env.local`**

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Note: These are placeholder values. The actual EmailJS setup happens at deployment. Template variables must match form field names: `from_name`, `company`, `country`, `product`, `quantity`, `message`, `reply_to`.

**Step 2: Create `components/ContactForm.tsx`**

```tsx
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
      <textarea
        required
        name="message"
        rows={4}
        placeholder={t('message')}
        className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
      />
      <input name="reply_to" type="hidden" />
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
```

**Step 3: Create `app/[locale]/contact/page.tsx`**

```tsx
import { getSiteSettings } from '@/sanity/lib/queries'
import { ContactForm } from '@/components/ContactForm'

export default async function ContactPage({ params: { locale } }: { params: { locale: 'en' | 'ru' } }) {
  const settings = await getSiteSettings()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="mb-10 text-center text-3xl font-bold text-slate-900">
        {locale === 'en' ? 'Contact Us' : 'Свяжитесь с нами'}
      </h1>
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            {locale === 'en' ? 'Get in Touch' : 'Как с нами связаться'}
          </h2>
          <p className="text-slate-600">{settings.address[locale]}</p>
          <p className="mt-3 text-slate-600">📧 {settings.contactEmail}</p>
          {settings.whatsappNumber && (
            <p className="mt-1 text-slate-600">💬 {settings.whatsappNumber}</p>
          )}
        </div>
        <ContactForm locale={locale} />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }]
}
```

**Step 4: Add contact form translations to messages files**

Add to `messages/en.json`:
```json
{
  "contact": {
    "name": "Your Name",
    "company": "Company Name",
    "country": "Select Country",
    "product": "Product Interest (optional)",
    "quantity": "Estimated Quantity (optional)",
    "message": "Your Message",
    "submit": "Send Inquiry",
    "success": "Thank you! We'll respond within 24 hours.",
    "error": "Failed to send. Please try again or contact us directly."
  }
}
```

Add to `messages/ru.json`:
```json
{
  "contact": {
    "name": "Ваше имя",
    "company": "Название компании",
    "country": "Выберите страну",
    "product": "Интересующий продукт (необязательно)",
    "quantity": "Примерное количество (необязательно)",
    "message": "Ваше сообщение",
    "submit": "Отправить запрос",
    "success": "Спасибо! Мы ответим в течение 24 часов.",
    "error": "Не удалось отправить. Попробуйте еще раз или свяжитесь с нами напрямую."
  }
}
```

After writing all files, run:
```bash
npx tsc --noEmit
```
Fix any type errors, then commit:
```bash
git add -A
git commit -m "feat: contact page with EmailJS inquiry form"
```

### Report contract
Write full report to: `C:/Users/24960/claudework/solarlight/.superpowers/sdd/2026-08-16-solar-street-light-website/task-8-report.md`
Return ONLY: Status, commit hash, one-line build summary, concerns if any.
Do NOT dispatch subagents.
