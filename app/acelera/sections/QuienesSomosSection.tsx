import Tag from '@/components/ui/Tag'
import SectionReveal from '@/components/animations/SectionReveal'

export default function QuienesSomosSection() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Cómo trabajamos</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-6">
            El mismo rigor de las grandes corporaciones, a tu escala y a tu presupuesto.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="max-w-2xl space-y-6">
            <p className="text-body-lg text-text-muted">
              Ejecutado directamente por Eddie Ajalcriña y Lorenzo Ortiz. Sin intermediarios. Sin junior a cargo. El mismo rigor con el que las grandes corporaciones toman decisiones estratégicas, aplicado a tu negocio, a tu escala y a tu presupuesto.
            </p>
            <p className="text-body-lg text-text-muted">
              No buscamos generar valor estratégico abstracto. Buscamos ahorro y mayor ingreso, identificados mes a mes, con un plan que tu equipo puede ejecutar.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
