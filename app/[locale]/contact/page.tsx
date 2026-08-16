import { getSiteSettings } from '@/sanity/lib/queries'
import { ContactForm } from '@/components/ContactForm'

export default async function ContactPage({ params: { locale } }: { params: { locale: 'en' | 'ru' } }) {
  const settings = await getSiteSettings()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="mb-10 text-center text-3xl font-bold text-slate-900">
        {locale === 'en' ? 'Contact Us' : 'Свяжитесь с нами'}
      </h1>
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            {locale === 'en' ? 'Get in Touch' : 'Как с нами связаться'}
          </h2>
          <p className="text-slate-600">{settings.address[locale]}</p>
          <p className="mt-3 text-slate-600">📧 {settings.contactEmail}</p>
          {settings.whatsappNumber && (
            <p className="mt-1 text-slate-600">💬 {settings.whatsappNumber}</p>
          )}
        </div>
        <ContactForm locale={locale} />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }]
}
