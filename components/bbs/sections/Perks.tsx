'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

interface PerksProps {
  all: string[]
  topHeading: string
  top: string[]
}

export default function Perks({ all, topHeading, top }: PerksProps) {
  return (
    <section className="section-neutral py-14 md:py-20">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">
            Perks
          </Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            Lo que va más allá del programa
          </h2>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-12">
          <SectionReveal delay={0.05}>
            <div>
              <p className="text-label-sm font-mono uppercase tracking-[0.18em] text-text-tertiary mb-6">
                Para todos los participantes
              </p>
              <ul className="space-y-4">
                {all.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-rl-red flex-shrink-0 mt-0.5">✦</span>
                    <span className="text-body-md text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="bg-rl-dark text-text-on-dark rounded p-8">
              <p className="font-display text-display-sm text-text-on-dark mb-6">
                {topHeading}
              </p>
              <ul className="space-y-3">
                {top.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-rl-red flex-shrink-0 mt-0.5">✦</span>
                    <span className="text-body-md text-text-muted">{item}</span>
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
