'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'

const paths = [
  {
    title: 'Crear valor',
    description: 'Para organizaciones que tienen un activo o una oportunidad que todavía no han capturado — y que necesitan el diseño del modelo, la estructura del nuevo negocio o la estrategia para acceder al capital correcto.',
    services: 'Opportunity Scan · Innovation Blueprint · Bioventure Blueprint · Corporate Spin-off Design · Fundraising Estratégico · Impact Value Report',
    href: '/crear-valor',
  },
  {
    title: 'Rediseñar el trabajo',
    description: 'Para organizaciones que ya tienen un negocio funcionando — y que necesitan que funcione mucho mejor. Más eficiente, más trazable, más circular, más inteligente.',
    services: 'Re. Sprint · Circular Operations Redesign · Supply Chain Intelligence · Re.·IA Application',
    href: '/redisenar-el-trabajo',
  },
  {
    title: 'Transformar el modelo',
    description: 'Para organizaciones que han llegado al límite de lo que el modelo actual puede producir — y que necesitan repensar la arquitectura completa del negocio para la siguiente etapa.',
    services: 'Operating Model Design · AI Transformation Roadmap · AI Leadership Sprint · Scale Strategy',
    href: '/transformar-el-modelo',
  },
]

export default function ThreePaths() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-4">
            Tres formas de trabajar con Redesign Lab.
          </h2>
          <p className="text-body-xl text-text-secondary max-w-2xl mb-12">
            Cada organización tiene un punto de entrada. Solo uno es el correcto en este momento.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paths.map((path, i) => (
            <SectionReveal key={path.title} delay={i * 0.1}>
              <div className="p-10 border-2 border-border-light rounded hover:bg-rl-dark hover:text-text-on-dark hover:border-rl-dark transition-all duration-300 group h-full flex flex-col shadow-sm hover:shadow-lg">
                <span className="font-mono text-mono-sm text-rl-red block mb-4">0{i + 1}</span>
                <h3 className="font-display text-display-md text-text-primary group-hover:text-text-on-dark mb-4 transition-colors">
                  {path.title}
                </h3>
                <p className="text-body-sm text-text-secondary group-hover:text-text-muted mb-4 flex-1 transition-colors">
                  {path.description}
                </p>
                <p className="text-body-xs text-text-tertiary group-hover:text-text-muted/60 mb-6 transition-colors">
                  {path.services}
                </p>
                <Button variant="text" href={path.href} className="text-text-primary group-hover:text-text-on-dark transition-colors">
                  Explorar →
                </Button>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.4}>
          <div className="mt-12">
            <Button variant="text" href="/proyectos" className="text-text-primary">
              Ver todos los proyectos
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
