import SectionReveal from '@/components/animations/SectionReveal'

export interface AuthorityStat {
  value: string
  label: string
}

interface AuthoritySectionProps {
  stats: AuthorityStat[]
}

export default function AuthoritySection({ stats }: AuthoritySectionProps) {
  return (
    <section className="section-neutral border-t border-border-light py-20 md:py-28">
      <div className="container-rl">
        <SectionReveal>
          <div
            className={`grid grid-cols-1 ${
              stats.length > 1 ? 'sm:grid-cols-2' : ''
            } gap-10 md:gap-16 max-w-3xl`}
          >
            {stats.map((s) => (
              <div key={s.value}>
                <p className="font-display text-display-xl md:text-display-2xl text-rl-red mb-3">
                  {s.value}
                </p>
                <p className="text-body-md text-text-secondary">{s.label}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
