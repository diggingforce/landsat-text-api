import sharp from "sharp"
import { mkdir, readFile, writeFile, access } from "fs/promises"
import { resolve } from "path"

const disk_dir = resolve(process.cwd(), "data/img-cache")
const mem = new Map<string, Buffer>()

export async function init_cache() {
  await mkdir(disk_dir, { recursive: true })
}

async function disk_has(filename: string) {
  try { await access(resolve(disk_dir, filename)); return true } catch { return false }
}

export async function get_image(url: string, w: number, h: number): Promise<Buffer | null> {
  if (mem.has(url)) return mem.get(url)!

  const filename = url.split("/").pop()!.split("?")[0]
  const disk_path = resolve(disk_dir, filename)

  let raw: Buffer

  if (await disk_has(filename)) {
    raw = await readFile(disk_path)
  } else {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    let res: Response
    try {
      res = await fetch(url, { signal: controller.signal })
    } finally {
      clearTimeout(timeout)
    }
    if (!res.ok) {
      if (res.status !== 404) console.warn(`[img] ${url} → ${res.status}`)
      return null
    }
    raw = Buffer.from(await res.arrayBuffer())
    await writeFile(disk_path, raw)
  }

  const buf = await sharp(raw)
    .resize(w, h, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .toBuffer()

  mem.set(url, buf)
  return buf
}
