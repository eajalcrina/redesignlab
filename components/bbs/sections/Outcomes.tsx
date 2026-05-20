'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

interface OutcomesProps {
  items: { lead: string; body: string }[]
}

export default function Outcomes({ items }: OutcomesProps) {
  return (
    <section className="bg-rl-white py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">
            Al terminar habrás
          </Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            Lo que construyes en este programa
          </h2>
        </SectionReveal>

        <div className="max-w-4xl space-y-10">
          {items.map((item, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <div className="flex gap-4">
                <span className="text-rl-red font-display text-display-sm flex-shrink-0 mt-1">
                  →
                </span>
                <div>
                  <p className="font-display text-display-sm text-text-primary mb-2">
                    {item.lead}
                  </p>
                  <p className="text-body-md text-text-secondary">{item.body}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
