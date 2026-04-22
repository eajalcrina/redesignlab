'use client'

import Link from 'next/link'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

export default function ClosingNoteSection() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <div className="max-w-3xl mx-auto">
          <SectionReveal>
            <Tag color="red" className="mb-4">Una última cosa</Tag>
            <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark mb-10">
              Re. Intelligence no es el servicio correcto para todas las empresas ni para todos los momentos.
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="space-y-6 text-body-lg text-text-muted">
              <p>
                Es correcto para empresas que ya tienen un modelo funcionando — y que entienden que las decisiones del próximo año van a determinar si lo que están construyendo llega a donde puede llegar.
              </p>
              <p>
                No es correcto para empresas que todavía están definiendo su modelo de negocio — el punto de partida correcto es{' '}
                <Link href="/crear-valor" className="text-rl-red underline decoration-rl-red/40 hover:decoration-rl-red transition-colors">
                  Crear valor →
                </Link>
                {' '}— ni para empresas que necesitan un proyecto específico con entregable definido: cualquiera de las tres direcciones de servicio de Redesign Lab tiene lo que necesitan.
              </p>
              <p className="text-text-on-dark">
                Re. Intelligence es para los que ya saben qué están construyendo — y que necesitan que alguien piense con ellos en cómo construirlo mejor, más rápido y con más inteligencia de la que pueden generar solos.
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
