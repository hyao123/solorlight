# Source Content Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three source-backed bilingual solar-light products, their real images and detailed specifications, plus a localized catalogue-style design showcase to the existing website.

**Architecture:** Treat the supplied PDF and Excel files as one-time authoring inputs. Commit verified facts into the existing product JSON/type model and extracted media into `public/`; render optional extended specifications through the current product-detail component and render curated PDF page previews through one new server component on the products page.

**Tech Stack:** Next.js 16.3 App Router, React 19, TypeScript, next-intl, Tailwind CSS, Node.js built-in test runner, openpyxl, pypdfium2, Pillow.

## Global Constraints

- Customer-facing content remains English and Russian; Chinese remains source-only.
- The three Excel files are authoritative for the three new products; the PDF supplies visual catalogue references only.
- Do not publish empty price rows or unsupported price, warranty, certification, brand, or performance claims.
- Keep every new product-specification field optional so existing product records remain valid.
- Preserve source aspect ratios, use local assets, and do not alter technical details in imagery.
- Keep the current dark industrial styling and existing WhatsApp/RFQ paths.
- Read `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md`, `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`, and `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md` before implementation.

---

### Task 1: Source-backed products and asset extraction

**Files:**
- Create: `tests/source-content.test.mjs`
- Create: `public/images/products/wall-pole-mount-60w-*.png`
- Create: `public/images/products/classic-split-installation-*.png`
- Modify: `content/products/index.json`
- Modify: `types/product.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: Existing `Product` JSON shape and `ProductSpecs` TypeScript interface.
- Produces: Product slugs `wall-pole-mount-60w`, `classic-split-6m-60w`, and `classic-split-8m-60w`; optional extended specification keys used by Task 2.

- [ ] **Step 1: Add the failing content contract test**

Create a Node test that loads `content/products/index.json`, locates all three slugs, verifies both locales, series assignments, hot-product flags, local images, and source-backed values:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'

const products = JSON.parse(await readFile(new URL('../content/products/index.json', import.meta.url), 'utf8'))
const bySlug = (slug) => products.find((product) => product.slug.current === slug)

test('source-backed products preserve verified Excel specifications', () => {
  const wall = bySlug('wall-pole-mount-60w')
  const six = bySlug('classic-split-6m-60w')
  const eight = bySlug('classic-split-8m-60w')

  assert.equal(wall.name.en, 'Wall & Pole-Mount Solar Street Light 60W')
  assert.equal(wall.name.ru, 'Настенный солнечный светильник 60 Вт с креплением на опору')
  assert.equal(wall.series, 'series-rural')
  assert.equal(wall.isHotProduct, false)
  assert.equal(wall.specs.panelDimensions, '600 × 670 × 25 mm')
  assert.equal(wall.specs.arm, '1,200 mm · Q235 hot-dip galvanized steel · Ø50 × 1.3 mm')

  assert.equal(six.series, 'series-community')
  assert.equal(six.isHotProduct, true)
  assert.equal(six.specs.mountHeight, '6 m overall · 5.7 m pole')
  assert.equal(six.specs.flange, '250 × 250 × 10 mm')
  assert.equal(six.specs.foundation, '260 mm diagonal · M16 bolts · ≥400 mm height')

  assert.equal(eight.series, 'series-road')
  assert.equal(eight.isHotProduct, true)
  assert.equal(eight.specs.mountHeight, '8 m overall · 7.7 m pole')
  assert.equal(eight.specs.flange, '270 × 270 × 10 mm')
  assert.equal(eight.specs.foundation, '280 mm diagonal · M18 bolts · ≥500 mm height')
})

test('source-backed product images exist locally', async () => {
  for (const slug of ['wall-pole-mount-60w', 'classic-split-6m-60w', 'classic-split-8m-60w']) {
    const product = bySlug(slug)
    assert.ok(product.images.length >= 2)
    for (const image of product.images) await access(new URL(`../public${image}`, import.meta.url))
  }
})
```

- [ ] **Step 2: Register and run the test to verify RED**

Add `"test": "node --test tests/*.test.mjs"` to `package.json`, then run:

```powershell
npm test
```

Expected: FAIL because the three slugs do not exist.

- [ ] **Step 3: Extract unique Excel images at native resolution**

Use openpyxl to write each embedded image to its final descriptive path. Preserve PNG/JPEG bytes, skip the two bracket-only images for product galleries, and deduplicate the repeated 6 m/8 m reference images by content hash before assigning them to products. Expected assignments:

```text
wall-pole-mount-60w: four installed-light views
classic-split-6m-60w: rural-road, field-road, and park-road views
classic-split-8m-60w: field-road, rural-road, and park-road views
```

- [ ] **Step 4: Extend the optional specification interface**

Add these optional string properties to `ProductSpecs`:

```ts
efficacy?: string
panelDimensions?: string
panelEfficiency?: string
ledLifetime?: string
batteryCycles?: string
autonomy?: string
nightlyRuntime?: string
poleConstruction?: string
arm?: string
flange?: string
foundation?: string
installationNote?: string
```

