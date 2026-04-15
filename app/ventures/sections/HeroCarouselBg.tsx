'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const IMAGES = [
  '/assets/ventures/cotton-nation.jpg',
  '/assets/ventures/neofibers.jpg',
  '/assets/ventures/endemics.jpg',
  '/assets/ventures/rare-by.jpg',
  '/assets/ventures/greenprod.jpg',
  '/assets/ventures/ecovive.jpg',
  '/assets/ventures/startups4climate.jpg',
  '/assets/ventures/bio-business-school.jpg',
  '/assets/ventures/thousandfold.jpg',
]

const INTERVAL_MS = 3500
const FADE_S = 0.2

/**
 * Looping background carousel for the /ventures hero. Crossfade 0.35s,
 * 80% dark overlay so hero copy reads cleanly. Inset by -1 to kill any
 * sub-pixel edge artifacts during the cross-fade.
 */
export default function HeroCarouselBg() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_S, ease: 'easeInOut' }}
          className="absolute -inset-1"
          style={{ willChange: 'opacity' }}
        >
          <Image
            src={IMAGES[index]}
            alt=""
            fill
            sizes="100vw"
            priority={index === 0}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      {/* 85% dark overlay for hero text legibility */}
      <div className="absolute -inset-1 bg-rl-dark/85" />
    </div>
  )
}
