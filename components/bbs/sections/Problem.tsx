'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

interface ProblemProps {
  heading: string
  body: string[]
}

export default function Problem({ heading, body }: ProblemProps) {
  return (
    <section className="bg-rl-white py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">
            El punto de partida
          </Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            {heading}
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="max-w-3xl">
            {body.map((paragraph, i) => (
              <p key={i} className="text-body-lg text-text-secondary max-w-3xl mb-5">
                {paragraph}
              </p>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
