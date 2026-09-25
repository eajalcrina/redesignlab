'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import CalendarButton from '@/components/ui/CalendarButton'

export default function CtaSection() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl text-center">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mx-auto mb-6">
            ¿Quieres que diseñemos algo específico para tu industria?
          </h2>
          <p className="text-body-lg text-text-secondary max-w-xl mx-auto mb-12">
            Creamos recursos a medida para organizaciones que están liderando la transformación en bioeconomía.
          </p>
          <CalendarButton location="conocimiento_cta">Conversar</CalendarButton>
        </SectionReveal>
      </div>
    </section>
  )
}
