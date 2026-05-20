'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

interface FrameworkSpotlightProps {
  blocks: { heading: string; body: string[] }[]
}

export default function FrameworkSpotlight({ blocks }: FrameworkSpotlightProps) {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="neutral" className="mb-4">
            El método
          </Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-12">
            Cómo trabajamos
          </h2>
        </SectionReveal>

        <div className="space-y-16">
          {blocks.map((block, i) => (
            <SectionReveal key={i} delay={i * 0.08}>
              <div className="max-w-3xl">
                <h3 className="font-display text-display-md text-text-on-dark mb-4">
                  {block.heading}
                </h3>
                {block.body.map((paragraph, pi) => (
                  <p key={pi} className="text-body-md text-text-muted mb-3">
                    {paragraph}
                  </p>
                ))}
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
