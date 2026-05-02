'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import SectionReveal from '@/components/animations/SectionReveal'

const BuildersLink = () => (
  <Link
    href="/builders"
    className="text-rl-red underline decoration-rl-red/40 hover:decoration-rl-red transition-colors"
  >
    red de Builders
  </Link>
)

const lightItems: ReactNode[] = [
  'Bolsa mensual de 4 horas de consultoría estratégica con el equipo senior de Redesign Lab — Eddie Ajalcriña o Lorenzo Ortiz — en sesiones de trabajo directo con el equipo de gerencia.',
  'Las horas se destinan a validación de estrategias, resolución de problemas críticos, revisión de decisiones y acompañamiento del escalamiento sobre las cuatro verticales según la prioridad de cada mes.',
  'Alertas mensuales de oportunidades de financiamiento — mapeo de fondos, instrumentos y convocatorias relevantes para el perfil de la empresa.',
  'Acceso a frameworks y recursos de Redesign Lab con prioridad sobre el mercado abierto.',
  <>Acceso preferencial a la <BuildersLink /> de Redesign Lab para servicios especializados complementarios.</>,
]

const proItems: ReactNode[] = [
  'Bolsa mensual de 4 horas de sesiones de trabajo directo con el equipo de gerencia — para presentar análisis, discutir planes y tomar decisiones sobre los entregables del mes.',
  'Re. Intelligence Brief mensual — análisis del estado del negocio en las cuatro verticales con recomendaciones priorizadas.',
  'Plan de acción ágil — con prioridades del período, responsables sugeridos, métricas y criterios de ajuste.',
  'Alertas mensuales de oportunidades de financiamiento — mapeo de fondos, instrumentos y convocatorias, alimentadas por el análisis de las verticales de Finanzas e Impacto.',
  'Monitoreo continuo de oportunidades de mercado y ecosistema relevantes para la empresa.',
  <>Acceso prioritario a servicios complementarios de la <BuildersLink /> de Redesign Lab.</>,
]

export default function BenefitsSection() {
  return (
    <>
      <SectionReveal>
        <p className="text-body-lg text-text-secondary max-w-3xl mb-12">
          La bolsa de 4 horas mensuales es el corazón de ambas versiones. Lo que cambia es el material que llega a esas sesiones — y cuánto trabajo de inteligencia hace Redesign Lab antes y después.
        </p>
      </SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        <SectionReveal delay={0.1}>
          <div className="border border-border-light rounded p-8 md:p-10 h-full">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-rl-red font-mono text-mono-lg">◎</span>
              <p className="font-mono text-mono-sm uppercase tracking-[0.18em] text-text-tertiary">
                Lite · USD 900 / mes
              </p>
            </div>

            <ul className="space-y-5">
              {lightItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-body-md text-text-primary">
                  <span className="font-mono text-mono-sm text-rl-red mt-0.5 flex-shrink-0">
                    0{i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-body-sm text-text-tertiary italic mt-8 pt-6 border-t border-border-light">
              Las horas no utilizadas en el mes no se acumulan — el valor está en la continuidad del acompañamiento.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="border-2 border-rl-red bg-rl-red/5 rounded p-8 md:p-10 h-full">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-rl-red font-mono text-mono-lg">◉</span>
              <p className="font-mono text-mono-sm uppercase tracking-[0.18em] text-rl-red">
                Pro · USD 3,000 / mes
              </p>
            </div>

            <ul className="space-y-5">
              {proItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-body-md text-text-primary">
                  <span className="font-mono text-mono-sm text-rl-red mt-0.5 flex-shrink-0">
                    0{i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-body-sm text-text-secondary italic mt-8 pt-6 border-t border-border-light">
              La integración de flujos de información hace que cada hora de sesión llegue con análisis ya hecho — no se gasta tiempo nivelando contexto.
            </p>
          </div>
        </SectionReveal>
      </div>
    </>
  )
}
