export interface ImageUrlResult {
  url(): string
  width(w: number): ImageUrlResult
  height(h: number): ImageUrlResult
}

function makeResult(src: string): ImageUrlResult {
  const result: ImageUrlResult = {
    url: () => src,
    width: (_w: number) => result,
    height: (_h: number) => result,
  }
  return result
}

export function urlFor(source: unknown): ImageUrlResult {
  if (typeof source === 'string') {
    return makeResult(source)
  }
  if (source && typeof source === 'object' && 'asset' in source) {
    const asset = (source as any).asset
    if (typeof asset === 'string') {
      return makeResult(asset)
    }
    if (asset && typeof asset === 'object' && 'url' in asset) {
      return makeResult(asset.url)
    }
  }
  return makeResult('/placeholder.jpg')
}