- [ ] **Step 5: Add the three complete bilingual product records**

Insert the 8 m product after Falcon 90 W and the 6 m product before the first community product so both appear in the homepage’s first six hot products. Insert the wall/pole product before existing rural products so it appears in the solutions recommendation slice. Use these common verified values:

```json
{
  "power": "60 W",
  "lumens": "6,000–7,200 lm",
  "cct": "5700–6000 K",
  "ipRating": "IP65 luminaire · IP67 battery",
  "battery": "3.2 V / 60 Ah LiFePO4",
  "batteryCycles": "≥2,000 cycles",
  "autonomy": "5–7 rainy days",
  "nightlyRuntime": "8–10 hours",
  "ledLifetime": "30,000 hours (stated)",
  "efficacy": "100–120 lm/W"
}
```

Use `60 W · 6 V monocrystalline · 19–21%` plus the 600 mm panel for the wall product, and `80 W · 6 V monocrystalline · 19–21%` plus the 800 mm panel for both pole products. Use no certificate IDs because the source sheets do not identify certificates.

- [ ] **Step 6: Run the focused test to verify GREEN**

```powershell
npm test
```

Expected: 2 tests pass.

- [ ] **Step 7: Commit Task 1**

```powershell
git add package.json package-lock.json tests/source-content.test.mjs types/product.ts content/products/index.json public/images/products
git commit -m "feat: add source-backed solar light products"
```

---

### Task 2: Extended bilingual specification presentation

**Files:**
- Modify: `tests/source-content.test.mjs`
- Modify: `components/ProductSpecs.tsx`

**Interfaces:**
- Consumes: Optional fields added to `ProductSpecs` in Task 1.
- Produces: A grouped, bilingual technical specification renderer for electrical and construction/installation facts.

- [ ] **Step 1: Add a failing source contract test for localized labels**

```js
test('extended specifications provide English and Russian labels', async () => {
  const source = await readFile(new URL('../components/ProductSpecs.tsx', import.meta.url), 'utf8')
  for (const text of [
    'Panel Dimensions', 'Размеры панели',
    'Pole Construction', 'Конструкция опоры',
    'Foundation Cage', 'Закладная деталь',
    'Rainy-Day Autonomy', 'Автономность в пасмурные дни',
  ]) assert.match(source, new RegExp(text))
})
```

- [ ] **Step 2: Run the test to verify RED**

Run `npm test`. Expected: FAIL because the labels are absent.

- [ ] **Step 3: Add all extended rows to `SPEC_GROUPS`**

Use exact bilingual labels and place electrical facts before structural facts:

```ts
{ key: 'efficacy', en: 'Luminous Efficacy', ru: 'Световая отдача', icon: '◉' },
{ key: 'panelDimensions', en: 'Panel Dimensions', ru: 'Размеры панели', icon: '▦' },
{ key: 'panelEfficiency', en: 'Panel Efficiency', ru: 'Эффективность панели', icon: '☀️' },
{ key: 'ledLifetime', en: 'Stated LED Lifetime', ru: 'Заявленный срок службы LED', icon: '◷' },
{ key: 'batteryCycles', en: 'Battery Cycle Life', ru: 'Ресурс аккумулятора', icon: '↻' },
{ key: 'autonomy', en: 'Rainy-Day Autonomy', ru: 'Автономность в пасмурные дни', icon: '☂' },
{ key: 'nightlyRuntime', en: 'Nightly Runtime', ru: 'Работа за ночь', icon: '☾' },
{ key: 'poleConstruction', en: 'Pole Construction', ru: 'Конструкция опоры', icon: '│' },
{ key: 'arm', en: 'Mounting Arm', ru: 'Кронштейн', icon: '⌁' },
{ key: 'flange', en: 'Base Flange', ru: 'Опорный фланец', icon: '□' },
{ key: 'foundation', en: 'Foundation Cage', ru: 'Закладная деталь', icon: '⌗' },
{ key: 'installationNote', en: 'Foundation Note', ru: 'Примечание по фундаменту', icon: 'ℹ' },
```

Keep the table responsive by changing the label cell to `w-40 sm:w-56` and allowing long values to wrap.

- [ ] **Step 4: Run the test to verify GREEN**

Run `npm test`. Expected: 3 tests pass.

- [ ] **Step 5: Commit Task 2**

```powershell
git add tests/source-content.test.mjs components/ProductSpecs.tsx
git commit -m "feat: display installation specifications"
```

---

### Task 3: Curated catalogue design showcase

**Files:**
- Create: `components/CatalogueShowcase.tsx`
- Create: `public/images/catalogue/road-light-options.jpg`
- Create: `public/images/catalogue/decorative-light-options.jpg`
- Create: `public/images/catalogue/landscape-light-options.jpg`
- Modify: `tests/source-content.test.mjs`
- Modify: `app/[locale]/products/page.tsx`

