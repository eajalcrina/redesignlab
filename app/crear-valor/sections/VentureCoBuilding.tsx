'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import type { Service } from '@/data/services'

interface VentureCoBuildingProps {
  service: Service
}

export default function VentureCoBuilding({ service }: VentureCoBuildingProps) {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <div className="max-w-3xl mx-auto text-center">
          <SectionReveal>
            <Tag color="red" className="mb-6">
              CO-FUNDAMOS NEGOCIOS
            </Tag>
            <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark mb-6">
              Venture Co-Building
            </h2>
            <p className="text-body-lg text-rl-red mb-6">
              Para quienes no buscan un consultor — buscan un co-fundador.
            </p>
            <p className="text-body-md text-text-muted max-w-2xl mx-auto mb-10 whitespace-pre-line text-left sm:text-center">
              {service.description}
            </p>
            <Button
              variant="primary"
              size="lg"
              href="mailto:eddie@redesignlab.org?subject=Venture%20Co-Building"
            >
              Iniciar conversación &rarr;
            </Button>
            <p className="text-body-sm text-text-muted/70 mt-4">
              Conversación previa de fit · Sin compromiso
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
