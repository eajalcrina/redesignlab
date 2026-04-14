'use client'

import { motion } from 'framer-motion'
import { DURATION, EASE, STAGGER } from '@/lib/animations'
import Tag from '@/components/ui/Tag'

export default function HeroSection() {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER.slow } },
  }
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION.normal, ease: EASE.out } },
  }

  return (
    <section className="section-dark min-h-[70vh] flex items-center">
      <div className="container-rl py-32 md:py-40">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.div variants={item}>
            <Tag color="neutral" className="mb-8">Para fondos de inversión</Tag>
          </motion.div>
          <motion.h1 variants={item} className="font-display text-display-lg md:text-display-xl lg:text-[80px] lg:leading-[0.97] lg:font-normal text-text-muted max-w-5xl">
            Invertir en bioeconomía tiene un riesgo que el análisis financiero no puede mitigar solo.
          </motion.h1>
          <motion.div
            variants={{ hidden: { scaleX: 0, originX: 0 }, visible: { scaleX: 1, transition: { duration: DURATION.slow, ease: EASE.out } } }}
            className="h-0.5 bg-rl-red w-24 my-6"
          />
          <motion.h2 variants={item} className="font-display text-display-lg md:text-display-xl lg:text-[80px] lg:leading-[0.97] lg:font-normal text-rl-red max-w-4xl">
            Redesign Lab lo reduce.
          </motion.h2>
          <motion.p variants={item} className="text-body-lg text-text-muted max-w-3xl mt-10">
            Los fondos de impacto con inversiones en bioeconomía enfrentan un problema que el análisis financiero convencional no puede resolver: la variable más crítica de la inversión — el activo natural, la gobernanza comunitaria, la sostenibilidad de la cadena de extracción — no está en los estados financieros ni en el pitch deck. Está en el campo. Y el campo requiere conocimiento que la mayoría de los equipos de inversión no tienen internamente.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
