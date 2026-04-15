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
  'Acceso C-Level directo cada mes con Eddie Ajalcriña y Lorenzo Ortiz',
  'Brief mensual de inteligencia estratégica diseñado para tu industria',
  'Consultas express con la red de especialistas en bioeconomía e IA',
  'Acceso anticipado a frameworks, herramientas y publicaciones propias',
  'Prioridad en proyectos y condiciones preferenciales en todos los servicios',
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
              EMPIEZA A TRANSFORMAR TU NEGOCIO
            </Tag>

            <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark mb-4">
              Re. Intelligence
            </h2>

            <p className="font-display text-display-sm text-rl-red mb-6">
              Asesoría estratégica impulsada por IA para desbloquear el siguiente nivel de tu empresa.
            </p>

            <p className="font-mono text-mono-lg text-text-muted mb-8">
              USD 3,000 / mes &middot; Solo 15 cupos al año
            </p>

            <Divider variant="red" className="w-16 mb-8" animated />

            <p className="text-body-lg text-text-on-dark mb-6">
              Acompañamiento continuo del equipo senior de Redesign Lab para los líderes que están tomando las decisiones que definirán los próximos cinco años de su industria.
            </p>

            <p className="text-body-md text-text-muted mb-4">
              No es una suscripción a contenido genérico ni un programa de mentoría más. Es acceso directo al criterio, la red y la inteligencia de mercado que ya está construyendo el portafolio de bioeconomía más relevante de América Latina — aplicado al contexto específico de tu empresa, cada mes.
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
                Súmate a la red de Re. Intelligence &rarr;
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
              Conversación previa de fit · Sin compromiso
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
