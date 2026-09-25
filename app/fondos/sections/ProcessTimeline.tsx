'use client'

import { useEffect, useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'

const STEPS = [
  { title: 'Sourcing', text: 'Identificamos oportunidades en cadenas de valor y territorios.' },
  { title: 'Due Diligence', text: 'Validamos técnicamente el modelo de negocio, cadena, equipo y territorio, no solo números.' },
  { title: 'Value Building', text: 'Aceleramos la creación de valor en las organizaciones: comercialización, operación y tecnología.' },
  { title: 'Monitoring', text: 'Monitoreo continuo con datos de campo y alertas tempranas para el comité de inversión.' },
  { title: 'Impact Reporting', text: 'Métricas de impacto y reportes verificables con datos de campo, los que LP y mercado exigen.' },
]
const SEG = 2600 // ms por tramo, lineal (ritmo de la barra del hero)
const START = 500

export default function ProcessTimeline() {
  const root = useRef<HTMLDivElement>(null)
  const prog = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = root.current
    const bar = prog.current
    if (!el || !bar) return
    const steps = Array.from(el.querySelectorAll<HTMLElement>('.timeline__step'))
    const dots = steps.map((s) => s.querySelector<HTMLElement>('.timeline__dot')!)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const horizontal = () => window.matchMedia('(min-width: 768px)').matches
    const prop = (): 'width' | 'height' => (horizontal() ? 'width' : 'height')
    const pos = (i: number) => {
      const d = dots[i].getBoundingClientRect()
      const c = el.getBoundingClientRect()
      return horizontal() ? d.left - c.left + d.width / 2 : d.top - c.top + d.height / 2
    }
    let timers: number[] = []
    let played = false
    let last = -1
    const clear = () => { timers.forEach((t) => window.clearTimeout(t)); timers = [] }
    const light = (i: number) => { last = i; steps[i].classList.add('is-on') }
    const play = () => {
      clear()
      steps.forEach((s) => s.classList.remove('is-on'))
      bar.style.transition = 'none'
      bar.style.width = ''
      bar.style.height = ''
      bar.style[prop()] = '0px'
      void bar.offsetWidth
      bar.style.transition = ''
      if (reduce) {
        steps.forEach((_, i) => light(i))
        bar.style[prop()] = `${pos(steps.length - 1)}px`
        return
      }
      el.classList.add('is-running')
      steps.forEach((_, i) => {
        timers.push(window.setTimeout(() => {
          light(i)
          if (i < steps.length - 1) bar.style[prop()] = `${pos(i + 1)}px`
        }, START + i * SEG))
      })
      timers.push(window.setTimeout(() => el.classList.remove('is-running'), START + (steps.length - 1) * SEG + 900))
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !played) { played = true; play() }
        else if (!e.isIntersecting && e.boundingClientRect.top > 0) played = false
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    const onResize = () => {
      if (last < 0) return
      bar.style.transition = 'none'
      bar.style.width = ''
      bar.style.height = ''
      bar.style[prop()] = `${pos(Math.min(last + (last < steps.length - 1 ? 1 : 0), steps.length - 1))}px`
      void bar.offsetWidth
      bar.style.transition = ''
    }
    window.addEventListener('resize', onResize)
    return () => { io.disconnect(); clear(); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <section className="section-neutral">
      <div className="container-rl py-24 md:py-32">
        <SectionLabel n="03" className="mb-4">Proceso integral de acompañamiento</SectionLabel>
        <h2 className="max-w-[900px] font-sans text-[30px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[40px]">Acompañamos a tu portafolio de empresas u organizaciones en cada etapa.</h2>
        <div ref={root} className="timeline mt-16">
          <span aria-hidden="true" className="timeline__rail" />
          <span aria-hidden="true" ref={prog} className="timeline__prog" />
          <ol className="grid grid-cols-1 gap-10 pl-16 md:grid-cols-5 md:gap-0 md:pl-0">
            {STEPS.map((s, i) => (
              <li key={s.title} className="timeline__step relative md:pr-7">
                <span className="timeline__dot -ml-16 md:ml-0">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mb-3 mt-4 font-sans text-[24px] font-normal tracking-[-0.03em] md:mt-7 md:text-[26px]">{s.title}</h3>
                <p className="text-[15px] leading-[1.65] text-text-secondary">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
