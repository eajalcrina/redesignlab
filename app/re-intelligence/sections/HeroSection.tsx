'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { DURATION, EASE, STAGGER } from '@/lib/animations'
import { SITE_CONFIG } from '@/lib/constants'

export default function HeroSection() {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER.slow } },
  }
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION.normal, ease: EASE.out } },
  }

  const totalSlots = 15
  const filledSlots = 3

  return (
    <section className="bg-[#080808] text-text-on-dark min-h-[80vh] flex items-center">
      <div className="container-rl py-32 md:py-40">
        <motion.div initial="hidden" animate="visible" variants={container} className="max-w-[820px]">
          <motion.p variants={item} className="font-mono text-mono-lg text-rl-red mb-6">
            USD 900 – 3,000 / mes · dos versiones
          </motion.p>

          <motion.h1 variants={item} className="font-display text-display-lg md:text-display-xl text-text-on-dark mb-8">
            Hay decisiones que no se pueden tomar bien sin el criterio correcto en el momento correcto.
            <span className="block text-rl-red mt-2">Re. Intelligence existe para ese momento.</span>
          </motion.h1>

          <motion.p variants={item} className="text-body-xl text-text-muted italic mb-10 max-w-[640px]">
            El equipo de inteligencia estratégica externo de tu empresa.
          </motion.p>

          <motion.div variants={item} className="mb-12">
            <Button variant="primary" size="lg" href={SITE_CONFIG.calendarUrl}>
              Agendar primera reunión &rarr;
            </Button>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-2 mb-3">
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
            {filledSlots}/{totalSlots} empresas activas en Re. Intelligence Pro
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
