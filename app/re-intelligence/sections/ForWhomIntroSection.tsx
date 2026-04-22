'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

const gaps = [
  'Un director de estrategia que procese la información del negocio y diseñe el plan de crecimiento',
  'Un analista de mercado que monitoree el ecosistema y detecte oportunidades antes de que sean obvias',
  'Un especialista en financiamiento que mapee fondos y sepa exactamente a qué capital puede acceder la empresa',
  'Un equipo que resuelva los problemas del negocio con criterio externo — sin el sesgo de quien está adentro todos los días',
]

const founderPains = [
  '¿Cómo resuelvo este problema operativo que no termina de arreglarse?',
  '¿Cómo organizo al equipo para que la operación sea más eficiente — y no dependa tanto de mí?',
  '¿Cómo ajusto la estrategia comercial para alcanzar las metas del año?',
  '¿Estoy leyendo el mercado bien — o se me está escapando algo?',
  '¿Qué fondos reales puedo conseguir para el próximo paso?',
]

export default function ForWhomIntroSection() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Para quién es esto — antes de explicar qué es</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-16">
            Hay un perfil de empresa que el mercado de consultoría convencional no sabe servir bien.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-start">
          <SectionReveal delay={0.1}>
            <div className="max-w-2xl space-y-6 text-body-lg text-text-secondary">
              <p>
                No es una startup que necesita mentoría. Tampoco es una corporación con un equipo directivo completo — CFO, CMO, director de estrategia, jefe de planeamiento — dedicado a pensar, procesar información y diseñar planes.
              </p>
              <p>
                Es la empresa mediana que ya funciona. Que tiene clientes reales, operación probada y un fundador o dos socios que llevan el negocio con claridad y convicción. Pero donde todo el pensamiento estratégico — el análisis de mercado, la identificación de oportunidades, el mapeo de financiamiento, la resolución de los problemas que frenan el crecimiento — recae sobre las mismas personas que también tienen que atender la operación diaria.
              </p>
              <p className="text-text-primary">
                No es falta de capacidad. Es falta de tiempo y de estructura.
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
                Muchas veces los fundadores tienen una estrategia clara — pero no siempre es la correcta. Re. Intelligence te ayuda a <span className="text-text-primary font-medium">validar, pivotar o mejorar</span> tu estrategia de negocio, con las mejores herramientas disponibles y la experiencia del equipo senior de Redesign Lab.
              </p>
            </div>

            <p className="font-display text-display-sm text-text-primary pt-12">
              Re. Intelligence resuelve exactamente eso.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="bg-rl-dark text-text-on-dark p-8 md:p-10 rounded max-w-md lg:w-[420px]">
              <p className="font-mono text-mono-sm text-rl-red uppercase tracking-[0.18em] mb-6">
                Lo que una empresa mediana
                <br />
                típicamente no tiene
              </p>
              <ul className="space-y-5 mb-8">
                {gaps.map((gap) => (
                  <li key={gap} className="flex items-start gap-3 text-body-sm text-text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                    <span>{gap}</span>
                  </li>
                ))}
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
