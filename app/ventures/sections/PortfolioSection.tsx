'use client'

import Link from 'next/link'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { ventures, getVentureSlug } from '@/data/ventures'

export default function PortfolioSection() {
  return (
    <section id="portafolio" className="section-dark py-24 md:py-32 scroll-mt-20">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">VII. El portafolio</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-12">
            Las ventures que estan redefiniendo sus categorias.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ventures.map((venture, i) => (
            <SectionReveal key={venture.name} delay={i * 0.06} className="h-full">
              <Link
                href={`/ventures/${getVentureSlug(venture)}`}
                className="group relative h-full bg-rl-dark rounded-lg overflow-hidden p-6 md:p-8 border border-border-dark hover:border-rl-red/50 transition-all duration-300 hover:-translate-y-1 min-h-[260px] flex flex-col justify-end"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-rl-dark to-[#1a1a1a] opacity-100" />

                <div className="relative z-10">
                  <span className="text-label-sm uppercase text-rl-red mb-2 block">
                    {venture.category}
                  </span>

                  <h3 className="font-display text-display-sm text-text-on-dark mb-1 group-hover:text-rl-red transition-colors">
                    {venture.name}
                  </h3>

                  <p className="text-body-xs text-text-muted mb-3">
                    {venture.location}
                  </p>

                  <p className="text-body-sm text-text-muted line-clamp-2 mb-4">
                    {venture.tagline || venture.description}
                  </p>

                  <span className="inline-flex items-center gap-1 text-body-xs text-rl-red opacity-0 group-hover:opacity-100 transition-opacity">
                    Conocer la venture
                    <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </span>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
