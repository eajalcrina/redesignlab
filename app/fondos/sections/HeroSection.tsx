'use client'

import { motion } from 'framer-motion'
import { DURATION, EASE, STAGGER } from '@/lib/animations'

/**
 * Red-on-white hero for /fondos. Differentiates the section from the rest
 * of the dark-themed pages while staying in-brand. Editorial rhythm:
 * eyebrow line · split headline (muted → solid) · white divider · body.
 */
export default function HeroSection() {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER.slow } },
  }
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION.normal, ease: EASE.out } },
  }
  const lineEase: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

  return (
    <section className="bg-rl-red text-white min-h-[80vh] flex items-center relative overflow-hidden">
      {/* Subtle texture / vignette to add depth without competing with copy */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/15" />
      </div>

      {/* Vertical mono label rotated on the right edge — Thousandfold-style decorative beat */}
      <div className="hidden lg:block absolute top-1/2 right-8 -translate-y-1/2 z-10">
        <span
          className="font-mono text-[10px] tracking-[0.32em] text-white/35 uppercase block"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          PARA FONDOS DE INVERSIÓN · 2026
        </span>
      </div>

      <div className="container-rl py-32 md:py-40 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={container}>
          {/* Eyebrow editorial: // 01 — line — label */}
          <motion.div variants={item} className="flex items-center gap-3 sm:gap-4 mb-10 md:mb-12 flex-wrap">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-white/60 shrink-0">{'// 01'}</span>
            <div className="w-6 sm:w-8 h-px bg-white/40 shrink-0" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-white/85 uppercase">
              PARTNER ESTRATÉGICO PARA FONDOS DE IMPACTO
            </span>
          </motion.div>

          {/* Headline split: muted top (the problem) · white bottom (the answer) */}
          <motion.h1
            variants={item}
            className="font-display text-display-lg md:text-display-xl lg:text-[80px] lg:leading-[0.97] lg:font-normal text-white/65 max-w-5xl"
          >
            Invertir en bioeconomía tiene un riesgo que el análisis financiero no puede mitigar solo.
          </motion.h1>

          <motion.div
            variants={{
              hidden: { scaleX: 0, originX: 0 },
              visible: { scaleX: 1, transition: { duration: 0.7, ease: lineEase, delay: 0.2 } },
            }}
            className="h-0.5 bg-white w-24 my-6"
          />

          <motion.h2
            variants={item}
            className="font-display text-display-lg md:text-display-xl lg:text-[80px] lg:leading-[0.97] lg:font-normal text-white max-w-4xl"
          >
            Redesign Lab lo reduce.
          </motion.h2>

          <motion.p
            variants={item}
            className="text-body-lg text-white/85 max-w-3xl mt-10 whitespace-pre-line"
          >
            {`Nuestra experiencia como venture studio asegura un de-risking real de las inversiones de impacto para los fondos de inversión — no solo diagnóstico, sino la capacidad de acompañar el cierre de las brechas antes de que el capital se mueva.

El resultado: inversiones de impacto de mejor calidad y mayor probabilidad de generar el retorno que el fondo proyectó.`}
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom-center scroll indicator — vertical hairline echo from Thousandfold pattern */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div className="w-px h-10 bg-white/45" />
      </div>
    </section>
  )
}
