'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

const founderPains = [
  '¿Cómo resuelvo este problema operativo que no termina de arreglarse?',
  '¿Cómo organizo al equipo para que la operación sea más eficiente y no dependa tanto de mí?',
  '¿Cómo ajusto la estrategia comercial para alcanzar las metas del año?',
  '¿Estoy leyendo el mercado bien, o se me está escapando algo?',
  '¿Qué fondos reales puedo conseguir para el próximo paso?',
]

const distinctions = [
  { he: 'Re. Intelligence', does: 'Pensamiento, análisis, escenarios, planes accionables.' },
  { he: 'Tu equipo', does: 'La ejecución de los planes, siempre.' },
]

export default function ForWhomIntroSection() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">El problema que Re. Intelligence resuelve</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-16">
            El pensamiento estratégico recae sobre las mismas personas que también gestionan la operación.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-start">
          <SectionReveal delay={0.1}>
            <div className="max-w-2xl space-y-6 text-body-lg text-text-secondary">
              <p>
                En la empresa mediana que ya funciona (con clientes reales, operación probada y un equipo comprometido) el pensamiento estratégico y el análisis de información recaen sobre las mismas personas que gestionan la operación diaria.
              </p>
              <p className="text-text-primary">
                No es falta de capacidad. Es falta de estructura, tiempo y criterio externo.
              </p>
              <p>
                Re. Intelligence es el equipo de inteligencia estratégica externo de tu empresa. <span className="text-text-primary font-medium">No reemplaza a tu equipo. Lo potencia.</span> Produce la inteligencia que permite que las decisiones sean mejores, más rápidas y con más claridad de la que el equipo puede generar solo.
              </p>
            </div>

            <div className="max-w-2xl mt-12 border-l-2 border-rl-red pl-6">
              <p className="font-mono text-mono-sm text-rl-red uppercase tracking-[0.18em] mb-4">
                Las preguntas que llegan cada semana
              </p>
              <ul className="space-y-3 mb-8">
                {founderPains.map((q) => (
                  <li key={q} className="text-body-md text-text-primary italic">
                    {q}
                  </li>
                ))}
              </ul>
              <p className="text-body-md text-text-secondary">
                Muchas veces los fundadores tienen una estrategia clara, pero no siempre es la correcta. Re. Intelligence te ayuda a <span className="text-text-primary font-medium">validar, pivotar o mejorar</span> tu estrategia de negocio, con las mejores herramientas disponibles y la experiencia del equipo senior de Redesign Lab.
              </p>
            </div>

            <div className="max-w-2xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {distinctions.map((d) => (
                <div key={d.he} className="border-t border-border-light pt-4">
                  <p className="font-mono text-mono-sm text-rl-red uppercase tracking-[0.18em] mb-2">
                    {d.he}
                  </p>
                  <p className="text-body-md text-text-primary">{d.does}</p>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="bg-rl-dark text-text-on-dark p-8 md:p-10 rounded max-w-md lg:w-[420px]">
              <p className="font-mono text-mono-sm text-rl-red uppercase tracking-[0.18em] mb-6">
                Lo que una empresa mediana
                <br />
                típicamente no tiene
              </p>
              <ul className="space-y-5 mb-8">
                <li className="flex items-start gap-3 text-body-sm text-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                  <span>Un director de estrategia que procese la información y diseñe el plan de crecimiento</span>
                </li>
                <li className="flex items-start gap-3 text-body-sm text-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                  <span>Un analista de mercado que monitoree el ecosistema y detecte oportunidades antes de que sean obvias</span>
                </li>
                <li className="flex items-start gap-3 text-body-sm text-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                  <span>Un especialista en financiamiento que mapee fondos y sepa a qué capital puede acceder</span>
                </li>
                <li className="flex items-start gap-3 text-body-sm text-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                  <span>Un equipo que resuelva problemas con criterio externo, sin el sesgo de quien está adentro todos los días</span>
                </li>
              </ul>
              <div className="pt-6 border-t border-border-dark">
                <p className="font-display text-display-sm text-text-on-dark">
                  Re. Intelligence es todo eso.
                </p>
                <p className="text-body-sm text-text-muted mt-2">
                  Sin contratar a nadie.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
