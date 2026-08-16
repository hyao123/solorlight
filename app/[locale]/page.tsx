import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('cta')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Solar Street Light</h1>
      <p className="mt-4 text-lg">{t('getQuote')}</p>
    </main>
  )
}
