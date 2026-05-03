import { get_image, init_cache } from "../utils/image-cache.ts"
import { readFile } from "fs/promises"
import { resolve } from "path"

const char_w = 120
const char_h = 150

export async function cache() {
  await init_cache()

  const raw = await readFile(resolve(process.cwd(), "data/letters.json"), "utf-8")
  const dataset: Record<string, { url?: string; path?: string }[]> = JSON.parse(raw)

  const all = Object.values(dataset).flat()
  const urls = all.map(v => v.url || v.path).filter(Boolean) as string[]
  const missing = urls.filter(u => u.startsWith("http"))

  if (!missing.length) return

  console.log(`caching ${missing.length} images...`)

  let done = 0
  await Promise.all(
    missing.map(async (url) => {
      await get_image(url, char_w, char_h)
      process.stdout.write(`\r${++done}/${missing.length}`)
    })
  )

  console.log("\ndone")
}
