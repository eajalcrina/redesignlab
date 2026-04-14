'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { DURATION, EASE } from '@/lib/animations'

interface HeroTextProps {
  line1: string
  line2: string
}

export default function HeroText({ line1, line2 }: HeroTextProps) {
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const headingClass = 'font-display text-display-xl lg:text-[120px] lg:leading-[0.95] lg:tracking-[-0.04em] lg:font-normal text-text-on-dark max-w-5xl'

  // Before mount or reduced motion: show static content
  if (!mounted || prefersReduced) {
    return (
      <div>
        <h1 className={headingClass}>{line1}</h1>
        <div className="h-0.5 bg-rl-red w-32 my-6" />
        <h2 className={headingClass}>{line2}</h2>
      </div>
    )
  }

  const words1 = line1.split(' ')

  return (
    <div>
      <motion.h1
        className={headingClass}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {words1.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: DURATION.normal, ease: EASE.out } },
            }}
            className="inline-block mr-[0.3em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      <motion.div
        className="h-0.5 bg-rl-red w-32 my-6"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: EASE.out, delay: words1.length * 0.08 + 0.2 }}
      />

      <motion.h2
        className={headingClass}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.slow, delay: words1.length * 0.08 + 0.6 }}
      >
        {line2}
      </motion.h2>
    </div>
  )
}
