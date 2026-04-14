'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

const tabs = [
  { id: 'industrias', label: '¿Cuáles son las industrias de la bioeconomía?' },
  { id: 'studio', label: '¿Qué es un AI Studio?' },
]

export default function BioeconomyPills() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="section-dark py-16 md:py-24">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">SOMOS EL PRIMER AI STUDIO FOR BIOECONOMY INDUSTRIES DE LATAM</Tag>
        </SectionReveal>

        {/* Tab selector */}
        <div className="flex gap-4 mb-10 overflow-x-auto scrollbar-none" style={{ scrollbarWidth: 'none' }}>
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 text-body-md font-medium transition-all duration-200 border-b-2 whitespace-nowrap flex-shrink-0 ${
                activeTab === i
                  ? 'text-text-on-dark border-rl-red'
                  : 'text-text-muted/60 border-transparent hover:text-text-muted'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 0 ? (
            <motion.div
              key="industrias"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: DURATION.fast, ease: EASE.out }}
            >
              <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-6">
                Son las empresas en las que el activo central del negocio es un sistema vivo.
              </h2>

              <div className="max-w-3xl space-y-6">
                <p className="text-body-lg text-text-muted">
                  En todas estas industrias, la rentabilidad y la regeneración del sistema natural son la misma apuesta. Redesign Lab es el único estudio en América Latina diseñado específicamente para ese tipo de negocio.
                </p>
                <p className="text-body-lg text-text-on-dark">
                  Industrias como pesca y acuicultura, agricultura regenerativa, biocomercio e ingredientes amazónicos, textil y biomateriales, cosmética y suplementos de origen natural, turismo regenerativo, y alimentos y bebidas.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="studio"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: DURATION.fast, ease: EASE.out }}
            >
              <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-6">
                ¿Qué es un AI Studio?
              </h2>

              <div className="max-w-3xl space-y-6">
                <p className="text-body-lg text-text-on-dark font-medium">
                  Un AI Studio no es una consultora que aprendió a usar ChatGPT.
                </p>
                <p className="text-body-lg text-text-muted">
                  Un AI Studio trabaja diferente. La inteligencia artificial opera desde el centro. En el análisis, en el diseño, en la decisión.
                </p>
                <p className="text-body-lg text-text-muted">
                  Las herramientas son las mismas para todos. Lo que cambia es lo que alimenta a esas herramientas.
                </p>
                <p className="text-body-lg text-text-muted">
                  IA sobre datos genéricos produce resultados genéricos. IA construida sobre cinco años en campo, en parcelas de San Martín, en asambleas comunales de Loreto, en mesas de negociación con fondos de impacto, en viajes negociando con clientes globales, produce algo que ninguna oficina replica.
                </p>
                <p className="text-body-lg text-text-on-dark font-medium">
                  Redesign Lab es el único AI Studio en América Latina construido sobre conocimiento territorial de la bioeconomía.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
