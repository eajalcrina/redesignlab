'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'

const outcomes = ['Escalamiento comercial', 'Negocio rentable y sólido', 'Impacto en el territorio']

const Arrow = () => (
  <div className="flex justify-center py-3 text-rl-red text-display-sm" aria-hidden="true">
    &darr;
  </div>
)

export default function HowItWorksSection() {
  return (
    <section className="bg-rl-white text-text-primary py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-14">
            Cómo funciona
          </h2>
        </SectionReveal>

        <SectionReveal>
          <div className="max-w-4xl mx-auto">
            {/* Dos actores */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch gap-3 md:gap-4">
              <div className="bg-white border border-border-light rounded p-6">
                <span className="font-mono text-mono-sm text-rl-red block mb-2">01 · Bionegocios en territorio</span>
                <p className="text-body-md text-text-secondary">
                  Asociaciones, cooperativas y MYPES con negocios en marcha, apalancados en la biodiversidad y sus comunidades.
                </p>
              </div>
              <div className="flex items-center justify-center font-display text-display-md text-rl-red" aria-hidden="true">+</div>
              <div className="bg-white border border-border-light rounded p-6">
                <span className="font-mono text-mono-sm text-rl-red block mb-2">02 · Desarrolladores de negocio</span>
                <p className="text-body-md text-text-secondary">
                  Profesionales con trayectoria real liderando y escalando empresas.
                </p>
              </div>
            </div>

            <Arrow />

            {/* Nodo central */}
            <div className="section-dark rounded p-6 text-center max-w-sm mx-auto">
              <span className="font-mono text-mono-sm text-rl-red block mb-2 uppercase tracking-[0.18em]">El puente</span>
              <span className="font-display text-display-md">Redesign Lab</span>
            </div>

            <Arrow />

            {/* Resultados */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {outcomes.map((o) => (
                <div key={o} className="border border-rl-red/40 rounded p-5 text-center font-display text-display-sm text-text-primary">
                  {o}
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="max-w-3xl mt-14 space-y-5 text-body-lg text-text-secondary">
            <p>
              Llevamos años trabajando con bionegocios en distintos territorios de América Latina, entendiendo sus desafíos y su potencial. Ese mismo trabajo lo hacemos con desarrolladores de negocio: mapeamos su experiencia, entendemos qué buscan en esta nueva etapa, y los preparamos para entrar a un contexto distinto al que vienen, el de los bionegocios en territorio.
            </p>
            <p>
              Cuando encontramos un punto de encuentro real entre ambos, expectativas alineadas y visión compartida, ahí nace la relación de negocios: el desarrollador se suma como co-founder. De esa asociación se desbloquea lo que al bionegocio le faltaba para escalar: estrategia comercial, acceso a financiamiento, gerenciamiento.
            </p>
          </div>
          <div className="mt-8">
            <Button variant="text" href="/ventures" className="text-text-primary font-medium">
              Conoce nuestro portafolio de empresas
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
