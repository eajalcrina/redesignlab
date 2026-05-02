'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

export default function ClosingNoteSection() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <div className="max-w-3xl mx-auto">
          <SectionReveal>
            <Tag color="red" className="mb-4">Una última cosa</Tag>
            <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark mb-10">
              Re. Intelligence no es el servicio correcto para todas las empresas ni para todos los momentos.
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="space-y-6 text-body-lg text-text-muted">
              <p>
                Es correcto para los que ya saben qué están construyendo — y que necesitan que alguien piense con ellos en cómo construirlo mejor, más rápido y con más inteligencia de la que pueden generar solos.
              </p>
              <p>
                Lite o Pro depende del tipo de acompañamiento que el momento del negocio requiere. Lite si necesitas un interlocutor externo de criterio para acompañar las decisiones — sin integración sistemática de datos. Pro si necesitas que alguien articule la información del negocio, la procese y entregue planes accionables que tu equipo va a ejecutar mes a mes.
              </p>
              <p className="text-text-on-dark font-medium pt-2">
                La conversación de fit decide cuál es la correcta.
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
