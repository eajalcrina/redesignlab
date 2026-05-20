'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

const steps = [
  {
    title: 'Sesiones en vivo semanales',
    body: 'Cada semana una sesión de 2 horas en Google Meet. Los participantes llegan con las lecturas hechas y el ejercicio avanzado — la sesión profundiza, aplica y da feedback real. No es una clase magistral. Es un taller de trabajo.',
  },
  {
    title: 'Todo en Google Workspace',
    body: 'Todos los materiales — lecturas, frameworks internacionales, plantillas, casos — están en Google Drive desde el primer día. Sin plataformas adicionales, sin apps nuevas, sin fricción tecnológica.',
  },
  {
    title: 'Entregable construido semana a semana',
    body: 'Cada módulo produce un componente del entregable final. No hay un trabajo al final del programa — hay un proceso de construcción progresiva con feedback continuo. Al terminar, el entregable ya está refinado y listo para usar.',
  },
  {
    title: 'Sustentación ante comité evaluador',
    body: 'Todos los programas terminan con una presentación del trabajo integrador ante un comité evaluador con perfil ejecutivo real. El feedback es honesto, técnico y orientado a la implementación — no a la calificación.',
  },
  {
    title: 'Comunidad BBS de por vida',
    body: 'Los participantes ingresan a la comunidad BBS — profesionales de distintas industrias y países que comparten el mismo estándar de criterio y se apoyan mutuamente más allá del programa.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-rl-white py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Metodología</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-6">
            Cómo funcionan los programas
          </h2>
          <p className="text-body-lg text-text-secondary max-w-3xl mb-16">
            Todos los programas BBS comparten la misma arquitectura pedagógica — diseñada para maximizar la aplicación y minimizar la fricción.
          </p>
        </SectionReveal>

        <ol className="space-y-10">
          {steps.map((step, i) => (
            <SectionReveal key={step.title} delay={i * 0.07}>
              <li className="flex gap-6 md:gap-10">
                <span className="font-mono text-mono-md text-rl-red shrink-0 w-8 pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-display-sm text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-body-md text-text-secondary">
                    {step.body}
                  </p>
                </div>
              </li>
            </SectionReveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
