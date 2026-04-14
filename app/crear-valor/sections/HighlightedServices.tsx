'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import { SITE_CONFIG } from '@/lib/constants'
import type { Service } from '@/data/services'

interface HighlightedServicesProps {
  services: Service[]
}

export default function HighlightedServices({ services }: HighlightedServicesProps) {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Puntos de entrada</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-12">
            ¿No sabes por dónde empezar? Estos son los dos servicios diseñados para eso.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <SectionReveal key={service.name} delay={i * 0.1}>
              <div className="border border-rl-red/30 bg-rl-red/5 rounded-lg p-8 md:p-10 hover:bg-rl-red/10 transition-colors">
                <h3 className="font-display text-display-md md:text-display-lg text-text-on-dark mb-3">
                  {service.name}
                </h3>
                <p className="font-mono text-mono-md text-rl-red mb-4">
                  {service.price ? `${service.duration} · ${service.price}` : service.duration}
                </p>
                <p className="text-body-md text-text-muted mb-6">
                  {service.description}
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(service.name)}`}
                >
                  Solicitar {service.name} &rarr;
                </Button>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
