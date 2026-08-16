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
  if (typeof source === 'string') return makeResult(source)
  return makeResult('/placeholder.jpg')
}
