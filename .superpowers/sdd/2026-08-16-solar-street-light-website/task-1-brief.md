## Task 1 Brief: Project Scaffold + Dependencies

**Plan:** `C:/Users/24960/claudework/docs/superpowers/plans/2026-08-16-solar-street-light-website.md`
**Report file:** `.superpowers/sdd/2026-08-16-solar-street-light-website/task-1-report.md`

### Context
You are Task 1 of 11 in building a solar street light B2B foreign trade website targeting Central Asia.
This is the project scaffold — the foundation every subsequent task builds on.
Work directory: `C:/Users/24960/claudework/solarlight`

### Global Constraints (binding)
- Node.js >= 20
- Next.js 15.x with App Router (not Pages Router)
- next-intl 3.x — locales: `en` (default), `ru`
- Sanity v3
- Tailwind CSS 3.x
- All routes prefixed with `[locale]`
- No TypeScript `any`

### Your task (read this carefully — use all values verbatim)

**Step 1: Initialise Next.js 15 project**
```bash
cd C:/Users/24960/claudework/solarlight
npx create-next-app@latest . \
  --typescript --tailwind --eslint --app --src-dir=false \
  --import-alias="@/*" --no-git
```
When prompted interactively, accept defaults. The `--no-git` flag avoids re-initialising (git already exists).

**Step 2: Install dependencies**
```bash
npm install next-intl@3 @sanity/client@6 @sanity/image-url sanity@3 \
  @sanity/vision emailjs-com next-sitemap
```

**Step 3: Write `next.config.ts`** (overwrite what create-next-app generated)
```ts
import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const config: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
}

export default withNextIntl(config)
```

**Step 4: Write `middleware.ts`** (at project root)
```ts
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  localeDetection: true,
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
```

**Step 5: Create `i18n/request.ts`** (new file)
```ts
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
}))
```

**Step 6: Write `messages/en.json`**
```json
{
  "nav": {
    "products": "Products",
    "about": "About Us",
    "solutions": "Solutions",
    "contact": "Contact"
  },
  "cta": {
    "getQuote": "Get a Free Quote",
    "inquireNow": "Inquire Now",
    "whatsapp": "Chat on WhatsApp"
  },
  "contact": {
    "name": "Your Name",
    "company": "Company Name",
    "country": "Country",
    "product": "Product of Interest",
    "quantity": "Quantity",
    "message": "Message",
    "submit": "Send Inquiry",
    "success": "Thank you! We will reply within 24 hours.",
    "error": "Something went wrong. Please try WhatsApp instead."
  },
  "footer": {
    "rights": "All rights reserved."
  }
}
```

**Step 7: Write `messages/ru.json`**
```json
{
  "nav": {
    "products": "Продукты",
    "about": "О нас",
    "solutions": "Решения",
    "contact": "Контакты"
  },
  "cta": {
    "getQuote": "Получить бесплатное предложение",
    "inquireNow": "Отправить запрос",
    "whatsapp": "Написать в WhatsApp"
  },
  "contact": {
    "name": "Ваше имя",
    "company": "Название компании",
    "country": "Страна",
    "product": "Интересующий продукт",
    "quantity": "Количество",
    "message": "Сообщение",
    "submit": "Отправить запрос",
    "success": "Спасибо! Мы ответим в течение 24 часов.",
    "error": "Что-то пошло не так. Пожалуйста, напишите нам в WhatsApp."
  },
  "footer": {
    "rights": "Все права защищены."
  }
}
```

**Step 8: Verify TypeScript compiles**
```bash
npx tsc --noEmit
```
Fix any type errors before committing.

**Step 9: Commit**
```bash
git add -A
git commit -m "feat: project scaffold with Next.js 15, next-intl, Tailwind"
```

### Report contract
Write your full report to: `C:/Users/24960/claudework/solarlight/.superpowers/sdd/2026-08-16-solar-street-light-website/task-1-report.md`

Return to me ONLY:
- Status: DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED
- Commit hash(es)
- One-line test/build summary
- Concerns (if DONE_WITH_CONCERNS)

### No subagents
Do not dispatch any subagents or reviewers. Implement, test, and commit yourself.
