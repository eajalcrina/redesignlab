'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import MaturityChecker from '@/components/sections/MaturityChecker'

export default function DiagnosticSection() {
  return (
    <section id="diagnostico" className="bg-gradient-to-b from-rl-dark to-[#1a1a1a] py-24 md:py-32 relative overflow-hidden scroll-mt-20">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
      }} />

      <div className="container-rl relative z-10">
        <SectionReveal>
          <Tag color="neutral" className="mb-4">Diagnostico interactivo</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-4">
            Mide la madurez de tu organizacion frente a la IA
          </h2>
          <p className="text-body-lg text-text-muted max-w-2xl mb-12">
            Un diagnostico estructurado en 5 dimensiones criticas para organizaciones de bioeconomia en America Latina.
          </p>
        </SectionReveal>

        <MaturityChecker />
      </div>
    </section>
  )
}
