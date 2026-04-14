'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'

const genericItems = [
  'Implementar herramientas de IA genéricas',
  'Producir estrategias de adopción horizontal',
  'Automatizar procesos existentes',
  'Generar reportes más rápido',
]

const uniqueItems = [
  'Aplicar IA al diagnóstico de madurez de inversión en bionegocios',
  'Diseñar sistemas de trazabilidad para comunidades sin conectividad',
  'Prospectar activos naturales con potencial de mercado verificable',
  'Monitorear estándares de certificación internacionales en tiempo real',
  'Combinar IA con conocimiento territorial de primera mano',
]

export default function AISection() {
  return (
    <section className="section-dark py-24 md:py-32 relative overflow-hidden">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
      }} />

      <div className="container-rl relative z-10">
        <SectionReveal>
          <Tag color="red" className="mb-4">INTELIGENCIA ARTIFICIAL PARA BIOECONOMÍA</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark/60 max-w-4xl mb-2">
            La IA genérica resuelve problemas genéricos.
          </h2>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-4xl mb-8">
            Los problemas de la bioeconomía no son genéricos.
          </h2>
          <p className="text-body-lg text-text-muted max-w-3xl mb-16">
            Hay muchas firmas que pueden hablar de inteligencia artificial con autoridad. Hay muy pocas que pueden hablar de bioeconomía amazónica con la misma autoridad. Y prácticamente ninguna que pueda hacer las dos cosas al mismo tiempo — con proyectos reales, resultados verificables y conocimiento de primera mano del territorio.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <SectionReveal delay={0.1}>
            <div>
              <h3 className="text-label-md uppercase text-text-muted mb-6">LO QUE CUALQUIER FIRMA PUEDE HACER</h3>
              <ul className="space-y-4">
                {genericItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body-md text-text-muted line-through decoration-border-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-border-dark mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div>
              <h3 className="text-label-md uppercase text-rl-red mb-6">LO QUE SOLO REDESIGN LAB PUEDE HACER</h3>
              <ul className="space-y-4">
                {uniqueItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-body-md text-text-on-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.3}>
          <div className="mt-12">
            <Button variant="text" href="/inteligencia-artificial" className="text-text-on-dark">
              Explorar IA para bioeconomía →
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
