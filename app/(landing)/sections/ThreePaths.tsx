'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'

const paths = [
  {
    title: 'Pon Orden',
    description: 'Cuando la empresa está desordenada, perdiendo dinero, o el crecimiento tropieza con la propia organización.',
    services: 'Diagnóstico · Sprint · Rediseño y consolidación',
    href: '/pon-orden',
  },
  {
    title: 'Consigue Capital',
    description: 'Cuando el negocio tiene una oportunidad real de crecer, pero no sabes cómo conseguir capital.',
    services: 'Diagnóstico · Sprint · Rediseño y consolidación',
    href: '/consigue-capital',
  },
  {
    title: 'Vende más',
    description: 'Cuando necesitas aumentar los ingresos: vender más, o lanzar algo nuevo.',
    services: 'Diagnóstico · Sprint · Rediseño y consolidación',
    href: '/vende-mas',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number],
    },
  }),
}

export default function ThreePaths() {
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef, { once: true, amount: 0.25 })

  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-4">
            Tres puertas de entrada para trabajar con Redesign Lab.
          </h2>
          <p className="text-body-xl text-text-secondary max-w-2xl mb-12">
            En nuestros años trabajando con empresas en Perú y Latinoamérica hemos visto los mismos desafíos repetirse en distintos momentos del crecimiento de un negocio. Identificarlos es el primer paso de nuestro propósito: ayudarte a llevar tu empresa al siguiente nivel. Cada organización tiene un punto de entrada. Solo uno es el correcto en este momento.
          </p>
        </SectionReveal>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: '1200px' }}>
          {paths.map((path, i) => (
            <motion.div
              key={path.title}
              custom={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={cardVariants}
              whileHover={{
                y: -8,
                rotateX: 2,
                rotateY: -2,
                transition: { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] },
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative p-10 border-2 border-border-light rounded hover:bg-rl-dark hover:text-text-on-dark hover:border-rl-dark transition-[background,border-color,color] duration-300 group h-full flex flex-col shadow-sm hover:shadow-2xl hover:shadow-rl-red/10 overflow-hidden">
                {/* Subtle red glow on hover */}
                <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-rl-red/0 group-hover:bg-rl-red/10 blur-3xl transition-colors duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  <span className="font-mono text-mono-sm text-rl-red block mb-4">0{i + 1}</span>
                  <p className="font-display text-[20px] sm:text-[23px] md:text-[25px] leading-[1.2] text-text-primary group-hover:text-text-on-dark mb-5 flex-1 transition-colors">
                    {path.description}
                  </p>
                  <p className="font-mono text-mono-sm uppercase tracking-[0.14em] text-rl-red mb-1 transition-colors">
                    Ruta: {path.title}
                  </p>
                  <p className="text-body-xs text-text-tertiary group-hover:text-text-muted/60 mb-6 transition-colors">
                    {path.services}
                  </p>
                  <Button variant="text" href={path.href} className="text-text-primary group-hover:text-text-on-dark transition-colors">
                    Explorar →
                  </Button>
                </div>
              </div>
            </motion.div>
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
