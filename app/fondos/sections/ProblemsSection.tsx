'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const problems = [
  {
    title: 'No conocen la industria desde adentro',
    description:
      'El análisis financiero no captura el riesgo operativo real de una industria de bioeconomía. Necesitas alguien que haya estado en la planta, en la cadena, en el territorio — no solo en el modelo de Excel.',
  },
  {
    title: 'Los founders no están preparados para el capital',
    description:
      'Los mejores emprendedores de bioeconomía conocen su industria pero no el lenguaje del capital. Sin investment readiness real, el deal se pierde en la negociación.',
  },
  {
    title: 'El portafolio necesita inteligencia continua',
    description:
      'Después de invertir, la mayoría de fondos no tienen capacidad de monitoreo técnico ni operativo de sus participadas en bioeconomía. Los reportes llegan tarde y sin contexto.',
  },
]

export default function ProblemsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">El problema que resolvemos</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            Tres riesgos que el análisis financiero no puede cubrir.
          </h2>
        </SectionReveal>

        <div className="max-w-3xl space-y-0">
          {problems.map((problem, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <div className="border-b border-border-light">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full py-6 flex items-start justify-between gap-4 text-left"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-mono-md text-rl-red mt-1">0{i + 1}</span>
                    <span className="font-display text-display-sm text-text-primary">{problem.title}</span>
                  </div>
                  <motion.span animate={{ rotate: openIndex === i ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-rl-red text-xl flex-shrink-0 mt-1">+</motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: DURATION.fast, ease: EASE.out }} className="overflow-hidden">
                      <p className="text-body-md text-text-secondary pb-6 pl-12 max-w-xl">{problem.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
