'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'

export default function AISection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Noise texture moves slower than scroll (parallax)
  const noiseY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  // Red glow drifts horizontally as user scrolls
  const glowX = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.7, 0])

  return (
    <section
      ref={sectionRef}
      className="bg-[#141414] text-text-on-dark py-24 md:py-32 relative overflow-hidden border-y border-border-dark"
    >
      {/* Parallax noise texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          y: noiseY,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Drifting red glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[70%] h-[70%] rounded-full bg-rl-red/20 blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ x: glowX, opacity: glowOpacity }}
      />

      <div className="container-rl relative z-10">
        <SectionReveal>
          <Tag color="red" className="mb-4">INTELIGENCIA ARTIFICIAL PARA BIOECONOMÍA</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark/60 max-w-4xl mb-2">
            La IA genérica resuelve problemas genéricos.
          </h2>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-4xl mb-8">
            Los problemas de la bioeconomía no son genéricos.
          </h2>
          <p className="text-body-lg text-text-muted max-w-3xl mb-16">
            Hay muchas firmas que pueden hablar de inteligencia artificial con autoridad. Hay muy pocas que pueden hablar de bioeconomía amazónica con la misma autoridad. Y prácticamente ninguna que pueda hacer las dos cosas al mismo tiempo — con proyectos reales, resultados verificables y conocimiento de primera mano del territorio.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div>
            <Button variant="text" href="/inteligencia-artificial" className="text-text-on-dark">
              Explorar IA para bioeconomía →
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
