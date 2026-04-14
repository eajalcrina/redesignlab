'use client'

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
          No somos una consultora convencional. No somos un fondo. Somos el estudio especializado que transforma las industrias cuya ventaja competitiva depende de los sistemas naturales.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Button variant="primary" size="lg" href="/crear-valor">
            Ver nuestros servicios →
          </Button>
          <Button variant="secondary" size="lg" href="/ventures" className="text-text-on-dark border-text-on-dark/20">
            Conocer el portafolio →
          </Button>
        </div>
      </div>
    </section>
  )
}
