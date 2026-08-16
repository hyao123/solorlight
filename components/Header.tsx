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
