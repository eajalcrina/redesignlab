'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

export default function WhatIsAIStudio() {
  return (
    <section className="section-dark py-16 md:py-24">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">¿QUÉ ES UN AI STUDIO?</Tag>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="max-w-3xl space-y-6">
            <p className="text-body-lg text-text-on-dark font-medium">
              Un AI Studio no es una consultora que aprendió a usar ChatGPT.
            </p>
            <p className="text-body-lg text-text-muted">
              Un AI Studio trabaja diferente. La inteligencia artificial opera desde el centro. En el análisis, en el diseño, en la decisión.
            </p>
            <p className="text-body-lg text-text-muted">
              Las herramientas son las mismas para todos. Lo que cambia es lo que alimenta a esas herramientas.
            </p>
            <p className="text-body-lg text-text-muted">
              IA sobre datos genéricos produce resultados genéricos. IA construida sobre cinco años en campo, en parcelas de San Martín, en asambleas comunales de Loreto, en mesas de negociación con fondos de impacto, en viajes negociando con clientes globales, produce algo que ninguna oficina replica.
            </p>
            <p className="text-body-lg text-text-on-dark font-medium">
              Redesign Lab es el único AI Studio en América Latina construido sobre conocimiento territorial de la bioeconomía.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
