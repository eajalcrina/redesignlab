'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

const left = [
  'Due diligence técnico con visita de campo en comunidades amazónicas, zonas pesqueras y territorios agrícolas remotos',
  'Diagnóstico con el BIRF — la única herramienta de investment readiness diseñada específicamente para bionegocios de bioeconomía en LATAM',
  'Monitoreo de portafolio con IA que cubre variables técnicas y de activo natural',
  'Acompañamiento pre-inversión ejecutado por el mismo equipo que co-funda ventures del sector',
  'Track record: USD 1.5 millones levantados + USD 80 millones acompañados',
]

const right = [
  'Análisis financiero convencional',
  'Due diligence ESG genérico',
  'Revisión documental de impacto',
  'Frameworks de reporte estándar',
]

export default function WhySection() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Por qué Redesign Lab</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            No somos otra consultora. Somos operadores de bioeconomía.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <SectionReveal delay={0.1}>
            <div>
              <h3 className="text-label-md uppercase text-rl-red mb-6">LO QUE SOLO REDESIGN LAB PUEDE HACER</h3>
              <ul className="space-y-4">
                {left.map((item) => (
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
              <h3 className="text-label-md uppercase text-text-tertiary mb-6">LO QUE OTRAS FIRMAS PUEDEN HACER</h3>
              <ul className="space-y-4">
                {right.map((item) => (
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
