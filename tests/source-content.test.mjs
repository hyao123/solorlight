import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'

const products = JSON.parse(await readFile(new URL('../content/products/index.json', import.meta.url), 'utf8'))
const bySlug = (slug) => products.find((product) => product.slug.current === slug)

test('source-backed products preserve verified Excel specifications', () => {
  const wall = bySlug('wall-pole-mount-60w')
  const six = bySlug('classic-split-6m-60w')
  const eight = bySlug('classic-split-8m-60w')

  assert.equal(wall?.name.en, 'Wall & Pole-Mount Solar Street Light 60W')
  assert.equal(wall?.name.ru, 'Настенный солнечный светильник 60 Вт с креплением на опору')
  assert.equal(wall?.series, 'series-rural')
  assert.equal(wall?.isHotProduct, false)
  assert.equal(wall?.specs.panelDimensions, '600 × 670 × 25 mm')
  assert.equal(wall?.specs.arm.en, '1,200 mm · Q235 hot-dip galvanized steel · Ø50 × 1.3 mm')
  assert.equal(wall?.specs.arm.ru, '1 200 мм · горячее цинкование Q235 · Ø50 × 1,3 мм')

  assert.equal(six?.series, 'series-community')
  assert.equal(six?.isHotProduct, true)
  assert.equal(six?.specs.mountHeight, '6 m')
  assert.equal(six?.specs.flange, '250 × 250 × 10 mm')
  assert.equal(six?.specs.foundation.ru, 'Диагональ 260 мм · болты M16 · высота ≥400 мм')

  assert.equal(eight?.series, 'series-road')
  assert.equal(eight?.isHotProduct, true)
  assert.equal(eight?.specs.mountHeight, '8 m')
  assert.equal(eight?.specs.flange, '270 × 270 × 10 mm')
  assert.equal(eight?.specs.foundation.en, '280 mm diagonal · M18 bolts · ≥500 mm height')
  assert.equal(eight?.specs.foundation.ru, 'Диагональ 280 мм · болты M18 · высота ≥500 мм')

  for (const product of [wall, six, eight]) {
    assert.doesNotMatch(product.seoDescription.en, /source-backed/i)
  }
})

test('source-backed product images exist locally', async () => {
  for (const slug of ['wall-pole-mount-60w', 'classic-split-6m-60w', 'classic-split-8m-60w']) {
    const product = bySlug(slug)
    assert.ok(product?.images.length >= 2)
    for (const image of product.images) {
      await access(new URL(`../public${image}`, import.meta.url))
    }
  }
})

test('extended specifications provide English and Russian labels', async () => {
  const source = await readFile(new URL('../components/ProductSpecs.tsx', import.meta.url), 'utf8')
  for (const text of [
    'Panel Dimensions', 'Размеры панели',
    'Pole Construction', 'Конструкция опоры',
    'Foundation Cage', 'Закладная деталь',
    'Rainy-Day Autonomy', 'Автономность в пасмурные дни',
    'Construction & Installation', 'Конструкция и монтаж',
  ]) {
    assert.match(source, new RegExp(text))
  }
  assert.match(source, /value\[locale\]/)
  assert.match(source, /sm:hidden/)
  assert.match(source, /hidden w-full text-sm sm:table/)
})

test('products page includes a localized catalogue showcase', async () => {
  const componentUrl = new URL('../components/CatalogueShowcase.tsx', import.meta.url)
  await assert.doesNotReject(() => access(componentUrl))
  const component = await readFile(componentUrl, 'utf8')
  const page = await readFile(new URL('../app/[locale]/products/page.tsx', import.meta.url), 'utf8')
  assert.match(component, /Pole & design options/)
  assert.match(component, /Варианты опор и дизайна/)
  assert.match(component, /road-light-options\.jpg/)
  assert.match(page, /<CatalogueShowcase locale={locale} \/>/)
})

test('unsupported generic claims are hidden for uncertified source products', async () => {
  const detail = await readFile(new URL('../app/[locale]/products/[slug]/page.tsx', import.meta.url), 'utf8')
  const card = await readFile(new URL('../components/ProductCard.tsx', import.meta.url), 'utf8')
  assert.match(detail, /product\.certificates\.length > 0 && \(\s*<div className="mt-10/)
  assert.match(card, /product\.certificates\.length > 0 && \(\s*<div className="flex items-center/)
})

test('quote modal is mounted only after its trigger opens it', async () => {
  const componentFiles = [
    '../components/Header.tsx',
    '../components/FloatingInquiryWidget.tsx',
    '../components/ProductActionButtons.tsx',
  ]

  for (const file of componentFiles) {
    const source = await readFile(new URL(file, import.meta.url), 'utf8')
    assert.match(source, /(?:quoteOpen|isQuoteModalOpen) && \(\s*<QuoteModal/)
  }
})
