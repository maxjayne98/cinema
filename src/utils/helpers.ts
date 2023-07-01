import type { Image } from '@/models/types'

export function extractTextFromHtmlNode(summary: string) {
  const node = document.createElement('span')
  node.innerHTML = summary
  return node.textContent || node.innerText
}

export function findResolution(images: Array<Image>, target: { height: number; width: number }) {
  return images.find(
    (image) =>
      image.resolutions['original'].height === target.height &&
      image.resolutions['original'].width === target.width
  )
}
