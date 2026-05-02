'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import { DURATION, EASE } from '@/lib/animations'

const archetypes = [
  {
    title: 'El fundador que opera solo',
    description:
      'Dirige una empresa de bioeconomía que ya funciona, donde todo el pensamiento estratégico recae sobre él. No porque no tenga capacidad. Porque no tiene el tiempo ni el equipo para separar el pensamiento de la operación.',
    fit: 'Re. Intelligence le da el equipo de estrategia que no puede contratar.',
  },
  {
    title: 'El equipo fundador sin área corporativa',
    description:
      'Dos o tres socios que construyeron una empresa con talento operativo sólido pero sin las posiciones corporativas que las grandes empresas tienen para pensar el negocio: dirección estratégica, análisis de mercado, gestión de financiamiento.',
    fit: 'Re. Intelligence es ese equipo corporativo: externo, senior, con IA como motor de análisis.',
  },
  {
    title: 'El director de inversión de un fondo',
    description:
      'Con portafolio en bioeconomía que necesita inteligencia continua sobre el ecosistema y criterio externo para las decisiones de acompañamiento donde la proximidad con las empresas invertidas puede nublar el juicio.',
    fit: 'Re. Intelligence le da perspectiva externa con conocimiento territorial real.',
  },
]

const notForItems: { text: React.ReactNode }[] = [
  {
    text: (
      <>
        Empresas que todavía están definiendo su modelo de negocio. El punto de partida correcto es{' '}
        <Link href="/crear-valor" className="text-rl-red underline decoration-rl-red/40 hover:decoration-rl-red transition-colors">
          Crear Valor →
        </Link>
      </>
    ),
  },
  {
    text: 'Empresas que necesitan un proyecto específico con entregable definido. Cualquiera de las tres líneas de servicio de Redesign Lab.',
  },
  {
    text: 'Empresas que esperan que Re. Intelligence ejecute los planes. Re. Intelligence produce la inteligencia; la ejecución es del equipo de la empresa.',
  },
]

export default function ArchetypesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
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

      <SectionReveal delay={0.3}>
        <div className="border-t border-border-light pt-12 max-w-3xl">
          <p className="font-mono text-mono-sm text-text-tertiary uppercase tracking-[0.18em] mb-4">
            No es para esta empresa
          </p>
          <h3 className="font-display text-display-sm text-text-primary mb-6">
            Re. Intelligence no es el servicio correcto si…
          </h3>
          <ul className="space-y-4">
            {notForItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-body-md text-text-secondary">
                <span className="text-text-tertiary mt-1">✗</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </SectionReveal>
    </>
  )
}
