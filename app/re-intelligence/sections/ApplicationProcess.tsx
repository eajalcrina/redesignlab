'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const steps = [
  { number: '01', title: 'Solicitud', detail: 'Completas un breve formulario con tu perfil y contexto.' },
  { number: '02', title: 'Conversación', detail: 'Una llamada de 30 minutos para entender tus necesidades y validar el fit.' },
  { number: '03', title: 'Evaluación', detail: 'Evaluamos si el perfil enriquece a la red actual y viceversa.' },
  { number: '04', title: 'Inicio', detail: 'Si hay fit, comienzas el próximo mes con tu primer briefing.' },
]

export default function ApplicationProcess() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className="section-neutral py-24 md:py-32" ref={ref}>
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Proceso de solicitud</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-16">
            Cuatro pasos para entrar.
          </h2>
        </SectionReveal>

        <div className="relative">
          <motion.div
            className="hidden md:block absolute top-8 left-0 right-0 h-px bg-rl-red origin-left"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: DURATION.verySlow, ease: EASE.out, delay: 0.3 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.3 + i * 0.12 }}
              >
                <div className="hidden md:flex items-center justify-center w-4 h-4 rounded-full bg-rl-neutral border-2 border-rl-red mb-6" />
                <span className="font-mono text-mono-sm text-rl-red block mb-2">{step.number}</span>
                <h3 className="font-display text-display-sm text-text-primary mb-2">{step.title}</h3>
                <p className="text-body-sm text-text-secondary">{step.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
