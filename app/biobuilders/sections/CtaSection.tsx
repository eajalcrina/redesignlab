'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { BIOBUILDERS_FORM_URL } from '@/lib/constants'

export default function CtaSection() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <SectionLabel n="02" tone="dark" className="mb-6">Súmate a la red</SectionLabel>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-6">
            ¿Eres desarrollador de negocios? Súmate a escalar bionegocios en toda la región.
          </h2>
          <p className="text-body-lg text-text-muted max-w-2xl mb-10">
            Conectamos tu experiencia liderando empresas con bionegocios que están listos para escalar. Escríbete en el formulario y conversamos.
          </p>
          <Button size="lg" href={BIOBUILDERS_FORM_URL} target="_blank" rel="noopener noreferrer" arrow>
            Postula a la red de Bio/Builders
          </Button>
        </SectionReveal>
      </div>
    </section>
  )
}
