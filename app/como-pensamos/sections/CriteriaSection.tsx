'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import Divider from '@/components/ui/Divider'

const criteria = {
  consultoria: {
    title: 'Consultoría',
    items: [
      'Industrias de bioeconomía con operaciones activas',
      'Facturación mínima USD 500K anuales',
      'Equipo directivo dispuesto a rediseñar, no solo optimizar',
      'Operaciones en América Latina',
    ],
  },
  ventures: {
    title: 'Ventures',
    items: [
      'Oportunidades en cadenas de valor de bioeconomía',
      'Potencial de escala regional o global',
      'Alineación con los ODS y métricas de impacto',
      'Capacidad de co-inversión o aporte de territorio',
    ],
  },
  fondos: {
    title: 'Fondos',
    items: [
      'Mandato de inversión en bioeconomía o impacto ambiental',
      'Ticket mínimo USD 500K por deal',
      'Pipeline en América Latina',
      'Necesidad de validación técnica y de campo',
    ],
  },
}

export default function CriteriaSection() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">
            Criterios de selección
          </Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-4">
            No trabajamos con todos. Y eso es intencional.
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mb-16">
            Nuestra selectividad nos permite mantener la profundidad que cada proyecto requiere.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {Object.entries(criteria).map(([key, category], i) => (
            <SectionReveal key={key} delay={i * 0.1}>
              <div>
                <h3 className="font-display text-display-sm text-text-primary mb-6">
                  {category.title}
                </h3>
                <Divider variant="red" className="w-12 mb-6" />
                <ul className="space-y-4">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-body-md text-text-secondary"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
