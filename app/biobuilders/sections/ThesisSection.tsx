'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

const resources = [
  'comunidad organizada',
  'biodiversidad',
  'procesos productivos',
  'productos con demanda real',
  'interés genuino de mercado',
]

export default function ThesisSection() {
  return (
    <section className="bg-white text-text-primary py-24 md:py-32">
      <div className="container-rl">
        <div className="max-w-3xl">
          <SectionReveal>
            <Tag color="red" className="mb-6">Por qué existe Bio/Builders</Tag>
            <p className="text-body-xl md:text-body-xl-dt text-text-secondary mb-8">
              En los territorios de América Latina ya existe casi todo lo que un negocio necesita:
            </p>
            <ul className="flex flex-wrap gap-3 mb-8">
              {resources.map((r) => (
                <li
                  key={r}
                  className="px-4 py-2 rounded-full border border-border-light bg-rl-neutral text-body-md text-text-primary"
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
