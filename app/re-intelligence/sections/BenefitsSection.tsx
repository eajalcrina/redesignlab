'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const benefits = [
  {
    title: '4 horas con los socios fundadores',
    detail:
      'Sesiones de trabajo directas con Eddie Ajalcriña o Lorenzo Ortiz — sobre las decisiones concretas del mes. No reuniones de actualización. Sesiones de trabajo real.',
  },
  {
    title: 'Re. Intelligence Brief mensual',
    detail:
      'Documento personalizado con el análisis de las cuatro dimensiones aplicado al contexto específico de la empresa — con recomendaciones accionables para el equipo.',
  },
  {
    title: '2 consultas adicionales de 30 minutos',
    detail:
      'Con especialistas de la red de Builders de Redesign Lab en las áreas de mayor relevancia para el mes en curso.',
  },
  {
    title: 'Acceso anticipado a frameworks',
    detail:
      'Los productos de conocimiento de Redesign Lab llegan a los miembros antes de su publicación abierta.',
  },
  {
    title: 'Prioridad en servicios complementarios',
    detail:
      'Cuando la empresa necesita ejecución especializada — en áreas donde no tiene equipo interno — los miembros de Re. Intelligence tienen acceso prioritario a los servicios complementarios de Redesign Lab y su red de Builders.',
  },
]

export default function BenefitsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Lo que incluye cada mes</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            Cinco componentes fijos, mes tras mes.
          </h2>
        </SectionReveal>

        <div className="max-w-3xl">
          {benefits.map((benefit, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <div className="border-b border-border-light">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full py-6 flex items-start justify-between gap-4 text-left"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-mono-md text-rl-red mt-0.5">0{i + 1}</span>
                    <span className="font-display text-display-sm text-text-primary">{benefit.title}</span>
                  </div>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-rl-red text-xl flex-shrink-0 mt-1"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: DURATION.fast, ease: EASE.out }}
                      className="overflow-hidden"
                    >
                      <p className="text-body-md text-text-secondary pb-6 pl-12 max-w-xl">{benefit.detail}</p>
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
