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
          <Tag color="red" className="mb-4">PARA QUE ESTEMOS TODOS EN LA MISMA PÁGINA</Tag>
        </SectionReveal>

        {/* Tab selector */}
        <div className="flex gap-4 mb-10">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 text-body-md font-medium transition-all duration-200 border-b-2 ${
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
              <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-4">
                ¿Qué es un AI Studio?
              </h2>
              <p className="text-body-xl text-text-muted max-w-2xl mb-10">
                Es la combinación de innovación, territorio e inteligencia artificial en un solo modelo de trabajo.
              </p>

              <div className="max-w-3xl space-y-6">
                <p className="text-body-lg text-text-muted">
                  Un AI Studio no es una consultora que usa IA como herramienta. Es una organización diseñada desde su origen para que la inteligencia artificial sea el motor central de análisis, diseño y decisión — aplicada a industrias donde el conocimiento de campo y el territorio son irremplazables.
                </p>
                <p className="text-body-lg text-text-muted">
                  La IA no reemplaza la experiencia territorial. La amplifica. Comprime meses de análisis en días. Detecta patrones que el ojo humano no puede procesar a escala. Permite tomar decisiones con la velocidad que el mercado de 2026 exige — sin perder la profundidad que estas industrias requieren.
                </p>
                <p className="text-body-lg text-text-on-dark font-medium">
                  Redesign Lab es el único AI Studio en América Latina especializado en las industrias de bioeconomía.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
