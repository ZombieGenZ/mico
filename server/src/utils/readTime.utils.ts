export function readingTimeLabel(html: string, options?: { wpm?: number; imageCount?: number }): string {
  const WPM = options?.wpm ?? 220
  const words = countWordsFromHTML(html)
  const imgSec = imageReadingSeconds(options?.imageCount ?? countImages(html))

  const seconds = Math.ceil((words / WPM) * 60 + imgSec)

  if (seconds < 60) {
    return `${seconds} giây đọc`
  }

  const minutes = Math.ceil(seconds / 60)
  return `${minutes} phút đọc`
}

function countWordsFromHTML(html: string) {
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const tokens = cleaned.match(/[\p{L}\p{N}]+/gu)
  return tokens ? tokens.length : 0
}

function countImages(html: string) {
  const matches = html.match(/<img\b[^>]*>/gi)
  return matches ? matches.length : 0
}

function imageReadingSeconds(imageCount: number) {
  let seconds = 0
  for (let i = 0; i < imageCount; i++) {
    seconds += Math.max(12 - i, 3)
  }
  return seconds
}
