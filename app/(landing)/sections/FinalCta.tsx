'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import { SITE_CONFIG } from '@/lib/constants'

export default function FinalCta() {
  return (
    <section className="bg-rl-red text-white min-h-[80vh] flex items-center">
      <div className="container-rl text-center">
        <SectionReveal>
          <span className="inline-block uppercase font-sans tracking-[0.18em] text-white/80 mb-8" style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 600 }}>
            THE FIRST AI STUDIO FOR BIOECONOMY INDUSTRIES
          </span>
          <h2 className="font-display text-[44px] md:text-[52px] leading-[1.1] tracking-[-0.02em] font-normal text-white max-w-3xl mx-auto mb-8">
            Empecemos a adoptar la inteligencia artificial para transformar tu industria.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.4}>
          <div className="h-px w-16 bg-white/40 mx-auto mb-8" />
          <p className="text-body-xl text-white/85 max-w-xl mx-auto mb-12">
            Trabajamos con quienes tienen un dolor real en su negocio, el activo y el momento correcto.
          </p>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="inline-flex items-center gap-2 bg-white text-rl-red px-8 h-12 rounded font-sans font-medium hover:bg-white/90 transition-colors"
          >
            Escribir al equipo <span aria-hidden>&rarr;</span>
          </a>
          <p className="text-body-sm text-white/70 mt-4">
            {SITE_CONFIG.email}
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}
