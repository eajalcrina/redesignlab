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
            ¿Listo para aplicar IA donde realmente importa?
          </h2>
          <p className="text-body-lg text-text-muted max-w-xl mx-auto mb-12">
            Un diagnóstico rápido para identificar dónde la IA puede generar más impacto en tu operación.
          </p>
          <Button variant="primary" size="lg" href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('IA — Diagnóstico')}`}>
            Solicitar diagnóstico &rarr;
          </Button>
        </SectionReveal>
      </div>
    </section>
  )
}
