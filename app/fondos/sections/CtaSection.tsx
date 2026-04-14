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
            La conversación correcta comienza aquí
          </h2>
          <p className="text-body-lg text-text-muted max-w-xl mx-auto mb-12">
            Redesign Lab trabaja con un número acotado de fondos por año — los que tienen el mandato, la seriedad operativa y el horizonte de inversión compatibles con lo que las industrias de bioeconomía requieren.
          </p>
          <Button variant="primary" size="lg" href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Fondos — Conversemos')}`}>
            Iniciar conversación &rarr;
          </Button>
        </SectionReveal>
      </div>
    </section>
  )
}
