'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Divider from '@/components/ui/Divider'

export default function WhyFifteenSection() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <div className="max-w-3xl mx-auto text-center">
          <SectionReveal>
            <h2 className="font-display text-display-md md:text-display-lg lg:text-display-xl text-text-on-dark mb-8">
              ¿Por qué 15 y no más?
            </h2>
            <Divider variant="red" className="w-16 mx-auto mb-8" animated />
            <p className="text-body-xl text-text-muted mb-6">
              Porque la calidad de la inteligencia depende de la profundidad de la relación.
            </p>
            <p className="text-body-lg text-text-muted">
              Con 15 miembros podemos personalizar cada briefing, conocer cada negocio en profundidad y facilitar conexiones que realmente generen valor. Más miembros diluirían lo que hace especial a Re. Intelligence.
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
