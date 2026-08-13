'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'

interface ServiceCtaProps {
  ctaLabel: string
}

export default function ServiceCta({ ctaLabel }: ServiceCtaProps) {
  return (
    <section className="bg-[#080808] py-24 md:py-32">
      <div className="container-rl text-center">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-2xl mx-auto mb-4">
            {ctaLabel.replace(/\s*→\s*$/, '')} <span aria-hidden="true">→</span>
          </h2>
          <p className="text-body-lg text-text-muted max-w-xl mx-auto mb-12">
            Conversación de fit de 30 minutos · Sin compromiso
          </p>
          <Button variant="primary" size="lg" href={SITE_CONFIG.calendarUrlFit}>
            Agendar conversación de fit &rarr;
          </Button>
        </SectionReveal>
      </div>
    </section>
  )
}
