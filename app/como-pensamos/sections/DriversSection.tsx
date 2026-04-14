'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { DURATION, EASE, STAGGER } from '@/lib/animations'
import Tag from '@/components/ui/Tag'

const drivers = [
  {
    title: 'Diseño estratégico',
    description:
      'No implementamos plantillas. Diseñamos modelos de negocio que capturan el valor que la industria de bioeconomía realmente puede generar.',
  },
  {
    title: 'Operaciones reales',
    description:
      'Cada diseño se prueba en campo. Trabajamos en territorio, con equipos reales, en las condiciones reales de la industria.',
  },
  {
    title: 'Inteligencia artificial',
    description:
      'La IA no es un complemento. Es la infraestructura que permite escalar el conocimiento de campo hacia decisiones que antes tomaban meses.',
  },
]

export default function DriversSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER.slow } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: DURATION.slow, ease: EASE.out },
    },
  }

  const plusVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: DURATION.normal, ease: EASE.out },
    },
  }

  return (
    <section className="section-dark py-24 md:py-32" ref={ref}>
      <div className="container-rl">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-16">
            <Tag color="red" className="mb-4">El camino</Tag>
            <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl">
              Tres fuerzas que definen cómo trabajamos
            </h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-stretch gap-0">
            {drivers.map((driver, i) => (
              <div key={driver.title} className="flex flex-col lg:flex-row items-center flex-1">
                <motion.div
                  variants={itemVariants}
                  className="flex-1 py-8 lg:py-0 lg:px-8"
                >
                  <h3 className="font-display text-display-sm text-text-on-dark mb-4">
                    {driver.title}
                  </h3>
                  <p className="text-body-md text-text-muted">
                    {driver.description}
                  </p>
                </motion.div>

                {i < drivers.length - 1 && (
                  <motion.div
                    variants={plusVariants}
                    className="flex items-center justify-center w-12 h-12 my-4 lg:my-0"
                  >
                    <span className="font-display text-display-sm text-rl-red">
                      +
                    </span>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
