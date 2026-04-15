'use client'

import { useState } from 'react'
import Image from 'next/image'
import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import ResourceDrawer from '@/components/ui/ResourceDrawer'

const resources = [
  {
    slug: 'birf',
    name: 'BIRF — Bionegocio Investment Readiness Framework',
    type: 'Disponible ahora · 15 páginas · PDF · Español',
    description: 'La herramienta que evalúa lo que el pitch deck no dice. Seis dimensiones de madurez, cuatro niveles de investment readiness, señales de identificación concretas.',
    downloadUrl: '#',
    mode: 'neutral' as const,
    available: true,
    image: '/assets/conocimiento/birf.jpg',
  },
  {
    slug: 're-ia-propuesta',
    name: 'Re.·IA — Una propuesta para industrias de bioeconomía',
    type: 'Disponible ahora · PDF · Español',
    description: 'Cómo la inteligencia artificial produce valor real en industrias donde el activo central es un sistema vivo. Cuatro dimensiones de madurez y diagnóstico de autoevaluación.',
    downloadUrl: '#',
    mode: 'dark' as const,
    available: true,
    image: '/assets/conocimiento/re-ia.jpg',
  },
  {
    slug: 'due-diligence-tecnico',
    name: 'Guía de Due Diligence Técnico para Bionegocios',
    type: 'Disponible ahora · PDF · Español',
    description: 'Las preguntas que hay que hacer en el territorio, las señales que hay que observar y los documentos que hay que solicitar — con criterio técnico, no solo financiero.',
    downloadUrl: '#',
    mode: 'neutral' as const,
    available: true,
    image: '/assets/conocimiento/due-diligence.jpg',
  },
  {
    slug: 'inversion-comunidades-nativas',
    name: 'Guía de Inversión con Comunidades Nativas',
    type: 'Disponible ahora · PDF · Español',
    description: 'Cinco años operando en territorios indígenas de la Amazonía peruana, condensados en una guía práctica de criterio para quien toma decisiones sobre capital en estos contextos.',
    downloadUrl: '#',
    mode: 'dark' as const,
    available: true,
    image: '/assets/conocimiento/comunidades-nativas.jpg',
  },
  {
    slug: 'blended-finance-design',
    name: 'Blended Finance Design Guide',
    type: 'Próximamente',
    description: 'Guía práctica para el diseño de instrumentos de blended finance aplicada al contexto específico de proyectos de bioeconomía, economía circular y agricultura regenerativa en América Latina.',
    downloadUrl: '#',
    mode: 'neutral' as const,
    available: false,
    image: '/assets/conocimiento/blended-finance.jpg',
  },
]

export default function ResourcesList() {
  const [drawerResource, setDrawerResource] = useState<typeof resources[0] | null>(null)

  return (
    <>
      {resources.map((resource) => (
        <section
          key={resource.name}
          className={resource.mode === 'dark' ? 'section-dark' : 'section-neutral'}
        >
          <div className="container-rl py-16 md:py-20">
            <SectionReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* Cover image */}
                <div className={`relative aspect-[4/3] rounded overflow-hidden ${
                  resource.mode === 'dark' ? 'bg-rl-dark border border-border-dark' : 'bg-rl-dark/5'
                }`}>
                  <Image
                    src={resource.image}
                    alt={resource.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  {/* Slight darkening overlay for tonal cohesion with the section */}
                  <div className="absolute inset-0 bg-rl-dark/25 pointer-events-none" />
                </div>

                {/* Content */}
                <div>
                  <span className={`text-label-sm uppercase block mb-3 ${
                    resource.mode === 'dark' ? 'text-rl-red' : 'text-rl-red'
                  }`}>
                    {resource.type}
                  </span>
                  <h3 className={`font-display text-display-sm md:text-display-md mb-4 ${
                    resource.mode === 'dark' ? 'text-text-on-dark' : 'text-text-primary'
                  }`}>
                    {resource.name}
                  </h3>
                  <p className={`text-body-md mb-6 ${
                    resource.mode === 'dark' ? 'text-text-muted' : 'text-text-secondary'
                  }`}>
                    {resource.description}
                  </p>
                  {resource.available ? (
                    <Button
                      variant="text"
                      onClick={() => setDrawerResource(resource)}
                      className={resource.mode === 'dark' ? 'text-text-on-dark' : 'text-text-primary'}
                    >
                      Descargar
                    </Button>
                  ) : (
                    <span className={`text-body-sm ${resource.mode === 'dark' ? 'text-text-muted/60' : 'text-text-tertiary'}`}>
                      Próximamente
                    </span>
                  )}
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
      ))}

      <ResourceDrawer
        isOpen={!!drawerResource}
        resource={drawerResource}
        onClose={() => setDrawerResource(null)}
      />
    </>
  )
}
