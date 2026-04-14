'use client'

import { motion } from 'framer-motion'
import { DURATION, EASE } from '@/lib/animations'
import Divider from '@/components/ui/Divider'

const principles = [
  {
    number: '01',
    title: 'Diseñamos para capturar valor, no para reportar hallazgos',
    description:
      'Un diagnóstico que no se traduce en un modelo de captura de valor es un gasto, no una inversión. Cada proyecto termina con una arquitectura de negocio ejecutable.',
  },
  {
    number: '02',
    title: 'La tecnología debe amplificar el conocimiento de campo',
    description:
      'La IA no reemplaza la experiencia territorial. La amplifica. Nuestros modelos se entrenan con datos de campo reales, no con benchmarks genéricos.',
  },
  {
    number: '03',
    title: 'Los resultados se miden en territorio, no en slides',
    description:
      'Medimos el impacto en las operaciones reales del cliente. Si el modelo no funciona en campo, no funciona.',
  },
  {
    number: '04',
    title: 'Selectividad es calidad',
    description:
      'No trabajamos con todas las industrias ni con todos los clientes. Nuestra selectividad es lo que garantiza profundidad y relevancia en cada proyecto.',
  },
  {
    number: '05',
    title: 'Construimos sobre ecosistemas, no sobre proyectos aislados',
    description:
      'Cada proyecto se conecta con una red de ventures, builders y fondos. El valor de uno amplifica el valor de todos.',
  },
  {
    number: '06',
    title: 'Pensamos en décadas, ejecutamos en sprints',
    description:
      'La transformación de la bioeconomía es un proyecto de largo plazo. Pero cada intervención debe generar resultados medibles en semanas, no en años.',
  },
]

const rows = [
  [principles[0], principles[1]],
  [principles[2], principles[3]],
  [principles[4], principles[5]],
]

function PrincipleCard({
  principle,
  isDark,
  delay,
}: {
  principle: (typeof principles)[0]
  isDark: boolean
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: DURATION.slow, ease: EASE.out, delay }}
    >
      <span className="font-mono text-mono-md text-rl-red mb-4 block">
        {principle.number}
      </span>
      <h3
        className={`font-display text-display-sm mb-4 ${
          isDark ? 'text-text-on-dark' : 'text-text-primary'
        }`}
      >
        {principle.title}
      </h3>
      <Divider variant="red" className="w-10 mb-4" />
      <p
        className={`text-body-sm max-w-md ${
          isDark ? 'text-text-muted' : 'text-text-secondary'
        }`}
      >
        {principle.description}
      </p>
    </motion.div>
  )
}

export default function PrinciplesSection() {
  return (
    <section>
      {rows.map((pair, rowIndex) => {
        const isDark = rowIndex % 2 !== 0

        return (
          <div
            key={rowIndex}
            className={isDark ? 'section-dark' : 'section-neutral'}
          >
            <div className="container-rl py-16 md:py-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                {pair.map((principle, i) => (
                  <PrincipleCard
                    key={principle.number}
                    principle={principle}
                    isDark={isDark}
                    delay={i * 0.1}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
