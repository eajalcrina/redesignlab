'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'

export default function CtaSection() {
  return (
    <section className="bg-[#080808] text-text-on-dark py-24 md:py-32">
      <div className="container-rl text-center">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mx-auto mb-6">
            ¿Quieres que diseñemos algo específico para tu industria?
          </h2>
          <p className="text-body-lg text-text-muted max-w-xl mx-auto mb-12">
            Creamos recursos a medida para organizaciones que están liderando la transformación en bioeconomía.
          </p>
          <Button variant="primary" size="lg" href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Conocimiento — Recurso a medida')}`}>
            Conversar &rarr;
          </Button>
        </SectionReveal>
      </div>
    </section>
  )
}
