'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'

export default function CtaSection() {
  return (
    <section className="bg-[#080808] py-24 md:py-32">
      <div className="container-rl text-center">
        <SectionReveal>
          <p className="font-mono text-mono-lg text-rl-red mb-6">USD 3,000 / mes</p>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mx-auto mb-6">
            Si lideras en bioeconomía, este asiento es para ti.
          </h2>
          <p className="text-body-lg text-text-muted max-w-xl mx-auto mb-12">
            Completa tu solicitud y conversamos esta semana.
          </p>
          <Button variant="primary" size="lg" href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Re. Intelligence — Solicitud')}`}>
            Solicitar mi asiento &rarr;
          </Button>
        </SectionReveal>
      </div>
    </section>
  )
}
