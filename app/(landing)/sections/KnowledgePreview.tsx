'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'

const resources = [
  {
    label: 'RECURSO DESTACADO',
    title: 'BIRF: Bionegocio Investment Readiness Framework',
    description:
      'La herramienta que evalúa lo que el pitch deck no dice. Seis dimensiones de madurez, cuatro niveles de investment readiness, señales de identificación concretas y tres casos de referencia aplicados. Diseñada para fondos de impacto que necesitan un diagnóstico técnico estructurado, y para bionegocios que quieren saber con honestidad dónde están antes de sentarse con un inversor.',
    meta: '15 páginas · PDF · Español · Descarga gratuita',
    cta: 'Descargar el BIRF',
    href: '#',
  },
  {
    label: 'INTELIGENCIA ARTIFICIAL',
    title: 'Re.·IA: Inteligencia Artificial para Bionegocios',
    description:
      'El framework que conecta capacidades de IA con las operaciones reales de un bionegocio. Diagnóstico de madurez tecnológica, casos de uso priorizados por impacto, y una hoja de ruta para implementar IA donde realmente genera valor, no donde suena bien.',
    meta: 'Framework · PDF · Español',
    cta: 'Explorar Re.·IA',
    href: '#',
  },
  {
    label: 'DUE DILIGENCE',
    title: 'Guía de Due Diligence para Bionegocios',
    description:
      'Una guía estructurada para evaluar bionegocios con el rigor que el capital de impacto exige. Cubre las dimensiones técnicas, regulatorias, territoriales y financieras que los fondos necesitan verificar antes de comprometer capital.',
    meta: 'Guía · PDF · Español',
    cta: 'Descargar la guía',
    href: '#',
  },
  {
    label: 'COMUNIDADES NATIVAS',
    title: 'Guía de Trabajo con Comunidades Nativas',
    description:
      'Protocolo operativo para proyectos que involucran comunidades nativas y pueblos originarios. Desde el consentimiento informado hasta la distribución de beneficios, diseñado a partir de experiencia real en territorio amazónico.',
    meta: 'Guía · PDF · Español',
    cta: 'Descargar la guía',
    href: '#',
  },
]

export default function KnowledgePreview() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % resources.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const resource = resources[current]

  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <Divider className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <SectionReveal>
            <Tag color="red" className="mb-4">Conocimiento</Tag>
            <h2 className="font-display text-display-md text-text-primary mb-4">
              Lo que hemos aprendido, disponible para el ecosistema.
            </h2>
            <p className="text-body-md text-text-secondary mb-6">
              Redesign Lab publica frameworks y guías construidos a partir de trabajo real en campo. No teoría. Herramientas que ya han sido aplicadas en proyectos con consecuencias reales.
            </p>
            <Button variant="text" href="/conocimiento" className="text-text-primary">
              Ver todos los recursos &rarr;
            </Button>
          </SectionReveal>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-rl-dark p-8 rounded"
              >
                <span className="text-label-sm uppercase text-rl-red block mb-3">{resource.label}</span>
                <h3 className="font-display text-display-sm text-text-on-dark mb-3">
                  {resource.title}
                </h3>
                <p className="text-body-sm text-text-muted mb-4">
                  {resource.description}
                </p>
                <span className="font-mono text-mono-sm text-text-muted block mb-4">{resource.meta}</span>
                <Button variant="text" href={resource.href} className="text-rl-red">
                  {resource.cta} &rarr;
                </Button>
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {resources.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? 'bg-rl-red' : 'bg-text-secondary/30'
                  }`}
                  aria-label={`Recurso ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
