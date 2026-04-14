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
    <section className="section-dark min-h-[70vh] flex items-center relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(250,250,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,248,1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="container-rl py-32 md:py-40 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.div variants={item}>
            <Tag color="neutral" className="mb-8">Builders</Tag>
          </motion.div>

          <motion.h1 variants={item} className="font-display text-display-lg md:text-display-xl lg:text-[72px] lg:leading-[0.97] text-text-muted max-w-5xl">
            No buscamos freelancers.
          </motion.h1>

          <motion.div
            variants={{ hidden: { scaleX: 0, originX: 0 }, visible: { scaleX: 1, transition: { duration: DURATION.slow, ease: EASE.out } } }}
            className="h-0.5 bg-rl-red w-24 my-6"
          />

          <motion.h2 variants={item} className="font-display text-display-lg md:text-display-xl lg:text-[72px] lg:leading-[0.97] text-text-on-dark max-w-5xl">
            Buscamos arquitectos de industrias.
          </motion.h2>

          <motion.p variants={item} className="mt-8 text-body-xl text-text-muted max-w-2xl">
            Una red selecta de expertos senior que co-construyen con Redesign Lab los negocios sostenibles más ambiciosos de América Latina.
          </motion.p>
          <motion.p variants={item} className="mt-6 text-body-md text-text-muted/70 max-w-2xl">
            Esto no es un portal de talento ni una bolsa de trabajo. Construir modelos de bioeconomía que conecten innovación con mercado requiere un nivel de especialidad y visión estratégica que no se delega...
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
