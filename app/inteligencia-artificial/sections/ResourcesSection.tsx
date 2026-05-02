'use client'

import { useState } from 'react'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import ResourceDrawer, { type Resource } from '@/components/ui/ResourceDrawer'

const resources: (Resource & { type: string })[] = [
  {
    slug: 'ia-bioeconomia-guia',
    name: 'Guía: IA para bioeconomía, por dónde empezar',
    type: 'PDF',
    description: 'Un framework práctico para identificar y priorizar casos de uso de IA en industrias de bioeconomía.',
    downloadUrl: '#',
  },
  {
    slug: 're-ia-canvas',
    name: 'Re.·IA Canvas',
    type: 'Template',
    description: 'El canvas que usamos internamente para diseñar aplicaciones de IA. Descárgalo y úsalo en tu organización.',
    downloadUrl: '#',
  },
  {
    slug: 'ia-bioeconomia-benchmark-2024',
    name: 'Benchmark: adopción de IA en bioeconomía LATAM',
    type: 'Informe',
    description: 'Datos de adopción de IA en 6 industrias de bioeconomía en América Latina. Actualización 2024.',
    downloadUrl: '#',
  },
]

export default function ResourcesSection() {
  const [drawerResource, setDrawerResource] = useState<Resource | null>(null)

  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Recursos</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            Herramientas abiertas para acelerar tu adopción de IA.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource, i) => (
            <SectionReveal key={resource.slug} delay={i * 0.1}>
              <div className="border border-border-light p-6 rounded hover:border-rl-red/20 transition-colors h-full flex flex-col">
                <span className="text-label-sm uppercase text-rl-red block mb-3">{resource.type}</span>
                <h3 className="font-display text-display-sm text-text-primary mb-3">{resource.name}</h3>
                <p className="text-body-sm text-text-secondary mb-6 flex-1">{resource.description}</p>
                <Button
                  variant="text"
                  className="text-text-primary"
                  onClick={() => setDrawerResource(resource)}
                >
                  Descargar
                </Button>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      <ResourceDrawer
        isOpen={!!drawerResource}
        resource={drawerResource}
        onClose={() => setDrawerResource(null)}
      />
    </section>
  )
}
