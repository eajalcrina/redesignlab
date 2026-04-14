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
            <Tag color="red" className="mb-4">
              Venture Co-Building
            </Tag>
            <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark mb-6">
              Venture Co-Building
            </h2>
            <p className="text-body-lg text-text-muted mb-4">
              Para quienes no buscan un consultor — buscan un co-fundador
            </p>
            <p className="text-body-md text-text-muted max-w-2xl mx-auto mb-8">
              {service.description}
            </p>
            <Button
              variant="secondary"
              size="lg"
              href="mailto:eddie@redesignlab.org?subject=Venture%20Co-Building"
              className="text-white border-white/30 hover:bg-white/10"
            >
              Iniciar conversacion &rarr;
            </Button>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
