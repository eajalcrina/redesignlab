'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

export default function HowItWorks() {
  return (
    <section className="section-neutral py-16 md:py-20">
      <div className="container-rl">
        <SectionReveal>
          <div className="max-w-2xl">
            <Tag color="red" className="mb-4">Cómo funciona</Tag>
            <h3 className="font-display text-display-sm text-text-primary mb-4">
              Descarga gratuita con registro
            </h3>
            <p className="text-body-md text-text-secondary mb-4">
              Todos nuestros recursos son gratuitos. Solo pedimos tu nombre, organización y email para enviarte el recurso y mantenerte informado cuando publiquemos nuevos materiales.
            </p>
            <p className="text-body-sm text-text-tertiary">
              No enviamos spam. Solo notificaciones de nuevos recursos relevantes.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
