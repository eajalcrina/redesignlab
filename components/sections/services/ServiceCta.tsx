'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import ReIntelligenceForm, { type ServiceInterest } from '@/components/forms/ReIntelligenceForm'

interface ServiceCtaProps {
  ctaLabel: string
  defaultServiceInterest: ServiceInterest
}

export default function ServiceCta({ ctaLabel, defaultServiceInterest }: ServiceCtaProps) {
  return (
    <section className="bg-[#080808] py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-2xl mb-4">
            {ctaLabel.replace(/\s*→\s*$/, '')} <span aria-hidden="true">→</span>
          </h2>
          <p className="text-body-lg text-text-muted max-w-xl mb-12">
            Conversación de fit de 30 minutos · Sin compromiso
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="max-w-2xl mx-auto">
            <ReIntelligenceForm defaultServiceInterest={defaultServiceInterest} />
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
