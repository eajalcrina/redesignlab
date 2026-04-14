'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import Divider from '@/components/ui/Divider'

interface ReIntelligenceBlockProps {
  expanded?: boolean
}

const benefits = [
  '4 horas de acceso C-Level directo — con Eddie Ajalcriña o Lorenzo Ortiz',
  'Re. Intelligence Brief mensual personalizado por industria y momento',
  '2 consultas adicionales de 30 min con especialistas de la red',
  'Acceso anticipado a todos los frameworks y publicaciones',
  'Prioridad en proyectos y condiciones preferenciales en todos los servicios',
]

export default function ReIntelligenceBlock({
  expanded = false,
}: ReIntelligenceBlockProps) {
  return (
    <section className="bg-[#080808] text-text-on-dark py-24 md:py-32">
      <div className="container-rl">
        <div className="max-w-[720px] mx-auto">
          <SectionReveal>
            <Tag color="red" className="mb-6">
              EMPIEZA A TRANSFORMAR TU NEGOCIO
            </Tag>

            <p className="font-mono text-mono-lg text-rl-red mb-4">
              USD 3,000 / mes
            </p>

            <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark mb-4">
              Re. Intelligence
            </h2>

            <p className="text-body-lg text-text-muted mb-6">
              Máximo 15 miembros. Siempre.
            </p>

            <Divider variant="red" className="w-16 mb-8" animated />

            <p className="font-display text-display-sm text-text-on-dark mb-6">
              Hay decisiones que no se pueden tomar bien sin el criterio correcto en el momento correcto.
            </p>

            <p className="text-body-md text-text-muted mb-4">
              No es una suscripción a contenido. No es consultoría recurrente con entregables mensuales. Es acceso directo al criterio, la red y la inteligencia de mercado de Redesign Lab — aplicados al contexto específico de cada miembro, cada mes.
            </p>

            <p className="text-body-md text-text-muted mb-12">
              Máximo 15 miembros. Siempre. Porque con 16, el producto deja de ser lo que es.
            </p>
          </SectionReveal>

          {expanded && (
            <div className="space-y-4 mb-12">
              {benefits.map((benefit, i) => (
                <SectionReveal key={i} delay={i * 0.08}>
                  <div className="flex items-start gap-3 border-b border-border-dark pb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                    <p className="text-body-md text-text-on-dark">
                      {benefit}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          )}

          <SectionReveal delay={0.3}>
            <Button variant="primary" size="lg" href="/re-intelligence">
              Solicitar información sobre Re. Intelligence →
            </Button>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
