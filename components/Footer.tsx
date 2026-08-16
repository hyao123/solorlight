'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import type { SanitySiteSettings } from '@/types/sanity'

interface FooterProps {
  settings: SanitySiteSettings
}

export function Footer({ settings }: FooterProps) {
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
