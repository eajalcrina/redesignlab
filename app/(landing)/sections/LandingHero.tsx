'use client'

import Link from 'next/link'
import HeroText from '@/components/sections/HeroText'
import HeroCarousel from '@/components/sections/HeroCarousel'
import Button from '@/components/ui/Button'

export default function LandingHero() {
  return (
    <section className="section-dark min-h-screen flex items-center relative overflow-hidden">
      <HeroCarousel />
      <div className="container-rl py-32 relative z-10">
        <p className="mb-8 text-body-md md:text-body-lg tracking-[0.16em] uppercase text-rl-red font-medium">
          THE AI STUDIO FOR BIOECONOMY INDUSTRIES
        </p>
        <HeroText
          line1="Negocios que funcionan."
          line2="En industrias que importan."
        />
        <p className="mt-8 text-body-xl text-text-muted max-w-3xl">
          No somos una consultora. No somos un fondo. Somos un estudio de IA que transforma la relación de las industrias con los sistemas naturales, para convertirlas en ventajas competitivas únicas.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <Button variant="primary" size="lg" href="/crear-valor">
            Ver nuestros servicios →
          </Button>
          <Button variant="secondary" size="lg" href="/inteligencia-artificial#diagnostico" className="text-text-on-dark border-text-on-dark/20">
            Haz tu diagnóstico IA →
          </Button>
          <Link
            href="/conocimiento"
            className="inline-flex items-center gap-2 text-body-md text-text-muted hover:text-text-on-dark transition-colors group"
          >
            <span className="underline underline-offset-4 decoration-text-muted/40 group-hover:decoration-text-on-dark">Descarga nuestra guía Re-IA</span>
            <span className="text-rl-red transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
