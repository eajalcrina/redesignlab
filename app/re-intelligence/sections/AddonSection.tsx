'use client'

import SectionReveal from '@/components/animations/SectionReveal'

const addonItems = [
  'Mapeo de fondos, instrumentos y convocatorias disponibles para el perfil específico de la empresa.',
  'Diagnóstico de preparación para la inversión: revisión de tesis, materiales y estructura.',
  'Acompañamiento en la construcción del caso de inversión y narrativa para inversores.',
  'Conexión con la red de fondos e inversores del ecosistema de Redesign Lab.',
]

export default function AddonSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
      <SectionReveal>
        <p className="text-body-lg text-text-secondary mb-6">
          Para empresas en proceso de levantar capital o que buscan conectarse con instrumentos de financiamiento, Re. Intelligence puede activar el módulo de Inversión y Fundraising como servicio complementario.
        </p>
        <p className="font-mono text-mono-sm text-rl-red uppercase tracking-[0.18em]">
          Disponible para Lite y Pro · Estructura caso a caso
        </p>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <div className="border border-border-light rounded p-8 md:p-10">
          <p className="text-label-md uppercase text-text-tertiary mb-6">Qué incluye</p>
          <ul className="space-y-5">
            {addonItems.map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-body-md text-text-primary">
                <span className="font-mono text-mono-sm text-rl-red mt-0.5 flex-shrink-0">
                  0{i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-body-sm text-text-tertiary italic mt-8 pt-6 border-t border-border-light">
            Este servicio se estructura caso a caso según el momento y necesidad de cada empresa. La activación parte siempre de la sesión mensual o de la conversación de fit.
          </p>
        </div>
      </SectionReveal>
    </div>
  )
}
