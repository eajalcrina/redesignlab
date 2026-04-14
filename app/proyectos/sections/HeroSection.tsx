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
    <section className="section-dark pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-rl">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.div variants={item}>
            <Tag color="neutral" className="mb-8">Proyectos</Tag>
          </motion.div>

          <motion.h1 variants={item} className="font-display text-display-lg md:text-display-xl text-text-on-dark max-w-4xl mb-6">
            Proyectos que transforman industrias en la dirección correcta.
          </motion.h1>

          <motion.p variants={item} className="text-body-lg text-text-muted max-w-2xl">
            Más de cinco años co-construyendo negocios, estructurando inversiones y diseñando modelos que funcionan en las industrias más complejas de América Latina.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
