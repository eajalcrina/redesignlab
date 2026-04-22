'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

const riDoes = [
  'Procesa la información del negocio con IA',
  'Diseña escenarios estratégicos con criterio',
  'Mapea oportunidades de mercado y de capital',
  'Identifica los problemas que frenan el crecimiento',
  'Entrega planes destilados y accionables',
]

const teamDoes = [
  'Ejecuta los planes con la claridad que el análisis externo produce',
  'Acciona las oportunidades identificadas',
  'Gestiona la implementación operativa',
]

const isNotItems = [
  'Un newsletter con tendencias de la industria',
  'Una suscripción a contenido',
  'Consultoría puntual con entregables mensuales',
]

export default function WhatItIsSection() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Qué es Re. Intelligence — y qué no es</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-10">
            El equipo de pensamiento estratégico externo de tu empresa.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="max-w-3xl space-y-6 text-body-lg text-text-muted mb-16">
            <p>
              Re. Intelligence no es un newsletter con tendencias de la industria. No es una suscripción a contenido. No es consultoría puntual con entregables mensuales.
            </p>
            <p>
              Es el equipo de pensamiento estratégico externo de tu empresa — el que procesa la información, diseña los escenarios, mapea las oportunidades y entrega los planes para que tu equipo accione.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="border-l-2 border-rl-red pl-6 max-w-3xl mb-20">
            <p className="font-mono text-mono-sm text-rl-red uppercase tracking-[0.18em] mb-3">
              Una distinción que importa
            </p>
            <p className="font-display text-display-sm text-text-on-dark mb-4">
              Redesign Lab piensa, analiza, diseña y entrega. Tu equipo ejecuta.
            </p>
            <p className="text-body-md text-text-muted">
              Eso no significa que Re. Intelligence sea solo diagnóstico — es uno de los malentendidos más frecuentes que hemos encontrado. Significa que el valor de Re. Intelligence está en producir la inteligencia más precisa posible para que las decisiones de tu empresa sean mejores — y para que tu equipo actúe con una claridad que no tendría de otra forma.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10">
          <SectionReveal delay={0.2}>
            <div className="border border-border-dark p-8 rounded h-full">
              <h3 className="text-label-md uppercase text-rl-red mb-6">Re. Intelligence hace</h3>
              <ul className="space-y-4">
                {riDoes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body-md text-text-on-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.25}>
            <div className="border border-border-dark p-8 rounded h-full">
              <h3 className="text-label-md uppercase text-text-on-dark mb-6">Tu equipo hace</h3>
              <ul className="space-y-4">
                {teamDoes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body-md text-text-on-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-on-dark mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.3}>
          <div className="max-w-3xl mb-12">
            <h3 className="text-label-md uppercase text-text-muted mb-6">No es</h3>
            <ul className="space-y-3">
              {isNotItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body-md text-text-muted line-through decoration-border-dark">
                  <span className="w-1.5 h-1.5 rounded-full bg-border-dark mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.35}>
          <div className="max-w-3xl text-body-md text-text-muted border-t border-border-dark pt-8">
            <p>
              <span className="text-text-on-dark font-medium">Si tu empresa no tiene el equipo para ejecutar alguna de estas áreas:</span>
              {' '}
              Redesign Lab puede ofrecer servicios complementarios especializados — desde la misma red de Builders que hace posible Re. Intelligence.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
