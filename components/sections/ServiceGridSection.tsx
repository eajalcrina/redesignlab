'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import ServiceCard from '@/components/ui/ServiceCard'
import Tag from '@/components/ui/Tag'
import type { Service } from '@/data/services'

interface ServiceGridSectionProps {
  tag?: string
  title: string
  services: Service[]
  signatureService?: Service
}

export default function ServiceGridSection({
  tag = 'Los servicios',
  title,
  services,
  signatureService,
}: ServiceGridSectionProps) {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">
            {tag}
          </Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            {title}
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {services.map((service, i) => (
            <SectionReveal key={service.name} delay={i * 0.05}>
              <ServiceCard {...service} />
            </SectionReveal>
          ))}
        </div>

        {signatureService && (
          <div className="mt-16">
            <SectionReveal delay={0.2}>
              <ServiceCard {...signatureService} />
            </SectionReveal>
          </div>
        )}
      </div>
    </section>
  )
}
