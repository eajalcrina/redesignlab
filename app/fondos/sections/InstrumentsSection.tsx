'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

const instruments = [
  { name: 'Grants / Fondos no reembolsables', icon: '◆' },
  { name: 'Deuda de impacto', icon: '◇' },
  { name: 'Green loans', icon: '○' },
  { name: 'Blended finance', icon: '◈' },
  { name: 'Equity de impacto', icon: '◉' },
  { name: 'Venture capital de impacto', icon: '◎' },
]

export default function InstrumentsSection() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Instrumentos que conocemos</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-4">
            Instrumentos que conocemos
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mb-12">
            Experiencia directa articulando los instrumentos de capital más relevantes para la bioeconomía en América Latina.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {instruments.map((inst, i) => (
            <SectionReveal key={inst.name} delay={i * 0.04}>
              <div className="flex items-center gap-3 py-4">
                <span className="text-rl-red text-lg">{inst.icon}</span>
                <span className="text-body-sm text-text-primary">{inst.name}</span>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
