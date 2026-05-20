'use client'

import { motion } from 'framer-motion'
import { DURATION, EASE, STAGGER } from '@/lib/animations'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'

interface ProgramHeroProps {
  tag: string
  lines: string[]
  paragraph?: string
  ctaLabel?: string
  ctaHref?: string
}

export default function ProgramHero({ tag, lines, paragraph, ctaLabel, ctaHref }: ProgramHeroProps) {
  const container = { hidden: {}, visible: { transition: { staggerChildren: STAGGER.slow } } }
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION.normal, ease: EASE.out } },
  }
  const external = ctaHref?.startsWith('http')

  return (
    <section className="section-dark min-h-[60vh] flex items-center relative">
      <div className="container-rl py-32 md:py-40 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.div variants={item}>
            <Tag color="neutral" className="mb-8">{tag}</Tag>
          </motion.div>
          {lines.map((line, i) => (
            <motion.h1
              key={i}
              variants={item}
              className="font-display text-display-lg md:text-display-xl lg:text-[72px] lg:leading-[1.0] lg:font-normal text-text-on-dark max-w-5xl"
            >
              {line}
            </motion.h1>
          ))}
          <motion.div
            variants={{ hidden: { scaleX: 0, originX: 0 }, visible: { scaleX: 1, transition: { duration: DURATION.slow, ease: EASE.out } } }}
            className="h-0.5 bg-rl-red w-24 my-6"
          />
          {paragraph && (
            <motion.p variants={item} className="mt-2 text-body-xl text-text-muted max-w-2xl">
              {paragraph}
            </motion.p>
          )}
          {ctaLabel && ctaHref && (
            <motion.div variants={item} className="mt-10">
              <Button variant="primary" href={ctaHref} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {ctaLabel}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
