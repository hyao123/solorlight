import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityProduct } from '@/types/sanity'

interface ProductCardProps {
  product: SanityProduct
  locale: 'en' | 'ru'
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const imageUrl = product.images?.[0] ? urlFor(product.images[0]).width(400).height(300).url() : '/placeholder.jpg'

  return (
    <Link
      href={`/${locale}/products/${product.slug.current}`}
      className="group block overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
        <Image
          src={imageUrl}
          alt={product.name[locale]}
          fill
          className="object-cover transition group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.isHotProduct && (
          <div className="absolute right-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
            HOT
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-slate-50 group-hover:text-sky-400">
          {product.name[locale] ?? product.name.en ?? 'Product'}
        </h3>
        <div className="mb-3 flex flex-wrap gap-2 text-sm text-slate-400">
          {(product.specs.power || product.specs.wattage) && (
            <span>{product.specs.power ?? `${product.specs.wattage}W`}</span>
          )}
          {product.specs.lumens && (
            <>
              <span>•</span>
              <span>{product.specs.lumens}</span>
            </>
          )}
          {product.specs.ipRating && (
            <>
              <span>•</span>
              <span>{product.specs.ipRating}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {product.certificates.length} {locale === 'en' ? 'Certificates' : 'Сертификатов'}
        </div>
      </div>
    </Link>
  )
}
