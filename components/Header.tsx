'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { useState } from 'react'
import { QuoteModal } from './QuoteModal'

export function Header() {
  const t = useTranslations('nav')
  const locale = useLocale() as 'en' | 'ru'
  const pathname = usePathname() || `/${locale}`
  const [mobileOpen, setMobileOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)

  const links = [
    { href: `/${locale}/products`, label: t('products') },
    { href: `/${locale}/solutions`, label: t('solutions') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  const getLocalizedPath = (targetLocale: 'en' | 'ru') => {
    if (pathname.startsWith(`/${locale}`)) {
      return pathname.replace(new RegExp(`^/${locale}`), `/${targetLocale}`)
    }
    return `/${targetLocale}`
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-50 hover:text-sky-400 transition">
            <span className="text-2xl">☀️</span>
            <span>SolarLight</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex md:gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition ${
                    isActive ? 'text-sky-400 font-semibold' : 'text-slate-300 hover:text-sky-400'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right actions: Quote CTA + Language switcher */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className="rounded-xl bg-yellow-400 px-4 py-1.5 text-xs font-bold text-slate-950 shadow hover:bg-yellow-300 transition flex items-center gap-1.5"
            >
              <span>⚡</span>
              <span>{locale === 'ru' ? 'Запросить КП' : 'Get a Quote'}</span>
            </button>

            {/* Language switcher */}
            <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900 p-0.5 text-xs font-semibold">
              <Link
                href={getLocalizedPath('en')}
                className={`rounded-md px-2.5 py-1 transition ${
                  locale === 'en'
                    ? 'bg-yellow-400 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </Link>
              <Link
                href={getLocalizedPath('ru')}
                className={`rounded-md px-2.5 py-1 transition ${
                  locale === 'ru'
                    ? 'bg-yellow-400 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                RU
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-50"
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
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-sky-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-3 border-t border-slate-800 px-3 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 mr-1">Language:</span>
                <Link
                  href={getLocalizedPath('en')}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded px-2.5 py-1 text-xs font-semibold ${
                    locale === 'en' ? 'bg-yellow-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  English
                </Link>
                <Link
                  href={getLocalizedPath('ru')}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded px-2.5 py-1 text-xs font-semibold ${
                    locale === 'ru' ? 'bg-yellow-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Русский
                </Link>
              </div>

              <button
                type="button"
                onClick={() => {
                  setQuoteOpen(true)
                  setMobileOpen(false)
                }}
                className="w-full rounded-xl bg-yellow-400 py-2.5 text-center text-xs font-bold text-slate-950 shadow hover:bg-yellow-300 transition"
              >
                ⚡ {locale === 'ru' ? 'Запросить коммерческое предложение' : 'Get a Free Quote'}
              </button>
            </div>
          </div>
        )}
      </div>

      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        locale={locale}
      />
    </header>
  )
}
