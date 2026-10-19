import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { loadTypeScript } from './load-typescript.mjs'

const { ProductJsonLd, JsonLd } = loadTypeScript('../components/StructuredData.tsx')
const products = JSON.parse(readFileSync(new URL('../content/products/index.json', import.meta.url), 'utf8'))

function schemaFor(slug, extra = {}) {
  const product = products.find((item) => item.slug.current === slug)
  const html = renderToStaticMarkup(ProductJsonLd({
    name: product.name.en, description: product.seoDescription.en,
    images: product.images, sku: slug, url: `https://example.com/en/products/${slug}`,
    specs: product.specs, certificates: [], ...extra,
  }))
  return JSON.parse(html.match(/<script[^>]*>([\s\S]*)<\/script>/)[1])
}

test('source products do not gain unsupported certifications, warranty or zero-price offers', () => {
  const schema = schemaFor('classic-split-8m-60w')
  assert.equal(schema.offers, undefined)
  for (const name of ['Certifications', 'Warranty', 'Impact Resistance', 'Operating Temperature']) {
    assert.equal(schema.additionalProperty.find((item) => item.name === name), undefined, name)
  }
})

test('luminous flux preserves source units and ranges', () => {
  for (const [slug, expected] of [['classic-split-8m-60w', '6,000–7,200 lm'], ['falcon-pro-60w', '9,600 lm']]) {
    const schema = schemaFor(slug)
    assert.equal(schema.additionalProperty.find((item) => item.name === 'Luminous Flux').value, expected)
  }
})

test('product images and manufacturer resolve against the configured site', () => {
  const schema = schemaFor('classic-split-8m-60w', { certificates: ['CE', 'RoHS'] })
  assert.ok(schema.image.every((url) => url.startsWith('https://example.com/')))
  assert.equal(schema.manufacturer.url, 'https://example.com')
  assert.equal(schema.additionalProperty.find((item) => item.name === 'Certifications').value, 'CE, RoHS')
})

test('JSON-LD cannot terminate its script through content', () => {
  const html = renderToStaticMarkup(JsonLd({ data: { name: '</script><script>alert(1)</script>' } }))
  assert.equal((html.match(/<script/g) || []).length, 1)
  assert.ok(html.includes('\\u003c/script>'))
})
