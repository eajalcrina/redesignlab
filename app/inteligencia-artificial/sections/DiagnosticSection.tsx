'use client'

import Link from 'next/link'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

export default function DiagnosticSection() {
  return (
    <section
      id="diagnostico"
      className="bg-gradient-to-b from-rl-dark to-[#1a1a1a] py-24 md:py-32 relative overflow-hidden scroll-mt-20"
    >
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="container-rl relative z-10">
        <SectionReveal>
          <Tag color="neutral" className="mb-4">Diagnóstico de Madurez IA</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-4">
            Mide la madurez de tu organización frente a la IA.
          </h2>
          <p className="text-body-lg text-text-muted max-w-2xl mb-10">
            Un diagnóstico estructurado en 5 dimensiones críticas para organizaciones de bioeconomía en América Latina: 12 preguntas, 4 minutos, resultado personalizado por industria y plan de 90 días.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <Link
            href="/inteligencia-artificial/diagnostico"
            className="group block w-full md:max-w-2xl bg-[#141414] hover:bg-[#1a1a1a] p-8 md:p-10 rounded border border-border-dark hover:border-rl-red/40 transition-all"
          >
            <p className="text-label-sm text-rl-red mb-3">DIAGNÓSTICO GRATUITO</p>
            <h3 className="font-display text-display-sm md:text-display-md text-text-on-dark mb-4">
              Descubre en qué nivel está tu organización frente a la IA aplicada.
            </h3>
            <ul className="text-body-sm text-text-muted mb-8 space-y-1.5">
              <li>· Tu nivel de madurez en una escala de 4</li>
              <li>· Palancas de IA priorizadas para tu industria</li>
              <li>· Plan de acción de 90 días</li>
              <li>· Framework RE·IA completo en PDF al correo</li>
            </ul>
            <span className="inline-flex items-center gap-2 bg-rl-red text-white px-8 h-12 rounded font-sans font-medium group-hover:bg-[#d91f5b] transition-colors">
              Comenzar diagnóstico
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                &rarr;
              </span>
            </span>
            <p className="text-body-xs text-text-muted/70 mt-4">
              Sin costo · Sin spam · Sin compromiso
            </p>
          </Link>
        </SectionReveal>
      </div>
    </section>
  )
}
