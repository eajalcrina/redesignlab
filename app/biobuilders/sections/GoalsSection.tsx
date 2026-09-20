'use client'

import SectionReveal from '@/components/animations/SectionReveal'

const goals = [
  { label: '01 · Comercial', text: 'Bionegocios que escalan comercialmente y acceden a mercados más grandes y exigentes.' },
  { label: '02 · Rentabilidad', text: 'Negocios rentables, sólidos e invertibles, que generan recursos para su propio escalamiento.' },
  { label: '03 · Territorio', text: 'Desarrollo social, económico y ambiental en el territorio y sus comunidades.' },
]

export default function GoalsSection() {
  return (
    <section className="bg-white text-text-primary py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-6">
            Lo que buscamos lograr
          </h2>
          <p className="text-body-lg text-text-secondary max-w-3xl mb-14">
            Lo social y lo ambiental son los frentes en los que la mayoría de actores ya está trabajando y fortaleciendo. Nosotros ponemos el foco en el negocio: la pieza que casi nadie más está mirando de cerca.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {goals.map((g, i) => (
            <SectionReveal key={g.label} delay={i * 0.1}>
              <div className="border-t-2 border-rl-red pt-5">
                <span className="font-mono text-mono-sm text-rl-red uppercase tracking-[0.18em] block mb-3">{g.label}</span>
                <p className="font-display text-display-sm text-text-primary">{g.text}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
