import Link from 'next/link'
import SectionReveal from '@/components/animations/SectionReveal'
import { CONSULTORIA_CATEGORIES, type ConsultoriaCategoryContent } from '@/data/servicios-consultoria'

interface CrossLinksProps {
  currentSlug: ConsultoriaCategoryContent['slug']
}

export default function CrossLinks({ currentSlug }: CrossLinksProps) {
  const siblings = Object.values(CONSULTORIA_CATEGORIES).filter((c) => c.slug !== currentSlug)

  return (
    <section className="section-neutral border-t border-border-light py-16 md:py-20">
      <div className="container-rl">
        <SectionReveal>
          <p className="text-label-sm uppercase text-text-tertiary mb-6">¿No es esto lo que necesitas?</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {siblings.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="group block p-6 border border-border-light rounded hover:border-rl-red transition-colors"
              >
                <p className="font-display text-display-sm text-text-primary mb-2">{c.navLabel}</p>
                <p className="text-body-sm text-text-secondary mb-4">{c.tagline}</p>
                <span className="text-body-sm text-rl-red group-hover:underline">Explorar &rarr;</span>
              </Link>
            ))}
            <Link
              href="/acelera"
              className="group block p-6 border-2 border-rl-red bg-rl-red/5 rounded hover:bg-rl-red/10 transition-colors"
            >
              <p className="font-display text-display-sm text-text-primary mb-2">ACELERA</p>
              <p className="text-body-sm text-text-secondary mb-4">¿Buscas acompañamiento continuo, no solo resolver algo puntual?</p>
              <span className="text-body-sm text-rl-red group-hover:underline">Conocer &rarr;</span>
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
