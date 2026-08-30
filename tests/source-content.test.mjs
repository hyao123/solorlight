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
  assert.equal(wall?.specs.arm, '1,200 mm · Q235 hot-dip galvanized steel · Ø50 × 1.3 mm')

  assert.equal(six?.series, 'series-community')
  assert.equal(six?.isHotProduct, true)
  assert.equal(six?.specs.mountHeight, '6 m overall · 5.7 m pole')
  assert.equal(six?.specs.flange, '250 × 250 × 10 mm')
  assert.equal(six?.specs.foundation, '260 mm diagonal · M16 bolts · ≥400 mm height')

  assert.equal(eight?.series, 'series-road')
  assert.equal(eight?.isHotProduct, true)
  assert.equal(eight?.specs.mountHeight, '8 m overall · 7.7 m pole')
  assert.equal(eight?.specs.flange, '270 × 270 × 10 mm')
  assert.equal(eight?.specs.foundation, '280 mm diagonal · M18 bolts · ≥500 mm height')
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
