// Optimize all JPEG images under /public/assets/{hero,ventures,conocimiento}
// Reduces file size aggressively (1920px max, mozjpeg quality 78) while
// keeping visual quality acceptable for full-bleed hero usage.
//
// Usage: node scripts/optimize-images.mjs

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC = path.resolve(__dirname, '..', 'public', 'assets')

const TARGETS = [
  { dir: 'hero', maxWidth: 1920, quality: 78 },
  { dir: 'ventures', maxWidth: 1920, quality: 78 },
  { dir: 'conocimiento', maxWidth: 1400, quality: 80 },
]

async function optimizeOne(filePath, maxWidth, quality) {
  const buf = await fs.readFile(filePath)
  const before = buf.length

  const image = sharp(buf, { failOn: 'none' }).rotate()
  const meta = await image.metadata()
  const targetWidth = Math.min(meta.width || maxWidth, maxWidth)

  const out = await image
    .resize({ width: targetWidth, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true, progressive: true })
    .toBuffer()

  await fs.writeFile(filePath, out)
  return { before, after: out.length }
}

async function run() {
  let totalBefore = 0
  let totalAfter = 0
  let count = 0

  for (const target of TARGETS) {
    const dir = path.join(PUBLIC, target.dir)
    let files
    try {
      files = (await fs.readdir(dir)).filter((f) => /\.(jpe?g)$/i.test(f))
    } catch {
      console.log(`(skipping ${target.dir} — directory missing)`)
      continue
    }
    console.log(`\n• ${target.dir}/ (${files.length} files, max ${target.maxWidth}px @ q${target.quality})`)
    for (const f of files) {
      const p = path.join(dir, f)
      const { before, after } = await optimizeOne(p, target.maxWidth, target.quality)
      totalBefore += before
      totalAfter += after
      count++
      const pct = ((1 - after / before) * 100).toFixed(0)
      console.log(`  ${f.padEnd(35)} ${(before / 1024 / 1024).toFixed(2)} MB → ${(after / 1024 / 1024).toFixed(2)} MB  (-${pct}%)`)
    }
  }

  const totalPct = ((1 - totalAfter / totalBefore) * 100).toFixed(0)
  console.log(
    `\n✓ Optimized ${count} files: ${(totalBefore / 1024 / 1024).toFixed(1)} MB → ${(totalAfter / 1024 / 1024).toFixed(1)} MB (-${totalPct}%)`
  )
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
