'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const archetypes = [
  {
    title: 'El líder de industria',
    description: 'CEO o director general de una empresa de bioeconomía que factura más de USD 1MM anuales y necesita inteligencia para tomar decisiones de expansión, innovación o transformación.',
    fit: 'Para ti si lideras una operación y necesitas un espejo estratégico que conozca tu industria.',
  },
  {
    title: 'El fund manager',
    description: 'GP o director de inversiones de un fondo con mandato en bioeconomía que necesita inteligencia continua sobre el ecosistema, deal flow y validación técnica.',
    fit: 'Para ti si inviertes en bioeconomía y necesitas ojos en el territorio.',
  },
  {
    title: 'El builder serial',
    description: 'Emprendedor o ejecutivo que está construyendo su segunda o tercera venture en bioeconomía y necesita acceso a red, oportunidades y herramientas de IA.',
    fit: 'Para ti si construyes ventures y necesitas velocidad y conexiones.',
  },
]

export default function ArchetypesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Para quién es</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            Tres arquetipos de miembros.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {archetypes.map((arch, i) => (
            <SectionReveal key={arch.title} delay={i * 0.1}>
              <div
                className="border border-border-light p-8 rounded cursor-pointer hover:border-rl-red/30 transition-colors"
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
