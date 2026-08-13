'use client'

import Link from 'next/link'
import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import Divider from '@/components/ui/Divider'

interface ReIntelligenceBlockProps {
  expanded?: boolean
}

const benefits: React.ReactNode[] = [
  '4 horas de trabajo directo cada mes con los socios fundadores de Redesign Lab',
  'Acompañamiento estratégico continuo sobre las cuatro verticales del negocio',
  <>2 consultas de 30 min con especialistas de la <Link href="/builders" className="underline decoration-rl-red/40 hover:decoration-rl-red transition-colors">red de Builders</Link></>,
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
              Rediseña tu negocio
            </h2>

            <p className="font-display text-display-sm text-rl-red mb-6">
              Un equipo de gerentes externos con más de 15 años de experiencia.
            </p>

            <p className="font-mono text-mono-lg text-text-muted mb-8">
              S/ 2,000 / mes
            </p>

            <Divider variant="red" className="w-16 mb-8" animated />

            <p className="text-body-lg text-text-on-dark mb-6">
              Ejecutado directamente por Eddie Ajalcriña y Lorenzo Ortiz. Sin intermediarios. El mismo rigor con el que las grandes corporaciones toman decisiones estratégicas, aplicado a tu negocio, a tu escala y a tu presupuesto.
            </p>

            <p className="text-body-md text-text-muted mb-4">
              Para fundadores o equipos directivos de empresas en crecimiento en Perú que necesitan un equipo de gerentes externos para contrastar decisiones, validar pivots y sostener el foco en el crecimiento — sin el costo de armar un equipo de estrategia interno.
            </p>

            <p className="text-body-md text-text-on-dark/80 mb-12 italic">
              Solo 15 empresas activas a la vez. Porque con 16, el servicio deja de ser lo que es.
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
              <Button variant="primary" size="lg" href="/redisena-tu-negocio">
                Conocer Rediseña tu negocio &rarr;
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
