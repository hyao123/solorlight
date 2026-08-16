## Task 4 Brief: Layout — Header, Footer, WhatsApp Button

**Plan:** `C:/Users/24960/claudework/docs/superpowers/plans/2026-08-16-solar-street-light-website.md`
**Report file:** `.superpowers/sdd/2026-08-16-solar-street-light-website/task-4-report.md`

### Context
Task 4 of 11. Tasks 1-3 complete. Sanity types and queries are in place.
You are building the shared layout components: Header (nav), Footer, and WhatsApp floating button.

Work directory: `C:/Users/24960/claudework/solarlight`

### Global Constraints
- Design: deep slate base (#0F172A), off-white text (#F8FAFC), sky accent (#38BDF8), orange CTA (#F97316)
- Typography: use `font-sans` (Inter loaded via next/font/google in root layout)
- WhatsApp number comes from `getSiteSettings()` — never hardcoded
- Mobile-first: all components must be responsive

### Your task — create these components:

**`components/Header.tsx`**
```tsx
'use client'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { useState } from 'react'

export function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: `/${locale}/products`, label: t('products') },
    { href: `/${locale}/solutions`, label: t('solutions') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-bold text-slate-50">
            SolarLight
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex md:gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 transition hover:text-sky-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language switcher */}
          <div className="hidden md:flex md:gap-2">
            <Link
              href="/en"
              className={`rounded px-2 py-1 text-sm ${
                locale === 'en' ? 'bg-slate-800 text-slate-50' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </Link>
            <Link
              href="/ru"
              className={`rounded px-2 py-1 text-sm ${
                locale === 'ru' ? 'bg-slate-800 text-slate-50' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              RU
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden rounded p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-50"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-slate-800 py-4 md:hidden">
            <nav className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-slate-300 hover:text-sky-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex gap-2 border-t border-slate-800 pt-4">
              <Link href="/en" className="text-sm text-slate-400 hover:text-slate-200">
                EN
              </Link>
              <span className="text-slate-700">|</span>
              <Link href="/ru" className="text-sm text-slate-400 hover:text-slate-200">
                RU
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
```

**`components/Footer.tsx`**
```tsx
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { getSiteSettings } from '@/sanity/lib/queries'

export async function Footer() {
  const settings = await getSiteSettings()
  const locale = useLocale()
  const t = useTranslations()

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Company info */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-slate-50">{settings.companyName}</h3>
            <p className="text-sm text-slate-400">{settings.address[locale as 'en' | 'ru']}</p>
            <p className="mt-2 text-sm text-slate-400">{settings.contactEmail}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-slate-50">{t('nav.products')}</h3>
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}/products`} className="text-sm text-slate-400 hover:text-sky-400">
                {t('nav.products')}
              </Link>
              <Link href={`/${locale}/solutions`} className="text-sm text-slate-400 hover:text-sky-400">
                {t('nav.solutions')}
              </Link>
              <Link href={`/${locale}/about`} className="text-sm text-slate-400 hover:text-sky-400">
                {t('nav.about')}
              </Link>
              <Link href={`/${locale}/contact`} className="text-sm text-slate-400 hover:text-sky-400">
                {t('nav.contact')}
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-slate-50">Connect</h3>
            <div className="flex gap-4">
              {settings.socialLinks.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-sky-400"
                  aria-label="LinkedIn"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              )}
              {settings.socialLinks.youtube && (
                <a
                  href={settings.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-sky-400"
                  aria-label="YouTube"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} {settings.companyName}. {t('footer.rights')}
        </div>
      </div>
    </footer>
  )
}
```

**`components/WhatsAppButton.tsx`**
```tsx
'use client'
import { useTranslations } from 'next-intl'

interface WhatsAppButtonProps {
  phone: string
}

export function WhatsAppButton({ phone }: WhatsAppButtonProps) {
  const t = useTranslations('cta')
  
  const handleClick = () => {
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600 hover:scale-110 sm:h-auto sm:w-auto sm:px-4 sm:py-3 sm:gap-2"
      aria-label={t('whatsapp')}
    >
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <span className="hidden sm:inline text-sm font-medium">{t('whatsapp')}</span>
    </button>
  )
}
```

**Update `app/[locale]/layout.tsx`** to include Header, Footer, WhatsApp:
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { getSiteSettings } from '@/sanity/lib/queries'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import '../globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Solar Street Lights',
  description: 'High-quality solar street lights for Central Asia and Middle East',
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()
  const settings = await getSiteSettings()

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton phone={settings.whatsappNumber} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

After writing all files, run:
```bash
npx tsc --noEmit
```
Fix any type errors, then commit:
```bash
git add -A
git commit -m "feat: Header, Footer, WhatsAppButton components + layout integration"
```

### Report contract
Write full report to: `C:/Users/24960/claudework/solarlight/.superpowers/sdd/2026-08-16-solar-street-light-website/task-4-report.md`
Return ONLY: Status, commit hash, one-line build summary, concerns if any.
Do NOT dispatch subagents.
