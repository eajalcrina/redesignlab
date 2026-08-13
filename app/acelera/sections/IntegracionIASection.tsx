import Tag from '@/components/ui/Tag'
import SectionReveal from '@/components/animations/SectionReveal'

export default function IntegracionIASection() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Integración con IA</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-4">
            Cómo aplicamos inteligencia artificial en cada intervención.
          </h2>
        </SectionReveal>

        <div className="max-w-3xl">
          <SectionReveal delay={0.1}>
            <p className="text-body-lg text-text-muted mb-6">
              No es un servicio aparte. Es parte de cómo trabajamos en cada etapa, en las tres áreas. La usamos para analizar y procesar cada caso más rápido y con más precisión, con las herramientas más novedosas disponibles para cada tipo de problema.
            </p>
            <p className="text-body-lg text-text-on-dark">
              Pero el objetivo no es que nosotros trabajemos más rápido. Es que tu equipo se quede con algo. Diseñamos y entregamos <span className="italic">skills</span> a la medida de tu negocio para que tu equipo los use y los replique después de que el proyecto termina. Cada intervención deja capacidad instalada — no un resultado que se apaga cuando nos vamos.
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
