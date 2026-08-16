import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityCertificate } from '@/types/sanity'

interface CertificateBadgeProps {
  certificate: SanityCertificate
}

export function CertificateBadge({ certificate }: CertificateBadgeProps) {
  const logoUrl = urlFor(certificate.logo).width(80).height(80).url()

  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 p-3">
      <div className="relative h-12 w-12 flex-shrink-0">
        <Image src={logoUrl} alt={certificate.name} fill className="object-contain" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-50">{certificate.name}</p>
        {certificate.validUntil && (
          <p className="text-xs text-slate-500">Valid until {certificate.validUntil}</p>
        )}
      </div>
    </div>
  )
}
