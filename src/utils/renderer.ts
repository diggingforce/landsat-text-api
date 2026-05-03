import sharp from "sharp"
import { get_image } from "./image-cache.ts"
import type { LetterVariant } from "../types/index.ts"

const char_width = 120
const char_height = 150
const default_height = 150
const letter_gap = -50
const padding = 5

export interface render_name_options {
  text: string
  variants: Map<string, LetterVariant[]>
  height?: number
}

export async function render_name_image(options: render_name_options): Promise<Buffer> {
  const { text, variants, height = default_height } = options

  const letters = (text || "").toUpperCase().replace(/[^A-Z]/g, "").split("")
  if (!letters.length) return make_placeholder(char_width, height)

  const step = char_width + letter_gap
  const canvas_w = (letters.length - 1) * step + char_width + padding * 2

  const results = await Promise.all(
    letters.map(async (ch, i) => {
      const letter_vars = variants.get(ch)
      if (!letter_vars?.length) return null

      const chosen = pick_variant(letter_vars, text + i)
      const url = chosen.url || chosen.path
      if (!url) return null

      const buf = await get_image(url, char_width, char_height)
      return buf ? { input: buf, left: padding + i * step, top: 0 } : null
    })
  )

  const layers = results.filter(Boolean) as sharp.OverlayOptions[]

  return sharp({
    create: { width: canvas_w, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite(layers)
    .png()
    .toBuffer()
}

function pick_variant(variants: LetterVariant[], seed: string): LetterVariant {
  return variants[hash_it(seed) % variants.length]
}

function hash_it(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = Math.imul(31, h) + str.charCodeAt(i) | 0
  return Math.abs(h)
}

async function make_placeholder(width: number, height: number): Promise<Buffer> {
  return sharp({ create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .png().toBuffer()
}
