'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '@/components/animations/SectionReveal'
import ReIntelligenceForm from '@/components/forms/ReIntelligenceForm'
import { DURATION, EASE } from '@/lib/animations'

export default function ApplicationProcess() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <div ref={ref}>
      <SectionReveal>
        <p className="text-body-lg text-text-secondary max-w-3xl mb-20">
          Desde el contacto inicial hasta la primera sesión de trabajo. El formulario asegura que la primera reunión llegue con contexto real — no se gasta tiempo en presentaciones genéricas.
        </p>
      </SectionReveal>

      {/* Step 01 — Form */}
      <SectionReveal delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 mb-24">
          <div>
            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-mono text-mono-md text-rl-red">01</span>
              <h3 className="font-display text-display-sm text-text-primary">
                Completar el formulario
              </h3>
            </div>
            <p className="text-body-md text-text-secondary mb-6">
              El formulario es el punto de partida. Permite que el equipo de Redesign Lab llegue a la primera reunión con contexto real sobre la empresa — sin perder tiempo en presentaciones genéricas.
            </p>
            <p className="text-body-md text-text-secondary border-l-2 border-rl-red pl-4 italic">
              <span className="text-text-primary font-medium">La pregunta que más importa:</span> ¿cuál es el desafío más crítico que enfrenta tu empresa en los próximos seis meses — y por qué crees que no puedes resolverlo solo? Esa pregunta no es un trámite. Es el primer filtro real.
            </p>
          </div>

          <ReIntelligenceForm />
        </div>
      </SectionReveal>

      {/* Step 02 + 03 timeline */}
      <div className="relative">
        <motion.div
          className="hidden md:block absolute top-8 left-0 right-0 h-px bg-rl-red origin-left"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: DURATION.verySlow, ease: EASE.out, delay: 0.3 }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.4 }}
          >
            <div className="hidden md:flex items-center justify-center w-4 h-4 rounded-full bg-rl-neutral border-2 border-rl-red mb-6" />
            <span className="font-mono text-mono-sm text-rl-red block mb-2">02</span>
            <h3 className="font-display text-display-sm text-text-primary mb-3">
              Agendar la reunión de fit
            </h3>
            <p className="text-body-md text-text-secondary">
              Inmediatamente después de enviar el formulario, agendas la conversación de <span className="text-text-primary font-medium">30 minutos</span> directamente desde el calendario del equipo. Eddie y Lorenzo llegan con tu información ya revisada — no se gasta tiempo en presentaciones desde cero. Si hay alineación real, se define la versión y se activa el onboarding. Si no la hay, se comunica con claridad en la misma reunión y se sugiere el camino más apropiado.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.55 }}
          >
            <div className="hidden md:flex items-center justify-center w-4 h-4 rounded-full bg-rl-neutral border-2 border-rl-red mb-6" />
            <span className="font-mono text-mono-sm text-rl-red block mb-2">03</span>
            <h3 className="font-display text-display-sm text-text-primary mb-3">
              Onboarding
            </h3>
            <p className="text-body-md text-text-secondary mb-3">
              <span className="text-text-primary font-medium">Light:</span> inicia con la primera sesión de trabajo. Sin período de espera.
            </p>
            <p className="text-body-md text-text-secondary">
              <span className="text-text-primary font-medium">Pro:</span> contempla un período de onboarding de 3 meses (Inmersión → Definición → Activación) antes de entrar al ciclo mensual estándar.
            </p>
          </motion.div>
        </div>
      </div>

      <SectionReveal delay={0.7}>
        <div className="border-t border-border-light mt-20 pt-8 max-w-3xl">
          <p className="font-mono text-mono-sm text-rl-red uppercase tracking-[0.18em] mb-3">
            Compromiso mínimo
          </p>
          <p className="text-body-md text-text-secondary">
            3 meses. Cancelación después del período mínimo con aviso de 30 días. Sin penalidades.
          </p>
        </div>
      </SectionReveal>
    </div>
  )
}
