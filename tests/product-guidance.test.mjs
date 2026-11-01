import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { loadTypeScript } from './load-typescript.mjs'

const { productHighlights, runtimeGuidance, sharedImageNote } = loadTypeScript('../lib/product-guidance.ts')
const products = JSON.parse(readFileSync(new URL('../content/products/index.json', import.meta.url), 'utf8'))
const find = (slug) => products.find((product) => product.slug.current === slug)

test('Kmini protection and Falcon optional PIR remain model-specific in both languages', () => {
  for (const locale of ['en', 'ru']) {
    const kmini = productHighlights(find('kmini-rural-20w').specs, locale)
    assert.ok(kmini.some((item) => item.value === 'IP65'))
    assert.ok(!JSON.stringify(kmini).includes('IP66'))
    const falcon = productHighlights(find('falcon-pro-60w').specs, locale)
    assert.ok(falcon.some((item) => item.value === 'Optional PIR'))
  }
})

test('an unspecified controller or sensor is not added to the source-backed configuration', () => {
  for (const locale of ['en', 'ru']) {
    const items = productHighlights(find('classic-split-8m-60w').specs, locale)
    assert.ok(!JSON.stringify(items).match(/MPPT|PIR|100,000|99%/))
  }
})

test('all three legacy 192 Wh configurations explain the 3.2 hour full-power limit', () => {
  for (const slug of ['classic-split-6m-60w', 'classic-split-8m-60w', 'wall-pole-mount-60w']) {
    const specs = find(slug).specs
    assert.match(runtimeGuidance(specs, 'en'), /192 Wh ÷ 60 W ≈ 3\.2 h/)
    assert.match(runtimeGuidance(specs, 'ru'), /192 Вт·ч ÷ 60 Вт ≈ 3\.2 ч/)
  }
  assert.match(runtimeGuidance(find('falcon-pro-60w').specs, 'en'), /512 Wh ÷ 60 W ≈ 8\.5 h/)
})

test('shared-image notices are limited to actual shared images or supplied photo notes', () => {
  assert.match(sharedImageNote(find('leaf-aio-30w'), products, 'en'), /shared by several models/)
  assert.match(sharedImageNote(find('nova-industrial-100w'), products, 'ru'), /Общий пример/)
  assert.equal(sharedImageNote(find('falcon-pro-60w'), products, 'en'), null)
  assert.equal(sharedImageNote({ ...find('falcon-pro-60w'), imageNote: { en: 'Supplied reference', ru: 'Пример' } }, products, 'ru'), 'Пример')
})
