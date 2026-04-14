'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import { DURATION, EASE } from '@/lib/animations'

const applications = [
  {
    number: '01',
    title: 'Inteligencia de mercado',
    description: 'Modelos que analizan tendencias, precios y oportunidades en mercados de bioeconomía en tiempo real.',
  },
  {
    number: '02',
    title: 'Predicción de cadena de suministro',
    description: 'Algoritmos que anticipan demanda, optimizan rutas y predicen disrupciones en cadenas biológicas.',
  },
  {
    number: '03',
    title: 'Valoración de oportunidades',
    description: 'Frameworks de IA que evalúan el potencial de nuevas ventures y oportunidades de inversión.',
  },
  {
    number: '04',
    title: 'Trazabilidad inteligente',
    description: 'Sistemas de trazabilidad de origen a destino con verificación automatizada y certificación digital.',
  },
  {
    number: '05',
    title: 'Optimización operativa',
    description: 'Modelos que optimizan procesos de producción, calidad y logística en operaciones de bioeconomía.',
  },
  {
    number: '06',
    title: 'Reportería de impacto',
    description: 'Automatización de la medición y comunicación de impacto con datos verificables y estándares internacionales.',
  },
]

export default function ApplicationsSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="section-dark py-16 md:py-24">
      <div className="container-rl">
        {/* Tabs row */}
        <div className="flex flex-wrap gap-3 mb-12">
          {applications.map((app, i) => (
            <SectionReveal key={app.number} delay={i * 0.05}>
              <button
                onClick={() => setActive(i)}
                className={`text-left px-5 py-3 rounded border transition-all duration-300 ${
                  active === i
                    ? 'border-rl-red bg-rl-red/10 text-text-on-dark'
                    : 'border-border-dark hover:border-text-muted/30 text-text-muted'
                }`}
              >
                <span className="font-mono text-mono-sm text-rl-red mr-2">{app.number}</span>
                <span className="text-body-sm font-medium">{app.title}</span>
              </button>
            </SectionReveal>
          ))}
        </div>

        {/* Active application content */}
        <div className="relative overflow-hidden min-h-[200px]">
          {/* Subtle giant background number */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`bg-${active}`}
              className="absolute top-1/2 right-8 -translate-y-1/2 font-display text-[200px] md:text-[300px] leading-none select-none pointer-events-none text-text-on-dark"
              initial={{ opacity: 0, filter: 'blur(20px)' }}
              animate={{ opacity: 0.03, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(20px)' }}
              transition={{ duration: DURATION.slow, ease: EASE.out }}
            >
              {applications[active].number}
            </motion.span>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: DURATION.fast, ease: EASE.out }}
              className="relative z-10 max-w-2xl"
            >
              <span className="font-mono text-mono-md text-rl-red block mb-3">
                {applications[active].number}
              </span>
              <h3 className="font-display text-display-sm md:text-display-md text-text-on-dark mb-4">
                {applications[active].title}
              </h3>
              <p className="text-body-md text-text-muted">
                {applications[active].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
