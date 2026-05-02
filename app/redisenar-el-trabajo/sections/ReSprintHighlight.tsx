'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'
import type { Service } from '@/data/services'

interface ReSprintHighlightProps {
  service: Service
}

export default function ReSprintHighlight({ service }: ReSprintHighlightProps) {
  return (
    <section className="section-accent py-16 md:py-24">
      <div className="container-rl text-center">
        <SectionReveal>
          <p className="font-mono text-mono-sm text-white/60 uppercase tracking-wider mb-4">
            La puerta de entrada
          </p>
          <h2 className="font-display text-display-md md:text-display-lg text-white mb-2">
            {service.name}
          </h2>
          <p className="text-body-lg text-white/80 max-w-xl mx-auto mb-2">
            El primer paso cuando la dirección es clara pero el punto de partida no lo es.
          </p>
          <p className="font-mono text-mono-lg text-white/80 mb-6">
            {service.duration} · {service.price}
          </p>
          <p className="text-body-md text-white/70 max-w-xl mx-auto mb-4">
            {service.description}
          </p>
          <p className="text-body-sm text-white/50 max-w-lg mx-auto italic mb-8">
            Muchos proyectos en esta dirección comienzan con un Re. Sprint. Algunos Re. Sprints concluyen con la recomendación de no seguir, y eso también es valor.
          </p>
          <Button
            variant="secondary"
            size="lg"
            href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Re. Sprint')}`}
            className="text-white border-white/30 hover:bg-white/10"
          >
            Solicitar Re. Sprint &rarr;
          </Button>
        </SectionReveal>
      </div>
    </section>
  )
}
