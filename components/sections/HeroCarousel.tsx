'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const PHOTOS = Array.from(
  { length: 22 },
  (_, i) => `/assets/hero/hero-${String(i + 1).padStart(2, '0')}.jpg`
)

const COLS = 5
const ROWS = 3
const CELL_COUNT = COLS * ROWS

// Probability of a tile being black, per column. Left columns are more likely
// black so the headline area stays calm; right columns lean toward photos.
const BLACK_PROB_PER_COL = [0.7, 0.55, 0.4, 0.25, 0.1]

// Tempo: every TICK_MS we update only 1-2 random tiles instead of the whole
// grid. This reads as ambient breathing rather than a strobe. Each individual
// tile changes on average every ~9-10s, while the overall mosaic always feels
// subtly alive.
const TICK_MS = 1200
const TILES_PER_TICK = () => (Math.random() < 0.65 ? 1 : 2)
const FADE_S = 0.7

type Cell = { isBlack: boolean; photo: number }

/**
 * Deterministic seed for SSR — no randomness so server and first client
 * paint match. Once mounted, the layout starts shuffling every TICK_MS.
 */
const SEED_LAYOUT: Cell[] = [
  { isBlack: true,  photo: 0 },
  { isBlack: false, photo: 0 },
  { isBlack: true,  photo: 1 },
  { isBlack: false, photo: 1 },
  { isBlack: false, photo: 2 },
  { isBlack: true,  photo: 2 },
  { isBlack: true,  photo: 3 },
  { isBlack: false, photo: 3 },
  { isBlack: true,  photo: 4 },
  { isBlack: false, photo: 4 },
  { isBlack: false, photo: 5 },
  { isBlack: true,  photo: 5 },
  { isBlack: false, photo: 6 },
  { isBlack: false, photo: 7 },
  { isBlack: false, photo: 8 },
]

function makeCell(colIdx: number, photoCursor: { current: number }): Cell {
  const isBlack = Math.random() < BLACK_PROB_PER_COL[colIdx]
  const photo = isBlack ? 0 : photoCursor.current++ % PHOTOS.length
  return { isBlack, photo }
}

/** Pick `n` distinct random cell indices in [0, CELL_COUNT). */
function pickIndices(n: number): number[] {
  const picked = new Set<number>()
  while (picked.size < n) picked.add(Math.floor(Math.random() * CELL_COUNT))
  return Array.from(picked)
}

export default function HeroCarousel() {
  const [layout, setLayout] = useState<Cell[]>(SEED_LAYOUT)
  // Tracks how many cells have been "consumed" so all photos eventually appear
  const photoCursor = useRef(9)
  // Per-cell version counter — bumps when a cell changes, drives the per-cell crossfade
  const cellVersionRef = useRef<number[]>(new Array(CELL_COUNT).fill(0))

  useEffect(() => {
    // Initial shuffle: replace the deterministic seed with a fresh randomized
    // layout that uses a wider slice of the photo pool. Bump versions so the
    // initial reveal also crossfades from the seed.
    setLayout(() => {
      const fresh: Cell[] = []
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          fresh.push(makeCell(c, photoCursor))
        }
      }
      for (let i = 0; i < CELL_COUNT; i++) cellVersionRef.current[i] += 1
      return fresh
    })

    const id = setInterval(() => {
      setLayout((prev) => {
        const next = [...prev]
        // Update only a handful of tiles per tick — keeps the mosaic ambient
        // and prevents the whole grid from strobing.
        const targets = pickIndices(TILES_PER_TICK())
        for (const i of targets) {
          const colIdx = i % COLS
          const fresh = makeCell(colIdx, photoCursor)
          if (fresh.isBlack !== prev[i].isBlack || fresh.photo !== prev[i].photo) {
            cellVersionRef.current[i] += 1
            next[i] = fresh
          }
        }
        return next
      })
    }, TICK_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute -inset-1 grid grid-cols-5 grid-rows-3 gap-0">
        {layout.map((cell, idx) => {
          const version = cellVersionRef.current[idx]
          return (
            <div key={idx} className="relative bg-rl-dark overflow-hidden">
              <AnimatePresence>
                <motion.div
                  // Key only changes when THIS cell changes — other tiles
                  // do NOT remount on every tick. Killing the global tick
                  // from the key removes the perceived flicker.
                  key={`${idx}-${version}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: FADE_S, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  {!cell.isBlack && (
                    <Image
                      src={PHOTOS[cell.photo]}
                      alt=""
                      fill
                      sizes="20vw"
                      priority={idx < 5}
                      className="object-cover"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Dark overlay — near-black on mobile (96%), editorial gradient on desktop */}
      <div
        className="absolute -inset-1 bg-rl-dark/[0.96] md:bg-transparent"
      />
      <div
        className="absolute -inset-1 hidden md:block"
        style={{
          background:
            'linear-gradient(to right, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.85) 45%, rgba(13,13,13,0.72) 100%)',
        }}
      />
      {/* Subtle vertical gradient for top/bottom edge contrast (desktop only) */}
      <div className="absolute -inset-1 hidden md:block bg-gradient-to-b from-rl-dark/30 via-transparent to-rl-dark/45" />
    </div>
  )
}
