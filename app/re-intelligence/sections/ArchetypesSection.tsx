'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const archetypes = [
  {
    title: 'El fundador que opera solo',
    description:
      'Dirige una empresa de bioeconomía que ya funciona — y donde todo el pensamiento estratégico recae sobre él. No porque no tenga capacidad. Porque no tiene el tiempo ni el equipo para separar el pensamiento de la operación.',
    fit: 'Re. Intelligence le da el equipo de estrategia que no puede contratar.',
  },
  {
    title: 'El equipo fundador sin área corporativa',
    description:
      'Dos o tres socios que construyeron una empresa con talento operativo sólido pero sin las posiciones corporativas que las grandes empresas tienen para pensar el negocio: director de estrategia, analista de mercado, gestor de financiamiento.',
    fit: 'Re. Intelligence es ese equipo corporativo — externo, senior, con IA como motor de análisis.',
  },
  {
    title: 'El director de inversión de un fondo',
    description:
      'Con portafolio en bioeconomía que necesita inteligencia continua sobre los mercados y criterio externo para las decisiones de acompañamiento donde la proximidad con las empresas invertidas puede nublar el juicio.',
    fit: 'Re. Intelligence le da perspectiva externa con conocimiento territorial real.',
  },
]

export default function ArchetypesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Para quién es Re. Intelligence</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            Tres perfiles donde el valor es inmediato.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {archetypes.map((arch, i) => (
            <SectionReveal key={arch.title} delay={i * 0.1}>
              <div
                className="border border-border-light p-8 rounded cursor-pointer hover:border-rl-red/30 transition-colors h-full"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-mono text-mono-sm text-rl-red block mb-3">0{i + 1}</span>
                <h3 className="font-display text-display-sm text-text-primary mb-3">{arch.title}</h3>
                <p className="text-body-sm text-text-secondary mb-4">{arch.description}</p>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: DURATION.fast, ease: EASE.out }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-border-light">
                        <p className="text-body-sm text-rl-red">{arch.fit}</p>
                      </div>
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
