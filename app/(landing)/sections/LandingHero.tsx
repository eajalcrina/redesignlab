'use client'

import Link from 'next/link'
import HeroText from '@/components/sections/HeroText'
import Button from '@/components/ui/Button'

export default function LandingHero() {
  return (
    <section className="section-dark min-h-screen flex items-center">
      <div className="container-rl py-32">
        <p className="mb-8 text-body-sm tracking-[0.14em] uppercase text-rl-red">
          THE AI STUDIO FOR BIOECONOMY INDUSTRIES
        </p>
        <HeroText
          line1="Negocios que funcionan."
          line2="En industrias que importan."
        />
        <p className="mt-8 text-body-xl text-text-muted max-w-2xl">
          Somos el primer AI Studio de América Latina dedicado a transformar las industrias cuya ventaja competitiva depende de regenerar los sistemas naturales.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Button variant="primary" size="lg" href="/crear-valor">
            Ver nuestros servicios →
          </Button>
          <Button variant="secondary" size="lg" href="/inteligencia-artificial#diagnostico" className="text-text-on-dark border-text-on-dark/20">
            Haz tu diagnóstico IA →
          </Button>
        </div>
        <div className="mt-8">
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
