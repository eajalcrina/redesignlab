'use client'

import { motion } from 'framer-motion'
import { DURATION, EASE, STAGGER } from '@/lib/animations'
import Tag from '@/components/ui/Tag'
import { projects } from '@/data/projects'

export default function HeroSection() {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER.fast } },
  }
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION.normal, ease: EASE.out } },
  }

  const industries = new Set(projects.map((p) => p.industry))
  const geos = new Set(projects.map((p) => p.geo))

  const stats = [
    { value: `${projects.length}`, label: 'proyectos' },
    { value: `${industries.size}`, label: 'industrias' },
    { value: `${geos.size}`, label: 'geografías' },
    { value: '100%', label: 'bioeconomía' },
  ]

  return (
    <section className="section-dark pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-rl">
        <motion.div initial="hidden" animate="visible" variants={container} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-8">
            <motion.div variants={item}>
              <Tag color="neutral" className="mb-8">Proyectos</Tag>
            </motion.div>
            
            <motion.h1 variants={item} className="font-display text-display-lg md:text-display-xl text-text-on-dark mb-6">
              Proyectos que transforman industrias en la dirección correcta.
            </motion.h1>
            
            <motion.p variants={item} className="text-body-lg text-text-muted max-w-2xl mb-12">
              Más de cinco años co-construyendo negocios, estructurando inversiones y diseñando modelos que funcionan en las industrias más complejas de América Latina.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-8 md:gap-12 mb-16 lg:mb-0">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span className="font-mono text-mono-lg text-rl-red block">{stat.value}</span>
                  <span className="text-body-xs text-text-muted">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Introducción column */}
          <motion.div variants={item} className="lg:col-span-4 lg:col-start-9 flex flex-col gap-6 text-body-md text-text-muted">
            <p>
              Cada proyecto en este portafolio representa una pregunta concreta que alguien necesitaba responder: ¿Cómo convertimos un activo natural en un modelo de negocio exportable? ¿Cómo accedemos a capital verde con las salvaguardas de la banca multilateral? ¿Cómo demostramos que el cacao de San Martín puede llegar al estante de una chocolatería premium en Europa?
            </p>
            <p>
              Las respuestas no vinieron de marcos teóricos. Vinieron del campo, de las mesas de negociación, de las comunidades amazónicas y de los mercados internacionales. Este es el registro de lo que construimos — y de lo que aprendimos haciéndolo.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
