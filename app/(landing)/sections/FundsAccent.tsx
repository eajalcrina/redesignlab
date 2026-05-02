'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'

export default function FundsAccent() {
  return (
    <section className="section-accent py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <span className="inline-block uppercase font-sans tracking-[0.18em] text-white/80 mb-4" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}>PARTNER ESTRATÉGICO PARA FONDOS DE INVERSIÓN</span>
          <h2 className="font-display text-display-md md:text-display-lg text-white max-w-4xl mb-2">
            La inversión de impacto tiene un riesgo que el análisis financiero convencional no puede mitigar solo.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.4}>
          <h2 className="font-display text-display-md md:text-display-lg text-white max-w-4xl mb-10">
            Redesign Lab lo reduce.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.6}>
          <p className="text-body-lg text-white/80 max-w-3xl mb-8">
            Nuestra experiencia como venture studio asegura un de-risking real de las inversiones de impacto para los fondos de inversión. No solo diagnóstico, sino la capacidad de acompañar el cierre de las brechas antes de que el capital se mueva.
          </p>

          <p className="text-body-lg text-white font-semibold max-w-3xl mb-12">
            El resultado: inversiones de impacto de mejor calidad y mayor probabilidad de generar el retorno que el fondo proyectó.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="secondary"
              size="lg"
              href="/fondos"
              className="text-white border-white/30 hover:bg-white/10"
            >
              Ver cómo trabajamos con fondos &rarr;
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/ventures"
              className="text-white border-white/30 hover:bg-white/10"
            >
              Conoce el portafolio &rarr;
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
