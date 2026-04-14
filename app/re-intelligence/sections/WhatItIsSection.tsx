'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

const isItems = [
  'Un briefing estratégico mensual personalizado para tu industria',
  'Acceso a modelos de IA entrenados con datos de campo reales',
  'Una red curada de 15 líderes de bioeconomía',
  'Sesiones de advisory 1:1 con el equipo senior',
  'Prioridad en deal flow y oportunidades de venture',
]

const isNotItems = [
  'Una newsletter genérica',
  'Un grupo de WhatsApp o comunidad masiva',
  'Acceso a contenido grabado o cursos',
  'Un servicio de consultoría disfrazado de suscripción',
  'Un networking event trimestral',
]

export default function WhatItIsSection() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Qué es y qué no es</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-16">
            Claridad ante todo.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <SectionReveal delay={0.1}>
            <div>
              <h3 className="text-label-md uppercase text-rl-red mb-6">Es</h3>
              <ul className="space-y-4">
                {isItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body-md text-text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div>
              <h3 className="text-label-md uppercase text-text-tertiary mb-6">No es</h3>
              <ul className="space-y-4">
                {isNotItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body-md text-text-secondary line-through decoration-border-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-border-light mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
