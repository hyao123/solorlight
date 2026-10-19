import test from 'node:test'
import assert from 'node:assert/strict'
import { loadTypeScript } from './load-typescript.mjs'

const { calculateSolarSizing } = loadTypeScript('../lib/solar-sizing.ts')

test('road sizing selects a power tier that meets the target instead of rounding down', () => {
  const result = calculateSolarSizing(8, 9, 25, 3)
  assert.equal(result.recommendedWatts, 90)
  assert.ok(result.estimatedLux >= 25)
  assert.equal(result.requiresCustomDesign, false)
})

test('oversized projects are flagged instead of promising the capped power meets the target', () => {
  const result = calculateSolarSizing(24, 16, 25, 3)
  assert.equal(result.recommendedWatts, 150)
  assert.ok(result.estimatedLux < 25)
  assert.equal(result.requiresCustomDesign, true)
})

test('autonomy changes battery size without changing the lighting or daily panel load', () => {
  const two = calculateSolarSizing(6, 6, 15, 2)
  const four = calculateSolarSizing(6, 6, 15, 4)
  assert.ok(Math.abs(four.batteryWh - two.batteryWh * 2) <= 1)
  assert.equal(four.solarPanelWatts, two.solarPanelWatts)
  assert.equal(four.recommendedWatts, two.recommendedWatts)
})

test('supported slider combinations either meet the target or request a custom design', () => {
  for (const lux of [8, 15, 25, 35]) {
    for (let width = 3; width <= 24; width++) {
      for (let height = 4; height <= 16; height++) {
        const result = calculateSolarSizing(width, height, lux, 3)
        assert.ok(result.requiresCustomDesign || result.estimatedLux >= lux)
      }
    }
  }
})
