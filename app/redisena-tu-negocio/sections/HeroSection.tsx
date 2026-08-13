'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
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

  // PENDIENTE DE VALIDAR: límite de 15 empresas confirmado por Eddie; el contador de
  // "empresas activas" (filledSlots) es heredado de Re. Intelligence Pro — actualizar
  // el número real antes de publicar.
  const totalSlots = 15
  const filledSlots = 3

  return (
    <section className="bg-[#080808] text-text-on-dark min-h-[80vh] flex items-center">
      <div className="container-rl py-32 md:py-40">
        <motion.div initial="hidden" animate="visible" variants={container} className="max-w-[820px]">
          <motion.div variants={item} className="mb-6">
            <Tag color="red">SERVICIO DE ACOMPAÑAMIENTO ESTRATÉGICO</Tag>
          </motion.div>

          <motion.h1 variants={item} className="font-display text-display-2xl md:text-[56px] lg:text-[64px] leading-[0.98] text-text-on-dark mb-8">
            Rediseña tu negocio
          </motion.h1>

          <motion.p variants={item} className="text-body-xl text-text-muted italic mb-10 max-w-[640px]">
            Un equipo de gerentes externos con más de 15 años de experiencia, accesible para empresas en crecimiento que ya funcionan.
          </motion.p>

          <motion.div variants={item} className="mb-12">
            <Button variant="primary" size="lg" href={SITE_CONFIG.calendarUrl}>
              Agendar conversación de fit &rarr;
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
            {filledSlots}/{totalSlots} empresas activas
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
