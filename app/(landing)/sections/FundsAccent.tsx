'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'

export default function FundsAccent() {
  return (
    <section className="section-accent py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <span className="inline-block uppercase text-label-sm font-sans font-medium tracking-[0.18em] text-white/80 mb-4">PARTNER ESTRATÉGICO PARA FONDOS DE INVERSIÓN</span>
          <h2 className="font-display text-display-md md:text-display-lg text-white max-w-4xl mb-2">
            Invertir en bioeconomía tiene un riesgo que el análisis financiero convencional no puede mitigar solo.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.4}>
          <h2 className="font-display text-display-md md:text-display-lg text-white max-w-4xl mb-10">
            Redesign Lab lo reduce.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.6}>
          <p className="text-body-lg text-white/80 max-w-3xl mb-8">
            La combinación de Venture Building operativo y Venture Capital propio hace que Redesign Lab sea el único aliado técnico de un fondo de impacto que conoce la ecuación desde los dos lados: hemos co-fundado empresas del mismo tipo en las que los fondos invierten, y hemos gestionado capital en las mismas condiciones de incertidumbre que los fondos enfrentan.
          </p>

          <p className="text-body-lg text-white font-semibold max-w-3xl mb-8">
            Esa experiencia doble produce de-risking real de las inversiones de impacto en bioeconomía — no solo diagnóstico, sino la capacidad de acompañar el cierre de las brechas antes de que el capital se mueva.
          </p>

          <p className="text-body-lg text-white/80 max-w-3xl mb-12">
            El resultado: inversiones de impacto de mejor calidad, con menor riesgo técnico y mayor probabilidad de generar el retorno que el fondo proyectó.
          </p>

          <Button
            variant="secondary"
            size="lg"
            href="/fondos"
            className="text-white border-white/30 hover:bg-white/10"
          >
            Ver cómo trabajamos con fondos &rarr;
          </Button>
        </SectionReveal>
      </div>
    </section>
  )
}
