'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface HeroTextProps {
  line1: string
  line2: string
}

const headingClass =
  'font-display text-[34px] sm:text-[40px] leading-[1.05] tracking-[-0.02em] md:text-display-xl lg:text-[100px] lg:leading-[0.95] lg:tracking-[-0.04em] lg:font-normal max-w-5xl'

/**
 * Two-line hero headline with overflow-hidden slide-up reveal.
 * Second line uses the brand red (Thousandfold-style accent split).
 */
export default function HeroText({ line1, line2 }: HeroTextProps) {
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Static fallback before mount or when reduced-motion is requested
  if (!mounted || prefersReduced) {
    return (
      <div>
        <h1 className={`${headingClass} text-text-on-dark/55`}>{line1}</h1>
        <div className="h-0.5 bg-rl-red w-24 my-5" />
        <h2 className={`${headingClass} text-text-on-dark`}>{line2}</h2>
      </div>
    )
  }

  const ease: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

  return (
    <div>
      <div className="overflow-hidden">
        <motion.h1
          className={`${headingClass} text-text-on-dark/55`}
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.85, ease, delay: 0.1 }}
        >
          {line1}
        </motion.h1>
      </div>

      <motion.div
        className="h-0.5 bg-rl-red w-24 my-5 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.55 }}
      />

      <div className="overflow-hidden">
        <motion.h2
          className={`${headingClass} text-text-on-dark`}
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.85, ease, delay: 0.7 }}
        >
          {line2}
        </motion.h2>
      </div>
    </div>
  )
}
