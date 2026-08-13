'use client'

import { motion } from 'framer-motion'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import { STAGGER, DURATION, EASE } from '@/lib/animations'
import { SITE_CONFIG } from '@/lib/constants'

interface ServiceHeroProps {
  kicker: string
  h1: string
  tagline: string
  authorityLine: string
}

export default function ServiceHero({ kicker, h1, tagline, authorityLine }: ServiceHeroProps) {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER.slow } },
  }
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION.normal, ease: EASE.out } },
  }

  return (
    <section className="bg-[#080808] text-text-on-dark min-h-[60vh] flex items-center">
      <div className="container-rl py-32 md:py-40">
        <motion.div initial="hidden" animate="visible" variants={container} className="max-w-[820px]">
          <motion.div variants={item} className="mb-6">
            <Tag color="red">{kicker}</Tag>
          </motion.div>
          <motion.h1 variants={item} className="font-display text-display-xl md:text-display-2xl text-text-on-dark mb-8">
            {h1}
          </motion.h1>
          <motion.p variants={item} className="text-body-xl text-text-muted italic max-w-[640px] mb-4">
            {tagline}
          </motion.p>
          <motion.p variants={item} className="text-body-lg text-text-on-dark max-w-[640px] mb-10">
            {authorityLine}
          </motion.p>
          <motion.div variants={item}>
            <Button variant="primary" size="lg" href={SITE_CONFIG.calendarUrlFit}>
              Agendar conversación de fit &rarr;
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
