import { ProductCard } from './ProductCard'
import type { SanityProduct } from '@/types/sanity'

interface ProductGridProps {
  products: SanityProduct[]
  locale: 'en' | 'ru'
}

export function ProductGrid({ products, locale }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center text-slate-400">
        {locale === 'en' ? 'No products found' : 'Продукты не найдены'}
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} locale={locale} />
      ))}
    </div>
  )
}
