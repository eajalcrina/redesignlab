'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

const pillars = [
  {
    title: 'Diseño estratégico desde el día uno',
    description: 'Cada venture en nuestro portafolio atraviesa un proceso intensivo de diseño y estructuración, sin improvisación. Desde el modelo de negocio hasta la estrategia de go-to-market.',
  },
  {
    title: 'Intervención en el territorio',
    description: 'Nuestro trabajo no se hace desde el escritorio. Las capacidades de Redesign Lab operan directamente allí donde el activo natural está (en el campo, planta o comunidad).',
  },
  {
    title: 'IA como infraestructura habilitadora',
    description: 'No es una novedad pasajera; es la capa funcional que maximiza productividad. Usamos inteligencia artificial para comprimir el tiempo de prospección, análisis normativo y modelamiento operativo.',
  },
]

export default function PillarsSection() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">III. Tres pilares que definen nuestro ecosistema</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            No financiamos ideas. Co-fundamos negocios usando este framework.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <SectionReveal key={pillar.title} delay={i * 0.1} className="h-full">
              <div className="h-full flex flex-col p-8 border border-border-light rounded hover:border-rl-red/20 hover:bg-rl-dark hover:text-text-on-dark transition-all duration-300 group">
                <span className="font-mono text-mono-sm text-rl-red block mb-4">0{i + 1}</span>
                <h3 className="font-display text-display-sm text-text-primary group-hover:text-text-on-dark mb-3 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-body-sm text-text-secondary group-hover:text-text-muted transition-colors">
                  {pillar.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
