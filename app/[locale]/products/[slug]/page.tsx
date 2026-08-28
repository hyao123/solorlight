import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getProduct, getProducts, getSiteSettings } from '@/lib/queries'
import { urlFor } from '@/lib/image'
import { ProductSpecs } from '@/components/ProductSpecs'
import { CertificateBadge } from '@/components/CertificateBadge'
import { ProductImageGallery } from '@/components/ProductImageGallery'
import { ProductActionButtons } from '@/components/ProductActionButtons'
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/StructuredData'

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
  const [product, settings, allProducts, t] = await Promise.all([
    getProduct(slug),
    getSiteSettings(),
    getProducts(),
    getTranslations({ locale, namespace: 'products' }),
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solarlight.kz'
  const currentUrl = `${siteUrl}/${locale}/products/${slug}`

  const whatsappMsg = locale === 'en'
    ? `Hi, I'm interested in the ${name}. Please send me a quote.`
    : `Здравствуйте, интересует ${name}. Пришлите, пожалуйста, коммерческое предложение.`

  return (
    <>
      <ProductJsonLd
        name={name}
        description={product.seoDescription[locale]}
        images={imageUrls}
        sku={slug}
        url={currentUrl}
      />
      <BreadcrumbJsonLd
        items={[
          { name: t('home'), url: `${siteUrl}/${locale}` },
          { name: t('breadcrumb'), url: `${siteUrl}/${locale}/products` },
          { name, url: currentUrl },
        ]}
      />

      {/* Breadcrumb */}
      <div className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-slate-400">
            <Link href={`/${locale}`} className="hover:text-yellow-400 transition">{t('home')}</Link>
            <span>/</span>
            <Link href={`/${locale}/products`} className="hover:text-yellow-400 transition">{t('breadcrumb')}</Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">{name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">

        {/* Top grid: gallery + purchase panel */}
        <div className="grid gap-10 lg:grid-cols-[1fr_440px]">

          {/* Image gallery */}
          <ProductImageGallery images={imageUrls} name={name} />

          {/* Right panel */}
          <div className="flex flex-col">
            {typeof product.series === 'object' && product.series?.name?.[locale] && (
              <span className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-400">
                {product.series.name[locale]}
              </span>
            )}
            <h1 className="text-3xl font-bold text-slate-100">{name}</h1>
            <p className="mt-2 text-slate-400 leading-relaxed">{product.seoDescription[locale]}</p>

            {/* Key highlights */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                product.specs.power && { icon: '⚡', label: t('power'), value: product.specs.power },
                product.specs.lumens && { icon: '💡', label: t('flux'), value: String(product.specs.lumens) },
                product.specs.ipRating && { icon: '🛡️', label: t('protection'), value: product.specs.ipRating },
                product.specs.battery && { icon: '🔋', label: t('battery'), value: product.specs.battery.split('·')[0].trim() },
              ].filter(Boolean).map((h) => h && (
                <div key={h.label} className="rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-3">
                  <div className="text-xl">{h.icon}</div>
                  <div className="mt-1 text-xs text-slate-400">{h.label}</div>
                  <div className="mt-0.5 font-semibold text-slate-100">{h.value}</div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            {product.certificates.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-semibold text-slate-300">
                  {t('certifications')}
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {product.certificates.map((cert) => (
                    <CertificateBadge key={cert._id} certificate={cert} locale={locale} />
                  ))}
                </div>
              </div>
            )}

            {/* CTA action buttons */}
            <div className="mt-8">
              <ProductActionButtons
                productName={name}
                locale={locale}
                whatsappNumber={settings.whatsappNumber}
                email={settings.email}
                whatsappMsg={whatsappMsg}
              />
            </div>

            {/* Shipping notice */}
            <div className="mt-4 rounded-xl border border-sky-500/20 bg-sky-500/10 px-4 py-3 text-sm text-sky-300">
              ✓ {t('shippingNotice')}
            </div>
          </div>
        </div>

        {/* Full spec table */}
        <div className="mt-12">
          <ProductSpecs specs={product.specs} locale={locale} />
        </div>

        {/* Why section */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-white">
          <h2 className="mb-6 text-xl font-bold text-slate-100">
            {t('whyChooseTitle')}
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
              <div key={item.title} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
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
            <h2 className="mb-6 text-xl font-bold text-slate-100">
              {t('moreInSeries')}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((p) => {
                const rImg = p.images?.[0] ? urlFor(p.images[0]).width(400).height(300).url() : '/placeholder.jpg'
                return (
                  <Link
                    key={p._id}
                    href={`/${locale}/products/${p.slug.current}`}
                    className="group overflow-hidden rounded-xl border border-slate-800 bg-slate-900/90 hover:border-yellow-400/50 transition"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                      <Image src={rImg ?? '/placeholder.jpg'} alt={p.name[locale]} fill className="object-cover transition group-hover:scale-105" sizes="400px" />
                    </div>
                    <div className="p-4">
                      <div className="font-semibold text-slate-100 group-hover:text-yellow-400 transition">{p.name[locale]}</div>
                      <div className="mt-1 text-sm text-slate-400">{p.specs.power} · {p.specs.lumens}</div>
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
