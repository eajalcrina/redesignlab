'use client'

import { motion } from 'framer-motion'
import { DURATION, EASE, STAGGER } from '@/lib/animations'

export default function HeroSection() {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER.slow } },
  }
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION.normal, ease: EASE.out } },
  }

  // 3 filled, 12 empty
  const totalSlots = 15
  const filledSlots = 3

  return (
    <section className="bg-[#080808] text-text-on-dark min-h-[80vh] flex items-center">
      <div className="container-rl py-32 md:py-40">
        <motion.div initial="hidden" animate="visible" variants={container} className="max-w-[720px]">
          <motion.p variants={item} className="font-mono text-mono-lg text-rl-red mb-6">
            USD 3,000 / mes
          </motion.p>

          <motion.h1 variants={item} className="font-display text-display-lg md:text-display-xl text-text-on-dark mb-4">
            Re. Intelligence
          </motion.h1>

          <motion.p variants={item} className="text-body-lg text-text-muted mb-6">
            Un servicio exclusivo de Redesign Lab para acompañar a líderes de industrias de bioeconomía en su transformación estratégica con inteligencia artificial, criterio de mercado y acceso directo al equipo senior.
          </motion.p>

          <motion.p variants={item} className="text-body-xl text-text-on-dark font-medium mb-8">
            Máximo 15 miembros. Siempre.
          </motion.p>

          {/* Availability dots */}
          <motion.div variants={item} className="flex items-center gap-2 mb-4">
            {Array.from({ length: totalSlots }).map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${
                  i < filledSlots ? 'bg-rl-red' : 'border border-border-dark'
                }`}
              />
            ))}
          </motion.div>
          <motion.p variants={item} className="font-mono text-mono-sm text-text-muted">
            {filledSlots}/{totalSlots} miembros activos
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
