'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import ServiciosConsultoriaForm from '@/components/forms/ServiciosConsultoriaForm'
import Tag from '@/components/ui/Tag'

type Category = 'Pon Orden' | 'Consigue Capital' | 'Vende más'

interface ServiceCtaProps {
  category: Category
  ctaLabel: string
  messagePlaceholder: string
  iaBlurb: string
}

export default function ServiceCta({ category, ctaLabel, messagePlaceholder, iaBlurb }: ServiceCtaProps) {
  return (
    <section className="bg-[#080808] py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-2xl mb-4">
            {ctaLabel.replace(/\s*→\s*$/, '')} <span aria-hidden="true">→</span>
          </h2>
          <p className="text-body-lg text-text-muted max-w-xl mb-4">
            Conversación de fit de 30 minutos · Sin compromiso
          </p>
          <Tag color="red" className="mb-2">Integración con IA</Tag>
          <p className="text-body-sm text-text-muted/70 italic max-w-xl mb-12">
            {iaBlurb}
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="max-w-2xl mx-auto">
            <ServiciosConsultoriaForm category={category} messagePlaceholder={messagePlaceholder} />
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
