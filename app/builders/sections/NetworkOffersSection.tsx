'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

const offers = [
  {
    title: 'Infraestructura de construcción',
    description: 'No empezar de cero. Como parte de la red, usted se apalanca en todas las capacidades de Redesign Lab: analistas de datos, asesores de innovación, arquitectos financieros y estructuradores legales.',
    mode: 'neutral' as const,
  },
  {
    title: 'Deal flow exclusivo',
    description: 'Acceso a oportunidades estructuradas. Ingresa directamente a resolver problemas que ya han sido filtrados comercialmente y cuya arquitectura general está definida.',
    mode: 'dark' as const,
  },
  {
    title: 'Doble apalancamiento',
    description: 'En resumen: Es la oportunidad de hacer el trabajo más relevante de su vida profesional, con el mayor apalancamiento posible, disminuyendo radicalmente el riesgo inherente al emprendimiento solitario.',
    mode: 'neutral' as const,
  },
]

export default function NetworkOffersSection() {
  return (
    <>
      <div className="section-dark py-12 md:py-16 text-center border-b border-border-dark">
        <SectionReveal>
          <Tag color="red" className="mb-4">IV. Por qué unirse a la Red de Builders</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mx-auto">
            La ventaja de no empezar de cero.
          </h2>
        </SectionReveal>
      </div>

      {offers.map((offer, i) => (
        <section
          key={offer.title}
          className={offer.mode === 'dark' ? 'section-dark' : 'section-neutral'}
        >
          <div className="container-rl py-16 md:py-20">
            <SectionReveal delay={0.05}>
              <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16">
                <span className="font-mono text-mono-md text-rl-red flex-shrink-0">
                  0{i + 1}
                </span>
                <div className="max-w-xl">
                  <h3
                    className={`font-display text-display-sm mb-3 ${
                      offer.mode === 'dark' ? 'text-text-on-dark' : 'text-text-primary'
                    }`}
                  >
                    {offer.title}
                  </h3>
                  <p
                    className={`text-body-md ${
                      offer.mode === 'dark' ? 'text-text-muted' : 'text-text-secondary'
                    }`}
                  >
                    {offer.description}
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
      ))}
    </>
  )
}
