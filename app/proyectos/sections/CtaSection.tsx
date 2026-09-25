'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import CalendarButton from '@/components/ui/CalendarButton'

export default function CtaSection() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark mb-8">
              ¿Trabaja en una industria de bioeconomía y necesita un aliado estratégico con experiencia en campo?
            </h2>
            
            <div className="text-body-lg text-text-muted space-y-6 mb-12">
              <p>
                Nuestro trabajo no comienza en una sala de reuniones. Comienza donde el activo natural existe: en la cocha amazónica, en la parcela del pequeño agricultor, en la planta de procesamiento, en la mesa de negociación con el fondo de impacto.
              </p>
              <p>
                Si está buscando un aliado que combine ese conocimiento territorial con la capacidad de estructurar inversiones, diseñar modelos de negocio escalables y conectar su organización con mercados y capital de primer nivel. Conversemos.
              </p>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CalendarButton location="proyectos_cta">Hablar con el equipo</CalendarButton>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
