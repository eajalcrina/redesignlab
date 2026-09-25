'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import CalendarButton from '@/components/ui/CalendarButton'

export default function CtaSection() {
  return (
    <section className="section-dark" data-no-announce>
      <div className="container-rl py-24 md:py-32">
        <SectionReveal>
          <h2 className="max-w-[1000px] border-t border-border-dark pt-10 font-sans text-[32px] font-normal leading-[1.04] tracking-[-0.035em] text-text-on-dark md:pt-12 md:text-[46px]">
            ¿Trabaja en una industria de bioeconomía y necesita un aliado estratégico con experiencia en campo?
          </h2>

          <div className="mt-10 grid grid-cols-1 items-end gap-10 md:mt-14 lg:grid-cols-12 lg:gap-6">
            <div className="space-y-5 text-[16px] leading-[1.7] text-text-muted md:text-[17px] lg:col-span-7">
              <p>
                Nuestro trabajo no comienza en una sala de reuniones. Comienza donde el activo natural existe: en la cocha amazónica, en la parcela del pequeño agricultor, en la planta de procesamiento, en la mesa de negociación con el fondo de impacto.
              </p>
              <p>
                Si está buscando un aliado que combine ese conocimiento territorial con la capacidad de estructurar inversiones, diseñar modelos de negocio escalables y conectar su organización con mercados y capital de primer nivel. Conversemos.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
              <CalendarButton location="proyectos_cta">Hablar con el equipo</CalendarButton>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
