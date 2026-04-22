'use client'

import Link from 'next/link'
import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import Divider from '@/components/ui/Divider'

interface ReIntelligenceBlockProps {
  expanded?: boolean
}

const benefits = [
  '4 horas de trabajo directo cada mes con los socios fundadores de Redesign Lab',
  'Re. Intelligence Brief mensual personalizado al contexto específico de la empresa',
  '2 consultas de 30 min con especialistas de la red de Builders',
  'Acceso anticipado a frameworks, herramientas y publicaciones propias',
  'Prioridad en servicios complementarios de Redesign Lab y su red',
]

export default function ReIntelligenceBlock({
  expanded = false,
}: ReIntelligenceBlockProps) {
  return (
    <section className="bg-[#080808] text-text-on-dark py-24 md:py-32">
      <div className="container-rl">
        <div className="max-w-[720px] mx-auto">
          <SectionReveal>
            <Tag color="red" className="mb-6">
              ACOMPAÑAMIENTO ESTRATÉGICO CONTINUO
            </Tag>

            <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark mb-4">
              Re. Intelligence
            </h2>

            <p className="font-display text-display-sm text-rl-red mb-6">
              El estratega, el analista y el conector que tu empresa no tiene en nómina.
            </p>

            <p className="font-mono text-mono-lg text-text-muted mb-8">
              USD 3,000 / mes &middot; máximo 15 miembros
            </p>

            <Divider variant="red" className="w-16 mb-8" animated />

            <p className="text-body-lg text-text-on-dark mb-6">
              El equipo de pensamiento estratégico externo de tu empresa — el que procesa la información, diseña los escenarios, mapea las oportunidades y entrega los planes para que tu equipo accione.
            </p>

            <p className="text-body-md text-text-muted mb-4">
              Para fundadores o gerencia general de empresas medianas en bioeconomía que ya funcionan — y donde el pensamiento estratégico recae sobre las mismas personas que atienden la operación diaria. No es falta de capacidad: es falta de tiempo y de estructura. Re. Intelligence resuelve exactamente eso.
            </p>

            <p className="text-body-md text-text-on-dark/80 mb-12 italic">
              Solo 15 miembros activos a la vez. Porque con 16, el producto deja de ser lo que es.
            </p>
          </SectionReveal>

          {expanded && (
            <div className="space-y-4 mb-12">
              {benefits.map((benefit, i) => (
                <SectionReveal key={i} delay={i * 0.08}>
                  <div className="flex items-start gap-3 border-b border-border-dark pb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                    <p className="text-body-md text-text-on-dark">
                      {benefit}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          )}

          <SectionReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <Button variant="primary" size="lg" href="/re-intelligence">
                Conocer Re. Intelligence &rarr;
              </Button>
              <Link
                href="/inteligencia-artificial/diagnostico"
                className="inline-flex items-center gap-2 text-body-md text-text-on-dark hover:text-rl-red transition-colors group"
              >
                <span className="underline underline-offset-4 decoration-text-muted/40 group-hover:decoration-rl-red">
                  Empieza con tu diagnóstico IA
                </span>
                <span className="text-rl-red transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
            <p className="text-body-sm text-text-muted/70 mt-4">
              30 minutos de conversación de fit · Sin compromiso
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