**Interfaces:**
- Consumes: `locale: 'en' | 'ru'` and three static rendered PDF page previews.
- Produces: `CatalogueShowcase({ locale })`, a server component placed beneath the product filter.

- [ ] **Step 1: Add a failing showcase contract test**

```js
test('products page includes a localized catalogue showcase', async () => {
  const component = await readFile(new URL('../components/CatalogueShowcase.tsx', import.meta.url), 'utf8')
  const page = await readFile(new URL('../app/[locale]/products/page.tsx', import.meta.url), 'utf8')
  assert.match(component, /Pole & design options/)
  assert.match(component, /Варианты опор и дизайна/)
  assert.match(component, /road-light-options\.jpg/)
  assert.match(page, /<CatalogueShowcase locale={locale} \/>/)
})
```

- [ ] **Step 2: Run the test to verify RED**

Run `npm test`. Expected: FAIL because the component is missing.

- [ ] **Step 3: Render three curated PDF pages**

Use pypdfium2 at a scale that yields approximately 1200 px page width. Render one modern road-light page from pages 4–10, page 12 for decorative/garden forms, and page 20 for landscape/courtyard forms. Save as optimized JPEG (quality 84–88) under `public/images/catalogue/`.

- [ ] **Step 4: Implement the showcase component**

Create a semantic section with localized copy, three image cards, and a contact CTA. The content model is:

```ts
const items = [
  { image: '/images/catalogue/road-light-options.jpg', en: 'Road & avenue configurations', ru: 'Конфигурации для дорог и проспектов' },
  { image: '/images/catalogue/decorative-light-options.jpg', en: 'Decorative park lighting', ru: 'Декоративное освещение парков' },
  { image: '/images/catalogue/landscape-light-options.jpg', en: 'Landscape & courtyard forms', ru: 'Ландшафтные и дворовые решения' },
]
```

Use `next/image`, a dark slate panel, restrained yellow rule accents, one hover zoom per image, visible focus styles, and a localized link to `/${locale}/contact`. Heading: `Pole & design options` / `Варианты опор и дизайна`. Supporting copy must explain that pole form, arm, luminaire, panel, and finish can be matched to project requirements without claiming that every pictured combination is stocked.

- [ ] **Step 5: Place the component below the product filter**

Import `CatalogueShowcase` in `app/[locale]/products/page.tsx`, close the current content container after `ProductsFilter`, and render the showcase as the next full-width section.

- [ ] **Step 6: Run the test to verify GREEN**

Run `npm test`. Expected: 4 tests pass.

- [ ] **Step 7: Commit Task 3**

```powershell
git add tests/source-content.test.mjs components/CatalogueShowcase.tsx app/[locale]/products/page.tsx public/images/catalogue
git commit -m "feat: add localized catalogue showcase"
```

---

### Task 4: Full verification and visual critique

**Files:**
- Modify only files required to fix issues found by verification.

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces: A production-buildable bilingual website with working product discovery, details, images, and inquiry links.

- [ ] **Step 1: Re-read local Next.js 16 documentation and inspect the final diff**

Run:

```powershell
Get-Content -Raw node_modules/next/dist/docs/01-app/01-getting-started/12-images.md
Get-Content -Raw node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md
Get-Content -Raw node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md
git diff HEAD~3 --check
git diff HEAD~3 --stat
```

Expected: no whitespace errors and only planned files changed.

- [ ] **Step 2: Run all automated verification**

```powershell
npm test
npm run lint
npm run build
```

Expected: all content tests pass, ESLint reports no errors, and the production build exits 0 with static English/Russian routes for all three new slugs.

- [ ] **Step 3: Start the site and inspect desktop/mobile English and Russian routes**

Inspect at minimum:

```text
/en
/ru
/en/products
/ru/products
/en/products/wall-pole-mount-60w
/ru/products/classic-split-6m-60w
/en/products/classic-split-8m-60w
/en/solutions
/ru/solutions
```

Verify responsive image loading, localized labels, readable long specification values, product filtering, related-series links, catalogue CTA, keyboard focus, WhatsApp/RFQ actions, and no horizontal overflow at 390 px.

- [ ] **Step 4: Apply the frontend-design critique**

Keep one signature treatment: the catalogue showcase’s technical yellow rule and asymmetric image crops. Remove any additional decorative element that competes with it. Respect `prefers-reduced-motion` through the existing transition-only motion and confirm focus states remain visible.

- [ ] **Step 5: Re-run fresh verification after any fixes**

Run `npm test`, `npm run lint`, and `npm run build` again. Expected: all commands exit 0.

- [ ] **Step 6: Commit verification fixes if any**

```powershell
git add components/ProductSpecs.tsx components/CatalogueShowcase.tsx app/[locale]/products/page.tsx content/products/index.json types/product.ts tests/source-content.test.mjs public/images/products public/images/catalogue package.json package-lock.json
git commit -m "fix: polish source content integration"
```

If no files changed, do not create an empty commit.
