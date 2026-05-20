'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

interface ForWhomProps {
  items: { title: string; body: string }[]
  notFor?: string
}

export default function ForWhom({ items, notFor }: ForWhomProps) {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">
            Para quién es
          </Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            Este programa es para ti
          </h2>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <div className="border border-border-light rounded p-8">
                <h3 className="text-display-sm font-display text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-body-md text-text-secondary">{item.body}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        {notFor && (
          <SectionReveal delay={0.2}>
            <p className="text-body-sm text-text-tertiary mt-10">
              Este programa no es para: {notFor}
            </p>
          </SectionReveal>
        )}
      </div>
    </section>
  )
}
