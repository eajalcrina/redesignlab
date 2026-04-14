'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const problems = [
  {
    number: '01',
    statement: 'Tenemos el activo. No tenemos el modelo.',
    bullets: [
      'Una empresa pesquera con acceso a biomasa de calidad excepcional que no sabe cómo convertirla en una propuesta premium para el mercado europeo.',
      'Una corporación agroindustrial con miles de hectáreas de territorio amazónico que no sabe qué hacer con ese activo más allá de lo que siempre ha hecho.',
      'Un emprendedor con conocimiento territorial profundo de una especie con propiedades extraordinarias y sin idea de cómo construir un negocio alrededor de ella.',
    ],
    conclusion: 'El problema no es la oportunidad. Es la distancia entre la oportunidad y el modelo de negocio que la captura.',
  },
  {
    number: '02',
    statement: 'Tenemos el modelo. No tenemos el capital.',
    bullets: [
      'Un bionegocio con tres años de operación, compradores reales y resultados verificables que no sabe cómo estructurar la conversación con un fondo de impacto.',
      'Una empresa que necesita capital verde para escalar su operación regenerativa pero no sabe cómo hablar el idioma de la banca multilateral.',
      'Un proyecto de conservación con extraordinario valor territorial que no puede demostrar su madurez de inversión en los términos que el capital exige.',
    ],
    conclusion: 'El problema no es el mérito. Es la distancia entre el mérito y la estructura que lo hace elegible para el capital correcto.',
  },
  {
    number: '03',
    statement: 'Tenemos el modelo y el capital. No tenemos la velocidad.',
    bullets: [
      'Una organización que sabe lo que quiere hacer pero opera a la velocidad de los ciclos de consultoría convencional — cuando el mercado se mueve a la velocidad de la IA.',
      'Un fondo con portafolio de bionegocios que no tiene la capacidad técnica interna para monitorear las variables que realmente importan.',
      'Un equipo directivo que toma decisiones de alta consecuencia sin la inteligencia de mercado que esas decisiones merecen.',
    ],
    conclusion: 'El problema no es la capacidad. Es la distancia entre la capacidad y la velocidad que el mercado de 2026 exige.',
  },
]

export default function ProblemSection() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const total = problems.length

  const go = (delta: number) => {
    setActive((prev) => (prev + delta + total) % total)
  }

  // Auto-rotate every 6s, pause on hover/focus
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % total)
    }, 3500)
    return () => clearInterval(interval)
  }, [isPaused, total])

  return (
    <section
      className="section-dark py-24 md:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">EL PROBLEMA QUE RESOLVEMOS</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-12">
            Tres desafíos. Una misma solución.
          </h2>
        </SectionReveal>

        {/* Slider controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <span className="font-mono text-mono-sm text-rl-red">
              {problems[active].number}
            </span>
            <span className="text-body-sm text-text-muted">
              / {String(total).padStart(2, '0')}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="w-11 h-11 rounded-full border border-border-dark flex items-center justify-center text-text-on-dark hover:border-rl-red hover:text-rl-red transition-colors"
            >
              &larr;
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Siguiente"
              className="w-11 h-11 rounded-full border border-border-dark flex items-center justify-center text-text-on-dark hover:border-rl-red hover:text-rl-red transition-colors"
            >
              &rarr;
            </button>
          </div>
        </div>

        {/* Horizontal slide */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: DURATION.normal, ease: EASE.out }}
              className="max-w-4xl"
            >
              <h3 className="font-display text-display-md md:text-display-lg text-text-on-dark mb-10">
                {problems[active].statement}
              </h3>
              <ul className="space-y-4 mb-8">
                {problems[active].bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-body-lg text-text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2.5 flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <p className="text-body-lg text-rl-red font-medium max-w-3xl">
                {problems[active].conclusion}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bars */}
        <div className="flex gap-2 mt-12">
          {problems.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Ir al problema ${i + 1}`}
              className={`h-1 overflow-hidden transition-all duration-300 ${
                i === active ? 'w-16 bg-text-muted/20' : 'w-8 bg-text-muted/20 hover:bg-text-muted/40'
              }`}
            >
              {i === active && (
                <span
                  key={`${active}-${isPaused ? 'paused' : 'running'}`}
                  className="block h-full bg-rl-red origin-left"
                  style={{
                    animation: isPaused ? 'none' : 'problem-progress 3.5s linear forwards',
                    width: isPaused ? '30%' : '100%',
                  }}
                />
              )}
            </button>
          ))}
        </div>

        <style jsx>{`
          @keyframes problem-progress {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </div>
    </section>
  )
}
