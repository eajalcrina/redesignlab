import Link from 'next/link'
import SectionReveal from '@/components/animations/SectionReveal'
import { CONSULTORIA_CATEGORIES } from '@/data/servicios-consultoria'

const cards = Object.values(CONSULTORIA_CATEGORIES)

export default function RelatedServicesLinks() {
  return (
    <section className="section-neutral border-t border-border-light py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-4">
            Cómo suele empezar esta relación.
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mb-14">
            Casi nadie empieza aquí. Empieza resolviendo algo puntual — poner orden, conseguir capital o vender más — y se convierte en esto cuando el negocio confía en que hay alguien pensando en todo, no solo en lo urgente de esta semana.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <SectionReveal key={c.slug} delay={i * 0.08}>
              <Link
                href={`/${c.slug}`}
                className="group block p-6 border border-border-light rounded hover:border-rl-red hover:bg-white transition-colors h-full"
              >
                <p className="font-display text-display-sm text-text-primary mb-2">{c.navLabel}</p>
                <p className="text-body-sm text-text-secondary mb-4">{c.tagline}</p>
                <span className="text-body-sm text-rl-red group-hover:underline">Explorar →</span>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
