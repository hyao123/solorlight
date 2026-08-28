import Image from 'next/image'
import type { SanityCertificate } from '@/types/sanity'

interface CertificateBadgeProps {
  certificate: SanityCertificate
  locale?: 'en' | 'ru'
}

export function CertificateBadge({ certificate, locale = 'en' }: CertificateBadgeProps) {
  const name = typeof certificate.name === 'string'
    ? certificate.name
    : (certificate.name as { en: string; ru: string })?.[locale] ?? (certificate.name as { en: string; ru: string })?.en ?? 'Certificate'
  const logoUrl = certificate.image ?? '/placeholder.jpg'

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/90 p-3 transition hover:border-slate-700">
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-950 p-1">
        <Image src={logoUrl} alt={name} fill className="object-contain p-1" sizes="48px" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-100">{name}</p>
        {certificate.validUntil ? (
          <p className="text-xs text-slate-400">Valid until {certificate.validUntil}</p>
        ) : (
          <p className="text-xs text-emerald-400 font-medium">✓ Verified Standard</p>
        )}
      </div>
    </div>
  )
}
