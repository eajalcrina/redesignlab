'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

const principles = [
  {
    title: 'Aplicación antes que teoría',
    body: 'Cada programa produce un entregable concreto que el participante puede usar desde la semana siguiente. No hay módulos que terminen en reflexiones. Hay módulos que terminan en documentos ejecutables.',
  },
  {
    title: 'Metodologías de frontera, curadas para LATAM',
    body: 'Trabajamos con los frameworks, metodologías y estándares más rigurosos disponibles a nivel global — analizados, validados y adaptados al contexto latinoamericano donde operan nuestros participantes. No importamos recetas. Construimos soluciones que funcionan aquí.',
  },
  {
    title: 'Casos internacionales con criterio regional',
    body: 'Aprendemos de lo que está funcionando en el mundo, pero con el criterio para entender qué es transferible a América Latina y qué no. Los benchmarks son globales. Las soluciones son propias.',
  },
  {
    title: 'IA y tecnología en el centro',
    body: 'La inteligencia artificial no es el tema de un módulo — es la herramienta que atraviesa todos los programas. Los participantes aprenden a usar IA con criterio estratégico: no como atajo, sino como amplificador de pensamiento y ejecución.',
  },
]

export default function HubIntro() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Bio Business School</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-6">
            No es una escuela de negocios tradicional.
          </h2>
          <p className="text-body-lg text-text-secondary max-w-3xl mb-16">
            Bio Business School (BBS) es la plataforma de programas ejecutivos de Redesign Lab — diseñada para profesionales, empresarios y líderes que necesitan más que conocimiento: necesitan metodología aplicada, herramientas reales y el criterio para usarlas en su contexto específico.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="text-body-md text-text-secondary mb-10">
            Cada programa de BBS está construido desde cuatro principios que no negociamos:
          </p>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {principles.map((principle, i) => (
            <SectionReveal key={principle.title} delay={0.1 + i * 0.08}>
              <h3 className="font-display text-display-sm text-text-primary mb-3">
                {principle.title}
              </h3>
              <p className="text-body-md text-text-secondary">
                {principle.body}
              </p>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
