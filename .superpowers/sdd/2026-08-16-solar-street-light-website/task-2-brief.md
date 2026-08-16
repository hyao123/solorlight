## Task 2 Brief: Sanity Schemas

**Plan:** `C:/Users/24960/claudework/docs/superpowers/plans/2026-08-16-solar-street-light-website.md`
**Report file:** `.superpowers/sdd/2026-08-16-solar-street-light-website/task-2-report.md`

### Context
Task 2 of 11. Task 1 (scaffold) is complete — the Next.js project is set up at `C:/Users/24960/claudework/solarlight`.
You are writing the Sanity v3 schema definitions that power the CMS.

Work directory: `C:/Users/24960/claudework/solarlight`

### Global Constraints
- Sanity v3 (already installed as `sanity@3`)
- All user-facing text fields use `{ en: string, ru: string }` bilingual objects
- Schema type names must be exactly: `product`, `productSeries`, `certificate`, `siteSettings`
- No TypeScript `any`

### Your task

Create these files exactly as specified:

**`sanity/schemas/productSeries.ts`**
```ts
import { defineField, defineType } from 'sanity'

export const productSeriesSchema = defineType({
  name: 'productSeries',
  title: 'Product Series',
  type: 'document',
  fields: [
    defineField({ name: 'slug', type: 'slug', options: { source: 'name.en' } }),
    defineField({
      name: 'name', type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ru', type: 'string', title: 'Russian' },
      ],
    }),
    defineField({
      name: 'description', type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'ru', type: 'text', title: 'Russian' },
      ],
    }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'targetScene', type: 'string',
      options: { list: ['road', 'community', 'rural', 'industrial'] },
    }),
    defineField({ name: 'sortOrder', type: 'number' }),
  ],
})
```

**`sanity/schemas/certificate.ts`**
```ts
import { defineField, defineType } from 'sanity'

export const certificateSchema = defineType({
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'logo', type: 'image' }),
    defineField({ name: 'validUntil', type: 'date' }),
  ],
})
```

**`sanity/schemas/product.ts`**
```ts
import { defineField, defineType } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'slug', type: 'slug', options: { source: 'name.en' } }),
    defineField({
      name: 'name', type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ru', type: 'string', title: 'Russian' },
      ],
    }),
    defineField({ name: 'series', type: 'reference', to: [{ type: 'productSeries' }] }),
    defineField({ name: 'images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({
      name: 'specs', type: 'object',
      fields: [
        { name: 'wattage', type: 'number', title: 'Wattage (W)' },
        { name: 'batteryCapacity', type: 'number', title: 'Battery Capacity (Ah)' },
        { name: 'lumens', type: 'number', title: 'Lumens' },
        { name: 'colorTemp', type: 'string', title: 'Color Temperature' },
        { name: 'ipRating', type: 'string', title: 'IP Rating' },
        { name: 'poleHeight', type: 'number', title: 'Pole Height (m)' },
        { name: 'workingHours', type: 'number', title: 'Working Hours/Night' },
      ],
    }),
    defineField({
      name: 'description', type: 'object',
      fields: [
        { name: 'en', type: 'array', of: [{ type: 'block' }], title: 'English' },
        { name: 'ru', type: 'array', of: [{ type: 'block' }], title: 'Russian' },
      ],
    }),
    defineField({ name: 'certificates', type: 'array', of: [{ type: 'reference', to: [{ type: 'certificate' }] }] }),
    defineField({ name: 'isHotProduct', type: 'boolean', initialValue: false }),
    defineField({
      name: 'seoTitle', type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ru', type: 'string', title: 'Russian' },
      ],
    }),
    defineField({
      name: 'seoDescription', type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ru', type: 'string', title: 'Russian' },
      ],
    }),
  ],
})
```

**`sanity/schemas/siteSettings.ts`**
```ts
import { defineField, defineType } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'companyName', type: 'string' }),
    defineField({ name: 'whatsappNumber', type: 'string', description: 'e.g. +8613800000000' }),
    defineField({ name: 'contactEmail', type: 'string' }),
    defineField({
      name: 'address', type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ru', type: 'string', title: 'Russian' },
      ],
    }),
    defineField({
      name: 'socialLinks', type: 'object',
      fields: [
        { name: 'linkedin', type: 'url' },
        { name: 'youtube', type: 'url' },
        { name: 'alibaba', type: 'url' },
      ],
    }),
  ],
})
```

**`sanity/schemas/index.ts`**
```ts
import { productSchema } from './product'
import { productSeriesSchema } from './productSeries'
import { certificateSchema } from './certificate'
import { siteSettingsSchema } from './siteSettings'

export const schemaTypes = [productSchema, productSeriesSchema, certificateSchema, siteSettingsSchema]
```

**`sanity/sanity.config.ts`**
```ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'solar-street-lights',
  title: 'Solar Street Lights CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
```

**`sanity/sanity.cli.ts`**
```ts
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  },
})
```

After writing all files, run:
```bash
npx tsc --noEmit
```
Fix any type errors. Then commit:
```bash
git add -A
git commit -m "feat: Sanity v3 schemas for product, series, certificate, siteSettings"
```

### Report contract
Write your full report to: `C:/Users/24960/claudework/solarlight/.superpowers/sdd/2026-08-16-solar-street-light-website/task-2-report.md`

Return ONLY: Status, commit hash, one-line build summary, concerns if any.

### No subagents
Do not dispatch any subagents or reviewers.
