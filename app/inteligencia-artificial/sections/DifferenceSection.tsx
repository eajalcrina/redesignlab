'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

export default function DifferenceSection() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">La diferencia</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-16">
            No somos una empresa de IA. Somos un estudio de bioeconomía que domina la IA.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <SectionReveal delay={0.1}>
            <div>
              <h3 className="text-label-md uppercase text-rl-red mb-6">Lo que hacemos diferente</h3>
              <ul className="space-y-4">
                {[
                  'Nuestros modelos se entrenan con datos de campo reales, no con datasets públicos',
                  'Implementamos en territorio, no en servidores remotos',
                  'Medimos resultados en operaciones reales, no en accuracy de modelos',
                  'El equipo combina data science con 10+ años en industrias de bioeconomía',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body-md text-text-on-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div>
              <h3 className="text-label-md uppercase text-text-muted mb-6">Lo que no hacemos</h3>
              <ul className="space-y-4">
                {[
                  'IA por la IA — solo implementamos donde hay impacto real medible',
                  'Soluciones genéricas que no entienden la industria',
                  'Proyectos de 18 meses sin resultados intermedios',
                  'Promesas de automatización total que ignoran el factor humano',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body-md text-text-muted line-through decoration-border-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-border-dark mt-2 flex-shrink-0" />
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
