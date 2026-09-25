'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import SectionLabel from '@/components/ui/SectionLabel'

const resources = [
  'comunidad organizada',
  'biodiversidad',
  'procesos productivos',
  'productos con demanda real',
  'interés genuino de mercado',
]

export default function ThesisSection() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <div className="max-w-3xl">
          <SectionReveal>
            <SectionLabel n="01" tone="light" className="mb-6">Por qué existe Bio/Builders</SectionLabel>
            <p className="text-body-xl md:text-body-xl-dt text-text-secondary mb-8">
              En los territorios de América Latina ya existe casi todo lo que un negocio necesita:
            </p>
            <ul className="flex flex-wrap gap-3 mb-8">
              {resources.map((r) => (
                <li
                  key={r}
                  className="px-4 py-2 rounded-full border border-border-light bg-white text-body-md text-text-primary"
                >
                  {r}
                </li>
              ))}
            </ul>
            <p className="text-body-xl md:text-body-xl-dt text-text-secondary mb-10">
              Lo que falta es un actor capaz de convertir eso en empresas competitivas, que disputen mercados internacionales.
            </p>
            <p className="font-display text-display-md md:text-display-lg-dt text-text-primary">
              Bio/Builders existe para ser ese actor.
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
