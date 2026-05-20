'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import type { CurriculumMonth } from '@/data/bbs'

interface CurriculumProps {
  months: CurriculumMonth[]
}

export default function Curriculum({ months }: CurriculumProps) {
  const hasMonths = months.some((m) => m.month)

  return (
    <section className="bg-rl-white py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">
            {hasMonths ? 'El recorrido' : 'Temario'}
          </Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            {hasMonths ? 'El programa, semana a semana' : 'Temario'}
          </h2>
        </SectionReveal>

        <div className="space-y-16">
          {months.map((month, mi) => (
            <SectionReveal key={mi} delay={mi * 0.08}>
              <div>
                {month.month && (
                  <div className="mb-6 pb-4 border-b border-border-light">
                    <h3 className="font-display text-display-sm text-text-primary">
                      {month.month}
                    </h3>
                    {month.subtitle && (
                      <p className="text-body-md text-text-tertiary italic mt-1">
                        {month.subtitle}
                      </p>
                    )}
                  </div>
                )}

                <ul className="space-y-6">
                  {month.modules.map((mod, moi) => (
                    <li key={moi} className="flex gap-4">
                      <span className="font-mono text-mono-sm text-rl-red flex-shrink-0 w-24">
                        {mod.code}
                      </span>
                      <div>
                        <p className="font-display text-display-sm text-text-primary mb-1">
                          {mod.title}
                        </p>
                        <p className="text-body-md text-text-secondary">{mod.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
