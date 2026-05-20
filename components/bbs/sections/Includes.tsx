'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

interface IncludesProps {
  items: string[]
}

export default function Includes({ items }: IncludesProps) {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">
            Qué incluye
          </Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            Todo lo que obtienes
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-rl-red flex-shrink-0 mt-0.5">✦</span>
                <span className="text-body-md text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>
    </section>
  )
}
