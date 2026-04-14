'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'

const connections = [
  {
    title: 'Quiero Invertir',
    description: 'Accede a deal flow de oportunidades de bioeconomía mitigadas, con equipo validado y modelo de gobernanza probado. Operamos con los estándares de venture capital más rigurosos.',
    mode: 'neutral' as const,
    cta: 'Hablar de inversión',
    subject: 'Ventures — Inversión',
  },
  {
    title: 'Quiero que Construyan Conmigo',
    description: 'Tiene activos bio y necesita diseño y estructuración metodológica, sea un proyecto naciente o maduro pero informal.',
    mode: 'dark' as const,
    cta: 'Explorar co-construcción',
    subject: 'Ventures — Co-construcción',
  },
  {
    title: 'Quiero Aliarme',
    description: 'Busca tecnologías, bioinsumos o cadenas de trazabilidad para su operación y agenda Net Zero.',
    mode: 'accent' as const,
    cta: 'Explorar alianzas',
    subject: 'Ventures — Alianza corporativa',
  },
]

export default function ConnectSection() {
  return (
    <>
      <div className="section-dark py-12 md:py-16 text-center border-b border-border-dark">
        <h2 className="font-display text-display-sm text-text-on-dark">IX. Tres formas de conectar con Redesign Lab</h2>
      </div>
      {connections.map((conn) => {
        const sectionClass = conn.mode === 'dark' ? 'section-dark' : conn.mode === 'accent' ? 'section-accent' : 'section-neutral'
        const textClass = conn.mode === 'neutral' ? 'text-text-primary' : 'text-text-on-dark'
        const descClass = conn.mode === 'neutral' ? 'text-text-secondary' : 'text-text-muted'

        return (
          <section key={conn.title} className={sectionClass}>
            <div className="container-rl py-16 md:py-20">
              <SectionReveal>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="max-w-xl">
                    <h3 className={`font-display text-display-sm ${textClass} mb-2`}>{conn.title}</h3>
                    <p className={`text-body-md ${descClass}`}>{conn.description}</p>
                  </div>
                  <Button
                    variant={conn.mode === 'accent' ? 'secondary' : 'primary'}
                    size="md"
                    href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(conn.subject)}`}
                    className={conn.mode === 'accent' ? 'text-white border-white/30' : ''}
                  >
                    {conn.cta} &rarr;
                  </Button>
                </div>
              </SectionReveal>
            </div>
          </section>
        )
      })}
    </>
  )
}
