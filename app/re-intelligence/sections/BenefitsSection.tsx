'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const benefits = [
  {
    title: 'Briefing estratégico mensual',
    detail: 'Un análisis personalizado de oportunidades, riesgos y tendencias relevantes para tu industria específica. No es un reporte genérico — es inteligencia diseñada para tu contexto.',
  },
  {
    title: 'Modelos de IA propietarios',
    detail: 'Acceso a herramientas de análisis de mercado, valoración de oportunidades y simulación de escenarios construidas con datos de campo reales de bioeconomía en LATAM.',
  },
  {
    title: 'Red de decisores',
    detail: 'Una red curada de máximo 15 líderes de bioeconomía. No es networking — es acceso a las personas que están tomando las decisiones más importantes del ecosistema.',
  },
  {
    title: 'Prioridad en proyectos',
    detail: 'Los miembros de Re. Intelligence ven primero las oportunidades de venture co-building, deal flow y proyectos de alto impacto que surgen en la red.',
  },
  {
    title: 'Advisory 1:1',
    detail: 'Dos sesiones mensuales de advisory estratégico con el equipo senior de Redesign Lab. Para decisiones que requieren contexto profundo.',
  },
]

export default function BenefitsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Lo que incluye cada mes</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-12">
            Cinco pilares de inteligencia.
          </h2>
        </SectionReveal>

        <div className="max-w-3xl">
          {benefits.map((benefit, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <div className="border-b border-border-dark">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full py-6 flex items-start justify-between gap-4 text-left"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-mono-md text-rl-red mt-0.5">0{i + 1}</span>
                    <span className="font-display text-display-sm text-text-on-dark">{benefit.title}</span>
                  </div>
                  <motion.span animate={{ rotate: openIndex === i ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-rl-red text-xl flex-shrink-0 mt-1">+</motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: DURATION.fast, ease: EASE.out }} className="overflow-hidden">
                      <p className="text-body-md text-text-muted pb-6 pl-12 max-w-xl">{benefit.detail}</p>
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
