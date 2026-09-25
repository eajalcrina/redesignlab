'use client'

import { useState } from 'react'
import SectionReveal from '@/components/animations/SectionReveal'
import SectionLabel from '@/components/ui/SectionLabel'
import DuotoneImage from '@/components/ui/DuotoneImage'
import ArrowIcon from '@/components/ui/ArrowIcon'
import ResourceDrawer from '@/components/ui/ResourceDrawer'
import { resources, type ResourceItem } from '@/data/resources'
import { cn } from '@/lib/utils'

export default function ResourcesList() {
  const [drawerResource, setDrawerResource] = useState<ResourceItem | null>(null)

  return (
    <section className="section-neutral">
      <div className="container-rl py-20 md:py-28">
        <SectionReveal>
          <SectionLabel n="01" className="mb-6">Recursos</SectionLabel>
        </SectionReveal>

        {/* Índice de recursos: filas con líneas finas, como las divisiones y el conocimiento de la Home */}
        <ul className="border-t border-rl-dark">
          {resources.map((resource, k) => (
            <li key={resource.slug}>
              <SectionReveal delay={Math.min(k, 4) * 0.04}>
                <div
                  className={cn(
                    'group relative grid grid-cols-[88px_minmax(0,1fr)] gap-x-4 gap-y-4 border-b border-border-light py-6 transition-colors',
                    "[grid-template-areas:'thumb_head'_'desc_desc'_'act_act']",
                    'md:grid-cols-[40px_140px_minmax(0,1fr)_180px] md:gap-x-8 md:gap-y-2 md:py-8',
                    "md:[grid-template-areas:'idx_thumb_head_act'_'idx_thumb_desc_act']",
                    resource.available && 'hover:bg-white/60'
                  )}
                >
                  <span className="hidden self-center font-mono text-[10.5px] tracking-[0.15em] text-text-tertiary [grid-area:idx] md:block">
                    {String(k + 1).padStart(2, '0')}
                  </span>

                  <DuotoneImage
                    src={resource.image}
                    alt=""
                    sizes="(min-width: 768px) 140px, 88px"
                    hoverColor={resource.available}
                    className="h-[66px] w-[88px] self-start rounded-[2px] [grid-area:thumb] md:h-[105px] md:w-[140px] md:self-center"
                  />

                  <div className="min-w-0 self-center [grid-area:head] md:self-end">
                    <span
                      className={cn(
                        'block font-mono text-[10px] uppercase leading-[1.5] tracking-[0.14em] md:text-[10.5px]',
                        resource.available ? 'text-rl-red' : 'text-text-tertiary'
                      )}
                    >
                      {resource.type}
                    </span>
                    <h3
                      className={cn(
                        'mt-1.5 font-sans text-[19px] font-normal leading-[1.15] tracking-[-0.02em] text-text-primary md:text-[25px] md:leading-[1.1] md:tracking-[-0.03em]',
                        resource.available && 'transition-colors group-hover:text-rl-red'
                      )}
                    >
                      {resource.name}
                    </h3>
                  </div>

                  <p className="text-[15px] leading-[1.6] text-text-secondary [grid-area:desc] md:max-w-[620px] md:self-start">
                    {resource.description}
                  </p>

                  <div className="[grid-area:act] empty:hidden md:self-center md:text-right">
                    {resource.available ? (
                      <button
                        type="button"
                        onClick={() => setDrawerResource(resource)}
                        aria-label={`Descargar ${resource.name}`}
                        className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-medium text-text-primary after:absolute after:inset-0 after:content-[''] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rl-red"
                      >
                        Descargar
                        <ArrowIcon className="text-rl-red" />
                      </button>
                    ) : resource.type === 'Próximamente' ? null : (
                      <span className="inline-flex min-h-[44px] items-center font-mono text-[10.5px] uppercase tracking-[0.15em] text-text-tertiary">
                        Próximamente
                      </span>
                    )}
                  </div>
                </div>
              </SectionReveal>
            </li>
          ))}
        </ul>
      </div>

      <ResourceDrawer
        isOpen={!!drawerResource}
        resource={drawerResource}
        onClose={() => setDrawerResource(null)}
      />
    </section>
  )
}
