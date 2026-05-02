'use client'

import SectionReveal from '@/components/animations/SectionReveal'

const axes = [
  {
    number: '01',
    title: 'INDUSTRIA',
    description: 'Las oportunidades más relevantes no están en sectores genéricos. Están en industrias específicas donde la biodiversidad, el territorio y las cadenas de valor comunitarias son el activo diferencial que el mercado global todavía no ha capturado a escala.',
  },
  {
    number: '02',
    title: 'BIOECONOMÍA',
    description: 'No es una tendencia de reporte ESG. Es el modelo económico que viene, donde la rentabilidad y la salud de los sistemas naturales son la misma apuesta. Los negocios que liderarán el próximo ciclo están anclados en sistemas vivos, bien diseñados y bien conectados con los mercados que ya están pagando el premium por eso.',
  },
  {
    number: '03',
    title: 'INTELIGENCIA ARTIFICIAL',
    description: 'La IA no reemplaza el conocimiento territorial ni la relación con las comunidades. Sí comprime los tiempos de análisis, diseño y decisión de una forma que ninguna otra herramienta puede igualar. El estudio que combine expertise en bioeconomía con inteligencia artificial tendrá una ventaja que tardará años en ser replicada.',
  },
]

export default function ThreeAxes() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-4xl mb-16">
            Todo lo que hacemos vive en la intersección de estos tres drivers.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {axes.map((axis, i) => (
            <SectionReveal key={axis.title} delay={i * 0.1}>
              <div>
                <span className="font-mono text-mono-sm text-rl-red block mb-2">
                  {axis.number}
                </span>
                <h3 className="font-display text-display-sm text-text-primary mb-4 uppercase tracking-wide">
                  {axis.title}
                </h3>
                <p className="text-body-md text-text-secondary">
                  {axis.description}
                </p>
              </div>
              {i < axes.length - 1 && (
                <div className="hidden md:flex items-center justify-end mt-8">
                  <span className="text-rl-red text-2xl font-bold">✕</span>
                </div>
              )}
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
