const STANDARD_WATTS = [20, 30, 40, 60, 90, 100, 120, 150]
const LUMENS_PER_WATT = 160
const UTILIZATION_FACTOR = 0.55

// Preliminary single-pole estimate; final spacing and optics require a lighting study.
export function calculateSolarSizing(roadWidth: number, poleHeight: number, targetLux: number, autonomyDays: number) {
  const poleSpacing = Math.round(poleHeight * 3.2)
  const areaPerPole = roadWidth * poleSpacing
  const requiredWatts = (areaPerPole * targetLux) / (LUMENS_PER_WATT * UTILIZATION_FACTOR)
  const matchingWatts = STANDARD_WATTS.find((watts) => watts >= requiredWatts)
  const recommendedWatts = matchingWatts ?? STANDARD_WATTS[STANDARD_WATTS.length - 1]
  const estimatedLumens = recommendedWatts * LUMENS_PER_WATT
  const estimatedLux = Math.round((estimatedLumens * UTILIZATION_FACTOR) / areaPerPole)
  const dailyWattHours = Math.round(recommendedWatts * 12 * 0.7)
  const batteryWh = Math.round((dailyWattHours * autonomyDays) / 0.85)

  return {
    poleSpacing, recommendedWatts, estimatedLumens, estimatedLux,
    requiresCustomDesign: matchingWatts === undefined,
    batteryWh,
    batteryAh12v: Math.round(batteryWh / 12.8),
    solarPanelWatts: Math.round((dailyWattHours * 1.35) / 4.2),
  }
}
