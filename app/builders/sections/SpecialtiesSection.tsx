'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const specialties = [
  { name: 'Agroindustria Innovadora', why: 'Expertos agronómicos u operativos con foco en prácticas regenerativas y productoras comerciales.' },
  { name: 'Cadenas Pesqueras y Acuicultura', why: 'Conocimiento profundo sobre economía circular, subproductos marinos y trazabilidad.' },
  { name: 'Cosmética Natural', why: 'Biólogos y formuladores especialistas en biotecnología aplicada a compuestos botánicos de origen amazónico/andino.' },
  { name: 'Inteligencia Artificial y ML', why: 'Ingenieros de datos y desarrolladores capaces de construir infraestructura predictiva y operativa para activos naturales.' },
  { name: 'Finanzas de Impacto', why: 'Perfiles para estructuración de rondas, análisis de deal flow, valuación e interacción con fondos multilaterales y VCs.' },
  { name: 'Turismo Regenerativo', why: 'Desarrolladores de modelos de turismo circular y articuladores comunitarios.' },
  { name: 'Supply Chain', why: 'Especialistas en control logístico y cadenas de aprovisionamiento en zonas de alta complejidad (selva, zonas rurales alejadas).' },
  { name: 'Diseño Estratégico', why: 'Consultores o fundadores con recorrido en go-to-market, pricing B2B corporativo y modelamiento de negocio.' },
]

export default function SpecialtiesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">III. Los perfiles que incorporamos</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            Buscamos expertise hiper-especializado.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {specialties.map((spec, i) => (
            <SectionReveal key={spec.name} delay={i * 0.04}>
              <div
                className="relative border border-border-light p-6 rounded cursor-pointer hover:border-rl-red/30 transition-colors group"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setHoveredIndex(hoveredIndex === i ? null : i)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rl-red opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rl-red" />
                  </span>
                  <h3 className="text-body-md font-medium text-text-primary group-hover:text-rl-red transition-colors">
                    {spec.name}
                  </h3>
                </div>

                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: DURATION.fast, ease: EASE.out }}
                      className="overflow-hidden"
                    >
                      <p className="text-body-sm text-text-secondary pt-2">
                        {spec.why}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
