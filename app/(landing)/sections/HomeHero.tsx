'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Tag from '@/components/ui/Tag'
import CalendarButton from '@/components/ui/CalendarButton'
import { cn } from '@/lib/utils'

const SLIDES = ['/assets/hero/hero-21.jpg', '/assets/conocimiento/birf.jpg', '/assets/hero/hero-07.jpg', '/assets/hero/hero-04.jpg']
const INTERVAL = 6000
const pad = (n: number) => String(n).padStart(2, '0')

export default function HomeHero() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setI((v) => (v + 1) % SLIDES.length), INTERVAL)
    return () => window.clearInterval(t)
  }, [])

  return (
    <section className="section-dark">
      <div className="container-rl grid grid-cols-1 items-end gap-10 pb-16 pt-32 md:pb-[72px] md:pt-40 lg:grid-cols-[1.25fr_.75fr] lg:gap-14">
        <div>
          <Tag className="mb-7">The AI Studio for Bioeconomy Industries</Tag>
          <h1 className="font-sans text-[40px] font-normal leading-[1.0] tracking-[-0.035em] md:text-[58px]">
            La bioeconomía de América Latina tiene el potencial.{' '}
            <span className="text-text-muted">Nosotros lo convertimos en negocios que escalan.</span>
          </h1>
          <p className="mb-9 mt-7 max-w-[520px] text-[17px] leading-[1.6] text-text-muted">
            Somos un Venture Studio boutique. Diseñamos, escalamos e invertimos en negocios con potencial real, para convertirlos en empresas que compitan en los mercados más exigentes.
          </p>
          <div className="flex flex-wrap gap-3">
            <CalendarButton location="home_hero_escalemos">Escalemos juntos</CalendarButton>
            <CalendarButton location="home_hero_capital" variant="outline">Accede a capital de impacto</CalendarButton>
          </div>
        </div>
        <figure className="relative h-[320px] overflow-hidden rounded-[3px] md:h-[440px]">
          {SLIDES.map((src, k) => (
            <div key={src} className={cn('hero-slide duotone absolute inset-0', k === i && 'is-on')}>
              <Image src={src} alt="" fill sizes="(min-width: 1024px) 36vw, 100vw" priority={k === 0} className="object-cover" />
            </div>
          ))}
          <figcaption className="absolute bottom-3 left-3.5 right-3.5 z-[3] flex items-center gap-3 font-mono text-[10px] tracking-[0.15em] text-white">
            <span>{pad(i + 1)}</span>
            <span className="relative h-px flex-1 overflow-hidden bg-white/30">
              <i key={i} className="hero-progress absolute inset-0 bg-white" />
            </span>
            <span>{pad(SLIDES.length)}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
