'use client'

import { useState } from 'react'
import Image from 'next/image'
import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import ResourceDrawer from '@/components/ui/ResourceDrawer'
import { resources } from '@/data/resources'

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
