'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'
import { cn } from '@/lib/utils'

const industries = [
  {
    id: 'agro',
    label: 'Agroindustria',
    applications: [
      'Predicción de rendimiento por parcela con datos satelitales',
      'Optimización de rutas de acopio con IA',
      'Control de calidad automatizado en planta',
      'Trazabilidad de origen a exportación',
    ],
    insight: 'La agroindustria en LATAM genera más datos de los que usa. El gap entre dato y decisión es donde la IA genera más valor.',
  },
  {
    id: 'pesca',
    label: 'Pesca',
    applications: [
      'Predicción de demanda en mercado asiático',
      'Monitoreo de cadena de frío con IoT + IA',
      'Optimización de capturas por zona y temporada',
      'Certificación automatizada de origen',
    ],
    insight: 'La pesca es una de las industrias con mayor potencial de transformación con IA por la variabilidad de su cadena.',
  },
  {
    id: 'acuicultura',
    label: 'Acuicultura',
    applications: [
      'Monitoreo de salud de stock con visión por computadora',
      'Predicción de crecimiento y momento óptimo de cosecha',
      'Optimización de alimentación con modelos predictivos',
      'Control de calidad de agua automatizado',
    ],
    insight: 'La acuicultura combina biología y operaciones a escala. La IA es el puente entre ambas.',
  },
  {
    id: 'cosmetica',
    label: 'Cosmética',
    applications: [
      'Descubrimiento de ingredientes activos con IA',
      'Predicción de tendencias de mercado',
      'Trazabilidad de ingredientes de biodiversidad',
      'Personalización de productos con datos de consumidor',
    ],
    insight: 'La cosmética natural compite con storytelling y trazabilidad. La IA hace verificables ambas promesas.',
  },
  {
    id: 'turismo',
    label: 'Turismo',
    applications: [
      'Predicción de demanda por destino y temporada',
      'Personalización de experiencias con IA',
      'Monitoreo de impacto ambiental en destinos',
      'Pricing dinámico basado en datos de mercado',
    ],
    insight: 'El turismo regenerativo necesita medir lo que la conservación genera. La IA hace posible esa medición a escala.',
  },
  {
    id: 'alimentos',
    label: 'Alimentos y Bebidas',
    applications: [
      'Trazabilidad de origen a consumidor final',
      'Predicción de demanda y optimización de inventario',
      'Control de calidad automatizado con visión por computadora',
      'Certificación y etiquetado inteligente',
    ],
    insight: 'El mercado de alimentos y bebidas con origen verificable y propiedades funcionales es uno de los de mayor crecimiento. La IA hace verificable la promesa que el consumidor premium exige.',
  },
]

export default function IndustryTabsSection() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Por industria</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            La IA que diseñamos se adapta a cada industria.
          </h2>
        </SectionReveal>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-12 pb-2 -mx-2 px-2">
          {industries.map((ind, i) => (
            <button
              key={ind.id}
              onClick={() => setActiveTab(i)}
              className={cn(
                'px-5 py-2.5 text-body-sm font-medium whitespace-nowrap transition-all duration-200 rounded border flex-shrink-0',
                activeTab === i
                  ? 'bg-rl-dark text-text-on-dark border-rl-dark'
                  : 'bg-transparent text-text-secondary border-border-light hover:border-text-secondary'
              )}
            >
              {ind.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: DURATION.fast, ease: EASE.out }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <div>
              <h3 className="font-display text-display-sm text-text-primary mb-6">
                Aplicaciones en {industries[activeTab].label}
              </h3>
              <ul className="space-y-4">
                {industries[activeTab].applications.map((app) => (
                  <li key={app} className="flex items-start gap-3 text-body-md text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                    {app}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-rl-dark p-8 rounded">
              <span className="text-label-sm uppercase text-rl-red block mb-3">Insight</span>
              <p className="text-body-lg text-text-on-dark">{industries[activeTab].insight}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
