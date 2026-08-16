## Task 9 Brief: About + Solutions Pages

**Plan:** `C:/Users/24960/claudework/docs/superpowers/plans/2026-08-16-solar-street-light-website.md`
**Report file:** `.superpowers/sdd/2026-08-16-solar-street-light-website/task-9-report.md`

### Context
Task 9 of 11. Tasks 1-8 complete. Contact page with EmailJS form is live.
You are building the About page (company info, certifications) and Solutions page (product series by application).

Work directory: `C:/Users/24960/claudework/solarlight`

### Global Constraints
- Design: slate base (#0F172A), sky accent (#38BDF8), orange CTA (#F97316)
- All text must use slate colors: slate-900 for headings, slate-600 for body
- Badge colors use orange theme, not yellow
- Add `generateStaticParams` for both locales
- Cards use 12px border radius (rounded-xl)

### Your task — create about and solutions pages:

**Step 1: Create `app/[locale]/about/page.tsx`**

```tsx
import { getSiteSettings } from '@/sanity/lib/queries'

export default async function AboutPage({ params: { locale } }: { params: { locale: 'en' | 'ru' } }) {
  const settings = await getSiteSettings()

  const content = {
    en: {
      title: 'About Us',
      intro: `${settings.companyName} is a professional solar street light manufacturer with over 10 years of export experience. We supply governments, municipalities, and private developers across Central Asia and the Middle East.`,
      certTitle: 'Our Certifications',
    },
    ru: {
      title: 'О нас',
      intro: `${settings.companyName} — профессиональный производитель солнечных уличных фонарей с более чем 10-летним опытом экспорта. Мы поставляем продукцию правительствам, муниципалитетам и частным застройщикам в Центральной Азии и на Ближнем Востоке.`,
      certTitle: 'Наши сертификаты',
    },
  }[locale]

  const certs = ['CE', 'RoHS', 'ISO 9001', 'IEC 60598']

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">{content.title}</h1>
      <p className="text-lg text-slate-600">{content.intro}</p>
      <h2 className="mb-4 mt-12 text-xl font-semibold text-slate-900">{content.certTitle}</h2>
      <div className="flex flex-wrap gap-4">
        {certs.map((c) => (
          <span key={c} className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 ring-1 ring-orange-200">
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }]
}
```

**Step 2: Create `app/[locale]/solutions/page.tsx`**

```tsx
import Link from 'next/link'
import { getProductSeries } from '@/sanity/lib/queries'

const SCENE_ICONS: Record<string, string> = {
  road: '🛣️', community: '🏘️', rural: '🌾', industrial: '🏭',
}

export default async function SolutionsPage({ params: { locale } }: { params: { locale: 'en' | 'ru' } }) {
  const series = await getProductSeries()

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="mb-4 text-3xl font-bold text-slate-900">
        {locale === 'en' ? 'Solutions by Application' : 'Решения по применению'}
      </h1>
      <p className="mb-12 text-slate-600">
        {locale === 'en'
          ? 'We match the right product to your project type.'
          : 'Мы подбираем продукт под ваш тип проекта.'}
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {series.map((s) => (
          <div key={s._id} className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/10">
            <div className="text-3xl">{SCENE_ICONS[s.targetScene] ?? '💡'}</div>
            <h2 className="mt-3 text-lg font-semibold text-slate-50">{s.name[locale]}</h2>
            <p className="mt-2 text-sm text-slate-400">{s.description[locale]}</p>
            <Link
              href={`/${locale}/products?series=${s.slug.current}`}
              className="mt-4 inline-block text-sm font-medium text-orange-500 hover:text-orange-400"
            >
              {locale === 'en' ? 'View products →' : 'Смотреть продукты →'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }]
}
```

After writing both files, run:
```bash
npx tsc --noEmit
```
Fix any type errors, then commit:
```bash
git add -A
git commit -m "feat: about and solutions pages"
```

### Report contract
Write full report to: `C:/Users/24960/claudework/solarlight/.superpowers/sdd/2026-08-16-solar-street-light-website/task-9-report.md`
Return ONLY: Status, commit hash, one-line build summary, concerns if any.
Do NOT dispatch subagents.
