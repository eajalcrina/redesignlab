'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

interface FacultyProps {
  items: { name: string; role: string }[]
}

export default function Faculty({ items }: FacultyProps) {
  return (
    <section className="bg-rl-white py-14 md:py-20">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">
            Los docentes
          </Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            Quiénes te acompañan
          </h2>
        </SectionReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <div className="border border-border-light rounded p-6">
                <p className="font-display text-display-sm text-text-primary mb-2">
                  {item.name}
                </p>
                <p className="text-body-sm text-text-secondary">{item.role}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
