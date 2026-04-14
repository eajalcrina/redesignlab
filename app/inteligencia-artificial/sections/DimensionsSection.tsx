'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

const dimensions = [
  { id: 'ver', label: 'VER', description: 'Detectar oportunidades y riesgos que el ojo humano no puede procesar a escala.' },
  { id: 'pensar', label: 'PENSAR', description: 'Analizar escenarios, simular decisiones y priorizar acciones con datos reales.' },
  { id: 'construir', label: 'CONSTRUIR', description: 'Implementar soluciones de IA que se integran a las operaciones reales del cliente.' },
  { id: 'escalar', label: 'ESCALAR', description: 'Llevar las soluciones validadas a nuevas geografías, mercados y cadenas de valor.' },
]

export default function DimensionsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const progressWidth = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '100%'])

  return (
    <section className="section-neutral py-24 md:py-32" ref={containerRef}>
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Re.·IA — Las 4 dimensiones</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-16">
            Cuatro formas de aplicar IA a la bioeconomía.
          </h2>
        </SectionReveal>

        {/* Progress bar */}
        <div className="relative mb-12">
          <div className="h-px bg-border-light" />
          <motion.div
            className="absolute top-0 left-0 h-px bg-rl-red"
            style={{ width: progressWidth }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {dimensions.map((dim, i) => (
            <SectionReveal key={dim.id} delay={i * 0.1}>
              <div>
                <span className="font-mono text-mono-lg text-rl-red block mb-3">{dim.label}</span>
                <p className="text-body-md text-text-secondary">{dim.description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
