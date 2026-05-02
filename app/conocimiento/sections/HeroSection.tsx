'use client'

import { motion } from 'framer-motion'
import { DURATION, EASE, STAGGER } from '@/lib/animations'
import Tag from '@/components/ui/Tag'

export default function HeroSection() {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER.fast } },
  }
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION.normal, ease: EASE.out } },
  }

  return (
    <section className="section-dark py-32 md:py-40">
      <div className="container-rl">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.div variants={item}>
            <Tag color="neutral" className="mb-8">Conocimiento</Tag>
          </motion.div>
          <motion.h1 variants={item} className="font-display text-display-lg md:text-display-xl text-text-on-dark max-w-4xl mb-6">
            Lo que sabemos, lo compartimos.
          </motion.h1>
          <motion.p variants={item} className="text-body-xl text-text-muted max-w-2xl">
            Recursos, frameworks y datos que usamos internamente, abiertos para el ecosistema.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
