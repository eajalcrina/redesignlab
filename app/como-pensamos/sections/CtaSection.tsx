'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'

export default function CtaSection() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl text-center">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mx-auto mb-6">
            De cómo pensamos a cómo trabajamos.
          </h2>
          <p className="text-body-lg text-text-muted max-w-xl mx-auto mb-12">
            Conoce los proyectos donde hemos aplicado estos principios y las ventures que estamos construyendo.
          </p>

          <Divider variant="red" className="w-16 mx-auto mb-12" animated />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/proyectos">
              Ver proyectos
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/ventures"
              className="text-text-on-dark border-text-on-dark/20"
            >
              Explorar ventures
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
