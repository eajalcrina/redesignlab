'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'

export default function CtaSection() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl text-center">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mx-auto mb-6">
            Construyamos el futuro de la bioeconomía en América Latina.
          </h2>
          <p className="text-body-lg text-text-muted max-w-xl mx-auto mb-12">
            Si su perfil combina el conocimiento del campo con el rigor corporativo, y está buscando el apalancamiento institucional para dar un salto en impacto y retorno — contáctenos.
          </p>
          <Button variant="primary" size="lg" href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Builders — Postulación')}`}>
            Postúlese o contáctenos directamente &rarr;
          </Button>
        </SectionReveal>
      </div>
    </section>
  )
}
