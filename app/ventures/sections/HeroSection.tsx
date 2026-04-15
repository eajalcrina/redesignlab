'use client'

import { motion } from 'framer-motion'
import { DURATION, EASE, STAGGER } from '@/lib/animations'
import Tag from '@/components/ui/Tag'
import HeroCarouselBg from './HeroCarouselBg'

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
    <section className="section-dark min-h-[80vh] flex items-center relative overflow-hidden">
      <HeroCarouselBg />

      <div className="container-rl py-32 md:py-40 relative z-10 text-center">
        <motion.div initial="hidden" animate="visible" variants={container} className="max-w-4xl mx-auto">
          <motion.div variants={item}>
            <Tag color="neutral" className="mb-8">Ventures</Tag>
          </motion.div>
          <motion.h1 variants={item} className="font-display text-display-xl lg:text-[80px] lg:font-normal lg:leading-[1] text-text-on-dark mb-8">
            Construimos los negocios que el planeta necesita <span className="text-white">hoy.</span>
          </motion.h1>
          <motion.p variants={item} className="text-body-lg text-text-muted mb-6 max-w-3xl mx-auto">
            Somos un Venture Studio especializado en el desarrollo de negocios sostenibles que generan impacto real en América Latina y el Caribe. Trabajamos con un número deliberadamente reducido de proyectos — los que tienen el potencial y la solidez para convertirse en referentes globales de su industria.
          </motion.p>
          <motion.p variants={item} className="text-body-md text-text-muted/70 max-w-3xl mx-auto">
            Esto no es una convocatoria abierta. Es un ecosistema de construcción selectiva.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
