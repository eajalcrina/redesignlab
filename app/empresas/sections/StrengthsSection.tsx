'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'

const FRONTS = [
  { n: '01', title: 'Negocios y Tecnología', image: '/assets/hero/hero-16.jpg', text: 'La tecnología es una palanca de la estrategia, no un área de soporte. Trabajamos escenarios de crecimiento, posicionamiento y modelo de negocio junto con el diagnóstico tecnológico y las oportunidades de IA, como una sola decisión.' },
  { n: '02', title: 'Operaciones y Finanzas', image: '/assets/hero/hero-08.jpg', text: 'Eficiencia y sostenibilidad del modelo, analizadas juntas: detectamos ineficiencias operativas y las traducimos en estructura de costos, rentabilidad por línea y criterios reales para invertir o asignar recursos.' },
  { n: '03', title: 'Marca y Comercial', image: '/assets/hero/hero-14.jpg', text: 'La marca define qué tan fácil es vender y a qué precio, no es un gasto de diseño aislado. Trabajamos posicionamiento y mensaje junto con pipeline, conversión y el mapeo del ecosistema competitivo.' },
  { n: '04', title: 'Impacto', image: '/assets/conocimiento/birf.jpg', text: 'En bioeconomía, el impacto no es un reporte de sostenibilidad, es parte de la tesis de valor. Medimos el impacto ambiental, social y económico, y lo alineamos con lo que valoran clientes, inversores y aliados.' },
]

export default function StrengthsSection() {
  const [active, setActive] = useState(0)
  const items = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)) }),
      { rootMargin: '-45% 0px -45% 0px' }
    )
    items.current.forEach((n) => n && io.observe(n))
    return () => io.disconnect()
  }, [])

  return (
    <section className="section-neutral">
      <div className="container-rl py-24 md:py-32">
        <SectionLabel n="03" className="mb-4">Nuestras fortalezas como socios</SectionLabel>
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <h2 className="font-sans text-[30px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[40px] lg:col-span-7">La misma disciplina, en cada empresa en la que nos asociamos.</h2>
          <p className="text-[15px] leading-[1.65] text-text-secondary lg:col-span-4 lg:col-start-9">Cuatro frentes que cubren el espacio completo de decisiones que mueven un negocio en crecimiento.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
          <div className="hidden self-start md:sticky md:top-[110px] md:block">
            <div className="relative h-[360px] overflow-hidden rounded-[3px]">
              {FRONTS.map((f, i) => (
                <Image key={f.image} src={f.image} alt="" fill sizes="40vw" className={cn('object-cover transition-[opacity,transform] duration-700', i === active ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0')} />
              ))}
            </div>
            <div className="mt-3.5 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.15em] text-text-tertiary">
              <span><b className="font-normal text-rl-red">{FRONTS[active].n}</b> / 04</span>
              <span>{FRONTS[active].title}</span>
            </div>
          </div>
          <div>
            {FRONTS.map((f, i) => (
              <div
                key={f.n}
                ref={(n) => { items.current[i] = n }}
                data-i={i}
                className={cn('mb-14 border-b border-border-light pb-16 pt-2 transition-opacity duration-500 last:mb-0 last:border-b-0 md:opacity-[.35]', i === active && 'md:opacity-100')}
              >
                <span className="font-mono text-[10.5px] tracking-[0.15em] text-rl-red">{f.n}</span>
                <h3 className="my-4 font-sans text-[32px] font-normal leading-none tracking-[-0.04em] md:text-[44px]">{f.title}</h3>
                <p className="max-w-[560px] text-[16px] leading-[1.7] text-text-secondary md:text-[18px]">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
