'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const problems = [
  {
    number: '01',
    statement: 'Tenemos el activo. No tenemos el modelo.',
    detail: 'Una empresa pesquera con acceso a biomasa de calidad excepcional que no sabe cómo convertirla en una propuesta premium para el mercado europeo. Una corporación agroindustrial con miles de hectáreas de territorio amazónico que no sabe qué hacer con ese activo más allá de lo que siempre ha hecho. Un emprendedor con conocimiento territorial profundo de una especie con propiedades extraordinarias y sin idea de cómo construir un negocio alrededor de ella.',
    conclusion: 'El problema no es la oportunidad. Es la distancia entre la oportunidad y el modelo de negocio que la captura.',
  },
  {
    number: '02',
    statement: 'Tenemos el modelo. No tenemos el capital.',
    detail: 'Un bionegocio con tres años de operación, compradores reales y resultados verificables que no sabe cómo estructurar la conversación con un fondo de impacto. Una empresa que necesita capital verde para escalar su operación regenerativa pero no sabe cómo hablar el idioma de la banca multilateral. Un proyecto de conservación con extraordinario valor territorial que no puede demostrar su madurez de inversión en los términos que el capital exige.',
    conclusion: 'El problema no es el mérito. Es la distancia entre el mérito y la estructura que lo hace elegible para el capital correcto.',
  },
  {
    number: '03',
    statement: 'Tenemos el modelo y el capital. No tenemos la velocidad.',
    detail: 'Una organización que sabe lo que quiere hacer pero que opera a la velocidad de los ciclos de consultoría convencional — cuando el mercado que quiere capturar se mueve a la velocidad de la IA. Un fondo con portafolio de bionegocios que no tiene la capacidad técnica interna para monitorear las variables que realmente importan. Un equipo directivo que toma decisiones de alta consecuencia sin la inteligencia de mercado que esas decisiones merecen.',
    conclusion: 'El problema no es la capacidad. Es la distancia entre la capacidad y la velocidad que el mercado de 2026 exige.',
  },
]

export default function ProblemSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="section-dark py-16 md:py-24">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">EL PROBLEMA QUE RESOLVEMOS</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-12">
            Tres distancias. Una misma solución.
          </h2>
        </SectionReveal>

        {/* 3 tabs always visible */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 items-stretch">
          {problems.map((problem, i) => (
            <SectionReveal key={problem.number} delay={i * 0.1} className="flex">
              <button
                onClick={() => setActive(i)}
                className={`w-full text-left p-6 rounded border transition-all duration-300 flex flex-col ${
                  active === i
                    ? 'border-rl-red bg-rl-red/10'
                    : 'border-border-dark hover:border-text-muted/30'
                }`}
              >
                <span className="font-mono text-mono-sm text-rl-red block mb-2">{problem.number}</span>
                <h3 className={`font-display text-body-lg md:text-display-sm transition-colors ${
                  active === i ? 'text-text-on-dark' : 'text-text-muted'
                }`}>
                  {problem.statement}
                </h3>
              </button>
            </SectionReveal>
          ))}
        </div>

        {/* Expanded detail for active problem */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: DURATION.fast, ease: EASE.out }}
            className="max-w-3xl"
          >
            <p className="text-body-xl text-text-muted mb-6">
              {problems[active].detail}
            </p>
            <p className="text-body-lg text-rl-red font-medium">
              {problems[active].conclusion}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
