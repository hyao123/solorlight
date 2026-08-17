import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getProduct, getProducts, getSiteSettings } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { ProductSpecs } from '@/components/ProductSpecs'
import { CertificateBadge } from '@/components/CertificateBadge'
import { ProductImageGallery } from '@/components/ProductImageGallery'

interface Params { locale: 'en' | 'ru'; slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params
  const product = await getProduct(slug)
  if (!product) return {}
  return {
    title: product.seoTitle[locale] || product.name[locale],
    description: product.seoDescription[locale],
    alternates: { languages: { en: `/en/products/${slug}`, ru: `/ru/products/${slug}` } },
  }
}

export async function generateStaticParams() {
  const products = await getProducts()
  return ['en', 'ru'].flatMap((locale) =>
    products.map((p) => ({ locale, slug: p.slug.current }))
  )
}

export default async function ProductDetailPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params
  const [product, settings, allProducts] = await Promise.all([
    getProduct(slug),
    getSiteSettings(),
    getProducts(),
  ])
  if (!product) notFound()

  const name = product.name[locale]
  const mainImg = product.images?.[0]
    ? urlFor(product.images[0]).width(800).height(600).url()
    : '/placeholder.jpg'

  // Related: same series, exclude current
  const related = allProducts
    .filter((p) => {
      if (p._id === product._id) return false
      const ps = typeof p.series === 'object' && p.series !== null ? p.series._id : p.series
      const cs = typeof product.series === 'object' && product.series !== null ? product.series._id : product.series
      return ps === cs
    })
    .slice(0, 3)

  const imageUrls = product.images
    .map((img) => urlFor(img).width(800).height(600).url())
    .filter((u): u is string => typeof u === 'string' && u.length > 0)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    image: mainImg,
    description: product.seoDescription[locale],
  }

  const whatsappMsg = locale === 'en'
    ? `Hi, I'm interested in the ${name}. Please send me a quote.`
    : `Здравствуйте, интересует ${name}. Пришлите, пожалуйста, коммерческое предложение.`

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div className="border-b bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href={`/${locale}`} className="hover:text-slate-800">{locale === 'en' ? 'Home' : 'Главная'}</Link>
            <span>/</span>
            <Link href={`/${locale}/products`} className="hover:text-slate-800">{locale === 'en' ? 'Products' : 'Продукты'}</Link>
            <span>/</span>
            <span className="text-slate-900">{name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">

        {/* Top grid: gallery + purchase panel */}
        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">

          {/* Image gallery */}
          <ProductImageGallery images={imageUrls} name={name} />

          {/* Right panel */}
          <div className="flex flex-col">
            {product.series?.name[locale] && (
              <span className="mb-2 text-sm font-medium uppercase tracking-wider text-sky-600">
                {product.series.name[locale]}
              </span>
            )}
            <h1 className="text-3xl font-bold text-slate-900">{name}</h1>
            <p className="mt-2 text-slate-500">{product.seoDescription[locale]}</p>

            {/* Key highlights */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                product.specs.power && { icon: '⚡', label: locale === 'en' ? 'Power' : 'Мощность', value: product.specs.power },
                product.specs.lumens && { icon: '💡', label: locale === 'en' ? 'Flux' : 'Поток', value: String(product.specs.lumens) },
                product.specs.ipRating && { icon: '🛡️', label: locale === 'en' ? 'Protection' : 'Защита', value: product.specs.ipRating },
                product.specs.battery && { icon: '🔋', label: locale === 'en' ? 'Battery' : 'Батарея', value: product.specs.battery.split('·')[0].trim() },
              ].filter(Boolean).map((h) => h && (
                <div key={h.label} className="rounded-xl bg-slate-50 px-4 py-3">
                  <div className="text-xl">{h.icon}</div>
                  <div className="mt-1 text-xs text-slate-500">{h.label}</div>
                  <div className="mt-0.5 font-semibold text-slate-900">{h.value}</div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            {product.certificates.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-semibold text-slate-700">
                  {locale === 'en' ? 'Certifications' : 'Сертификаты'}
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {product.certificates.map((cert) => (
                    <CertificateBadge key={cert._id} certificate={cert} />
                  ))}
                </div>
              </div>
            )}

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col gap-3">
              {settings.whatsappNumber && (
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-semibold text-white shadow hover:bg-green-600"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.549 4.1 1.508 5.83L0 24l6.345-1.484A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.913 0-3.703-.5-5.254-1.375l-.376-.222-3.768.882.918-3.674-.245-.39A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  {locale === 'en' ? 'Request Quote on WhatsApp' : 'Запрос цены в WhatsApp'}
                </a>
              )}
              {settings.email && (
                <a
                  href={`mailto:${settings.email}?subject=${encodeURIComponent(name)}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  {locale === 'en' ? 'Send Email Inquiry' : 'Отправить запрос по email'}
                </a>
              )}
            </div>

            {/* Shipping notice */}
            <div className="mt-4 rounded-xl bg-sky-50 px-4 py-3 text-sm text-sky-700">
              ✓ {locale === 'en'
                ? 'MOQ 10 units · Sea & air freight to Central Asia · 3–5 week lead time'
                : 'МОК 10 единиц · Морская и авиадоставка в Центральную Азию · Срок 3–5 недели'}
            </div>
          </div>
        </div>

        {/* Full spec table */}
        <div className="mt-12">
          <ProductSpecs specs={product.specs} locale={locale} />
        </div>

        {/* Why section */}
        <div className="mt-10 rounded-2xl bg-slate-900 p-8 text-white">
          <h2 className="mb-6 text-xl font-bold">
            {locale === 'en' ? 'Why Choose This Model?' : 'Почему стоит выбрать эту модель?'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '🔋', title: locale === 'en' ? 'LiFePO4 Battery' : 'Батарея LiFePO4', desc: locale === 'en' ? '2000+ charge cycles. Stable in -20°C to +60°C. No thermal runaway risk.' : '2000+ циклов зарядки. Стабильна от -20°C до +60°C. Без риска теплового разгона.' },
              { icon: '☀️', title: locale === 'en' ? 'MPPT Controller' : 'Контроллер MPPT', desc: locale === 'en' ? '99% tracking efficiency. Charges up to 30% faster than PWM controllers.' : 'Эффективность слежения 99%. Заряжает на 30% быстрее, чем контроллеры PWM.' },
              { icon: '🛡️', title: locale === 'en' ? 'IP66 Sealed' : 'Защита IP66', desc: locale === 'en' ? 'Dust-proof and jet-water resistant. Designed for desert and steppe conditions.' : 'Защита от пыли и струй воды. Рассчитана на условия пустыни и степи.' },
              { icon: '💡', title: locale === 'en' ? 'Bridgelux / Lumileds LEDs' : 'Светодиоды Bridgelux/Lumileds', desc: locale === 'en' ? '160+ lm/W efficacy. L70 lifespan >100,000 hours. Consistent output over time.' : 'Эффективность 160+ лм/Вт. Срок службы L70 >100 000 часов. Стабильный световой поток.' },
              { icon: '📡', title: locale === 'en' ? 'Smart Dimming' : 'Умное диммирование', desc: locale === 'en' ? 'PIR motion sensor dims to 30% when idle. Extends battery life by up to 40%.' : 'ИК-датчик снижает яркость до 30% при простое. Продлевает срок службы батареи до 40%.' },
              { icon: '🏆', title: locale === 'en' ? 'CE & RoHS Certified' : 'Сертификат CE и RoHS', desc: locale === 'en' ? 'All certificates included for customs clearance in Kazakhstan, Uzbekistan, and EU.' : 'Все сертификаты для таможенного оформления в Казахстане, Узбекистане и ЕС.' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-slate-800 p-4">
                <div className="mb-2 text-2xl">{item.icon}</div>
                <div className="mb-1 font-semibold text-slate-100">{item.title}</div>
                <div className="text-sm text-slate-400 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-slate-900">
              {locale === 'en' ? 'More in This Series' : 'Другие модели серии'}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((p) => {
                const rImg = p.images?.[0] ? urlFor(p.images[0]).width(400).height(300).url() : '/placeholder.jpg'
                return (
                  <Link
                    key={p._id}
                    href={`/${locale}/products/${p.slug.current}`}
                    className="group overflow-hidden rounded-xl border border-slate-200 hover:border-sky-400"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <Image src={rImg ?? '/placeholder.jpg'} alt={p.name[locale]} fill className="object-cover transition group-hover:scale-105" sizes="400px" />
                    </div>
                    <div className="p-3">
                      <div className="font-semibold text-slate-900 group-hover:text-sky-600">{p.name[locale]}</div>
                      <div className="mt-1 text-sm text-slate-500">{p.specs.power} · {p.specs.lumens}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
